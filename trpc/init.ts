import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import next from 'next';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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
export const protectedProcedure =baseProcedure.use(async({ctx,next}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session) {
    throw new TRPCError({code: "UNAUTHORIZED"});
  }

  return next({ctx: {...ctx, auth: session}})
})
