import { string, z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { agentRouter } from '@/agents/server/procedures';
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
        userId: string,
      };
    }),
  agent: agentRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;