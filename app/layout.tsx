import type {Metadata} from "next";
import {Plus_Jakarta_Sans as FontSans} from "next/font/google";
import "./globals.css";
import React from "react";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider"

const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '800',],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: 'CarePulse',
    description: 'A healthcare management system',
    icons: {
        icon: '/assets/icons/logo-icon.svg',
    },
}

function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang={'en'} suppressHydrationWarning>
        <body className={cn('min-h-screen bg-dark-300 font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute={'class'} defaultTheme={'dark'}>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}

export default RootLayout;
