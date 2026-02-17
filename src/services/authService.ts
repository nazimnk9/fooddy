export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
    try {
        const response = await fetch(`${BASE_URL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(`Login failed: ${response.statusText}`);
            (error as any).data = errorData;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Login service error:", error);
        throw error;
    }
};

export const registerUser = async (data: RegisterData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(`Registration failed: ${response.statusText}`);
            (error as any).data = errorData;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Register service error:", error);
        throw error;
    }
};

export const getUserProfile = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/me/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const error = new Error(`Failed to fetch profile: ${response.statusText}`);
            (error as any).status = response.status;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Get user profile error:", error);
        throw error;
    }
};
export const updateUserProfile = async (token: string, data: { first_name: string; last_name: string; phone: string; password?: string }) => {
    try {
        const response = await fetch(`${BASE_URL}/me/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(`Update profile failed: ${response.statusText}`);
            (error as any).data = errorData;
            throw error;
        }

        return await response.json();
    } catch (error) {
        console.error("Update user profile error:", error);
        throw error;
    }
};

export const deleteUserProfile = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/me/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(`Delete account failed: ${response.statusText}`);
            (error as any).data = errorData;
            throw error;
        }

        return true;
    } catch (error) {
        console.error("Delete user profile error:", error);
        throw error;
    }
};

export const getUserOrders = async (token: string) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch orders: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Get user orders error:", error);
        throw error;
    }
};
