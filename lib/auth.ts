import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({    
    database: prismaAdapter(prisma,{
        provider: "postgresql"
    }),

    session: {
        maxAge: 60, 
        updateAge: 60 
    },

    secret: process.env.AUTH_SECRET
});


