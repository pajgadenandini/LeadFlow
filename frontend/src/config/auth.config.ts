export const oauthConfig = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID!,
    scope: 'email profile',
    ux_mode: 'popup',
    response_type: 'token',
    prompt: 'select_account',
    access_type: 'online'
  },
  github: {
    clientId: import.meta.env.REACT_APP_GITHUB_CLIENT_ID!,
    redirectUri: `${window.location.origin}/auth/callback/github`
  },
  microsoft: {
    clientId: import.meta.env.REACT_APP_MICROSOFT_CLIENT_ID!,
    redirectUri: `${window.location.origin}/auth/callback/microsoft`,
    tenantId: import.meta.env.REACT_APP_MICROSOFT_TENANT_ID
  }
};