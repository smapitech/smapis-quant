/// <reference types="vite/client" />

import type { LayoutName } from '@/types';

interface AppState {
    old?: Record<string, string>;
    errors?: Record<string, string[]>;
    user?: {
        name: string;
        email: string;
        account_type?: string | null;
        country?: string | null;
    } | null;
}

declare global {
    interface Window {
        __APP_STATE__?: AppState;
    }
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
    export default component;
}

declare module 'vue-router' {
    interface RouteMeta {
        layout?: LayoutName;
        title?: string;
        description?: string;
        eyebrow?: string;
    }
}
