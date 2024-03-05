import { videoRouter } from "~/server/api/routers/video";
import { videoEngagementRouter } from "~/server/api/routers/videoEngagement";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "~/server/api/routers/user";
import { commentRouter } from "./routers/comment";
import { playlistRouter } from "./routers/playlist";
import { announcementRouter } from "./routers/announcement";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  video: videoRouter,
  user: userRouter,
  videoEngagement: videoEngagementRouter,
  comment: commentRouter,
  playlist: playlistRouter,
  announcement: announcementRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
