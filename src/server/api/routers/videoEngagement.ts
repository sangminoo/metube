import { EngagementType, PrismaClient } from "@prisma/client";

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type Context = {
  prisma: PrismaClient;
};

async function getOrCreatePlaylist(
  ctx: Context,
  title: string,
  userId: string,
) {
  let playlist = await ctx.prisma.playlist.findFirst({
    where: {
      title,
      userId,
    },
  });
  if (playlist === null || playlist === undefined) {
    playlist = await ctx.prisma.playlist.create({
      data: {
        title,
        userId,
      },
    });
  }

  return playlist;
}

async function createEngagement(
  ctx: Context,
  id: string,
  userId: string,
  type: EngagementType,
) {
  return await ctx.prisma.videoEngagement.create({
    data: { videoId: id, userId, engagementType: type },
  });
}

async function deleteEngagementIfExists(
  ctx: Context,
  id: string,
  userId: string,
  type: EngagementType,
) {
  return await ctx.prisma.videoEngagement.deleteMany({
    where: {
      videoId: id,
      userId,
      engagementType: type,
    },
  });
}

export const videoEngagementRouter = createTRPCRouter({
  addViewCount: publicProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if ((input.userId && input.userId !== "") || input.userId !== null) {
        const playlist = await getOrCreatePlaylist(
          ctx,
          "History",
          input.userId,
        );

        await ctx.db.playlistHasVideo.create({
          data: { playlistId: playlist.id, videoId: input.id },
        });
      }
      const view = await createEngagement(
        ctx,
        input.id,
        input.userId,
        EngagementType.VIEW,
      );
      return view;
    }),

  addLike: protectedProcedure
    .input(z.object({ id: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // await deleteEngagementIfExists(
      //   ctx,
      //   input.id,
      //   input.userId,
      //   EngagementType.DISLIKE,
      // );

      const existingLike = await ctx.db.videoEngagement.findMany({
        where: {
          videoId: input.id,
          userId: input.userId,
          engagementType: EngagementType.LIKE,
        },
      });

      const playlist = await getOrCreatePlaylist(
        ctx,
        "Liked Videos",
        input.userId,
      );

      if (existingLike.length > 0) {
        await ctx.db.playlistHasVideo.deleteMany({
          where: {
            playlistId: playlist.id,
            videoId: input.id,
          },
        });
        return await deleteEngagementIfExists(
          ctx,
          input.id,
          input.userId,
          EngagementType.LIKE,
        );
      } else {
        await ctx.db.playlistHasVideo.create({
          data: { playlistId: playlist.id, videoId: input.id },
        });
        return await createEngagement(
          ctx,
          input.id,
          input.userId,
          EngagementType.LIKE,
        );
      }
    }),

  addDisliked: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await deleteEngagementIfExists(
        ctx,
        input.id,
        input.userId,
        EngagementType.LIKE,
      );

      const existingDislike = await ctx.db.videoEngagement.findMany({
        where: {
          id: input.id,
          userId: input.userId,
          engagementType: EngagementType.DISLIKE,
        },
      });

      const playlist = await getOrCreatePlaylist(
        ctx,
        "Liked videos",
        input.userId,
      );

      await ctx.db.playlistHasVideo.deleteMany({
        where: {
          playlistId: playlist.id,
          videoId: input.id,
        },
      });

      if (existingDislike.length > 0) {
        return deleteEngagementIfExists(
          ctx,
          input.id,
          input.userId,
          EngagementType.DISLIKE,
        );
      } else {
        return createEngagement(
          ctx,
          input.id,
          input.userId,
          EngagementType.DISLIKE,
        );
      }
    }),
});

// addViewCount: publicProcedure
// .input(
//   z.object({
//     id: z.string(),
//     userId: z.string(),
//   }),
// )
// .mutation(async ({ ctx, input }) => {
//   if (input.userId && input.userId !== "") {
//     const playlist = await getOrCreatePlaylist(
//       ctx,
//       "History",
//       input.userId,
//     );

//     await ctx.db.playlistHasVideo.create({
//       data: {
//         playlistId: playlist.id,
//         videoId: input.id,
//       },
//     });
//   }

//   const view = await createEngagement(
//     ctx,
//     input.id,
//     input.userId,
//     EngagementType.VIEW,
//   );
//   return view;
// }),
