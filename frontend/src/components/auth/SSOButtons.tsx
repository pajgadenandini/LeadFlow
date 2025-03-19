import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth.service';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        google: any;
    }
}

const SSOButtons: React.FC = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const googleButtonRef = useRef(null); // Create a ref
    // oauth code
    useEffect(() => {
        /* global google */
        if (googleButtonRef.current) {
            window.google.accounts.id.initialize({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                callback: async (response: any) => {
                    try {
                        if (response && response.credential) {
                            const decoded = JSON.parse(atob(response.credential.split('.')[1]));

                            const authResponse = await authService.handleOAuthSignIn({
                                email: decoded.email,
                                name: decoded.name,
                                image: decoded.picture,
                                provider: 'google'
                            });

                            if (authResponse.success && authResponse.token) {
                                login(authResponse.token, authResponse.user);
                                navigate('/dashboard');
                                toast.success('Successfully logged in!');
                            } else {
                                toast.error('Failed to authenticate');
                            }
                        } else {
                            toast.error('Authentication failed');
                        }
                    } catch (error) {
                        console.error('Google OAuth error:', error);
                        toast.error('Google login failed');
                    }
                },
            });

            window.google.accounts.id.renderButton(
                googleButtonRef.current,
                { theme: "outline", size: "large", logo_alignment: "center" }
            );
        }
    }, [login, navigate]);

    return (
        <div className="space-y-4 mb-6 flex justify-center">
            <div ref={googleButtonRef}></div>
        </div>
    );
};

export default SSOButtons;