const { PrismaClient } = require("@prisma/client");
const {
  users,
  videos,
  videoEngagements,
  followEngagements,
  announcements,
  announcementEngagements,
  comments,
  playlists,
  playlistHasVideos,
} = require("./data");

const prisma = new PrismaClient();

const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";


function generateNextId(start, end) {
    let current = start;
    return function getNextId() {
      const nextId = current;
      current = current >= end ? start : current + 1;
      return nextId.toString();
    };
  }
  
  // Use these functions where you need to update the currentUserId and currentVideoId
  const getNextVideoId = generateNextId(1, 31);
  const getNextUserId = generateNextId(164, 178);

async function processInChunks(items, chunkSize, processItem) {
  const results = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const chunkPromises = chunk.map(processItem);
    results.push(...(await Promise.all(chunkPromises)));
  }
  return results;
}

const load = async () => {
  await prisma.user.deleteMany();
  await prisma.video.deleteMany();
  await prisma.videoEngagement.deleteMany();
  await prisma.followEngagement.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.announcementEngagement.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.playlist.deleteMany();
  await prisma.playlistHasVideo.deleteMany();

  try {
    

    await processInChunks(users, 1, (user) =>
    prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...user,
        emailVerified: user.emailVerified
          ? new Date(user.emailVerified)
          : undefined,
        image: user.image
          ? `https://res.cloudinary.com/${cloudinaryName}${user.image}`
          : null,
        backgroundImage: user.backgroundImage
          ? `https://res.cloudinary.com/${cloudinaryName}${user.backgroundImage}`
          : null,
      },
      create: {
        ...user,
        emailVerified: user.emailVerified
          ? new Date(user.emailVerified)
          : undefined,
        image: user.image
          ? `https://res.cloudinary.com/${cloudinaryName}${user.image}`
          : null,
        backgroundImage: user.backgroundImage
          ? `https://res.cloudinary.com/${cloudinaryName}${user.backgroundImage}`
          : null,
      },
    }),
  );

  await processInChunks(videos, 1, (video) =>
    prisma.video.upsert({
      where: { id: video.id },
      update: {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
        thumbnailUrl: `https://res.cloudinary.com/${cloudinaryName}${video.thumbnailUrl}`,
        videoUrl: `https://res.cloudinary.com/${cloudinaryName}${video.videoUrl}`,
      },
      create: {
        ...video,
        createdAt: video.createdAt ? new Date(video.createdAt) : undefined,
        thumbnailUrl: `https://res.cloudinary.com/${cloudinaryName}${video.thumbnailUrl}`,
        videoUrl: `https://res.cloudinary.com/${cloudinaryName}${video.videoUrl}`,
      },
    }),
  );

  await processInChunks(videoEngagements, 1, (videoEngagement) => {
    // Kiểm tra xem videoEngagement có userId hay không
    if (videoEngagement.userId === null) {
      // Tạo VideoEngagement với userId
      return prisma.videoEngagement.create({
        data: {
          // ... các trường khác của videoEngagement
          ...videoEngagement,
          userId: "164" ,
        },
      });
    } else {
      // Nếu không có userId, bỏ qua trường userId khi tạo
      return prisma.videoEngagement.create({
        data: {
          // ... các trường khác của videoEngagement
          ...videoEngagement,
          userId: videoEngagement.userId || null,

        },
      });
    }
  });
  await processInChunks(followEngagements, 1, async (followEngagement) => {
    const existingFollowEngagements = await prisma.followEngagement.findMany({
      where: {
        followerId: followEngagement.followerId,
        followingId: followEngagement.followingId,
      },
    });
    if (existingFollowEngagements.length === 0 || !existingFollowEngagements) {
      return prisma.followEngagement.create({ data: followEngagement });
    } else {
      return;
    }
  });

  await processInChunks(announcements, 1, (announcement) =>
    prisma.announcement.create({ data: announcement }),
  );

  await processInChunks(
    announcementEngagements,
    1,
    async (announcementEngagement) => {
      // Try to find an existing announcementEngagement record with the same userId and announcementId
      const existingAnnouncementEngagements =
        await prisma.announcementEngagement.findMany({
          where: {
            announcementId: announcementEngagement.announcementId, // Fixed typo here
            userId: announcementEngagement.userId,
          },
        });
      if (
        existingAnnouncementEngagements.length === 0 ||
        !existingAnnouncementEngagements
      ) {
        return prisma.announcementEngagement.create({
          data: announcementEngagement,
        });
      } else {
        return;
      }
    },
  );
  await processInChunks(comments, 1,  (comment) =>
    prisma.comment.upsert({
      where: { id: comment.id },
      update: {
        ...comment,
        videoId: getNextVideoId(),
        userId: getNextUserId(),
        createdAt: comment.createdAt ? new Date(comment.createdAt) : undefined,
      },
      create: {
        ...comment,
        userId: getNextUserId(),
        videoId: getNextVideoId(),
        createdAt: comment.createdAt ? new Date(comment.createdAt) : undefined,
      },
    }),
  );

  await processInChunks(
    playlists,
    1,
    async (playlist) =>
      await prisma.playlist.upsert({
        where: { id: playlist.id },
        update: {
          ...playlist,
          userId: getNextUserId(),
          createdAt: playlist.createdAt
            ? new Date(playlist.createdAt)
            : undefined,
        },
        create: {
          ...playlist,
          userId: getNextUserId(),
          createdAt: playlist.createdAt
            ? new Date(playlist.createdAt)
            : undefined,
        },
      }),
  );

  await processInChunks(
    playlistHasVideos,
    1,
    async (playlistHasVideo) =>
      await prisma.playlistHasVideo.create({ data: playlistHasVideo }),
  );
  } catch (error) {
    console.log(error);
  } finally {
    await prisma.$disconnect;
  }
};

load();
