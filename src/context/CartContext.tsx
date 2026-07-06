"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartView } from "@/types";

const emptyCart: CartView = { id: "", items: [], subtotal: 0 };

type CartContextValue = {
  cart: CartView;
  isLoading: boolean;
  itemCount: number;
  addItem: (productId: string, quantity?: number, color?: string | null) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refresh: () => Promise<void>;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartView>(emptyCart);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/cart");
    if (res.ok) {
      setCart(await res.json());
    }
  }, []);

  useEffect(() => {
    async function loadInitialCart() {
      await refresh();
      setIsLoading(false);
    }
    loadInitialCart();
  }, [refresh]);

  const addItem = useCallback(
    async (productId: string, quantity = 1, color: string | null = null) => {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity, color }),
      });
      if (res.ok) {
        setCart(await res.json());
      }
    },
    []
  );

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    const res = await fetch(`/api/cart/${itemId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
      setCart(await res.json());
    }
  }, []);

  const removeItem = useCallback(async (itemId: string) => {
    const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
    if (res.ok) {
      setCart(await res.json());
    }
  }, []);

  const clearCart = useCallback(async () => {
    await Promise.all(cart.items.map((item) => fetch(`/api/cart/${item.id}`, { method: "DELETE" })));
    await refresh();
  }, [cart.items, refresh]);

  const itemCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.quantity, 0),
    [cart.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({ cart, isLoading, itemCount, addItem, updateQuantity, removeItem, clearCart, refresh }),
    [cart, isLoading, itemCount, addItem, updateQuantity, removeItem, clearCart, refresh]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
