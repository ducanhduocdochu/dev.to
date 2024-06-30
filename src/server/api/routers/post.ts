import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  getPostById: publicProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.postId },
        include: {
          comments: {
            where: {parentId: null},
            include: {
              reactions: true,
              children: true
            }
          },
          tags: true,
          saves: true,
          reactions: true,
        },
      });

      const comments = await ctx.db.comment.findMany({
        where: { postId: input.postId },
      });

      if (!post) {
        throw new Error("Post not found");
      }

      const detailPost = {
        quantityComment: comments.length,
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

      const post = await ctx.db.post.create({
        data: {
          title,
          content,
          picturePost,
          readingTime: 5,
          createdById: userId,
        },
      });

      if (tags) {
        await Promise.all(tags.map(async (item) => {
          await ctx.db.postTags.create({
            data: {
              tagId: item.id,
              postId: post.id,
            },
          });
        }));
      }

      return ctx.db.post.findUnique({
        where: { id: post.id },
        include: {
          tags: true,
        },
      });
    }),

    updatePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
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
      const { postId, title, content, tags, picturePost } = input;
      const userId = ctx.session.user.id;
  
      const post = await ctx.db.post.update({
        where: { id: postId },
        data: {
          ...(title && { title }),
          ...(content && { content }),
          ...(picturePost !== undefined && { picturePost }),
        },
      });
  
      if (tags) {
        await ctx.db.postTags.deleteMany({
          where: { postId: postId },
        });
  
        await Promise.all(
          tags.map(async (item) => {
            await ctx.db.postTags.create({
              data: {
                tagId: item.id,
                postId: post.id,
              },
            });
          }),
        );
      }
  
      return ctx.db.post.findUnique({
        where: { id: post.id },
        include: {
          tags: true,
        },
      });
    }),

  deletePost: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { postId } = input;
      const userId = ctx.session.user.id;
  
      const post = await ctx.db.post.findUnique({
        where: { id: postId },
      });
  
      if (!post) {
        throw new Error("Post not found");
      }
  
      if (post.createdById !== userId) {
        throw new Error("You are not authorized to delete this post");
      }
  
      await ctx.db.postTags.deleteMany({
        where: { postId: postId },
      });
  
      await ctx.db.post.delete({
        where: { id: postId },
      });
  
      return { success: true, message: "Post deleted successfully" };
    }),

  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: true,
        comments: {
          include: {
            children: true
          },
        },
        tags: true,
      },
    });
  }),

  searchPosts: publicProcedure
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
        { title: { contains: keyword, lte: 'insensitive' } },
        { content: { contains: keyword, lte: 'insensitive' } },
      ];
    }

    const totalPosts = await ctx.db.post.count({ where: whereCondition });
    const posts = await ctx.db.post.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: sort_direction },
      where: whereCondition,
      include: {
        tags: true,
        comments: {
          orderBy: { createdAt: 'desc' },
          include: { reactions: true },
          where: { parentId: null },
          take: 2,
        },
        _count: {
          select: { comments: true, reactions: true },
        },
      },
    });

    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
    };
  }),

  getPostsByUserForTab: publicProcedure
  .input(
    z.object({
      page: z.number().min(1),
      pageSize: z.number().min(1).max(100),
      userId: z.string()
    }),
  )
  .query(async ({ ctx, input }) => {
    const { page, pageSize, userId } = input;
    const skip = (page - 1) * pageSize;
    const totalPosts = await ctx.db.post.count();
    const posts = await ctx.db.post.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      where: {createdById: userId}
    });
    return {
      posts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / pageSize),
    };
  }),

  getPostsByUserForBody: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
        createById:  z.string()
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, createById } = input;
      const skip = (page - 1) * pageSize;
      const totalPosts = await ctx.db.post.count();
      const posts = await ctx.db.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        where: {createdById: createById},
        include: {
          tags: true,
          comments: {
            orderBy: { createdAt: "desc" },
            include: {reactions: true},
            where: {parentId: null},
            take: 2,
          },
          _count: {
            select: { comments: true, reactions: true },
          },
        },
      });

      return {
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize),
      };
    }),

    getPostsByTagIdForBody: publicProcedure
    .input(
      z.object({
        page: z.number().min(1),
        pageSize: z.number().min(1).max(100),
        tagId: z.number()
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, tagId } = input;
      const skip = (page - 1) * pageSize;
  
      // Count total posts with the specified tagId
      const totalPosts = await ctx.db.post.count({
        where: {
          tags: {
            some: {
              tagId: tagId
            }
          }
        }
      });
  
      const posts = await ctx.db.post.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
        where: {
          tags: {
            some: {
              tagId: tagId
            }
          }
        },
        include: {
          tags: true, // Include tags if necessary
          comments: {
            orderBy: { createdAt: "desc" },
            include: { reactions: true },
            where: { parentId: null },
            take: 2,
          },
          _count: {
            select: { comments: true, reactions: true },
          },
        },
      });
  
      return {
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize),
      };
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
          comments: {
            orderBy: { createdAt: "desc" },
            include: {reactions: true},
            where: {parentId: null},
            take: 2,
          },
          _count: {
            select: { comments: true, reactions: true },
          },
        },
      });

      return {
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / pageSize),
      };
    }),


  // getPosts

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
