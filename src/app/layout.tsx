import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { ClerkProvider } from "@clerk/nextjs";

import "~/styles/globals.css";
import NavBar from "../components/NavBar";
import Header from "~/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} w-screen`}>
        <ClerkProvider>
          <TRPCReactProvider>
            <Header />
            {children}
          </TRPCReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
