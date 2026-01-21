export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Category {
    id: number;
    title: string;
    image: string | null;
}

export interface CategoryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Category[];
}


export interface ProductImage {
    id: number;
    image: string;
}

export interface ProductTag {
    id: number;
    title: string;
}

export interface Product {
    id: number;
    category: Category[];
    images: ProductImage[];
    tags: ProductTag[];
    title: string;
    price: string;
    description: string;
    is_popular: boolean;
}

export interface ProductResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Product[];
}

export interface Tag {
    id: number;
    title: string;
}

export interface TagResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Tag[];
}


export const getCategories = async (): Promise<CategoryResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/menu/category/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        throw error;
    }
};

export const getProducts = async (queryParams?: string): Promise<ProductResponse> => {
    try {
        const url = `${BASE_URL}/menu/products/${queryParams ? `?${queryParams}` : ''}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching products: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw error;
    }
};

export const getTags = async (): Promise<TagResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/menu/tags/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching tags: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch tags:", error);
        throw error;
    }
};
