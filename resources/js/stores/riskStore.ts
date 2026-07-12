import { computed } from 'vue';
import { defineStore } from 'pinia';

import { opportunityDetail, riskLimits, riskMetrics, riskReports, riskSnapshotStats } from '@/data/mockData';

export const useRiskStore = defineStore('risk', () => {
    const metrics = computed(() => riskMetrics);
    const limits = computed(() => riskLimits);
    const reports = computed(() => riskReports);
    const snapshotStats = computed(() => riskSnapshotStats);
    const committeeVotes = computed(() => opportunityDetail.committeeVotes);

    const riskStatus = computed(() => {
        const riskyCount = metrics.value.filter((metric) => metric.severity === 'high' || metric.severity === 'critical').length;

        return riskyCount > 0 ? 'Attention required' : 'Low risk';
    });

    function refreshRiskOverview() {
        // TODO: replace with a Laravel-backed risk service later.
        return {
            metrics: metrics.value,
            limits: limits.value,
            reports: reports.value,
        };
    }

    return {
        metrics,
        limits,
        reports,
        snapshotStats,
        committeeVotes,
        riskStatus,
        refreshRiskOverview,
    };
});
