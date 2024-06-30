import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const tagRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.tag.findMany();
  }),

  getTagById: publicProcedure
  .input(
    z.object({
      tagId: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { tagId } = input;
    const tag = await ctx.db.tag.findFirst({
      where: {id: tagId},
    });
    return tag
  }),
});
