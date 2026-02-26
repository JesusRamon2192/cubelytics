import { apiClient } from './apiClient';

export interface ScrambleResponse {
    scramble: string;
    imagen: string;
}

export const fetchScramble = async (): Promise<ScrambleResponse> => {
    try {
        const response = await apiClient.get('/api/v1/scramble');
        return response as ScrambleResponse;
    } catch (error) {
        console.error('Error fetching scramble from backend API, falling back to static scramble', error);
        
        // Fallback scramble sequence in case the API is down
        const fallbackScramble = "U2 R2 D' U' F2 R U' B' U2 L R2 B R' F' D U' B' D L2 R' D2";
        const fallbackUrl = `https://visualcube.api.cubing.net/visualcube.php?fmt=svg&bg=t&size=150&pzl=3&sch=yrbowg&alg=${encodeURIComponent(fallbackScramble)}`;
        
        return {
            scramble: fallbackScramble,
            imagen: fallbackUrl
        };
    }
};
