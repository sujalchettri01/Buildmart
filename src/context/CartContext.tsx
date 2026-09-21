import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../types";

import { getLineTotal } from "../utils/pricing";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];

  addToCart: (
    product: Product,
    quantity?: number
  ) => void;

  removeFromCart: (
    productId: number
  ) => void;

  updateQuantity: (
    productId: number,
    quantity: number
  ) => void;

  clearCart: () => void;

  cartCount: number;

  cartTotal: number;
}

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] =
    useState<CartItem[]>(() => {
      const savedCart =
        localStorage.getItem(
          "buildmart-cart"
        );

      if (!savedCart) {
        return [];
      }

      try {
        return JSON.parse(savedCart);
      } catch {
        return [];
      }
    });

  /*
  =========================================================
  SAVE CART
  =========================================================
  */

  useEffect(() => {
    localStorage.setItem(
      "buildmart-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  /*
  =========================================================
  ADD TO CART
  =========================================================
  */

  const addToCart = (
    product: Product,
    quantity: number = 1
  ) => {
    const safeQuantity = Math.max(
      1,
      Math.floor(quantity)
    );

    setCartItems(
      (currentItems) => {
        const existingItem =
          currentItems.find(
            (item) =>
              item.product.id ===
              product.id
          );

        if (existingItem) {
          return currentItems.map(
            (item) =>
              item.product.id ===
              product.id
                ? {
                    ...item,

                    /*
                    IMPORTANT:

                    If 30 are already in the
                    cart and another 70 are
                    added, quantity becomes
                    100.

                    Pricing will therefore
                    automatically move to
                    the 100-unit tier.
                    */

                    quantity:
                      item.quantity +
                      safeQuantity,
                  }
                : item
          );
        }

        return [
          ...currentItems,

          {
            product,
            quantity: safeQuantity,
          },
        ];
      }
    );
  };

  /*
  =========================================================
  REMOVE
  =========================================================
  */

  const removeFromCart = (
    productId: number
  ) => {
    setCartItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            item.product.id !==
            productId
        )
    );
  };

  /*
  =========================================================
  UPDATE QUANTITY
  =========================================================
  */

  const updateQuantity = (
    productId: number,
    quantity: number
  ) => {
    const safeQuantity =
      Math.floor(quantity);

    if (safeQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(
      (currentItems) =>
        currentItems.map(
          (item) =>
            item.product.id ===
            productId
              ? {
                  ...item,
                  quantity:
                    safeQuantity,
                }
              : item
        )
    );
  };

  /*
  =========================================================
  CLEAR CART
  =========================================================
  */

  const clearCart = () => {
    setCartItems([]);
  };

  /*
  =========================================================
  CART COUNT
  =========================================================
  */

  const cartCount =
    cartItems.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );

  /*
  =========================================================
  CART TOTAL

  Uses LIVE BULK PRICING.
  =========================================================
  */

  const cartTotal =
    cartItems.reduce(
      (total, item) =>
        total +
        getLineTotal(
          item.product,
          item.quantity
        ),
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,

        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}