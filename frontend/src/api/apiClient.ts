const API_URL = import.meta.env.VITE_API_URL || '';

const getHeaders = () => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

export const apiClient = {
    async get(endpoint: string) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            headers: getHeaders(),
        });
        if (!res.ok) {
            if (res.status === 401) localStorage.removeItem('token');
            throw new Error('API Error');
        }
        return res.json();
    },

    async post(endpoint: string, body: unknown) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            if (res.status === 401) localStorage.removeItem('token');
            throw new Error('API Error');
        }
        return res.json();
    },

    async delete(endpoint: string) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });
        if (!res.ok) {
            if (res.status === 401) localStorage.removeItem('token');
            throw new Error('API Error');
        }
    },

    async patch(endpoint: string) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: getHeaders(),
        });
        if (!res.ok) {
            if (res.status === 401) localStorage.removeItem('token');
            throw new Error('API Error');
        }
        return res.json();
    }
};
