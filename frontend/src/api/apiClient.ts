const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const apiClient = {
    async get(endpoint: string) {
        const res = await fetch(`${API_URL}${endpoint}`);
        if (!res.ok) throw new Error('API Error');
        return res.json();
    },

    async post(endpoint: string, body: any) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('API Error');
        return res.json();
    },

    async delete(endpoint: string) {
        const res = await fetch(`${API_URL}${endpoint}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('API Error');
    },

    async patch(endpoint: string) {
        // Note: handling query param patch
        const res = await fetch(`${API_URL}${endpoint}`, { method: 'PATCH' });
        if (!res.ok) throw new Error('API Error');
        return res.json();
    }
};
