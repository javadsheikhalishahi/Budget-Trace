import RootProviders from "@/components/providers/RootProviders";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Budget Trace",
  description: "New",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className="white"
        style={{
          colorScheme: "dark",
        }}
        suppressHydrationWarning={true}
      >
        <body className={inter.className}><RootProviders>{children}</RootProviders></body>
      </html>
    </ClerkProvider>
  );
}
