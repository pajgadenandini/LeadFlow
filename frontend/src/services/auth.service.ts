import axios from 'axios';
import { OAuthUser, AuthResponse } from '../types/auth.types';

const API_URL = import.meta.env.VITE_APP_BACKEND_BASE_URL || 'http://localhost:5000/api';

export const authService = {
    async handleOAuthSignIn(userData: OAuthUser): Promise<AuthResponse> {
        try {
            const response = await axios.post(
                `${API_URL}/auth/oauth/callback`,
                userData,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('OAuth error:', error);
            return {
                success: false,
                error: 'OAuth authentication failed'
            };
        }
    }
};