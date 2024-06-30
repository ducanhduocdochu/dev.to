import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        postId: z.number(),
        parentId: z.number().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { content, postId, parentId } = input;
      const userId = ctx.session.user.id;

      const comment = await ctx.db.comment.create({
        data: {
          content, postId, parentId, userId
        },
      });

      return comment
    }),

  patchLikeComment: protectedProcedure
    .input(z.object({
      commentId: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const {commentId } = input;
      const existingLike = await ctx.db.reactionComment.findFirst({
        where: {
          AND: [
            { userId: userId },
            { commentId: commentId }
          ]
        }
      });
  
      if (existingLike) {
        await ctx.db.reactionComment.delete({
          where: {
            id: existingLike.id
          }
        });
        return { message: 'Like removed', isCreate: false };
      } else {
        await ctx.db.reactionComment.create({
          data: {
            userId,
            commentId
          }
        });
        return { message: 'Like added', isCreate: true };
      }
    }),

  getCommentByParentId: publicProcedure
    .input(z.object({ id: z.number().nullable() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.comment.findMany({
        where: { parentId: input.id },
        include: {
            reactions: true,
        },
      });  
    }),
});
