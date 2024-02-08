import { EngagementType } from "@prisma/client";
import { NextResponse } from "next/server";

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getChannelById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const followers = await ctx.db.followEngagement.count({
        where: {
          followingId: user.id,
        },
      });

      const followings = await ctx.db.followEngagement.count({
        where: {
          followerId: user.id,
        },
      });

      let viewerHasFollowed = false;
      const userWithEngagement = { ...user, followers, followings };

      if (input.viewerId && input.viewerId !== "") {
        viewerHasFollowed = !!(await ctx.db.followEngagement.findFirst({
          where: {
            followingId: user.id,
            followerId: input.viewerId,
          },
        }));
      }
      const viewer = {
        hasFollowed: viewerHasFollowed,
      };
      return { user: userWithEngagement, viewer };
    }),
  addFollow: protectedProcedure
    .input(
      z.object({
        followerId: z.string(),
        followingId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingFollow = await ctx.db.followEngagement.findMany({
        where: {
          followerId: input.followerId,
          followingId: input.followingId,
          engagementType: EngagementType.FOLLOW,
        },
      });
      if (existingFollow.length > 0) {
        const deleteFollow = await ctx.db.followEngagement.deleteMany({
          where: {
            followerId: input.followerId,
            followingId: input.followingId,
            engagementType: EngagementType.FOLLOW,
          },
        });
        return deleteFollow;
      } else {
        const follow = await ctx.db.followEngagement.create({
          data: {
            followerId: input.followerId,
            followingId: input.followingId,
            engagementType: EngagementType.FOLLOW,
          },
        });
        return follow;
      }
    }),
});
