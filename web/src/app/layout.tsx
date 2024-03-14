import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "toaster-ts: A library to create toast notifications in your website",
  description: "toaster-ts is a simple JavaScript library, written in TypeScript, to show notifications in your website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative min-h-screen`}>{children}</body>
    </html>
  );
}
