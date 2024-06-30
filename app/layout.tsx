import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/main-header";

export const metadata: Metadata = {
  title: {
    template: "%s | Let's Do This",
    default: "Let's Do This",
  },
  description: "Are You Ready?",
  icons: {
    icon: "/favicon_naturalcoder.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="max-w-screen-sm w-full mx-auto">
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
