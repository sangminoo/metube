import { object, z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const playlistRouter = createTRPCRouter({
  getSavePlaylistData: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const Playlists = ctx.db.playlist.findMany({
        where: {
          userId: input,
          NOT: [{ title: "Liked videos" }, { title: "History" }],
        },
        include: {
          videos: {
            include: {
              video: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      return Playlists;
    }),
  addVideoToPlaylist: protectedProcedure
    .input(
      z.object({
        playlistId: z.string(),
        videoId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const playlistAlreadyVideo = await ctx.db.playlistHasVideo.findMany({
        where: {
          playlistId: input.playlistId,
          videoId: input.videoId,
        },
      });
      if (playlistAlreadyVideo.length) {
        const deleteVideo = await ctx.db.playlistHasVideo.deleteMany({
          where: {
            playlistId: input.playlistId,
            videoId: input.videoId,
          },
        });

        return deleteVideo;
      } else {
        const playlistHasVideo = await ctx.db.playlistHasVideo.create({
          data: {
            playlistId: input.playlistId,
            videoId: input.videoId,
          },
        });
        return playlistHasVideo;
      }
    }),

  addPlaylist: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(150),
        userId: z.string(),
        description: z.string().min(5).max(50).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const playlist = await ctx.db.playlist.create({
        data: {
          title: input.title,
          userId: input.userId,
          description: input.description,
        },
      });

      return playlist;
    }),
});
