import { EngagementType, type PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { NextResponse } from "next/server";

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type Context = {
  db: PrismaClient;
};

const checkVideoOwnership = async (
  ctx: Context,
  id: string,
  userId: string,
) => {
  const video = await ctx.db.video.findUnique({
    where: { id },
  });

  if (!video || video.userId !== userId) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Video not found",
    });
  }

  return video;
};

export const videoRouter = createTRPCRouter({
  getVideoById: publicProcedure
    .input(
      z.object({
        id: z.string(),
        viewerId: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const rawVideo = await ctx.db.video.findUnique({
        where: {
          // publish: true,
          id: input.id,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
      });
      // console.log(videosWithUser);
      if (!rawVideo) {
        return new NextResponse("[GET_VIDEO_BY_ID]", { status: 404 });
      }

      const { user, comments, ...video } = rawVideo;
      const followers = await ctx.db.followEngagement.count({
        where: {
          followingId: video.userId,
        },
      });

      const likes = await ctx.db.videoEngagement.count({
        where: {
          videoId: video.id,
          engagementType: EngagementType.LIKE,
        },
      });
      const disLikes = await ctx.db.videoEngagement.count({
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

      const userWithFollowers = { ...user, followers };
      const videoWithLikesDisLikesViews = { ...video, likes, disLikes, views };
      const commentsWithUsers = comments.map(({ user, ...comment }) => ({
        user,
        comment,
      }));

      let viewerHasFollowed = false;
      let viewerHasLiked = false;
      let viewerHasDisliked = false;
      if (input.viewerId && input.viewerId !== "") {
        viewerHasLiked = !!(await ctx.db.videoEngagement.findFirst({
          where: {
            videoId: input.id,
            userId: input.viewerId,
            engagementType: EngagementType.LIKE,
          },
        }));
        viewerHasDisliked = !!(await ctx.db.videoEngagement.findFirst({
          where: {
            videoId: input.id,
            userId: input.viewerId,
            engagementType: EngagementType.DISLIKE,
          },
        }));
        viewerHasFollowed = !!(await ctx.db.followEngagement.findFirst({
          where: {
            followingId: rawVideo.userId,
            followerId: input.viewerId,
          },
        }));
      } else {
        viewerHasLiked = false;
        viewerHasDisliked = false;
        viewerHasFollowed = false;
      }

      const viewer = {
        hasLiked: viewerHasLiked,
        hasDisliked: viewerHasDisliked,
        hasFollowed: viewerHasFollowed,
      };

      return {
        user: userWithFollowers,
        video: videoWithLikesDisLikesViews,
        comments: commentsWithUsers,
        viewer,
      };
    }),
  //
  getVideosByUserId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          userId: input,
          publish: true,
        },
        include: {
          user: true,
        },
      });

      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);
      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        }),
      );

      return { videos: videosWithCounts, users: users };
    }),

  // Random Video
  // getRandomVideos: publicProcedure
  //   .input(z.number())
  //   .query(async ({ ctx, input }) => {
  //     const videosWithUser = await ctx.db.video.findMany({
  //       where: {
  //         publish: true,
  //       },
  //       include: {
  //         user: true,
  //       },
  //     });

  //     const videos = videosWithUser.map(({ user, ...video }) => video);
  //     const users = videosWithUser.map(({ user }) => user);

  //     const videosWithCounts = await Promise.all(
  //       videos.map(async (video) => {
  //         const views = await ctx.db.videoEngagement.count({
  //           where: {
  //             videoId: video.id,
  //             engagementType: EngagementType.VIEW,
  //           },
  //         });
  //         return { ...video, views };
  //       }),
  //     );

  //     //
  //     const indices: (number | undefined)[] = Array.from(
  //       {
  //         length: videosWithCounts.length,
  //       },
  //       (_, i) => i,
  //     );

  //     // // Loại bỏ các phần tử undefined trong mảng indices
  //     // const filteredIndices = indices.filter(
  //     //   (index): index is number => index !== undefined,
  //     // );
  //     // Shuffle the indices array
  //     // console.log(indices);

  //     for (let i = indices.length - 1; i > 0; i--) {
  //       if (indices[i] !== undefined) {
  //         // console.log(indices[i]);

  //         const j = Math.floor(Math.random() * (i + 1));
  //         // console.log(j);

  //         [indices[i], indices[j]] = [indices[j], indices[i]];
  //       }
  //       // if (indices[i] !== undefined  && indices[j] !== undefined) {
  //       //   [indices[i], indices[j]] = [indices[j], indices[i]];
  //       // }
  //     }
  //     // / Loại bỏ các giá trị undefined từ mảng indices
  //     const filteredIndices = indices.filter(
  //       (index): index is number => index !== undefined,
  //     );

  //     const shuffledVideosWithCounts = filteredIndices.map(
  //       (i) => videosWithCounts[i],
  //     );
  //     const shuffledUsers = filteredIndices.map((i) => users[i]);
  //     // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     // const shuffledVideosWithCounts = indices.map((i) => videosWithCounts[i]);
  //     // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  //     // const shuffledUsers = indices.map((i) => users[i]);

  //     const randomVideos = shuffledVideosWithCounts.slice(0, input);
  //     const randomUsers = shuffledUsers.slice(0, input);

  //     return { videos: randomVideos, users: randomUsers };
  //   }),
  getRandomVideos: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          publish: true,
        },
        include: {
          user: true,
        },
      });

      // Split videos and users into separate arrays
      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return {
            ...video,
            views,
          };
        }),
      );

      // Generate an array of indices
      const indices = Array.from(
        { length: videosWithCounts.length },
        (_, i) => i,
      );

      // Shuffle the indices array
      for (let i = indices.length - 1; i > 0; i--) {
        if (indices[i] !== undefined) {
          const j = Math.floor(Math.random() * (i + 1));
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      }
      // Use the shuffled indices to re-order videosWithCounts and users
      const shuffledVideosWithCounts = indices.map((i) => videosWithCounts[i]);
      const shuffledUsers = indices.map((i) => users[i]);

      const randomVideos = shuffledVideosWithCounts.slice(0, input);
      const randomUsers = shuffledUsers.slice(0, input);
      return { videos: randomVideos, users: randomUsers };
    }),
  //  Videos search
  getVideosBySearch: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const videosWithUser = await ctx.db.video.findMany({
        where: {
          publish: true,
          title: {
            contains: input,
            mode: "insensitive",
          },
          // OR: [
          //   ...input.split(" ").map((word) => ({
          //     title: {
          //       contains: word,
          //       mode: "insensitive",
          //     } ,
          //   })),
          // ],
        },
        include: {
          user: true,
        },
      });

      const videos = videosWithUser.map(({ user, ...video }) => video);
      const users = videosWithUser.map(({ user }) => user);

      const videosWithCounts = await Promise.all(
        videos.map(async (video) => {
          const views = await ctx.db.videoEngagement.count({
            where: {
              videoId: video.id,
              engagementType: EngagementType.VIEW,
            },
          });
          return { ...video, views };
        }),
      );

      return { videos: videosWithCounts, users };
    }),

  publishVideo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const video = await checkVideoOwnership(ctx, input.id, input.userId);

      const publishVideo = await ctx.db.video.update({
        where: {
          id: video.id,
        },
        data: { publish: !video.publish },
      });

      return publishVideo;
    }),
  deleteVideo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const video = await checkVideoOwnership(ctx, input.id, input.userId);

      const deleteVideo = await ctx.db.video.delete({
        where: {
          id: video.id,
        },
      });
      return deleteVideo;
    }),

  updateVideo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnailUrl: z.string(),
        // publish: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const video = await checkVideoOwnership(ctx, input.id, input.userId);
      const updateVideo = await ctx.db.video.update({
        where: {
          id: video.id,
        },
        data: {
          title: input.title ?? video.title,
          description: input.description ?? video.description,
          thumbnailUrl: input.thumbnailUrl ?? video.thumbnailUrl,
          // publish: input.publish ?? video.publish,
        },
      });
      return updateVideo;
    }),

  createVideo: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        videoUrl: z.string(),
        title: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const video = await ctx.db.video.create({
        data: {
          userId: input.userId,
          videoUrl: input.videoUrl,
          title: input.title,
          publish: false,
        },
      });

      return video;
    }),
});

// import { z } from "zod";

// import {
//   createTRPCRouter,
//   protectedProcedure,
//   publicProcedure,
// } from "~/server/api/trpc";

// export const videoRouter = createTRPCRouter({
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   create: protectedProcedure
//     .input(z.object({ name: z.string().min(1) }))
//     .mutation(async ({ ctx, input }) => {
//       // simulate a slow db call
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       return ctx.db.post.create({
//         data: {
//           name: input.name,
//           createdBy: { connect: { id: ctx.session.user.id } },
//         },
//       });
//     }),

//   getLatest: protectedProcedure.query(({ ctx }) => {
//     return ctx.db.post.findFirst({
//       orderBy: { createdAt: "desc" },
//       where: { createdBy: { id: ctx.session.user.id } },
//     });
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
// });
