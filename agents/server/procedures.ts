import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";


export const agentRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        try {
            const agents = await ctx.prisma.agent.findMany({
                include: { user: true },
            });
            return agents;
        } catch (error) {
            console.error("Error in getAll agents:", error);
            throw new Error("Error al obtener los agentes: " + (error instanceof Error ? error.message : String(error)));
        }
    }),

    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ ctx, input }) => {
        console.log("[create] Input recibido:", input);
        console.log("[create] Contexto recibido:", ctx);
        try {
            console.log("[create] Intentando crear agente...");
            const createdAgent = await ctx.prisma.agent.create({
                data: {
                    name: input.name,
                    instructions: input.instructions,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    user: {
                        connect: { id: ctx.auth.user.id }
                    }
                }
            });
            console.log("[create] Agente creado:", createdAgent);
            return createdAgent;
        } catch (error) {
            console.error("[create] Error al crear agente:", error);
            if (error instanceof Error && error.stack) {
                console.error("[create] Stack trace:", error.stack);
            }
            throw new Error("Error al crear el agente: " + (error instanceof Error ? error.message : String(error)));
        }
    })
})
