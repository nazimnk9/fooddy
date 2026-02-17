"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCookie, deleteCookie } from "@/utils/cookieUtils";
import { getCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, updateCartItem as apiUpdateCartItem, CartItem } from "@/services/cartService";
import { Product } from "@/services/menuService";

// Define LocalCartItem to match the structure needed for UI
export interface LocalCartItem {
    id: number; // For local items, we use product ID as the reference ID
    product: Product;
    quantity: number;
    total_price: string;
    isLocal?: boolean;
}

// Unified Cart Item type for UI
export type UICartItem = CartItem | LocalCartItem;

interface CartContextType {
    cartItems: UICartItem[];
    addToCart: (product: Product, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: number, quantity: number) => Promise<void>;
    updateMultipleQuantities: (updates: { itemId: number, quantity: number }[]) => Promise<void>;
    removeFromCart: (itemId: number) => Promise<void>;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    isLoading: boolean;
    cartCount: number;
    isLoggedIn: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("");
    }
    return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<UICartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Initial load and sync logic
    useEffect(() => {
        const token = getCookie("access_token");
        const hasToken = !!token;
        setIsLoggedIn(hasToken);

        const loadCart = async () => {
            setIsLoading(true);
            if (hasToken) {
                // User is logged in
                try {
                    // Check for local items to sync first
                    const localCartJson = localStorage.getItem("fooddy_cart");
                    if (localCartJson) {
                        const localCart: LocalCartItem[] = JSON.parse(localCartJson);
                        if (localCart.length > 0) {
                            // Sync each item
                            for (const item of localCart) {
                                try {
                                    // According to user requirement: "post product data ... from local storage"
                                    await apiAddToCart(item.product.id, item.quantity);
                                } catch (error) {
                                    console.error("Failed to sync item:", item.product.title, error);
                                }
                            }
                            // Clear local storage after sync attempt as requested
                            localStorage.removeItem("fooddy_cart");
                        }
                    }

                    // Fetch fresh cart from API to show updated data
                    const apiCart = await getCart();
                    setCartItems(apiCart.results);

                } catch (error: any) {
                    console.error("Error loading cart from API:", error);
                    if (error.status === 401 || error.status === 403) {
                        deleteCookie("access_token");
                        deleteCookie("refresh_token");
                        window.location.href = "/";
                    }
                }
            } else {
                // Guest user: load from local storage
                const localCartJson = localStorage.getItem("fooddy_cart");
                if (localCartJson) {
                    setCartItems(JSON.parse(localCartJson));
                } else {
                    setCartItems([]);
                }
            }
            setIsLoading(false);
        };

        loadCart();
    }, []);

    const updateQuantity = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setIsLoading(true);
        try {
            // Hit the PATCH API for both logged-in and guest users
            const updatedItem = await apiUpdateCartItem(itemId, newQuantity);

            if (isLoggedIn) {
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } else {
                // Guest: Update local storage with the API response
                const currentCart = [...cartItems] as CartItem[];
                const itemIndex = currentCart.findIndex(item => item.id === itemId);
                if (itemIndex > -1) {
                    currentCart[itemIndex] = updatedItem;
                    setCartItems(currentCart);
                    localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
                }
            }
        } catch (error) {
            console.error("Failed to update cart item:", error);
        }
        setIsLoading(false);
    };

    const updateMultipleQuantities = async (updates: { itemId: number, quantity: number }[]) => {
        if (updates.length === 0) return;

        setIsLoading(true);
        try {
            // Hit the PATCH API for each update (works for both states)
            const responses = await Promise.all(updates.map(u => apiUpdateCartItem(u.itemId, u.quantity)));

            if (isLoggedIn) {
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } else {
                // Guest: Update local storage
                const currentCart = [...cartItems] as CartItem[];
                responses.forEach(updatedItem => {
                    const itemIndex = currentCart.findIndex(item => item.id === updatedItem.id);
                    if (itemIndex > -1) {
                        currentCart[itemIndex] = updatedItem;
                    }
                });
                setCartItems(currentCart);
                localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
            }
        } catch (error) {
            console.error("Failed to update multiple quantities:", error);
        }
        setIsLoading(false);
    };

    const addToCart = async (product: Product, quantity: number = 1) => {
        setIsLoading(true);
        try {
            // Check if item exists for guest to decide between POST and PATCH
            const existingItem = !isLoggedIn ? cartItems.find(item => item.product.id === product.id) : null;
            let responseItem: CartItem;

            if (existingItem) {
                // Guest item exists, update via PATCH as requested
                responseItem = await apiUpdateCartItem(existingItem.id, existingItem.quantity + quantity);
            } else {
                // New item (Logged in or Guest brand new), update via POST
                responseItem = await apiAddToCart(product.id, quantity);
            }

            if (isLoggedIn) {
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } else {
                // Guest: Update local storage with full API response
                const currentCart = [...cartItems] as CartItem[];
                if (existingItem) {
                    const idx = currentCart.findIndex(i => i.id === existingItem.id);
                    currentCart[idx] = responseItem;
                } else {
                    currentCart.push(responseItem);
                }
                setCartItems(currentCart);
                localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
            }
            setIsCartOpen(true);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
        setIsLoading(false);
    };

    const removeFromCart = async (itemId: number) => {
        setIsLoading(true);
        try {
            // Hit the DELETE API for both states
            await apiRemoveFromCart(itemId);

            if (isLoggedIn) {
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } else {
                // Guest: update local storage
                const currentCart = cartItems.filter(item => item.id !== itemId);
                setCartItems(currentCart);
                localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
            }
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
        setIsLoading(false);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Calculate unique product count
    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            updateMultipleQuantities,
            removeFromCart,
            isCartOpen,
            openCart,
            closeCart,
            isLoading,
            cartCount,
            isLoggedIn
        }}>
            {children}
        </CartContext.Provider>
    );
};
