import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "UserOps — Mampu", template: "%s | UserOps" },
  description: "User Operations workspace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${jakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
