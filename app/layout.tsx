import { Inter } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Next Docs Template",
    description: "An example docs website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`flex flex-col min-h-screen ${inter.className}`}>
                <nav className="sticky top-0 w-full h-12 border-b bg-background">
                    <div className="container w-full h-full flex flex-row items-center">
                        <Link href="/" className="font-bold text-foreground">
                            Template Docs
                        </Link>
                    </div>
                </nav>
                {children}
            </body>
        </html>
    );
}
