// import { z } from "zod";
// import {
//   createTRPCRouter,
//   publicProcedure,
// } from "@/server/api/trpc";

// export const postRouter = createTRPCRouter({
//   getPostById: publicProcedure
//     .input(z.object({ postId: z.number() }))
//     .query(async ({ ctx, input }) => {
//       return ctx.db.post.findUnique({
//         where: { id: input.postId },
//         include: {
//           createdBy: true,
//           comments: true, 
//           tags: true, 
//         },
//       });
//     }),

//   getAllPosts: publicProcedure.query(async ({ ctx }) => {
//     return ctx.db.post.findMany({
//       orderBy: { createdAt: "desc" },
//       include: {
//         createdBy: true,
//         comments: true,
//         tags: true,
//       },
//     });
//   }),

//   getPostsByUser: publicProcedure
//     .input(z.object({ userId: z.string() }))
//     .query(async ({ ctx, input }) => {
//       return ctx.db.post.findMany({
//         where: { createdById: input.userId },
//         orderBy: { createdAt: "desc" },
//         include: {
//           createdBy: true,
//           comments: true,
//           tags: true,
//         },
//       });
//     }),

//   getPostsPaginated: publicProcedure
//     .input(z.object({
//       page: z.number().min(1),
//       pageSize: z.number().min(1).max(100),
//     }))
//     .query(async ({ ctx, input }) => {
//       const { page, pageSize } = input;
//       const skip = (page - 1) * pageSize;
//       const totalPosts = await ctx.db.post.count();
//       const posts = await ctx.db.post.findMany({
//         skip,
//         take: pageSize,
//         orderBy: { createdAt: "desc" },
//         // include: {
//         //   createdBy: true,
//         //   comments: true,
//         //   tags: true,
//         // },
//       });
//       return {
//         posts,
//         totalPosts,
//         totalPages: Math.ceil(totalPosts / pageSize),
//       };
//     }),

// //   getPostsByTag: publicProcedure
// //     .input(z.object({ tagName: z.string() }))
// //     .query(async ({ ctx, input }) => {
// //       return ctx.db.post.findMany({
// //         where: {
// //           tags: {
// //             some: {
// //               name: input.tagName,
// //             },
// //           },
// //         },
// //         orderBy: { createdAt: "desc" },
// //         include: {
// //           createdBy: true,
// //           comments: true,
// //           tags: true,
// //         },
// //       });
// //     }),

// //   searchPosts: publicProcedure
// //     .input(z.object({ query: z.string() }))
// //     .query(async ({ ctx, input }) => {
// //       return ctx.db.post.findMany({
// //         where: {
// //           OR: [
// //             { title: { contains: input.query, mode: 'insensitive' } },
// //             { content: { contains: input.query, mode: 'insensitive' } },
// //           ],
// //         },
// //         orderBy: { createdAt: "desc" },
// //         include: {
// //           createdBy: true,
// //           comments: true,
// //           tags: true,
// //         },
// //       });
// //     }),
// });
