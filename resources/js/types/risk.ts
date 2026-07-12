export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface RiskMetric {
    label: string;
    value: string;
    detail: string;
    severity: RiskLevel;
    limit?: string;
}

export interface RiskLimit {
    label: string;
    current: string;
    threshold: string;
    severity: RiskLevel;
    note: string;
}

export interface RiskReportItem {
    label: string;
    value: string;
    status: string;
    detail: string;
}

export interface RiskCommitteeVote {
    agent: string;
    vote: 'Approve' | 'Conditional' | 'Wait' | 'Reject';
    confidence: number;
    reason: string;
    riskFlags: string[];
}
