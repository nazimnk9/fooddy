import { BASE_URL } from "./authService";
import { getCookie } from "@/utils/cookieUtils";

export interface CheckoutPayload {
    address_id: number;
    payment_type: "online" | "cod";
    cart_item_ids?: number[];
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

export interface CheckoutResponse {
    checkout_url?: string;
}

const getHeaders = () => {
    const token = getCookie("access_token");
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
};

const handleResponseError = async (response: Response, defaultMessage: string) => {
    let errorMessage = defaultMessage;
    try {
        const data = await response.json();
        if (data.detail) {
            errorMessage = data.detail;
        } else if (Array.isArray(data) && data.length > 0) {
            errorMessage = data[0];
        }
    } catch (e) {
        // Fallback if JSON parsing fails
    }
    const error = new Error(errorMessage);
    (error as any).status = response.status;
    throw error;
};

export const checkoutOnline = async (payload: CheckoutPayload): Promise<CheckoutResponse> => {
    const response = await fetch(`${BASE_URL}/payment/checkout/`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        await handleResponseError(response, "Failed to initiate online checkout");
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
        await handleResponseError(response, "Failed to place COD order");
    }

    return response.json();
};
