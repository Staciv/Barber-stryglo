import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STRIGLO",
  description: "Modern barber booking service built for fast mobile-first conversions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-background font-sans text-foreground antialiased">{children}</body>
    </html>
  );
}
