'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplashScreen from './_components/SplashScreen';
import BaseTemplate from './templates/BaseTemplate';

export default function Home() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BaseTemplate>
      {isHome && showSplash ? <SplashScreen /> : <>Carousel</>}
    </BaseTemplate>
  );
}
