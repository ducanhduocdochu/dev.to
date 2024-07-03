import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  seenNotification: protectedProcedure
    .mutation(async ({ ctx }) => {
      const userId = ctx.session.user.id;

      return await ctx.db.notifications.updateMany({
        where: {
          receivedId: userId,
        },
        data: {
          seen: true,
        },
      });
    }),

  getNotificationByUserId: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.db.notifications.findMany({
        where: { receivedId: userId },
        orderBy: {id: 'desc'}
      });
    }),

    getSeenNotificationByUserId: protectedProcedure
    .query(async ({ ctx }) => {
      const userId = ctx.session.user.id;
      return ctx.db.notifications.findMany({
        where: { receivedId: userId, seen: false },
      });
    }),
});
