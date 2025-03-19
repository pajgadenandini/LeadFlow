export interface OAuthUser {
  email: string;
  name?: string;
  image?: string;
  provider: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  error?: string;
  message?: string;
}