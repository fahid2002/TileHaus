// 👇 FIXED: Changed from 'better-auth/client' to 'better-auth/react'
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "https://tile-haus.vercel.app", 
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
  updateUser,
} = authClient;