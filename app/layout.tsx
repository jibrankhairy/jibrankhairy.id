import NextTopLoader from "nextjs-toploader";
import Script from "next/script";
import { getServerSession } from "next-auth";
import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import "./globals.css";

import Layouts from "@/common/components/layouts";
import ThemeProviderContext from "@/common/stores/theme";
// import NextAuthProvider from "@/SessionProvider";
import { METADATA } from "@/common/constants/metadata";
// import { onestSans } from "@/common/styles/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.DOMAIN || "https://jibrankhry-id.vercel.app",
  ),
  description: METADATA.description,
  keywords: METADATA.keyword,
  creator: METADATA.creator,
  authors: {
    name: METADATA.creator,
    url: METADATA.openGraph.url,
  },
  openGraph: {
    url: METADATA.openGraph.url,
    siteName: METADATA.openGraph.siteName,
    locale: METADATA.openGraph.locale,
    type: "website",
  },
};

const RootLayout = async ({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  const messages = await getMessages();
  // const session = await getServerSession();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="8e2c9f27-a12b-48ca-8130-808ebe377aca"
      />
      {/* Tambahkan class background default + dark mode fallback di body */}
      {/* <body
        className={`${onestSans.className} bg-white text-black dark:bg-neutral-900 dark:text-white`}
      > */}
      <body className="font-onest bg-white text-black dark:bg-neutral-900 dark:text-white">
        <NextTopLoader
          color="#05b6d3"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #05b6d3,0 0 5px #45c6c0"
        />
        <NextIntlClientProvider messages={messages}>
          {/* <NextAuthProvider session={session}> */}
          <ThemeProviderContext>
            <Layouts>{children}</Layouts>
          </ThemeProviderContext>
          {/* </NextAuthProvider> */}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
