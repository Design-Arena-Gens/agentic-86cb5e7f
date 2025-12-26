import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KISHORE Juice Tin Concept",
  description:
    "Ultra-realistic 3D visualization of the KISHORE premium juice tin with dynamic splash and flavor storytelling."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
