export type ExchangeStatus = 'connected' | 'syncing' | 'limited' | 'offline';
export type ExchangeVenueType = 'spot' | 'perpetuals' | 'wallet' | 'cex' | 'dex';

export interface ExchangeConnection {
    id: string;
    name: string;
    venue: string;
    type: ExchangeVenueType;
    status: ExchangeStatus;
    region: string;
    latency: string;
    latencyMs: number;
    markets: number;
    feeTier: string;
    apiHealth: number;
    balance: string;
    note: string;
}

export interface WalletBalance {
    id: string;
    asset: string;
    chain: string;
    available: string;
    locked: string;
    valueUsd: string;
    status: 'healthy' | 'watch' | 'frozen';
}
