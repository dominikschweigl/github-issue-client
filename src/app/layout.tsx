import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GitHub Issue Client",
  description: "Tool for searching Issues in Github Repositories",
  icons: {
    icon: [
      {
        url: "/images/favicon/android-chrome-512x512.png",
        href: "/images/favicon/android-chrome-512x512.png",
      },
      {
        url: "/images/favicon/android-chrome-192x192.png",
        href: "/images/favicon/android-chrome-192x192.png",
      },
      {
        url: "/images/favicon/apple-touch-icon.png",
        href: "/images/favicon/apple-touch-icon.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen dark flex flex-col`}>{children}</body>
    </html>
  );
}
