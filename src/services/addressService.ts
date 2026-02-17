import { BASE_URL } from "./authService";
import { getCookie } from "@/utils/cookieUtils";

export interface Address {
    id: number;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    user: number;
}

export interface CreateAddressData {
    street: string;
    city: string;
    state: string;
    zip_code: string;
}

export const getAddresses = async () => {
    const token = getCookie("access_token");
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${BASE_URL}/orders/address/`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch addresses: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results || [];
};

export const createAddress = async (addressData: CreateAddressData) => {
    const token = getCookie("access_token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/orders/address/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create address: ${response.statusText}`);
    }

    return await response.json();
};

export const updateAddress = async (id: number, addressData: Partial<CreateAddressData>) => {
    const token = getCookie("access_token");
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${BASE_URL}/orders/address/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        throw new Error(`Failed to update address: ${response.statusText}`);
    }

    return await response.json();
};

export const deleteAddress = async (id: number) => {
    const token = getCookie("access_token");
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${BASE_URL}/orders/address/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to delete address: ${response.statusText}`);
    }

    return true;
};
