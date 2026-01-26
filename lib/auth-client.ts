import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // Aquí NO va el AUTH_SECRET
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
});