import { BoltIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5 flex flex-col items-center gap-4 min-h-[90vh] justify-center">
      <BoltIcon className="size-20 text-yellow-400 hover:-scale-x-100" />
      <h1 className="text-3xl font-bold text-center">Welcome to Our Space!</h1>
      <Link
        href="/login"
        className="w-full bg-orange-400 flex items-center justify-center h-10 rounded-lg text-white font-semibold text-sm hover:bg-orange-500 transition hover:scale-95"
      >
        Go To Work!!
      </Link>
    </main>
  );
}
