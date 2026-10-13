import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  cartCreate,
  cartFetch,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
  type CartState,
} from "@/lib/shopify";

interface CartStore {
  cart: CartState | null;
  loading: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  sync: () => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: null,
      loading: false,
      open: false,
      setOpen: (open) => set({ open }),
      addItem: async (variantId, quantity = 1) => {
        set({ loading: true });
        try {
          const { cart } = get();
          const next = cart
            ? await cartLinesAdd(cart.id, variantId, quantity)
            : await cartCreate(variantId, quantity);
          set({ cart: next, open: true });
        } finally {
          set({ loading: false });
        }
      },
      updateQuantity: async (lineId, quantity) => {
        const { cart } = get();
        if (!cart) return;
        set({ loading: true });
        try {
          const next =
            quantity <= 0
              ? await cartLinesRemove(cart.id, lineId)
              : await cartLinesUpdate(cart.id, lineId, quantity);
          set({ cart: next });
        } finally {
          set({ loading: false });
        }
      },
      removeItem: async (lineId) => {
        const { cart } = get();
        if (!cart) return;
        set({ loading: true });
        try {
          set({ cart: await cartLinesRemove(cart.id, lineId) });
        } finally {
          set({ loading: false });
        }
      },
      sync: async () => {
        const { cart } = get();
        if (!cart) return;
        try {
          const fresh = await cartFetch(cart.id);
          set({ cart: fresh });
        } catch {
          /* keep local copy */
        }
      },
    }),
    { name: "foldit-cart", partialize: (s) => ({ cart: s.cart }) },
  ),
);
