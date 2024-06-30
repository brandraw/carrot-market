import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getUser(id: number) {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    select: {
      username: true,
      avatar: true,
    },
  });

  return user;
}

export default async function Profile() {
  const session = await getSession();
  if (!session.id) {
    return notFound();
  }

  const user = await getUser(session.id);
  if (!user) {
    return notFound();
  }

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-semibold pb-3 border-b">Profile</h1>
      <div className="relative size-14 aspect-square rounded-full overflow-hidden">
        {!!user.avatar ? (
          <Image fill src={user.avatar} alt={user.username} />
        ) : (
          <UserCircleIcon className="size-full text-neutral-400" />
        )}
      </div>
      <div>
        Username:{" "}
        <span className="text-orange-500 font-medium">{user.username}</span>
      </div>
    </div>
  );
}
