"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCookie } from "@/utils/cookieUtils";
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

                } catch (error) {
                    console.error("Error loading cart from API:", error);
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
        if (newQuantity < 1) return; // Prevent quantity less than 1 (or implement remove if 0, but usually separate)

        setIsLoading(true);
        if (isLoggedIn) {
            try {
                // User requirement: "patch data in patch api ... then show updated data"
                await apiUpdateCartItem(itemId, newQuantity);
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } catch (error) {
                console.error("Failed to update cart item (API):", error);
            }
        } else {
            // Local Storage Logic
            const currentCart = [...cartItems] as LocalCartItem[];
            // For local, itemId IS the product id
            const itemIndex = currentCart.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                currentCart[itemIndex].quantity = newQuantity;
                const price = parseFloat(currentCart[itemIndex].product.price);
                currentCart[itemIndex].total_price = (price * newQuantity).toFixed(2);
                setCartItems(currentCart);
                localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
            }
        }
        setIsLoading(false);
    };

    const updateMultipleQuantities = async (updates: { itemId: number, quantity: number }[]) => {
        if (updates.length === 0) return;

        setIsLoading(true);
        if (isLoggedIn) {
            try {
                // User requirement: "patch data in patch api ... then show updated data"
                // We perform individual patches and then one refetch for efficiency
                await Promise.all(updates.map(u => apiUpdateCartItem(u.itemId, u.quantity)));
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } catch (error) {
                console.error("Failed to update multiple quantities (API):", error);
            }
        } else {
            // Local Storage Logic
            const currentCart = [...cartItems] as LocalCartItem[];
            updates.forEach(update => {
                const itemIndex = currentCart.findIndex(item => item.id === update.itemId);
                if (itemIndex > -1) {
                    currentCart[itemIndex].quantity = update.quantity;
                    const price = parseFloat(currentCart[itemIndex].product.price);
                    currentCart[itemIndex].total_price = (price * update.quantity).toFixed(2);
                }
            });
            setCartItems(currentCart);
            localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
        }
        setIsLoading(false);
    };

    const addToCart = async (product: Product, quantity: number = 1) => {
        setIsLoading(true);
        if (isLoggedIn) {
            try {
                // User requirement: "product data post in post api ... then show updated data show from get api"
                await apiAddToCart(product.id, quantity);
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
                setIsCartOpen(true);
            } catch (error) {
                console.error("Failed to add to cart (API):", error);
            }
        } else {
            // Local Storage Logic
            const currentCart = [...cartItems] as LocalCartItem[];
            const existingItemIndex = currentCart.findIndex(item => item.product.id === product.id);

            if (existingItemIndex > -1) {
                // Update quantity
                currentCart[existingItemIndex].quantity += quantity;
                // Update total price 
                const price = parseFloat(product.price);
                currentCart[existingItemIndex].total_price = (price * currentCart[existingItemIndex].quantity).toFixed(2);
            } else {
                // Add new item
                const newItem: LocalCartItem = {
                    id: product.id,
                    product: product,
                    quantity: quantity,
                    total_price: (parseFloat(product.price) * quantity).toFixed(2),
                    isLocal: true
                };
                currentCart.push(newItem);
            }

            setCartItems(currentCart);
            localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
            setIsCartOpen(true);
        }
        setIsLoading(false);
    };

    const removeFromCart = async (itemId: number) => {
        setIsLoading(true);
        if (isLoggedIn) {
            try {
                await apiRemoveFromCart(itemId);
                const updatedCart = await getCart();
                setCartItems(updatedCart.results);
            } catch (error) {
                console.error("Failed to remove from cart (API):", error);
            }
        } else {
            // Local Storage Logic
            // For local items, id is the product id
            const currentCart = cartItems.filter(item => item.id !== itemId);
            setCartItems(currentCart);
            localStorage.setItem("fooddy_cart", JSON.stringify(currentCart));
        }
        setIsLoading(false);
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Calculate total count
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
