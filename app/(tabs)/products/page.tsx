import { db } from "@/lib/db";
import ProductList from "./_components/product-list";
import { Prisma } from "@prisma/client";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const revalidate = 600;

async function getInitialProducts() {
  await new Promise((r) => setTimeout(r, 500));

  const product = await db.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
      photo: true,
      created_at: true,
    },
    take: 1,
    orderBy: {
      created_at: "desc",
    },
  });

  return product;
}

export type initialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();

  return (
    <div className="p-5 space-y-4">
      <h1 className="text-2xl font-semibold">Best Products!</h1>
      <ProductList initialProducts={initialProducts} />
      <Link href="/products/add" className="fixed bottom-24 right-2">
        <PlusCircleIcon className="size-14 text-orange-400 hover:text-orange-300 transition hover:scale-95" />
      </Link>
    </div>
  );
}
