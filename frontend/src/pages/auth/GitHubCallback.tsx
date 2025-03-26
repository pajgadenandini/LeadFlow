import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/auth.service';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

const GitHubCallback: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleGitHubCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          const authResponse = await authService.handleGitHubOAuthSignIn(code);

          if (authResponse.success && authResponse.token) {
            login(authResponse.token, authResponse.user);
            navigate('/dashboard');
            toast.success('Successfully logged in!');
          } else {
            toast.error('Failed to authenticate');
            navigate('/login');
          }
        } catch (error) {
          console.error('GitHub OAuth error:', error);
          toast.error('GitHub login failed');
          navigate('/login');
        }
      } else {
        toast.error('No code found in URL');
        navigate('/login');
      }
    };

    handleGitHubCallback();
  }, [login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
};

export default GitHubCallback;
