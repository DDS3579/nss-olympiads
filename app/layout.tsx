import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO: replace with your production domain
  metadataBase: new URL("https://nss-olympiad-hub.vercel.app"),
  title: "NSS Olympiad Hub",
  description:
    "Free preparation material, model question papers, and structured roadmaps for 7 Olympiads — built by NSS Clubs for Grade 11 & 12 students.",
  keywords: [
    "Olympiad", "NSS", "IMO", "IPhO", "IChO", "IOI", "IOAA", "IBO",
    "Nepal", "preparation", "model papers", "roadmap",
  ],
  openGraph: {
    type: "website",
    title: "NSS Olympiad Hub",
    description:
      "Free Olympiad preparation for NSS students — study material, model papers, and roadmaps for 7 disciplines.",
    url: "/",
    siteName: "NSS Olympiad Hub",
    locale: "en_US",
    // TODO: add an OG image at /public/og.png, then uncomment:
    // images: [{ url: "/og.png", width: 1200, height: 630, alt: "NSS Olympiad Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSS Olympiad Hub",
    description:
      "Free Olympiad preparation for NSS students — 7 disciplines, model papers, and roadmaps.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="font-body bg-background text-foreground antialiased min-h-screen flex flex-col">
        {/* Skip link (accessibility) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main id="main" className="flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}