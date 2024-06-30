import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUserById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.user.findUnique({
        where: { id: input.id },
        select: { name: true, image: true }, 
      });
    }),

    searchUsers: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
        keyword: z.string().optional(),
        sort_direction: z.enum(['asc', 'desc']).default('asc'),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, keyword, sort_direction } = input;
      const skip = (page - 1) * pageSize;
  
      const whereCondition: any = {};
  
      if (keyword) {
        whereCondition.OR = [
          { name: { contains: keyword, lte: 'insensitive' } },
        ];
      }
  
      const users = await ctx.db.user.findMany({
        skip,
        take: pageSize,
        orderBy: { name: sort_direction },
        where: whereCondition,
      });
  
      return {
        users,
      };
    }),
});
