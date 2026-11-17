import type { Metadata } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "The Scent Affair | Deo's Hub",
  description:
    "Only sales of the year. The Scent Affair runs 27th Nov – 1st Dec. Shop discounted perfumes at Deo's Hub and checkout on WhatsApp 09161848921.",
  applicationName: "Deo's Hub",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  openGraph: {
    title: "The Scent Affair | Deo's Hub",
    description:
      "Only sales of the year. Shop discounted perfumes and checkout on WhatsApp.",
    images: [
      {
        url: "/images/logo-deos.png",
        width: 800,
        height: 800,
        alt: "Deo's Hub",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
