import Link from "next/link";

export default function Home() {
  return (
    <main className="p-5">
      <h1>This is Home</h1>
      <Link
        href="/login"
        className="bg-orange-400 flex items-center justify-center h-10 rounded-lg text-white font-semibold text-sm hover:bg-orange-500 transition hover:scale-95"
      >
        Go To Work!!
      </Link>
    </main>
  );
}
