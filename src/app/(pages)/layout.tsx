import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YeXing - Personal Site",
  description: "YeXing 的开发日记",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
		<footer className="flex justify-center">
			<p>ICP备案号：</p>
			<a href="https://beian.miit.gov.cn/" target="_blank">赣ICP备2025078961号</a></footer>
      </body>
    </html>
  );
}
