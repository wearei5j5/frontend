'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplashScreen from './_components/SplashScreen';

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
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidde bg-gray-100'>
      <div className='absolute inset-0'></div>
      <div className='flex-1 h-full relative bg-white shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:min-w-[600px] overflow-hidden'>
        {isHome && showSplash ? <SplashScreen /> : <>Carousel</>}
      </div>
    </div>
  );
}
