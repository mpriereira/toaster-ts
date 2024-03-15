import type { Metadata } from "next";
import '@fontsource-variable/onest';
import "./globals.css";

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
      <body className="relative min-h-screen">{children}</body>
    </html>
  );
}
