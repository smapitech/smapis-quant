import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const pages = import.meta.glob('../pages/**/*.vue');

function page(path: string) {
    const loader = pages[path];

    if (!loader) {
        throw new Error(`Missing page module: ${path}`);
    }

    return loader as () => Promise<unknown>;
}

function appRoute(path: string, name: string, componentPath: string, title: string, description: string, eyebrow?: string): RouteRecordRaw {
    return {
        path,
        name,
        component: page(componentPath),
        meta: {
            layout: 'app',
            title,
            description,
            eyebrow,
        },
    };
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'landing',
            component: page('../pages/public/LandingPage.vue'),
            meta: {
                layout: 'public',
                title: 'Landing',
                description: 'A foundation shell for the Smapis Quant AI platform.',
            },
        },
        {
            path: '/pricing',
            name: 'pricing',
            component: page('../pages/public/PricingPage.vue'),
            meta: {
                layout: 'public',
                title: 'Pricing',
                description: 'Preview the product tiers and workspace plans.',
            },
        },
        {
            path: '/login',
            name: 'login',
            component: page('../pages/auth/LoginPage.vue'),
            meta: {
                layout: 'auth',
                title: 'Login',
                description: 'Sign in to the Smapis Quant OS workspace.',
            },
        },
        {
            path: '/register',
            name: 'register',
            component: page('../pages/auth/RegisterPage.vue'),
            meta: {
                layout: 'auth',
                title: 'Register',
                description: 'Create a new workspace for trading intelligence.',
            },
        },
        {
            path: '/privacy-policy',
            name: 'privacy-policy',
            component: page('../pages/shared/FeatureStubPage.vue'),
            meta: {
                layout: 'public',
                title: 'Privacy Policy',
                description: 'How Smapis Quant AI handles data, access, and audit records.',
            },
        },
        {
            path: '/terms-of-service',
            name: 'terms-of-service',
            component: page('../pages/shared/FeatureStubPage.vue'),
            meta: {
                layout: 'public',
                title: 'Terms of Service',
                description: 'Platform terms, trading intelligence usage, and responsibilities.',
            },
        },
        {
            path: '/help-center',
            name: 'help-center',
            component: page('../pages/shared/FeatureStubPage.vue'),
            meta: {
                layout: 'public',
                title: 'Help Center',
                description: 'Operational notes, onboarding guidance, and support references.',
            },
        },
        appRoute('/dashboard', 'dashboard', '../pages/dashboard/DashboardPage.vue', 'Dashboard', 'Account pulse, market intelligence, and execution health.', 'Workspace overview'),
        appRoute('/scanner', 'scanner', '../pages/scanner/LiveScannerPage.vue', 'Live Arbitrage Scanner', 'Real-time arbitrage and opportunity discovery.', 'Market discovery'),
        appRoute('/opportunities', 'opportunities', '../pages/scanner/OpportunitiesPage.vue', 'Opportunities', 'Ranked trade ideas, filters, and queueable signals.', 'Opportunity shelf'),
        appRoute('/opportunities/:id', 'opportunity-detail', '../pages/scanner/OpportunityDetailPage.vue', 'Opportunity Detail', 'Inspect one trade from thesis to execution.', 'Trade review'),
        appRoute('/ai-center', 'ai-center', '../pages/ai/AICenterPage.vue', 'AI Center', 'Monitor the AI committee, models, and reasoning.', 'Model workspace'),
        appRoute('/risk-center', 'risk-center', '../pages/risk/RiskCenterPage.vue', 'Risk Center', 'Review exposure, limits, and guardrails.', 'Guardrails'),
        appRoute('/paper-trading', 'paper-trading', '../pages/paper/PaperTradingPage.vue', 'Paper Trading', 'Track demo trades and rehearsal performance.', 'Simulation lane'),
        appRoute('/exchange-manager', 'exchange-manager', '../pages/exchanges/ExchangeManagerPage.vue', 'Exchange Manager', 'Manage API venues and connection health.', 'Connectivity'),
        appRoute('/portfolio', 'portfolio', '../pages/portfolio/PortfolioPage.vue', 'Portfolio', 'Analyze exposure, allocation, and holdings.', 'Allocation'),
        appRoute('/analytics', 'analytics', '../pages/analytics/AnalyticsPage.vue', 'Analytics', 'Performance, attribution, and trend review.', 'Performance'),
        appRoute('/settings', 'settings', '../pages/settings/SettingsPage.vue', 'Settings', 'Workspace defaults, alerts, and preferences.', 'Configuration'),
        appRoute('/auto-trading', 'auto-trading', '../pages/shared/FeatureStubPage.vue', 'Auto Trading', 'Automation controls and deployment settings.', 'Automation'),
        appRoute('/wallets', 'wallets', '../pages/shared/FeatureStubPage.vue', 'Wallets', 'Asset custody and balance monitoring.', 'Treasury'),
        appRoute('/strategies', 'strategies', '../pages/shared/FeatureStubPage.vue', 'Strategies', 'Strategy marketplace and registry placeholders.', 'Playbooks'),
        appRoute('/alerts', 'alerts', '../pages/shared/FeatureStubPage.vue', 'Alerts', 'Notification routing and escalation rules.', 'Notifications'),
        appRoute('/academy', 'academy', '../pages/shared/FeatureStubPage.vue', 'Academy', 'Training, playbooks, and onboarding content.', 'Learning'),
        appRoute('/billing', 'billing', '../pages/shared/FeatureStubPage.vue', 'Billing', 'Plan usage and subscription management.', 'Account'),
        {
            path: '/:pathMatch(.*)*',
            redirect: '/',
        },
    ],
    scrollBehavior(to, _from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }

        if (to.hash) {
            return {
                el: to.hash,
                top: 96,
                behavior: 'smooth',
            };
        }

        return { top: 0 };
    },
});

export default router;
