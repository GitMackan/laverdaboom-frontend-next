
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  slug: string;
  variantLabel: string;
  imageKey: string | null;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  hydrated: boolean;
  setHydrated: (hydrated: boolean) => void;
  addItem: (item: CartItem, maxQuantity: number) => void;
  updateQuantity: (
    variantId: string,
    quantity: number
  ) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
};


const migrateLegacyCart = () => {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("laverdaboom-cart");
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored);

    if (Array.isArray(parsed)) {
      localStorage.setItem(
        "laverdaboom-cart",
        JSON.stringify({
          state: { items: parsed },
          version: 0,
        })
      );
    }
  } catch {
    // Låt Zustand hantera ogiltig lagring.
  }
};

migrateLegacyCart();


export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      hydrated: false,

      setHydrated: (hydrated) => set({ hydrated }),

      addItem: (item, maxQuantity) =>
        set((state) => {
          const existing = state.items.find(
            (cartItem) => cartItem.variantId === item.variantId
          );

          if (existing) {
            return {
              items: state.items.map((cartItem) =>
                cartItem.variantId === item.variantId
                  ? {
                      ...cartItem,
                      quantity: Math.min(
                        existing.quantity + item.quantity,
                        maxQuantity
                      ),
                    }
                  : cartItem
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: Math.min(item.quantity, maxQuantity),
              },
            ],
          };
        }),

      updateQuantity: (variantId, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: Math.max(
                    1,
                    Math.min(99, quantity)
                  ),
                }
              : item
          ),
        })),

      removeItem: (variantId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.variantId !== variantId
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "laverdaboom-cart",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        items: state.items,
      }),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
