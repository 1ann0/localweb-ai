import type { Metadata } from "next";
import { Syne, Manrope } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://localwebai.com"),
  title: {
    default: "LocalWebAI - AI-Powered Websites for Local Businesses",
    template: "%s | LocalWebAI",
  },
  description: "Create stunning, mobile-friendly websites for your local business in seconds. Upload a flyer or menu and let AI do the rest.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "LocalWebAI",
    title: "LocalWebAI - AI-Powered Websites for Local Businesses",
    description: "Create stunning, mobile-friendly websites for your local business in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalWebAI - AI-Powered Websites for Local Businesses",
    description: "Create stunning, mobile-friendly websites for your local business in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} ${manrope.variable} font-sans antialiased`}>
        <AuthProvider>
          {children}
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'rgba(30, 30, 46, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#e2e8f0',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
