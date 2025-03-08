import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import { NextAppProvider } from '@toolpad/core/nextjs';
import { DashboardLayout } from "@toolpad/core";
import { PageContainer } from '@toolpad/core/PageContainer';
import { Suspense } from "react";
import LinearProgress from '@mui/material/LinearProgress';

import theme from './theme';
import { NAVIGATION } from './navigation';
import { BRANDING } from './branding';
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <Suspense fallback={<LinearProgress />}>
            <NextAppProvider branding={BRANDING} navigation={NAVIGATION}>
              <ThemeProvider theme={theme}>
                <DashboardLayout>
                  <PageContainer>
                    {children}
                  </PageContainer>
                </DashboardLayout>
              </ThemeProvider>
            </NextAppProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body >
    </html >
  );
}
