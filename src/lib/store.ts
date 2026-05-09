import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  image?: string
  slug: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface UIState {
  isQuoteModalOpen: boolean
  setQuoteModalOpen: (open: boolean) => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  productFilter: { category?: string; priceRange?: [number, number] }
  setProductFilter: (filter: UIState['productFilter']) => void
}

// Cart store — persisted to localStorage
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            }
          }
          return { items: [...state.items, { ...item, quantity: 1 }] }
        })
      },

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, qty) => {
        if (qty < 1) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'rustam-cart',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? localStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
)

// UI store — not persisted
export const useAppStore = create<UIState>()((set) => ({
  isQuoteModalOpen: false,
  setQuoteModalOpen: (open) => set({ isQuoteModalOpen: open }),
  isMobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  productFilter: {},
  setProductFilter: (filter) => set({ productFilter: filter }),
}))
