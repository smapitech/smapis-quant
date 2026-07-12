import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
    state: () => ({
        sidebarCollapsed: false,
        mobileNavOpen: false,
        commandPaletteOpen: false,
        activeModal: '' as string | '',
    }),
    getters: {
        sidebarWidth: (state) => (state.sidebarCollapsed ? 96 : 292),
    },
    actions: {
        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        },
        openMobileNav() {
            this.mobileNavOpen = true;
        },
        closeMobileNav() {
            this.mobileNavOpen = false;
        },
        toggleMobileNav() {
            this.mobileNavOpen = !this.mobileNavOpen;
        },
        openCommandPalette() {
            this.commandPaletteOpen = true;
        },
        closeCommandPalette() {
            this.commandPaletteOpen = false;
        },
        setActiveModal(name: string) {
            this.activeModal = name;
        },
    },
});
