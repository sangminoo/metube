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
        viewerId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
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

      const videosQuantity = await ctx.db.video.count({
        where: {
          userId: user.id,
        },
      });

      let viewerHasFollowed = false;
      const userWithEngagement = {
        ...user,
        followers,
        followings,
        videosQuantity,
      };

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

  getDashboardData: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input },
        include: {
          videos: true,
          comments: true,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const videosWithCount = await Promise.all(
        user.videos.map(async (video) => {
          const likes = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.LIKE,
            },
          });
          const dislikes = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.DISLIKE,
            },
          });

          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });

          const comments = await ctx.db.comment.count({
            where: {
              videoId: video.id,
            },
          });

          return { ...video, likes, dislikes, views, comments };
        }),
      );

      const totalViews = videosWithCount.reduce(
        (totalViews, video) => totalViews + video.views,
        0,
      );
      const totalFollowers = await ctx.db.followEngagement.count({
        where: {
          followingId: user.id,
        },
      });

      return {
        user,
        videos: videosWithCount,
        totalViews,
        totalFollowers,
      };
    }),

  updateUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
        backgroundImage: z.string().optional(),
        handle: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user || user.id !== input.id) {
        throw new Error("User not found or you're not authorized to delete it");
      }

      const updateUser = await ctx.db.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: input.name ?? user.name,
          email: input.email ?? user.email,
          image: input.image ?? user.image,
          backgroundImage: input.backgroundImage ?? user.backgroundImage,
          handle: input.handle ?? user.handle,
          description: input.description ?? user.description,
        },
      });
      return updateUser;
    }),
});
