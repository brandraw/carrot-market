export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center w-full p-5">
      <div className="border rounded-lg p-6 shadow-sm max-w-[500px] w-full">
        {children}
      </div>
    </div>
  );
}
