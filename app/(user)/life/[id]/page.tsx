import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToTimeAgo } from "@/lib/util";

import { unstable_cache as nextCache } from "next/cache";
import { notFound } from "next/navigation";
import LikeBtn from "./_components/like-btn";

async function getPost(id: number) {
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            Comment: true,
          },
        },
      },
    });
    return post;
  } catch (e) {
    return null;
  }
}
const getCachedPost = nextCache(getPost, ["post-data"], {
  tags: [`post-data-tag`],
});

async function getlikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });

  return {
    isLiked: Boolean(isLiked),
    likeCount,
  };
}

async function getCachedLikeStatus(postId: number, userId: number) {
  const cached = nextCache(getlikeStatus, ["post-like-status"], {
    tags: [`like-status-${postId}`],
  });

  return cached(postId, userId);
}

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  const { isLiked, likeCount } = await getCachedLikeStatus(id, session.id!);

  return (
    <div className="p-5 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">{post.title}</h1>
      <div className="flex items-center gap-4 *:text-sm border-b pb-3">
        <span>{formatToTimeAgo(post.created_at.toString())}</span>
        <span>조회 {post.views}</span>
      </div>
      <p>{post.description}</p>
      <div className="flex items-center justify-between">
        <LikeBtn isLiked={isLiked} likeCount={likeCount} postId={id} />
        <span className="text-sm">댓글 {post._count.Comment}</span>
      </div>
    </div>
  );
}
