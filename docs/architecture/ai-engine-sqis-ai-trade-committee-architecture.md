# Module 6 - AI Engine, SQIS & AI Trade Committee Architecture

**Project:** Smapis Quant AI  
**Internal Platform:** Smapis Quant OS  
**Program:** Smapis Quant Program  
**Status:** Reference architecture blueprint  
**Date:** 2026-07-11

---

## 1. Executive Overview

This module is the intelligence core of Smapis Quant OS.

Its responsibility is not to maximize trade volume. Its responsibility is to protect capital by evaluating validated arbitrage opportunities, assigning a measurable Smapis Quant Intelligence Score (SQIS), coordinating specialist AI agents, and producing a conservative, explainable committee decision that may or may not permit paper trading or execution.

The architecture must assume:
- Market data can be stale, incomplete, manipulated, or delayed.
- Exchange health can change while review is in progress.
- AI outputs can be wrong, overconfident, or inconsistent.
- No single AI agent may authorize a trade alone.
- Critical risk and compliance agents can veto execution.
- Live execution must always depend on deterministic safety rules.
- Generative AI can explain and summarize structured decisions, but never override them.

The module should output a structured decision package that can be consumed by:
- Paper trading
- Manual execution eligibility checks
- Future auto-execution eligibility checks
- Confidence timeline projections
- Replay systems
- Audit and governance layers
- Frontend WebSocket updates

---

## 2. Design Principles

1. Capital preservation before profit maximization.
2. Rules and verified market data before generative AI.
3. Explainable decisions only.
4. Deterministic safety controls first.
5. Independent specialist agents.
6. No single agent may authorize a trade.
7. Critical risk agents may veto execution.
8. Confidence must be measurable and traceable.
9. All AI decisions must be versioned and auditable.
10. Paper trading before live execution.
11. Human approval must remain available.
12. Uncertainty must reduce permissions, not increase them.
13. Generative AI must never place exchange orders.
14. Execution engines must consume structured decisions only.
15. Recommendations must expire when data becomes stale.

---

## 3. Architecture Boundaries

The module is intentionally split into layers so that deterministic safety cannot be diluted by model behavior and model behavior cannot bypass risk controls.

| Layer | Why it exists | Consumes | Produces |
|---|---|---|---|
| Deterministic Validation Layer | Protects the system from stale, incomplete, or invalid inputs | Opportunity snapshots, market health, balances, limits | Validated or rejected input payloads |
| Feature Engineering Layer | Converts raw data into normalized decision features | Validated input payloads | Feature vectors with version metadata |
| SQIS Scoring Engine | Produces the core intelligence score | Feature vectors | SQISResult |
| Specialist AI Agent Layer | Produces independent specialist votes | Validated input + feature vectors + SQIS context | AgentDecision objects |
| Committee Orchestration Layer | Coordinates agents and handles timeouts/schema checks | Agent decisions | CommitteeReview state |
| Debate and Conflict Resolution Layer | Resolves material disagreements safely | Disputed evidence subsets | Debate responses and conflict notes |
| Final Decision Policy Engine | Applies deterministic approval rules | SQIS, agent votes, risk context, freshness | Final committee decision |
| Explainability Engine | Generates verified user-facing and technical explanations | Structured decision package, evidence graph | Explainability payloads |
| Confidence Timeline Engine | Tracks confidence movement over time | Score and decision deltas | ConfidenceTimelineEvent records |
| Position Sizing Engine | Caps exposure and recommends safe capital | Portfolio state, liquidity, risk, committee output | Position sizing recommendation |
| Learning and Evaluation Layer | Measures model and committee performance offline | Outcomes and predictions | Calibration metrics and evaluation reports |
| Model Registry and Versioning Layer | Governs versions and rollbacks | Approved model/rule artifacts | Registry records and activation metadata |
| Audit and Governance Layer | Records high-impact actions immutably | All above outputs | Audit trail entries |
| Execution Handoff Layer | Delivers structured decisions downstream | Final decision package | Paper/manual/auto execution handoff objects |

Why separation matters:
- Safety rules must remain deterministic and testable.
- Agent behavior must be independently auditable.
- Explanations must match the actual structured decision.
- Position sizing must never exceed deterministic constraints.
- Model upgrades must be versioned and reversible.

---

## 4. Text-Based Architecture Diagram

```text
Opportunity Engine
   -> OpportunityIntelligenceInput
   -> Deterministic Validation Layer
   -> Feature Engineering Layer
   -> SQIS Engine
   -> Specialist Agents (Atlas, Sentinel, Depth, Mercury, Guardian, Covenant)
   -> Committee Orchestrator
   -> Optional Debate Mode
   -> Final Decision Policy Engine
   -> Position Sizing Engine
   -> Explainability Engine
   -> Confidence Timeline Engine
   -> Execution Handoff Layer
   -> Paper Trading / Manual Eligibility / Auto Eligibility
   -> Audit, Replay, Alerts, WebSocket Broadcasts
   -> Learning & Evaluation Layer
```

---

## 5. End-to-End Data Flow

1. Opportunity Engine submits a validated opportunity candidate.
2. AI Input Validator checks data completeness, freshness, and eligibility.
3. Feature Engineering Layer creates normalized decision features.
4. SQIS Engine calculates the preliminary intelligence score.
5. Specialist agents independently review the same validated input.
6. Each agent returns a structured vote and supporting evidence.
7. Committee Orchestrator validates schemas, checks timeouts, and applies veto rules.
8. AI Debate Mode may run when votes materially disagree.
9. Final Decision Policy Engine produces a conservative committee decision.
10. Position Sizing Engine recommends safe capital within binding constraints.
11. Explainability Engine creates technical and user-friendly reasoning.
12. Confidence Timeline records score and decision changes.
13. Decision package is sent to paper trading or execution eligibility checks.
14. Outcome data later returns to the Learning and Evaluation Layer.

The flow must be deterministic at the gates and explainable at the outputs.

---

## 6. AI Input Contract

### `OpportunityIntelligenceInput`

This is the normalized contract the AI module receives from the Opportunity Engine.

#### Identity
- Opportunity ID
- Pair
- Base asset
- Quote asset
- Arbitrage type
- Buy exchange
- Sell exchange
- Network
- Detection timestamp
- Opportunity age
- Current status

#### Pricing
- Buy ask price
- Sell bid price
- Gross spread
- Gross spread percentage
- Spread stability
- Price freshness

#### Profit and fees
- Proposed capital
- Gross expected profit
- Buy trading fee
- Sell trading fee
- Withdrawal fee
- Network fee
- Estimated slippage
- Estimated net profit
- Net profit percentage
- Fee confidence

#### Liquidity
- Buy-side depth
- Sell-side depth
- Maximum safe capital
- Partial-fill probability
- Liquidity score
- Depth confidence

#### Exchange health
- API latency
- API error rate
- WebSocket status
- Trading status
- Deposit status
- Withdrawal status
- Maintenance state
- Exchange health score

#### Risk
- Volatility
- Network congestion
- Execution risk
- Counterparty risk
- Market regime
- Stale-data risk
- Existing risk flags

#### User context
- User risk profile
- Minimum profit threshold
- Minimum SQIS threshold
- Maximum trade size
- Daily loss limit
- Current exposure
- Available balances
- Allowed exchanges
- Country restrictions
- Paper/live trading mode

#### Historical context
- Similar opportunity success rate
- Historical exchange-route reliability
- Average execution latency
- Average realized slippage
- Average opportunity duration
- Recent failure rate

### Required validation rules
- Opportunity ID and pair must be present.
- Price fields must be numeric, non-negative, and timestamped.
- Freshness-critical fields must be inside the allowed freshness window.
- Net profit must be computable before AI review proceeds.
- User risk profile, allowed exchanges, and mode must be available.
- Critical health, balance, and compliance inputs may not be null when execution eligibility is being evaluated.

### Optional fields
- Historical context fields may be absent in early phases, but confidence must drop when they are missing.
- Non-executable analysis can tolerate more optionality than manual or auto execution.

### Stale-data rules
- If critical market data exceeds freshness thresholds, the input is invalid for execution eligibility.
- If fees or health data are stale, the opportunity may still be analyzed but must be downgraded.
- If balances or limits are stale, a fast revalidation is required before any execution eligibility.
- Staleness must produce an explicit status, not silent failure.

---

## 7. Feature Engineering Architecture

The Feature Engineering Layer converts raw normalized data into decision-ready features. It should be deterministic, versioned, and timestamped.

### Feature groups

| Group | Example features | Purpose |
|---|---|---|
| Spread Features | gross spread quality, net spread quality, spread persistence, spread acceleration, spread decay rate | Determine whether the price gap is real and durable |
| Liquidity Features | buy depth ratio, sell depth ratio, depth symmetry, partial-fill risk, slippage sensitivity, capital-to-depth ratio | Determine fillability and safe capital |
| Fee Features | total-cost percentage, fee-to-profit ratio, fee certainty, network-cost volatility | Prevent false positives from hidden costs |
| Exchange Features | health score, latency difference, error-rate trend, maintenance risk, historical route reliability | Penalize unreliable venues |
| Market Features | volatility regime, market direction, order-book instability, volume anomaly, network congestion | Contextualize spread quality |
| Execution Features | expected execution time, fill probability, two-leg synchronization risk, recovery feasibility, opportunity remaining life | Estimate execution practicality |
| Portfolio Features | proposed exposure, concentration risk, daily-loss utilization, available capital, stablecoin reserve, open-trade exposure | Protect portfolio health |
| Compliance and Security Features | API permission safety, country eligibility, restriction flags, withdrawal permission status, credential health | Enforce security and regulatory guardrails |

### Normalization rules
- All features should be mapped to a stable, documented range where possible, usually 0-1 or 0-100 for scoring convenience.
- Timestamp every feature vector.
- Version every feature schema.
- Preserve the source snapshot ID for reproducibility.
- Do not let derived features silently change meaning across versions.

### Validation rules
- Feature computation must fail closed when a required upstream signal is missing.
- Missing non-critical features should be represented explicitly as `null`, `unknown`, or `degraded`.
- Feature vectors used for a decision must be reproducible from a stored input snapshot and feature version.

---

## 8. SQIS Model

The Smapis Quant Intelligence Score is a 0-100 composite quality score.

It measures:
- opportunity quality
- execution readiness
- risk posture

It does not guarantee profitability.

### SQIS categories
- 90–100: Excellent
- 80–89: High Quality
- 70–79: Good
- 60–69: Caution
- 40–59: Weak
- 0–39: Reject

### Scoring dimensions

| Dimension | Purpose | Typical Inputs | Score Range | Weight | Penalties | Critical Failures | Confidence | User-facing explanation |
|---|---|---|---|---|---|---|---|---|
| Liquidity Quality | Assess whether the trade can actually be filled | depth, partial-fill risk, slippage sensitivity | 0-100 | 18% | thin depth, imbalance, unstable book | insufficient depth for minimum size | liquidity confidence | “Order book depth supports safe execution.” |
| Net Spread Quality | Measure usable spread after costs | gross spread, net spread, spread persistence | 0-100 | 14% | weak net spread, collapsing spread | negative net expected profit | spread confidence | “Net spread remains attractive after costs.” |
| Fee Efficiency | Ensure fees do not destroy edge | taker/maker fees, withdrawal costs, network fees | 0-100 | 10% | expensive route, uncertain fees | unverified fees with execution intent | fee confidence | “Fees remain within acceptable bounds.” |
| Exchange Health | Penalize unreliable venues | latency, errors, trading/deposit/withdraw status | 0-100 | 14% | degraded health, maintenance warnings | trading disabled, maintenance, severe outage | health confidence | “Exchanges are operational enough to review.” |
| API/Data Stability | Measure freshness and feed reliability | freshness, websocket state, stale-data risk | 0-100 | 10% | slow feed, noisy feed, missing updates | stale market data beyond freshness window | data confidence | “Price data is fresh enough to trust.” |
| Historical Reliability | Use past route behavior as a prior | historical success, duration, realized slippage | 0-100 | 8% | poor route history, high failure rate | route deemed unsafe by policy | history confidence | “This route has performed reliably before.” |
| Volatility Safety | Detect unstable market conditions | volatility regime, momentum, order-book instability | 0-100 | 8% | elevated volatility, unstable order book | volatility exceeds policy gate | volatility confidence | “Market conditions are not excessively unstable.” |
| Execution Readiness | Estimate whether two-leg execution is practical | fill probability, execution time, synchronization risk | 0-100 | 10% | slow execution, high sync risk | execution readiness below threshold | execution confidence | “The route is executable with acceptable timing.” |
| Portfolio Suitability | Check fit with current account state | exposure, daily loss, reserve ratio, balance | 0-100 | 4% | excessive concentration, low reserve | capital or loss limits breached | portfolio confidence | “This trade fits current portfolio constraints.” |
| Compliance and Security | Enforce account and policy suitability | country rules, permission status, credential health | 0-100 | 4% | warning permissions, restrictive account setup | country restriction, bad permissions, unsafe credential state | compliance confidence | “The account is eligible for this mode.” |

### Why the weights are conservative
- Liquidity, spread quality, exchange health, and execution readiness are prioritized because they directly affect whether the opportunity can be realized safely.
- Compliance/security retains a smaller weight because critical violations must be handled by deterministic hard gates, not by soft scoring.
- Portfolio suitability is also lower because it is a context modifier, not the core edge.

---

## 9. SQIS Weights, Penalties, Caps, and Output

### Recommended initial weight profile

| Dimension | Weight |
|---|---|
| Liquidity Quality | 18% |
| Net Spread Quality | 14% |
| Fee Efficiency | 10% |
| Exchange Health | 14% |
| API/Data Stability | 10% |
| Historical Reliability | 8% |
| Volatility Safety | 8% |
| Execution Readiness | 10% |
| Portfolio Suitability | 4% |
| Compliance/Security | 4% |

This profile is conservative because it gives strong influence to the factors that can invalidate a trade in practice. The system should support:
- global defaults
- strategy-specific weights
- risk-profile-specific weights
- versioned weight configurations
- A/B evaluation in paper trading
- admin-controlled changes
- rollback to prior versions

### Hard penalties and caps

| Condition | Effect |
|---|---|
| Stale market data | SQIS cap 30 |
| Withdrawal suspended when transfer is required | SQIS cap 20 |
| Exchange health degraded | SQIS cap 55 |
| Insufficient order-book depth | SQIS cap 40 |
| Negative expected net profit | SQIS 0 |
| Unverified fees | SQIS cap 60 |
| API withdrawal permission enabled | security warning + configurable penalty |
| Critical country restriction | SQIS 0 |
| Two-leg fill probability below threshold | SQIS cap 45 |
| Critical Risk Officer rejection | execution ineligible regardless of SQIS |

Why hard penalties exist:
- A weighted average can hide dangerous conditions.
- A single critical failure can make an otherwise good-looking opportunity unsafe.
- SQIS must be a safety-aware quality measure, not an optimistic score.

### `SQISResult`

| Field | Purpose |
|---|---|
| overall_score | Final 0-100 SQIS |
| quality_label | Excellent, High Quality, Good, Caution, Weak, Reject |
| score_confidence | Confidence in the score itself |
| dimension_scores | Per-dimension scores |
| dimension_confidences | Per-dimension confidence values |
| applied_weights | Versioned weighting profile used |
| penalties | Penalty list and reasons |
| score_caps | Applied hard caps |
| critical_failures | Blocking conditions |
| positive_factors | Key strengths |
| negative_factors | Key weaknesses |
| scoring_version | SQIS logic version |
| input_snapshot_version | Opportunity snapshot version |
| calculation_timestamp | Time of calculation |
| expiry_timestamp | When the score is no longer valid |
| user_facing_summary | Short explanation of the score |
| execution_eligibility | View, alert, paper, manual, auto, or none |

### Output rules
- SQIS should always carry a confidence value.
- SQIS should expire when underlying data becomes stale.
- Execution eligibility is a separate field and must never be inferred only from score.
- A high score can still be ineligible if a deterministic veto exists.

---

## 10. Specialist Agent Specifications

All agents must evaluate the same validated input independently.

No agent may see another agent’s vote before its initial vote.

### Agents

| Agent | User-facing identity | Role | Responsibilities | Possible votes | Veto authority |
|---|---|---|---|---|---|
| Atlas | Market Scanner and Market Intelligence Agent | Confirms spread realism and feed quality | confirm spread, detect false signals, assess market regime, estimate lifespan | APPROVE, WAIT, REJECT | Can reject stale or inconsistent market data |
| Sentinel | Chief Risk Officer | Evaluates volatility, exchange risk, execution risk, and loss constraints | enforce safety, veto unsafe live execution | APPROVE, CONDITIONAL_APPROVAL, WAIT, REJECT | Yes, hard veto for risk |
| Depth | Liquidity and Order Book Analyst | Judges fillability and size safety | depth analysis, slippage estimation, partial-fill probability, safe capital | APPROVE, REDUCE_POSITION_SIZE, WAIT, REJECT | Yes, if liquidity is insufficient |
| Mercury | Execution Manager | Assesses timing and sequencing risk | fill probability, API latency, order sequencing, recovery feasibility | APPROVE, CONDITIONAL_APPROVAL, WAIT, REJECT | Advisory only, no direct execution |
| Guardian | Portfolio and Capital Protection Manager | Protects balances, exposure, reserves | trade sizing, concentration, daily loss, reserve policy | APPROVE, REDUCE_POSITION_SIZE, PAPER_TRADE_ONLY, REJECT | Yes, if portfolio constraints are unsafe |
| Covenant | Compliance and Security Officer | Ensures account, country, and permission safety | API permissions, withdrawal risk, regulatory constraints, credential health | APPROVE, SECURITY_WARNING, PAPER_TRADE_ONLY, REJECT | Yes, for prohibited or insecure execution |

### Agent-specific notes
- Atlas should reject stale prices, abnormal feed mismatch, and already-expired opportunities.
- Sentinel must veto live execution when volatility, exchange risk, or exposure becomes unacceptable.
- Depth must veto when order-book depth is insufficient for the intended size.
- Mercury must never place orders. It only produces execution readiness advice.
- Guardian can force reduced size or paper-trade-only behavior when portfolio safety requires it.
- Covenant can block live execution if country restrictions, credential misuse, or withdrawal permissions create security risk.

---

## 11. Agent Output Contract

### `AgentDecision`

| Field | Purpose |
|---|---|
| agent_id | Stable agent identifier |
| agent_type | Internal enum for the agent category |
| user_facing_agent_name | Human-readable identity |
| agent_version | Versioned agent configuration |
| vote | Enum vote |
| confidence_percentage | Confidence in the vote |
| decision_severity | Low, medium, high, critical |
| summary | Short decision summary |
| detailed_explanation | Structured reasoning |
| supporting_factors | Evidence-backed positives |
| opposing_factors | Evidence-backed negatives |
| risk_flags | Risk flags raised by the agent |
| critical_flags | Blocking flags raised by the agent |
| recommended_action | Action suggestion |
| recommended_conditions | Conditions required for approval |
| recommended_capital | Suggested capital |
| maximum_safe_capital | Upper safety bound |
| data_freshness_status | Fresh / degraded / stale |
| evidence_references | Evidence IDs used |
| model_rule_version | Rule set or model version |
| started_timestamp | Review start time |
| completed_timestamp | Review completion time |
| decision_expiry_timestamp | When the vote becomes invalid |

### Vote enum
- APPROVE
- CONDITIONAL_APPROVAL
- REDUCE_POSITION_SIZE
- WAIT
- PAPER_TRADE_ONLY
- REJECT
- SECURITY_WARNING
- INSUFFICIENT_DATA

### Output rules
- Votes must be enums, not free-form text.
- Confidence must be provided even when the vote is negative.
- The vote must be traceable to evidence IDs.
- Agent output must validate against a strict schema before it can influence the committee.

---

## 12. Rule Engine vs AI Responsibilities

### Deterministic rules must control
- Data freshness
- Minimum net profit
- Negative expected profit
- Exchange maintenance
- Deposit/withdrawal availability
- Country restrictions
- API permission security
- Daily loss limit
- Maximum trade size
- Minimum order size
- Required balance
- Critical risk vetoes
- Execution eligibility
- Decision expiry

### AI or statistical models may assist with
- Spread persistence estimation
- Slippage forecasting
- Opportunity lifespan prediction
- Historical similarity
- Route reliability
- Volatility interpretation
- Confidence calibration
- Natural-language explanations

### Generative AI may
- Summarize structured decisions
- Explain risks in plain language
- Answer user questions about the analysis

### Generative AI may not
- Override deterministic safety rules
- Invent market data
- Authorize execution
- Change balances
- Place orders
- Remove vetoes
- Increase position size beyond policy limits

Deterministic rules are the safety boundary. AI is advisory, not authoritative.

---

## 13. Committee Orchestrator

The Committee Orchestrator is fully deterministic.

### Responsibilities
- Start independent agent evaluations
- Enforce execution timeouts
- Validate agent output schemas
- Record incomplete agents
- Detect material disagreements
- Apply veto rules
- Trigger Debate Mode when appropriate
- Aggregate votes
- Produce final structured decision
- Generate an audit trail
- Expire decisions when data becomes stale

### Orchestration sequence
1. Validate the opportunity input.
2. Calculate SQIS.
3. Dispatch agent jobs in parallel.
4. Wait for schema-validated results.
5. Apply deterministic veto rules.
6. Compare confidence and vote dispersion.
7. Trigger Debate Mode if required.
8. Aggregate final decision.
9. Size the position.
10. Create explanations and timeline events.
11. Emit handoff package.

### Orchestrator rules
- Timeout completion must default to a conservative decision.
- Missing critical agents should prevent live execution.
- Schema failures are treated as invalid votes.
- The orchestrator itself must not improvise or “reason” beyond policy.

---

## 14. Final Decision States

| State | Meaning | Execution eligibility |
|---|---|---|
| EXECUTE | Fully approved for live execution under policy | Eligible if live execution mode is enabled |
| EXECUTE_WITH_REDUCED_SIZE | Approved but capped to safer capital | Eligible with enforced size cap |
| CONDITIONAL_EXECUTE | Approved only if conditions remain satisfied | Eligible only after revalidation |
| PAPER_TRADE_ONLY | Safe for simulation only | Not live-execution eligible |
| WAIT | Not ready; continue monitoring | Not eligible |
| SKIP | Do not continue with this opportunity | Not eligible |
| REJECTED_BY_RISK | Risk vetoed the opportunity | Not eligible |
| REJECTED_BY_LIQUIDITY | Liquidity vetoed the opportunity | Not eligible |
| REJECTED_BY_COMPLIANCE | Compliance/security vetoed the opportunity | Not eligible |
| INSUFFICIENT_DATA | Required evidence was missing | Not eligible |
| EXPIRED | Input or decision window became stale | Not eligible |

---

## 15. Voting, Veto, and Eligibility Rules

### Conservative initial rules
- Sentinel REJECT prevents live execution.
- Depth REJECT prevents live execution.
- Covenant REJECT prevents live execution.
- Two or more REJECT votes produce SKIP or a specific rejection state.
- Any INSUFFICIENT_DATA vote from a critical agent prevents automatic execution.
- Two or more WAIT votes produce WAIT.
- Guardian REDUCE_POSITION_SIZE applies the lower recommended size.
- Low committee confidence produces PAPER_TRADE_ONLY.
- Expired input produces EXPIRED.
- EXECUTE requires:
  - SQIS above configured threshold
  - no critical veto
  - fresh data
  - sufficient liquidity
  - positive expected net profit
  - execution readiness
  - compliance approval
  - portfolio approval
- Auto execution should require stricter thresholds than manual execution.
- Paper trading may allow weaker opportunities for evaluation, but must clearly label them.

### Suggested eligibility thresholds

| Mode | Starting gate |
|---|---|
| View only | Any valid, non-expired analysis |
| Alert | SQIS above a modest threshold or watchlist trigger |
| Paper trading | SQIS and committee confidence at moderate thresholds, no critical veto |
| Manual execution | High SQIS, strong committee confidence, all deterministic checks clear |
| Automatic execution | Very high SQIS, very high committee confidence, stricter risk and compliance gates |

These thresholds should be configurable by strategy and risk profile, but the defaults should remain conservative.

---

## 16. Committee Confidence Model

Committee confidence is not a simple average.

### Components
- Individual agent confidence
- Agent reliability weight
- Agreement level
- Data freshness
- Evidence completeness
- SQIS confidence
- Historical calibration
- Critical disagreement penalty
- Model uncertainty penalty

### Recommended conservative aggregation
Use a bounded conservative aggregate:
- Start with a reliability-weighted aggregate of agent confidences.
- Apply a floor based on critical agents.
- Reduce the result when agents disagree materially.
- Reduce the result when data is stale or evidence is incomplete.
- Reduce the result when model uncertainty is high.
- Clamp final confidence into a strict range.

### Distinct terms
- Opportunity quality score: how attractive the opportunity is after validation.
- SQIS confidence: how reliable the SQIS calculation is.
- Individual agent confidence: how confident each specialist is in its vote.
- Committee confidence: how trustworthy the committee outcome is overall.
- Execution confidence: whether the final package is safe enough to execute under policy.

---

## 17. AI Debate Mode

Debate Mode is for meaningful disagreements only.

### Trigger conditions
- Critical agents disagree.
- One agent recommends execution and another recommends rejection.
- Position-size recommendations differ materially.
- Committee confidence is below threshold.
- SQIS is high but risk is elevated.
- Data sources conflict.

### Debate sequence
1. Initial independent votes are locked.
2. Orchestrator identifies disputed issues.
3. Each relevant agent receives only the disputed structured evidence.
4. Agents submit one rebuttal or clarification.
5. Deterministic policy engine evaluates the updated responses.
6. Final decision is produced.
7. Initial votes and debate responses remain preserved.

### Safety controls
- Maximum debate rounds should be small.
- Maximum execution time should be strict.
- Token or compute budget should be capped in future provider-backed versions.
- Required output must remain structured.
- Timeout behavior must be conservative.
- Fallback decision should be WAIT, PAPER_TRADE_ONLY, or SKIP.

Debate Mode must improve clarity, not create endless conversation.

---

## 18. Explainability Engine

The Explainability Engine produces two outputs:

1. Technical explanation
2. User-friendly explanation

It must explain:
- why the opportunity received its SQIS
- why each agent voted as it did
- why the committee reached its decision
- why the recommended capital was selected
- which risks could change the decision
- which conditions must remain true
- when the recommendation expires

### Rules
- Explanations must be generated from verified structured evidence only.
- Explanations must not invent reasons.
- Explanations must match the structured decision exactly.

### Template guidance
- EXECUTE: “The opportunity is fresh, liquid, compliant, and within portfolio limits.”
- EXECUTE_WITH_REDUCED_SIZE: “The opportunity is valid, but size is capped to reduce liquidity or exposure risk.”
- WAIT: “The opportunity is interesting but not yet stable or complete enough to act on.”
- PAPER_TRADE_ONLY: “The signal is worth testing, but live execution is not yet safe.”
- REJECT: “The opportunity fails one or more hard safety checks.”
- EXPIRED: “The analysis is no longer valid because the market changed.”

---

## 19. Evidence Traceability

Every score, vote, and explanation should reference evidence.

### `EvidenceRecord`
| Field | Purpose |
|---|---|
| evidence_id | Stable evidence reference |
| source_module | Scanner, Exchange, Risk, Portfolio, etc. |
| source_type | Snapshot, health signal, balance, fee, history |
| metric_name | What the evidence measures |
| metric_value | Observed value |
| timestamp | When it was observed |
| freshness | Fresh, degraded, stale |
| reliability | Relative trust score |
| related_exchange | Exchange reference |
| related_opportunity_snapshot | Snapshot reference |
| user_visible_status | Whether the user can see this evidence |

### Example evidence sources
- Binance order-book snapshot
- Bybit bid depth
- Exchange health score
- Fee estimate
- Historical route success rate
- User risk limit
- Daily-loss utilization

Evidence IDs must flow through committee, explanation, timeline, and replay systems.

---

## 20. Confidence Timeline

The Confidence Timeline is an append-only event stream.

### `ConfidenceTimelineEvent`
| Field | Purpose |
|---|---|
| event_id | Unique event reference |
| opportunity_id | Linked opportunity |
| timestamp | Event time |
| event_type | What changed |
| source_module | Which module emitted it |
| source_agent | Which agent emitted it, if any |
| previous_value | Prior score or decision value |
| new_value | Updated score or decision value |
| previous_decision | Prior committee state |
| new_decision | Updated committee state |
| reason_code | Machine-readable reason |
| user_facing_explanation | Human-readable note |
| evidence_ids | Evidence references |
| severity | Low, medium, high, critical |
| model_rule_version | Version used |

### Timeline events to record
- Opportunity detected
- Liquidity confirmed
- Spread strengthened
- Spread weakened
- Fee estimate changed
- Exchange latency increased
- Risk flag added
- Agent vote completed
- Committee debate started
- Committee decision changed
- Recommended capital reduced
- Opportunity expired

The timeline must support replay, audit, and confidence calibration.

---

## 21. Position Sizing Engine

The Position Sizing Engine is deterministic and risk-aware.

### Inputs
- User available capital
- User maximum trade size
- Maximum safe capital from liquidity
- Portfolio exposure limit
- Daily loss limit
- Expected slippage curve
- Net profit curve
- Partial-fill risk
- Committee recommendation
- Risk profile
- Trading mode
- Stablecoin reserve policy

### Outputs
- Minimum useful capital
- Recommended capital
- Maximum safe capital
- Maximum permitted capital
- Expected profit at recommended size
- Expected slippage
- Exposure percentage
- Reasoning
- Binding constraints

### Rules
- Final recommended capital must be the lowest safe limit across all binding controls.
- AI must never recommend more capital than deterministic policy allows.
- If the committee recommends a larger amount than the engine permits, the engine truncates it.
- If the trade is only paper-safe, the output must clearly mark that.

---

## 22. Decision Expiry and Revalidation

Decision packages must expire when the market or account state changes materially.

### Expiry triggers
- Market data exceeds freshness limit
- Spread changes materially
- Liquidity changes materially
- Exchange health changes
- User balance changes
- Risk limit changes
- Opportunity status changes
- Execution has not started within the permitted window

### Fast revalidation vs full review
- Fast revalidation checks only the critical fields needed to preserve decision safety.
- Full committee review reruns the whole AI pipeline.
- Fast revalidation is for short-lived market drift.
- Full review is for material change or expired confidence.

### Before paper or live execution, the system must revalidate
- prices
- order-book depth
- fees
- exchange health
- user balance
- risk limits
- decision eligibility

If revalidation fails, the system must default to a conservative state.

---

## 23. Learning and Evaluation

The Learning and Evaluation Layer must be safe and offline-first.

### Predicted values
- success probability
- estimated profit
- expected slippage
- expected execution time
- opportunity lifespan
- recommended capital

### Actual values
- fill status
- realized profit
- realized slippage
- actual execution time
- failure reason
- actual duration

### Evaluation metrics
- decision precision
- false-positive rate
- false-negative estimate
- profit-estimation error
- slippage-estimation error
- confidence calibration
- agent accuracy
- route reliability
- SQIS band performance
- veto effectiveness

### Learning rules
- Learning should first influence offline evaluation and paper trading.
- Live rules must not self-modify without approval, versioning, testing, and rollback.
- Evaluation outputs should inform future versioning decisions, not immediate live overrides.

---

## 24. Model and Rule Registry

The registry governs all scored or rule-based logic used by this module.

### Registry record should support
- version
- status
- created by
- approval status
- environment
- effective date
- performance metrics
- rollback target
- change notes
- associated ADR

### Registry categories
- SQIS versions
- Agent versions
- Rule-set versions
- Weight configurations
- Prompt versions future
- Statistical model versions
- Explainability templates
- Debate policies
- Position-sizing policies

### Suggested statuses
- Draft
- Review
- Approved
- Active
- Deprecated
- RolledBack
- Archived

Rollback must always remain possible for active versions.

---

## 25. Human Oversight

Human control must remain available.

### Oversight modes
1. Analysis Only
2. Paper Trading
3. Manual Approval Required
4. Conditional Automation
5. Full Automation within strict limits

### User-configurable controls
- Minimum SQIS
- Minimum committee confidence
- Allowed exchanges
- Allowed pairs
- Maximum capital
- Daily loss limit
- Maximum trades per day
- Whether reduced-size decisions can execute
- Whether conditional decisions can execute
- Required manual approval cases

### Non-disableable system safety rules
- critical risk vetoes
- compliance restrictions
- data freshness gates
- negative net profit gate
- minimum balance and exposure constraints
- audit logging
- decision expiry

User control must never be able to override system safety.

---

## 26. Failure Handling

Default behavior must be conservative.

| Failure | Default behavior |
|---|---|
| Agent timeout | WAIT or PAPER_TRADE_ONLY depending on which agent timed out |
| Invalid agent output | SKIP |
| AI provider unavailable | No live execution; preserve structured partial results if safe |
| Feature data missing | INSUFFICIENT_DATA |
| Conflicting evidence | Trigger Debate Mode or WAIT |
| Low confidence | PAPER_TRADE_ONLY or WAIT |
| Model version unavailable | Degrade to deterministic scoring or WAIT |
| Explainability generation failure | Block automatic execution until explanation is available |
| Committee orchestration failure | No live execution |
| Decision storage failure | Fail closed and preserve audit if possible |
| Stale opportunity | EXPIRED |
| Unexpected score calculation error | Safe rejection or PAPER_TRADE_ONLY |

### Safety defaults
- Missing critical agent: PAPER_TRADE_ONLY or WAIT
- Invalid evidence: SKIP
- Stale input: EXPIRED
- Committee failure: no live execution
- Explainability failure: block automatic execution

---

## 27. Security and AI Safety

### Controls
- Never send exchange API secrets to any AI provider.
- Never include raw credentials in prompts or logs.
- Sanitize external text and market metadata.
- Use strict JSON schemas for AI outputs.
- Validate all outputs before use.
- Separate tenant data.
- Encrypt sensitive data.
- Record all high-impact decisions.
- Sign or hash critical decision packages in future hardened versions.

### Threats and mitigations
- Prompt injection through external exchange text: sanitize and whitelist inputs.
- Malicious token names or metadata: treat external strings as untrusted.
- Data poisoning: cross-check against independent sources and freshness rules.
- Hallucinated evidence: block any unsupported explanation.
- Unauthorized policy changes: restrict registry changes by role and approval.
- Model output tampering: validate schemas and signatures.
- User manipulation of AI input: trim user-supplied fields to safe contexts only.
- Cross-tenant leakage: tenant isolation everywhere.
- Sensitive API data exposure: redact and isolate credentials.
- AI provider privacy risk: minimize payloads and avoid secrets.
- Audit-log integrity: append-only logs with strong access controls.

Generative AI must never become a bypass for security policy.

---

## 28. Cost and Latency Management

### Intelligence tiers

| Tier | Purpose | When it activates | Typical latency target | Notes |
|---|---|---|---|---|
| Tier 1 | Deterministic screening | Every validated opportunity | sub-100ms to low hundreds of ms | Cheap and mandatory |
| Tier 2 | SQIS and lightweight statistical analysis | Only if Tier 1 passes | low hundreds of ms | Fast signal quality layer |
| Tier 3 | Full specialist committee | Only for promising opportunities | seconds, not minutes | Parallel agent evaluation |
| Tier 4 | Debate Mode | Only for material disagreement | bounded seconds | Conservative fallback on timeout |
| Tier 5 | Natural-language explanation or AI chat | On user request or post-decision | can be slower | Never changes the decision |

### Cost controls
- Do not run expensive AI analysis for weak opportunities.
- Reuse recent results when the opportunity fingerprint and freshness still match.
- Cache SQIS and committee outputs briefly while respecting freshness limits.
- Apply subscription-plan and strategy-based limits later, but keep safety gates plan-agnostic.

---

## 29. Queue and Job Architecture

### Conceptual jobs
- ValidateAIInputJob
- BuildOpportunityFeaturesJob
- CalculateSQISJob
- RunMarketAgentJob
- RunRiskAgentJob
- RunLiquidityAgentJob
- RunExecutionAgentJob
- RunPortfolioAgentJob
- RunComplianceAgentJob
- AggregateCommitteeVotesJob
- RunCommitteeDebateJob
- CalculateCommitteeConfidenceJob
- RecommendPositionSizeJob
- GenerateDecisionExplanationJob
- RecordConfidenceTimelineJob
- ExpireIntelligenceDecisionJob
- EvaluateTradeOutcomeJob
- RecalibrateConfidenceModelJob future

### Job dependencies
1. Validate input.
2. Build features.
3. Calculate SQIS.
4. Run agent jobs in parallel.
5. Aggregate votes.
6. Optionally run debate.
7. Calculate committee confidence.
8. Recommend position size.
9. Generate explanation.
10. Record timeline and audit entries.
11. Expire stale decisions.
12. Evaluate outcomes later.

### Job rules
- Parallelize independent agent jobs.
- Use short timeouts for agent work.
- Retry only safe jobs.
- Make jobs idempotent.
- Use priority queues so critical review outruns analytics.
- Preserve partial results if one non-critical job fails.

### Priority queues
- critical-ai
- committee
- explainability
- timeline
- learning
- backfill

---

## 30. Event Architecture

### Conceptual events

| Event | Purpose | Producer | Consumer | Broadcast? | Auditable? |
|---|---|---|---|---|---|
| OpportunitySubmittedForAIReview | Starts AI review | Opportunity Engine | AI module | Yes | Yes |
| SQISCalculated | Announces score completion | SQIS Engine | Orchestrator, UI | Yes | Yes |
| AgentVoteCompleted | Records an agent vote | Specialist agent | Orchestrator | Yes, summarized only | Yes |
| AgentVoteFailed | Records a failed agent review | Specialist agent | Orchestrator, audit | No | Yes |
| CommitteeReviewStarted | Marks orchestration start | Orchestrator | Audit, UI | Yes | Yes |
| CommitteeDebateStarted | Marks debate activation | Orchestrator | Debate layer, UI | Yes | Yes |
| CommitteeDecisionProduced | Final decision created | Policy engine | Execution handoff, UI | Yes | Yes |
| CommitteeDecisionChanged | Decision updated due to new evidence | Policy engine | Timeline, UI | Yes | Yes |
| PositionSizeRecommended | Capital recommendation ready | Position sizing engine | Execution handoff | Yes, summarized | Yes |
| ConfidenceChanged | Confidence movement recorded | Timeline engine | UI, replay | Yes | Yes |
| IntelligenceDecisionExpired | Decision is stale | Expiry engine | UI, replay, alerts | Yes | Yes |
| OpportunityApprovedForPaperTrade | Allows simulation only | Policy engine | Paper trading | Yes | Yes |
| OpportunityEligibleForManualExecution | Human execution may proceed | Policy engine | Execution handoff | Yes | Yes |
| OpportunityEligibleForAutoExecution | Auto execution may proceed under strict policy | Policy engine | Execution handoff | Yes | Yes |
| TradeOutcomeReceived | Feedback from execution or paper trade | Execution/Paper layer | Learning, evaluation | No/limited | Yes |
| ModelPerformanceDegraded | Evaluation warning | Learning layer | Admin, governance | Yes, summary only | Yes |

### Event rules
- Events must be immutable facts.
- Broadcast payloads must be compact and non-sensitive.
- Auditability should be enabled for all high-impact events.

---

## 31. WebSocket and Frontend Outputs

The frontend should receive concise, evidence-based outputs only.

### Output types
- SQIS update
- Agent vote progress
- Committee vote summary
- Committee final decision
- Confidence Timeline update
- Position-size recommendation
- Risk warning
- Decision expiry
- Debate Mode status
- Explainability summary

### Payload principles
- No private internal reasoning.
- No raw prompts.
- No raw credentials.
- No hidden model chain-of-thought.
- Only concise, evidence-based explanation summaries.

### Example consumer mapping
- Scanner pages: SQIS update, opportunity updates, decision expiry
- Opportunity detail: vote summary, debate status, explainability summary
- Risk center: risk warnings, veto states
- Dashboard: decision summary and live status
- Replay views: timeline updates and historical outcomes

---

## 32. Laravel Domain Structure

Recommended structure:

```text
app/
├── Domain/
│   ├── Intelligence/
│   │   ├── Contracts/
│   │   ├── Services/
│   │   ├── Actions/
│   │   ├── DTOs/
│   │   ├── Enums/
│   │   ├── Policies/
│   │   ├── Jobs/
│   │   ├── Events/
│   │   ├── Listeners/
│   │   ├── Exceptions/
│   │   └── Support/
│   ├── SQIS/
│   │   ├── Scorers/
│   │   ├── Weights/
│   │   ├── Penalties/
│   │   ├── DTOs/
│   │   └── Versions/
│   ├── Committee/
│   │   ├── Agents/
│   │   ├── Orchestration/
│   │   ├── Debate/
│   │   ├── Decisions/
│   │   ├── Vetoes/
│   │   └── Explainability/
│   ├── Confidence/
│   │   ├── Timeline/
│   │   ├── Calibration/
│   │   └── Events/
│   └── PositionSizing/
│       ├── Rules/
│       ├── Constraints/
│       └── Recommendations/
```

### Directory responsibilities
- `Domain/Intelligence`: the parent coordination boundary for AI review flows.
- `Domain/SQIS`: scoring algorithms, weights, penalties, and score versions.
- `Domain/Committee`: specialist agents, orchestration, debate, final decisions, vetoes, and explainability.
- `Domain/Confidence`: confidence timeline, calibration, and confidence events.
- `Domain/PositionSizing`: deterministic size recommendation and binding constraints.

Recommended conventions:
- Keep domain services pure where possible.
- Keep actions as orchestration entrypoints.
- Keep AI/provider integrations behind adapters.
- Keep audit, timeline, and replay outputs append-only.

---

## 33. Conceptual Enums

| Enum | Conceptual values | Purpose |
|---|---|---|
| SQISQualityLevel | EXCELLENT, HIGH_QUALITY, GOOD, CAUTION, WEAK, REJECT | Human label for score bands |
| IntelligenceDecision | EXECUTE, EXECUTE_WITH_REDUCED_SIZE, CONDITIONAL_EXECUTE, PAPER_TRADE_ONLY, WAIT, SKIP, REJECTED_BY_RISK, REJECTED_BY_LIQUIDITY, REJECTED_BY_COMPLIANCE, INSUFFICIENT_DATA, EXPIRED | Final committee state |
| AgentVote | APPROVE, CONDITIONAL_APPROVAL, REDUCE_POSITION_SIZE, WAIT, PAPER_TRADE_ONLY, REJECT, SECURITY_WARNING, INSUFFICIENT_DATA | Specialist vote |
| AgentType | ATLAS, SENTINEL, DEPTH, MERCURY, GUARDIAN, COVENANT | Stable internal agent identity |
| CommitteeStatus | PENDING, REVIEWING, DEBATING, DECIDED, EXPIRED, FAILED | Committee lifecycle |
| DebateStatus | DISABLED, READY, RUNNING, RESOLVED, TIMED_OUT | Debate lifecycle |
| ConfidenceLevel | VERY_LOW, LOW, MODERATE, HIGH, VERY_HIGH | Confidence band |
| RiskFlagType | STALE_DATA, LOW_LIQUIDITY, HIGH_FEE, EXCHANGE_HEALTH, COMPLIANCE, EXECUTION, EXPOSURE | Risk flag taxonomy |
| DecisionExpiryReason | DATA_STALE, SPREAD_CHANGED, LIQUIDITY_CHANGED, HEALTH_CHANGED, BALANCE_CHANGED, RISK_CHANGED, STATUS_CHANGED, WINDOW_EXPIRED | Why a decision expired |
| ExecutionEligibility | VIEW_ONLY, ALERT, PAPER_TRADE, MANUAL_EXECUTION, AUTO_EXECUTION, INELIGIBLE | Allowed downstream action |
| ExplanationType | TECHNICAL, USER_FACING, COMMITTEE, RISK, POSITION_SIZE | Explanation style |
| EvidenceSourceType | EXCHANGE_SNAPSHOT, MARKET_FEED, HEALTH_SIGNAL, FEE_ESTIMATE, BALANCE, RISK_LIMIT, HISTORY, USER_PROFILE | Evidence source category |
| ModelStatus | DRAFT, REVIEW, APPROVED, ACTIVE, DEPRECATED, ROLLED_BACK, ARCHIVED | Version governance |
| TradingControlMode | ANALYSIS_ONLY, PAPER_TRADING, MANUAL_APPROVAL_REQUIRED, CONDITIONAL_AUTOMATION, FULL_AUTOMATION | Human control mode |

---

## 34. Testing Architecture

### Core test suites
1. SQIS unit tests
2. Weight and penalty tests
3. Critical score-cap tests
4. Agent contract tests
5. Committee voting tests
6. Veto-rule tests
7. Debate termination tests
8. Position-sizing tests
9. Decision expiry tests
10. Stale-data tests
11. Explainability evidence tests
12. Cross-tenant isolation tests
13. AI output schema-validation tests
14. Failure fallback tests
15. Confidence calibration tests
16. Historical replay tests
17. Paper-trading evaluation tests

### Edge cases to cover
- High spread but no liquidity
- High SQIS but compliance rejection
- Strong liquidity but negative net profit
- Missing Risk Officer vote
- Conflicting position-size recommendations
- Expired opportunity after approval
- Exchange health degrades during review
- User attempts to exceed safe capital
- Model provider unavailable
- Generative explanation contradicts structured decision

### Testing rules
- Critical failures must default to conservative outcomes.
- All committee-related tests should assert deterministic schema behavior.
- Replay and timeline tests should assert event ordering and immutability.
- Cross-tenant tests should verify no evidence or decision leakage.

---

## 35. Observability

### Metrics to monitor
- AI review latency
- SQIS calculation latency
- Agent timeout rate
- Agent disagreement rate
- Debate frequency
- Committee approval rate
- Committee rejection rate
- Execution-eligibility rate
- Decision expiry rate
- Confidence calibration
- False-positive rate
- Profit-estimation error
- Model cost
- AI provider failures
- Rules/model version distribution

### Alerting guidance
- Alert when agent timeouts rise above baseline.
- Alert when debate frequency spikes.
- Alert when confidence calibration drifts materially.
- Alert when rejection rates or expiry rates change unexpectedly.
- Alert when AI provider failures or cost spikes increase.
- Alert when version distributions show unexpected model drift.

Observability should make model regression obvious before it impacts live recommendations.

---

## 36. Recommended ADRs

| ADR | Context | Decision | Alternatives | Consequences | Security impact | Future review trigger |
|---|---|---|---|---|---|---|
| Deterministic rules control execution eligibility | AI can be overconfident | Rules decide whether execution is allowed | Let AI decide directly | Safer execution, slower approval path | Strong positive | When execution policy changes |
| Generative AI cannot authorize or place trades | Prevent unsafe automation | AI is advisory only | Allow agent-driven execution | More controlled, less risky | Strong positive | When regulated execution design changes |
| Independent initial agent voting | Avoid group bias | Agents vote without seeing each other first | Shared-context voting | Better diversity, more orchestration cost | Positive | If committee design is simplified |
| Risk, liquidity, and compliance veto powers | Capital protection | Critical agents may veto live execution | Soft warnings only | Safer, but fewer live opportunities | Strong positive | When policy thresholds are revised |
| SQIS is not a profit guarantee | Avoid misleading score semantics | SQIS is a quality and readiness score only | Profit-optimized score | Better trust, less hype | Positive | If product semantics change |
| Full committee runs only after deterministic screening | Save cost and reduce noise | Deterministic filters first | Full AI on every signal | Lower cost and lower latency | Positive | If latency budgets tighten dramatically |
| Live decisions expire and require revalidation | Markets move fast | Decisions have strict expiry windows | Long-lived decisions | Lower stale-trade risk | Strong positive | If faster markets demand shorter windows |
| Learning changes require approval and versioning | Prevent self-modifying risk | Offline evaluation only unless approved | Auto-updating live rules | Safer governance | Strong positive | When calibration pipeline matures |
| Explainability must be evidence-backed | Prevent hallucinated reasons | Explanations must cite evidence | Free-form explanation generation | Higher trust and auditability | Strong positive | When explanation model strategy changes |
| Automatic execution has stricter thresholds than manual execution | Minimize automation risk | Auto rules are stricter | Same thresholds as manual | Safer automation | Strong positive | When automation policy evolves |

---

## 37. Phased Implementation Plan

| Phase | Goal | Dependencies | Deliverables | Risks | Exit criteria |
|---|---|---|---|---|---|
| Phase 1 | Mock SQIS with deterministic scoring | Opportunity input contract | SQISResult mock + unit tests | Overfitting early heuristics | Stable score bands and caps |
| Phase 2 | Structured specialist agents using deterministic rules | SQIS and feature vectors | AgentDecision contracts + rule-based agents | Rigid or shallow reasoning | Each agent returns valid schema |
| Phase 3 | Committee orchestration and veto logic | Agent contracts | Orchestrator + veto aggregation | Poor timeout handling | Deterministic final decision exists |
| Phase 4 | Explainability templates | Decision package | Technical and user-facing explanations | Template drift | Evidence-backed explanations render correctly |
| Phase 5 | Confidence Timeline | Score and decision events | Append-only timeline events | Event spam | Timeline reconstructs decisions accurately |
| Phase 6 | Position Sizing Engine | Liquidity, exposure, limits | Capital recommendation logic | Over-allocation | Engine caps capital deterministically |
| Phase 7 | Paper-trading outcome evaluation | Paper trade results | Outcome comparison and metrics | Poor labeling of outcomes | Metrics compare predicted vs actual |
| Phase 8 | Statistical confidence and lifespan models | Historical outcomes | Calibration outputs and lifespan priors | Miscalibration | Offline evaluation improves predictability |
| Phase 9 | AI-assisted explanations | Evidence graph and templates | Better natural-language summaries | Hallucination risk | Explanations remain evidence-backed |
| Phase 10 | Controlled Debate Mode | Disagreement detection | Debate orchestration and fallbacks | Endless debate | Time-bounded debate terminates safely |
| Phase 11 | Model registry and calibration dashboard | Versioned artifacts | Registry records and admin controls | Governance drift | Versions can be approved and rolled back |
| Phase 12 | Strictly controlled live-execution eligibility | Execution handoff layer | Manual and auto eligibility contracts | Unsafe live activation | Live execution only when all gates pass |

---

## 38. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Stale data leading to false confidence | Strict freshness gates and decision expiry |
| AI hallucinating reasons | Evidence-only explanation generation |
| Group bias across agents | Independent initial voting and locked votes |
| Overly optimistic SQIS | Hard caps and critical vetoes |
| Excessive debate latency | Small rounds, strict timeouts, conservative fallbacks |
| Poor calibration | Offline evaluation, paper-trading validation, and versioned improvements |
| Unsafe capital sizing | Deterministic binding constraints with minimum-override logic |
| Cross-tenant leakage | Tenant-scoped evidence, storage, and broadcasts |
| Provider outages | Conservative fallback to WAIT or PAPER_TRADE_ONLY |
| Schema drift | Strict validation and versioned contracts |
| Audit failure | Append-only audit trails and immutable timeline events |

---

## 39. Next Recommended Architecture Module

**Module 7: Decision Handoff, Paper Trading, and Execution Eligibility Architecture**

Why this is next:
- The AI engine’s structured decision package needs a downstream consumer.
- Paper trading should be able to consume the same handoff contract as live execution later.
- The next layer should define how a committee decision becomes an execution-ready or paper-ready workflow without weakening the safety model.

