import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { formatToWon } from "@/lib/util";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { deleteProduct } from "./actions";

async function getProduct(id: number) {
  await new Promise((r) => setTimeout(r, 500));

  const product = await db.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      created_at: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
      userId: true,
    },
  });

  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    return notFound();
  }

  const session = await getSession();
  if (!session.id) {
    return <div>You Don't Have Access</div>;
  }

  const isOwner = session.id === product.userId;

  return (
    <div className="p-5 space-y-4">
      <div className="aspect-square w-full rounded-md overflow-hidden relative">
        <Image
          fill
          src={`${product.photo}/public`}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="flex gap-3 items-center">
        <div className="relative aspect-square size-12 rounded-full overflow-hidden">
          {!!product.user.avatar ? (
            <Image fill src={product.user.avatar} alt={product.user.username} />
          ) : (
            <UserCircleIcon className="size-full" />
          )}
        </div>
        <span className="font-medium">{product.user.username}님</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="">{product.description}</p>
      </div>
      <div className="fixed bottom-0 w-full p-2 left-0">
        <div className="rounded-md bg-neutral-100 p-4 flex items-center justify-between shadow-md border">
          <span className="font-semibold text-orange-500">
            {formatToWon(product.price)}원
          </span>
          <div className="flex items-center gap-2">
            {isOwner && (
              <form action={deleteProduct}>
                <input type="number" hidden value={product.id} name="id" />
                <button className="small-btn bg-red-500">Delete</button>
              </form>
            )}
            <button className="small-btn bg-orange-400">구매하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
