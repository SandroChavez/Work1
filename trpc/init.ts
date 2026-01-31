import { initTRPC } from '@trpc/server';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';

export const createTRPCContext = cache(async () => {
  return {
    userId: 'user_123',
    prisma,
  };
});

// 👇 ESTE TIPO ES CLAVE
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

// 👇 AQUÍ estaba el error
const t = initTRPC.context<TRPCContext>().create();

export const createTRPCRouter = t.router;
export const baseProcedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
