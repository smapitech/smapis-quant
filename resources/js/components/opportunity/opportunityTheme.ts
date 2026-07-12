import type { DashboardTone } from '@/types';

export function opportunityToneForVote(vote: string): DashboardTone {
    const normalized = vote.toLowerCase();

    if (normalized.includes('approve')) {
        return 'emerald';
    }

    if (normalized.includes('conditional')) {
        return 'amber';
    }

    if (normalized.includes('wait')) {
        return 'slate';
    }

    if (normalized.includes('reduce position')) {
        return 'teal';
    }

    if (normalized.includes('reject')) {
        return 'rose';
    }

    return 'slate';
}

export function opportunityToneForStatus(status: string): DashboardTone {
    if (status.toLowerCase().includes('live')) {
        return 'emerald';
    }

    if (status.toLowerCase().includes('low')) {
        return 'emerald';
    }

    if (status.toLowerCase().includes('medium') || status.toLowerCase().includes('conditional')) {
        return 'amber';
    }

    if (status.toLowerCase().includes('reject') || status.toLowerCase().includes('high')) {
        return 'rose';
    }

    return 'teal';
}

export function opportunityToneForRisk(value: string): DashboardTone {
    const normalized = value.toLowerCase();

    if (normalized.includes('low') || normalized === 'stable' || normalized === 'healthy' || normalized === 'normal') {
        return 'emerald';
    }

    if (normalized.includes('high') || normalized.includes('critical')) {
        return 'rose';
    }

    if (normalized.includes('medium') || normalized.includes('watch') || normalized.includes('conditional')) {
        return 'amber';
    }

    return 'teal';
}

export function opportunityToneForConfidence(value: number): DashboardTone {
    if (value >= 95) {
        return 'emerald';
    }

    if (value >= 85) {
        return 'teal';
    }

    if (value >= 70) {
        return 'amber';
    }

    return 'rose';
}
