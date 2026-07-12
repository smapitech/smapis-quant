<template>
    <section class="space-y-6">
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <AppCard v-for="stat in riskSnapshotStats" :key="stat.label" class="space-y-2">
                <p class="text-xs uppercase tracking-[0.28em] text-slate-500">{{ stat.label }}</p>
                <p class="font-mono text-3xl font-semibold text-white">{{ stat.value }}</p>
                <p class="text-sm text-emerald-300">{{ stat.change }}</p>
                <p class="text-sm leading-6 text-slate-400">{{ stat.note }}</p>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Risk meters</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Guardrails for exposure and concentration</h2>
                    </div>
                    <StatusPill label="Attention" tone="amber" />
                </div>
                <div class="grid gap-4 sm:grid-cols-2">
                    <RiskMeter
                        v-for="metric in riskMetrics"
                        :key="metric.label"
                        :label="metric.label"
                        :value="metric.value"
                        :score="severityScore(metric.severity)"
                        :status="metric.severity"
                        :detail="metric.detail"
                    />
                </div>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Risk limits</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Desk limits and circuit breakers</h2>
                    </div>
                    <AppBadge tone="rose">Guarded</AppBadge>
                </div>
                <div class="space-y-3">
                    <div v-for="limit in riskLimits" :key="limit.label" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-4">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ limit.label }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ limit.note }}</p>
                            </div>
                            <StatusPill :label="limit.severity" :tone="severityTone(limit.severity)" />
                        </div>
                        <div class="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
                            <span>Current: <span class="font-mono text-white">{{ limit.current }}</span></span>
                            <span>Threshold: <span class="font-mono text-white">{{ limit.threshold }}</span></span>
                        </div>
                    </div>
                </div>
            </AppCard>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Risk reports</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Fast audit view for current setup health</h2>
                    </div>
                    <AppButton variant="secondary" size="sm">Refresh</AppButton>
                </div>
                <AppTable>
                    <thead>
                        <tr class="text-xs uppercase tracking-[0.28em] text-slate-500">
                            <th class="px-4 py-4 font-medium">Metric</th>
                            <th class="px-4 py-4 font-medium">Value</th>
                            <th class="px-4 py-4 font-medium">Status</th>
                            <th class="px-4 py-4 font-medium">Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="report in riskReports" :key="report.label" class="border-b border-white/6 last:border-b-0">
                            <td class="px-4 py-4 font-medium text-white">{{ report.label }}</td>
                            <td class="px-4 py-4 font-mono text-white">{{ report.value }}</td>
                            <td class="px-4 py-4">
                                <StatusPill :label="report.status" :tone="severityTone(report.status.toLowerCase())" />
                            </td>
                            <td class="px-4 py-4 text-slate-400">{{ report.detail }}</td>
                        </tr>
                    </tbody>
                </AppTable>
            </AppCard>

            <AppCard class="space-y-4">
                <div class="flex items-center justify-between gap-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Committee notes</p>
                        <h2 class="mt-2 text-xl font-semibold text-white">Risk committee vote snapshot</h2>
                    </div>
                    <AppBadge tone="teal">{{ opportunityDetail.committeeVotes.length }} agents</AppBadge>
                </div>
                <div class="space-y-3">
                    <div v-for="vote in opportunityDetail.committeeVotes" :key="vote.agent" class="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <p class="text-sm font-semibold text-white">{{ vote.agent }}</p>
                                <p class="mt-1 text-sm text-slate-400">{{ vote.reason }}</p>
                            </div>
                            <StatusPill :label="vote.vote" :tone="voteTone(vote.vote)" />
                        </div>
                        <div class="mt-3 flex flex-wrap gap-2">
                            <AppBadge v-for="flag in vote.riskFlags" :key="flag" tone="slate">{{ flag }}</AppBadge>
                        </div>
                    </div>
                </div>
            </AppCard>
        </div>
    </section>
</template>

<script setup lang="ts">
import AppBadge from '@/components/ui/AppBadge.vue';
import AppButton from '@/components/ui/AppButton.vue';
import AppCard from '@/components/ui/AppCard.vue';
import AppTable from '@/components/ui/AppTable.vue';
import RiskMeter from '@/components/trading/RiskMeter.vue';
import StatusPill from '@/components/ui/StatusPill.vue';
import { opportunityDetail, riskLimits, riskMetrics, riskReports, riskSnapshotStats } from '@/data/mockData';

function severityScore(severity: string) {
    switch (severity) {
        case 'low':
            return 24;
        case 'medium':
            return 58;
        case 'high':
            return 82;
        case 'critical':
            return 96;
        default:
            return 40;
    }
}

function severityTone(severity: string) {
    switch (severity) {
        case 'low':
            return 'emerald';
        case 'medium':
            return 'amber';
        case 'high':
        case 'critical':
            return 'rose';
        default:
            return 'slate';
    }
}

function voteTone(vote: string) {
    if (vote === 'Approve') {
        return 'emerald';
    }

    if (vote === 'Conditional') {
        return 'amber';
    }

    if (vote === 'Wait') {
        return 'slate';
    }

    return 'rose';
}
</script>
