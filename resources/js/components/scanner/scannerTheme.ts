import type { ScannerRiskLevel, ScannerTone } from '@/types';

const toneClasses: Record<ScannerTone, string> = {
    teal: 'border-teal-400/15 bg-teal-400/[0.08] text-teal-100 ring-teal-400/15',
    emerald: 'border-emerald-400/15 bg-emerald-400/[0.08] text-emerald-100 ring-emerald-400/15',
    amber: 'border-amber-400/15 bg-amber-400/[0.08] text-amber-100 ring-amber-400/15',
    rose: 'border-rose-400/15 bg-rose-400/[0.08] text-rose-100 ring-rose-400/15',
    slate: 'border-white/10 bg-white/[0.05] text-slate-100 ring-white/10',
};

export function scannerToneClasses(tone: ScannerTone) {
    return toneClasses[tone];
}

export function scannerSolidToneClasses(tone: ScannerTone) {
    const map: Record<ScannerTone, string> = {
        teal: 'bg-teal-400 text-slate-950',
        emerald: 'bg-emerald-400 text-slate-950',
        amber: 'bg-amber-400 text-slate-950',
        rose: 'bg-rose-400 text-slate-950',
        slate: 'bg-slate-600 text-white',
    };

    return map[tone];
}

export function scannerRiskTone(risk: ScannerRiskLevel): ScannerTone {
    if (risk === 'Critical' || risk === 'High') {
        return 'rose';
    }

    if (risk === 'Medium') {
        return 'amber';
    }

    return 'emerald';
}

export function scannerSignalTone(score: number): ScannerTone {
    if (score >= 90) {
        return 'emerald';
    }

    if (score >= 80) {
        return 'teal';
    }

    if (score >= 70) {
        return 'amber';
    }

    return 'rose';
}

export function scannerBadgeToneFromText(value: string): ScannerTone {
    const normalized = value.toLowerCase();

    if (normalized.includes('low') || normalized.includes('stable') || normalized.includes('pass') || normalized.includes('open')) {
        return 'emerald';
    }

    if (normalized.includes('medium') || normalized.includes('watch') || normalized.includes('conditional')) {
        return 'amber';
    }

    if (normalized.includes('high') || normalized.includes('reject') || normalized.includes('failed')) {
        return 'rose';
    }

    if (normalized.includes('execute') || normalized.includes('approve')) {
        return 'teal';
    }

    return 'slate';
}

export function scannerStatusTone(value: string): ScannerTone {
    const normalized = value.toLowerCase();

    if (normalized.includes('live') || normalized.includes('complete') || normalized.includes('paper')) {
        return 'emerald';
    }

    if (normalized.includes('queued') || normalized.includes('watch') || normalized.includes('paused')) {
        return 'amber';
    }

    if (normalized.includes('fail') || normalized.includes('cancel') || normalized.includes('reject')) {
        return 'rose';
    }

    if (normalized.includes('stable') || normalized.includes('healthy')) {
        return 'teal';
    }

    return 'slate';
}

export function scannerValueColor(value: number) {
    if (value >= 90) {
        return 'text-emerald-300';
    }

    if (value >= 80) {
        return 'text-teal-200';
    }

    if (value >= 70) {
        return 'text-amber-200';
    }

    return 'text-rose-200';
}
