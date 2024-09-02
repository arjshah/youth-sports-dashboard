'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

// Define paths that should not use the default Layout
const noLayoutPaths = new Set(['/checkout']);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Convert the Set to an array before iterating over it
  const noLayoutPathsArray = Array.from(noLayoutPaths);

  // Check if the current path starts with any of the paths that should not have the layout
  const shouldUseLayout = pathname ? !noLayoutPathsArray.some(path => pathname.startsWith(path)) : true;

  return (
    <html lang="en">
      <body className={inter.className}>
        {shouldUseLayout ? <Layout>{children}</Layout> : children}
      </body>
    </html>
  );
}