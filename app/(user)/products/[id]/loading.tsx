export default function Loading() {
  return (
    <div className="animate-pulse space-y-4 p-5">
      <div className="aspect-square w-full rounded-md bg-neutral-300"></div>
      <div className="flex gap-3 items-center *:bg-neutral-300">
        <div className="size-12 rounded-full"></div>
        <div className="w-28 h-5 rounded-md"></div>
      </div>
      <div className="space-y-3 *:bg-neutral-300 *:rounded-md">
        <div className="w-20 h-7"></div>
        <div className="w-72 h-5"></div>
      </div>
    </div>
  );
}
