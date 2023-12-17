import { EngagementType } from "@prisma/client";
import { log } from "console";
import { number, z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
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

      //
      const indices: (number | undefined)[] = Array.from(
        {
          length: videosWithCounts.length,
        },
        (_, i) => i,
      );

      // // Loại bỏ các phần tử undefined trong mảng indices
      // const filteredIndices = indices.filter(
      //   (index): index is number => index !== undefined,
      // );
      // Shuffle the indices array
      console.log(indices);

      for (let i = indices.length - 1; i > 0; i--) {
        if (indices[i] !== undefined) {
        // console.log(indices[i]);

        const j = Math.floor(Math.random() * (i + 1));
        // console.log(j);

          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        // if (indices[i] !== undefined  && indices[j] !== undefined) {
        //   [indices[i], indices[j]] = [indices[j], indices[i]];
        // } 
      }
      // / Loại bỏ các giá trị undefined từ mảng indices
      const filteredIndices = indices.filter((index): index is number => index !== undefined);
      
      const shuffledVideosWithCounts = filteredIndices.map((i) => videosWithCounts[i]);
      const shuffledUsers = filteredIndices.map((i) => users[i]);
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // const shuffledVideosWithCounts = indices.map((i) => videosWithCounts[i]);
      // // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      // const shuffledUsers = indices.map((i) => users[i]);

      const randomVideos = shuffledVideosWithCounts.slice(0, input);
      const randomUsers = shuffledUsers.slice(0, input);

      return { videos: randomVideos, users: randomUsers };
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
