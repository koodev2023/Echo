import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/custom/NavBar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react";
import Provider from "@/providers/Provider";
// import { SessionProvider } from "next-auth/react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Koo Blog | 軟件工程部落格",
    template: "%s - Koo Blog | 軟件工程部落格",
  },
  description:
    "Welcome to Koo Blog, your go-to source for insights and discussions on software engineering, development practices, and industry trends.",
  twitter: {
    card: "summary_large_image",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${roboto.className}`}>
        <meta charSet="utf-8" />
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Provider>
              {/* h-max enable sticky header */}
              <div className="flex flex-col gap-0 h-max justify-start items-center">
                <NavBar />
                <div className="px-5 w-full max-w-screen-lg">{children}</div>
                {/* <Footer /> */}
              </div>
            </Provider>
          </ThemeProvider>
        </SessionProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
