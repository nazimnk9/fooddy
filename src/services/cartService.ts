
import { BASE_URL } from "./menuService";
import { getCookie } from "@/utils/cookieUtils";

export interface CartItem {
    id: number;
    user: number;
    product: {
        id: number;
        title: string;
        price: string;
        images: { id: number; image: string }[];
        category: { id: number; title: string; image: string | null }[];
        tags: { id: number; title: string }[];
        description: string;
        is_popular: boolean;
    };
    quantity: number;
    total_price: string;
    created_at?: string;
    updated_at?: string;
}

export interface CartResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CartItem[];
}

const getHeaders = () => {
    const token = getCookie("access_token");
    return {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
    };
};

export const getCart = async (): Promise<CartResponse> => {
    const response = await fetch(`${BASE_URL}/orders/cart/`, {
        method: "GET",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch cart");
    }

    return response.json();
};

export const addToCart = async (productId: number, quantity: number) => {
    const response = await fetch(`${BASE_URL}/orders/cart/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ product_id: productId, quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to add to cart");
    }

    return response.json();
};

export const updateCartItem = async (cartItemId: number, quantity: number) => {
    const response = await fetch(`${BASE_URL}/orders/cart/${cartItemId}`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) {
        throw new Error("Failed to update cart item");
    }

    return response.json();
};

export const removeFromCart = async (cartItemId: number) => {
    const response = await fetch(`${BASE_URL}/orders/cart/${cartItemId}`, {
        method: "DELETE",
        headers: getHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to remove from cart");
    }
    return true;
};
