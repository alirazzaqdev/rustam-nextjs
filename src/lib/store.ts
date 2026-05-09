import { create } from 'zustand'

interface AppState {
  isDarkMode: boolean
  toggleDarkMode: () => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  isQuoteModalOpen: boolean
  setQuoteModalOpen: (open: boolean) => void
  productFilter: {
    category?: string
    priceRange?: [number, number]
  }
  setProductFilter: (filter: AppState['productFilter']) => void
}

export const useAppStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  isQuoteModalOpen: false,
  setQuoteModalOpen: (open) => set({ isQuoteModalOpen: open }),
  productFilter: {},
  setProductFilter: (filter) => set({ productFilter: filter }),
}))
