import './globals.css';
import RecoilRootProvider from '@/util/recoilRootProvider';
import TanstackProvider from '@/util/tanstackProvider';
import MixpanelProvider from './_components/MixpanelProvider';

export const metadata = {
  title: 'OTTE',
  description: 'Generated by create i5j5',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <MixpanelProvider>
          <RecoilRootProvider>
            <TanstackProvider>{children}</TanstackProvider>
          </RecoilRootProvider>
        </MixpanelProvider>
      </body>
    </html>
  );
}
