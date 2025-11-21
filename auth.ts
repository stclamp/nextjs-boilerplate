import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { CredentialsSignin } from 'next-auth';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class SignInError extends CredentialsSignin {
  constructor(code: string) {
    super();
    this.code = code;
    this.message = code;
  }
}

async function refreshAccessToken(token: any) {
  try {
    const response = await axios.post(`${API_URL}/user/refresh/`, {
      email: token.email,
      refresh: token.refresh,
    });

    const { access, refresh } = response.data.result || response.data; // Handle potential nesting
    const decoded: any = jwtDecode(access);

    console.log('refreshed')

    return {
      user: token.user,
      access,
      refresh: refresh ?? token.refresh, // Fallback to old refresh token if not rotated
      expiresAt: decoded.exp * 1000, // Convert to ms
      error: null,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const response = await axios.post(`${API_URL}/user/login/`, {
            email: credentials.email,
            password: credentials.password,
          });
          const result = response.data.result;

          // Ensure the user object has the expected structure
          if (result && result.access && result.refresh) {
             // Decode to get expiration if not provided
             const decoded: any = jwtDecode(result.access);
             return {
               user: result.user, // Spread the user details (id, names, plan, etc.)
               access: result.access,
               refresh: result.refresh,
               expiresAt: decoded.exp * 1000,
             };
          }
          return null;
        } catch (error) {
          console.error('Login error:', error);
          if (axios.isAxiosError(error)) {
             console.error('Response status:', error.response?.status);
             console.error('Response data:', error.response?.data);
             const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Authentication failed';
             throw new SignInError(errorMessage);
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          user: user.user,
          access: user.access,
          refresh: user.refresh,
          expiresAt: user.expiresAt,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token as any).expiresAt) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user as any;
      session.access = token.access as string;
      session.error = token.error as string | null;
      // session.user.refresh = token.refresh as string; // REMOVED for security
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
});
