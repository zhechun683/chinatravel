import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";

import Provider from "@/hooks/useGlobalContext";
import { DatabaseProvider } from "@/components/providers/DatabaseProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "ChinaTravel - Explore China",
  description: "Discover the beauty of China with ChinaTravel",
  manifest: "/manifest.json",
  icons: {
    icon: "/china.svg",
    shortcut: "/china.svg",
    apple: "/china.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChinaTravel",
  },
  applicationName: "ChinaTravel",
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#3258E8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Provider>
          <DatabaseProvider>{children}</DatabaseProvider>
        </Provider>
      </body>
    </html>
  );
}
