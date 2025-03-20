import "~/styles/globals.css";

import { type Metadata } from "next";
import { Roboto } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/app/_components/navbar/navbar";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Nutrición inteligente",
  description: "Seguí tu progreso día a día",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "500", "700", "900"],
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();

  return (
    <html lang="en" className={`${roboto.className}`}>
      <body>
        <TRPCReactProvider>
          <div className="from-secondary to-tertiary max-w-screen bg-linear-to-b text-white">
            <div className="flex max-w-7xl mx-auto relative">
            {session && <Navbar user={session.user} />}
            <div className="flex-grow overflow-hidden">
              {children}
            </div>
            </div>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
