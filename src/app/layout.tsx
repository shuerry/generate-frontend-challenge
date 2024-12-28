import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ProductsProvider} from "@/app/Contexts/productsContext"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProductsProvider>
      <body>{children}</body>
    </ProductsProvider>
    </html>
  );
}
