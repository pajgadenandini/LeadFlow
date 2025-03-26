import axios from 'axios';
import { OAuthUser, AuthResponse } from '../types/auth.types';
import { log } from 'console';

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
    },

    async handleGitHubOAuthSignIn(code: string): Promise<AuthResponse> {
        try {
            console.log(code);
            
            const response = await axios.post(
                `${API_URL}/auth/oauth/github`,
                { code },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('GitHub OAuth error:', error);
            return {
                success: false,
                error: 'GitHub OAuth authentication failed'
            };
        }
    }
};
