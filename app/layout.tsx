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
    icon: [{ url: "/images/logo-deos.png", type: "image/png" }],
    apple: [{ url: "/images/logo-deos.png", type: "image/png" }],
    shortcut: ["/images/logo-deos.png"],
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
