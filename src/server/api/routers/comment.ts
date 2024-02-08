import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  addComment: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        userId: z.string(),
        message: z.string().max(1500).min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.comment.create({
        data: {
          videoId: input.videoId,
          userId: input.userId,
          message: input.message,
        },
      });
      const getAllComments = await ctx.db.comment.findMany({
        where: {
          videoId: input.videoId,
        },
      });

      return getAllComments;
    }),

  deleteComment: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        userId: z.string(),
        commentId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingComment = await ctx.db.comment.findUnique({
        where: {
          id: input.commentId,
          userId: input.userId,
          videoId: input.videoId,
        },
      });

      if (existingComment) {
        await ctx.db.comment.delete({
          where: {
            id: input.commentId,
          },
        });
      }
    }),
});
