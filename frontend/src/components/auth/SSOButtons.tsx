import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth.service';
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        google: any;
        github: any;
    }
}

const SSOButtons: React.FC = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const googleButtonRef = useRef(null); // Create a ref
    const githubButtonRef = useRef(null); // Create a ref for GitHub button

    // Google OAuth code
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

    // GitHub OAuth code
    useEffect(() => {
        if (githubButtonRef.current) {
            const githubButton = document.createElement('button');
            githubButton.innerText = 'Sign in with GitHub';
            githubButton.className = 'github-button';
            githubButton.onclick = async () => {
                try {
                    const authResponse = await authService.handleOAuthSignIn({
                        email: 'github@example.com', // Replace with actual GitHub email
                        name: 'GitHub User', // Replace with actual GitHub user name
                        provider: 'github'
                    });

                    if (authResponse.success && authResponse.token) {
                        login(authResponse.token, authResponse.user);
                        navigate('/dashboard');
                        toast.success('Successfully logged in!');
                    } else {
                        toast.error('Failed to authenticate');
                    }
                } catch (error) {
                    console.error('GitHub OAuth error:', error);
                    toast.error('GitHub login failed');
                }
            };
            githubButtonRef.current.appendChild(githubButton);
        }
    }, [login, navigate]);

    return (
        <div className="space-y-4 mb-6 flex justify-center">
            <div ref={googleButtonRef}></div>
            <div ref={githubButtonRef}></div>
        </div>
    );
};

export default SSOButtons;
