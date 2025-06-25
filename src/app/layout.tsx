import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { AppLayoutClient } from "~/components/app-layout-client";
import { ThemeProvider } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
  title: "Intello AI",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppLayoutClient>{children}</AppLayoutClient>
        </ThemeProvider>
      </body>
    </html>
  );
}
