import { db } from "@/lib/db";
import Link from "next/link";

async function getPosts() {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      _count: {
        select: {
          Like: true,
          Comment: true,
        },
      },
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return posts;
}

export default async function Life() {
  const posts = await getPosts();
  if (!posts) {
    return <div className="p-5">No Data</div>;
  }

  return (
    <div className="p-5 space-y-5">
      {posts.map((a) => (
        <Link
          href={`/life/${a.id}`}
          key={a.id}
          className="flex flex-col gap-2 border py-4 px-5 rounded-lg shadow-sm bg-neutral-50 transition hover:-translate-y-1"
        >
          <h2 className="text-lg font-semibold">{a.title}</h2>
          <p>{a.description}</p>

          <div className="flex items-center gap-2 *:text-sm">
            <span>좋아요 {a._count.Like}</span>
            <span>댓글 {a._count.Comment}</span>
            <span>조회 {a.views}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
