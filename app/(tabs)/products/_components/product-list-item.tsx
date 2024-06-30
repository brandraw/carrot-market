import { formatToTimeAgo, formatToWon } from "@/lib/util";
import Image from "next/image";
import Link from "next/link";

interface ProductListItemProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ProductListItem({
  id,
  title,
  price,
  photo,
  created_at,
}: ProductListItemProps) {
  return (
    <Link
      href={`/products/${id}`}
      className="flex gap-4 hover:-translate-y-1 transition"
    >
      <div className="relative aspect-square size-24 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={`${photo}/public`}
          fill
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex items-center gap-2 *:text-sm *:font-medium">
          <span className="whitespace-nowrap">{formatToWon(price)}원</span>
          <span>{formatToTimeAgo(created_at.toString())}</span>
        </div>
      </div>
    </Link>
  );
}
