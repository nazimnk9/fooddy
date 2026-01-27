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
    if (!token) throw new Error("No access token found");

    const response = await fetch(`${BASE_URL}/orders/address/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(addressData),
    });

    if (!response.ok) {
        throw new Error(`Failed to create address: ${response.statusText}`);
    }

    return await response.json();
};
