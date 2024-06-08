import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { TagType } from "@/typeProp";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        include: {
          comments: true,
          tags: true,
          saves: true,
          reactions: true,
        },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const detailPost = {
        quantityComment: post.comments.length,
        quantitySave: post.saves.length,
        quantityHeart: post.reactions.filter(
          (reaction) => reaction.reactTypeId === 1,
        ).length,
        quantityUnicorn: post.reactions.filter(
          (reaction) => reaction.reactTypeId === 2,
        ).length,
        quantityExploding: post.reactions.filter(
          (reaction) => reaction.reactTypeId === 3,
        ).length,
        quantityRaiseHand: post.reactions.filter(
          (reaction) => reaction.reactTypeId === 4,
        ).length,
        quantityFire: post.reactions.filter(
          (reaction) => reaction.reactTypeId === 5,
        ).length,
      };

      return {
        post,
        detailPost,
      };
    }),

  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        tags: z
          .array(
            z.object({
              id: z.number(),
              name: z.string(),
              color: z.string(),
            }),
          )
          .optional(),
        picturePost: z.string().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, tags, picturePost } = input;
      const userId = ctx.session.user.id;
      console.log("title: ", title);
      console.log("content: ", content);
      console.log("tags: ", tags);
      console.log("picturePost: ", picturePost);

      const post = await ctx.db.post.create({
        data: {
          title,
          content,
          picturePost,
          readingTime: 5,
          createdById: userId,
        },
      });

      tags?.forEach(async (item) => {
        await ctx.db.postTags.create({
          data: {
            tagId: item.id,
            postId: post.id,
          },
        });
      });

      return ctx.db.post.findUnique({
        where: { id: post.id },
        include: {
          tags: true,
        },
      });
    }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: true,
        comments: true,
        tags: true,
      },
    });
  }),

  getPostsByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.post.findMany({
        where: { createdById: input.userId },
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: true,
          comments: true,
          tags: true,
        },
      });
    }),

  getPostsPaginatedForTab: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;
      const totalPosts = await ctx.db.post.count();
      const posts = await ctx.db.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });
      return {
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize),
      };
    }),

  getPostsPaginatedForBody: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;
      const skip = (page - 1) * pageSize;
      const totalPosts = await ctx.db.post.count();
      const posts = await ctx.db.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        include: {
          tags: true,
        },
      });

      return {
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize),
      };
    }),

  //   getPostsByTag: publicProcedure
  //     .input(z.object({ tagName: z.string() }))
  //     .query(async ({ ctx, input }) => {
  //       return ctx.db.post.findMany({
  //         where: {
  //           tags: {
  //             some: {
  //               name: input.tagName,
  //             },
  //           },
  //         },
  //         orderBy: { createdAt: "desc" },
  //         include: {
  //           createdBy: true,
  //           comments: true,
  //           tags: true,
  //         },
  //       });
  //     }),

  //   searchPosts: publicProcedure
  //     .input(z.object({ query: z.string() }))
  //     .query(async ({ ctx, input }) => {
  //       return ctx.db.post.findMany({
  //         where: {
  //           OR: [
  //             { title: { contains: input.query, mode: 'insensitive' } },
  //             { content: { contains: input.query, mode: 'insensitive' } },
  //           ],
  //         },
  //         orderBy: { createdAt: "desc" },
  //         include: {
  //           createdBy: true,
  //           comments: true,
  //           tags: true,
  //         },
  //       });
  //     }),
});
