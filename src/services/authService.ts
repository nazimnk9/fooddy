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
            throw new Error(`Login failed: ${response.statusText}`);
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
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Register service error:", error);
        throw error;
    }
};
