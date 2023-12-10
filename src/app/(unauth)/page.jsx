'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { isFirstState } from '@/store/initInfo/atom';
import Link from 'next/link';

export default function Home() {
  const isFirst = useRecoilValue(isFirstState);

  useEffect(() => {
    if (isFirst) {
      redirect('/onboarding');
      return null;
    }
  }, [isFirst]);

  return (
    <div>
      <div>HOME</div>
      {/* <div>
        <Link
          href='/chat'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Chat Button
        </Link>
      </div>
      <div>
        <Link
          href='/mypage'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Mypage Button
        </Link>
      </div> */}
    </div>
  );
}
