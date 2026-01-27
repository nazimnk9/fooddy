import { BASE_URL } from "./authService";
import { getCookie } from "@/utils/cookieUtils";

export interface CheckoutPayload {
    address_id: number;
    payment_type: "online" | "cod";
}

export interface CheckoutResponse {
    checkout_url?: string;
}

const getHeaders = () => {
    const token = getCookie("access_token");
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };
};

export const checkoutOnline = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    const response = await fetch(`${BASE_URL}/payment/checkout/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to initiate online checkout");
    }

    return response.json();
};

export const placeOrderCOD = async (payload: CheckoutPayload) => {
    const response = await fetch(`${BASE_URL}/orders/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Failed to place COD order");
    }

    return response.json();
};
