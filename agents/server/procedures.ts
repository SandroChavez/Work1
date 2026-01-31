import { z } from "zod"
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const agentRouter = createTRPCRouter({
    getAll: baseProcedure.query(async ({ctx}) => {

        await new Promise((r) => setTimeout(r,5000))

        return ctx.prisma.agent.findMany({
            include: {user : true}
        })
    } )
})
