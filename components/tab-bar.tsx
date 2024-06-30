"use client";

import {
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconOutline,
  HomeIcon as HomeIconOutline,
  NewspaperIcon as NewspaperIconOutline,
  UserIcon as UserIconOutline,
  VideoCameraIcon as VideoCameraIconOutline,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon as ChatBubbleOvalLeftEllipsisIconSolid,
  HomeIcon as HomeIconSolid,
  NewspaperIcon as NewspaperIconSolid,
  UserIcon as UserIconSolid,
  VideoCameraIcon as VideoCameraIconSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabRoutes = [
  {
    label: "홈",
    href: "/products",
    icon: HomeIconOutline,
    icon_hover: HomeIconSolid,
  },
  {
    label: "동네생활",
    href: "/life",
    icon: NewspaperIconOutline,
    icon_hover: NewspaperIconSolid,
  },
  {
    label: "채팅",
    href: "/chats",
    icon: ChatBubbleOvalLeftEllipsisIconOutline,
    icon_hover: ChatBubbleOvalLeftEllipsisIconSolid,
  },
  {
    label: "쇼핑",
    href: "/shopping",
    icon: VideoCameraIconOutline,
    icon_hover: VideoCameraIconSolid,
  },
  {
    label: "나의 당근",
    href: "/profile",
    icon: UserIconOutline,
    icon_hover: UserIconSolid,
  },
];

export default function TabBar() {
  const pathname = usePathname();

  return (
    <div className="fixed w-full bottom-0 p-2 z-20">
      <div className="grid grid-cols-5 bg-neutral-100 rounded-md p-5">
        {tabRoutes.map((a, i) => {
          const Icon = a.icon;
          const IconHover = a.icon_hover;
          return (
            <Link
              href={a.href}
              key={i}
              className="flex flex-col gap-1 items-center"
            >
              {pathname === a.href ? (
                <IconHover className="size-6" />
              ) : (
                <Icon className="size-6" />
              )}
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
