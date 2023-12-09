'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';

export default function OnBoarding() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className='flex flex-col flex-wrap '>
          <div className='mx-auto h-12 border-gray-600'> Carousel</div>
          <div className='mx-auto h-12 border-gray-600'>
            <Link
              href='/info'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Init Info Button
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
