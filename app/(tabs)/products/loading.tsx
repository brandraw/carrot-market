export default function Loading() {
  return (
    <div className="p-5 space-y-5 animate-pulse">
      {[...Array(10)].map(() => (
        <div className="flex gap-3">
          <div className="size-24 rounded-md bg-neutral-300"></div>
          <div className="*:bg-neutral-300 *:rounded-md space-y-3">
            <div className="w-40 h-5"></div>
            <div className="w-20 h-5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
