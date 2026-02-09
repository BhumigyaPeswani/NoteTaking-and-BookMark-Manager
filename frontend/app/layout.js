import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Draftly - Notes & Bookmarks",
  description: "A minimal notes and bookmarks manager for organizing your thoughts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light">
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        style={{ fontFamily: "'Inter', var(--font-geist-sans), system-ui, sans-serif" }}
      >
        <AuthProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-1 py-10">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
