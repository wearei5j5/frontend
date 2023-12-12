'use client';

import { redirect } from 'next/navigation';
import { useEffect } from 'react';

import { useRecoilValue } from 'recoil';
import { isFirstState } from '@/store/initInfo/atom';
import Link from 'next/link';

import Logo from '@public/logo-otte.svg';
import MypageIcon from '@public/icon-mypage.svg';
import Image from 'next/image';

export default function Home() {
  const isFirst = useRecoilValue(isFirstState);

  useEffect(() => {
    if (isFirst) {
      redirect('/onboarding');
    }
  }, [isFirst]);

  return (
    <>
      <header className='h-16 w-full py-2 px-5 flex items-center justify-between mb-8 sm:mb-10'>
        <Link href='/'>
          <Logo className='cursor-pointer' />
        </Link>
        <Link href='/mypage'>
          <MypageIcon className='cursor-pointer ' />
        </Link>
      </header>
      <div className='flex flex-col justify-between h-[calc(100%-96px)]'>
        <div>
          <div className='flex justify-center text-center text-g200 text-xl mb-6 sm:mb-10'>
            이오지오가 추천하는 <br /> 나만의 콘텐츠 보러가는 거, 오때?
          </div>
          <div className='px-16 flex justify-center mb-4 sm:mb-8'>
            <div className='shadow-square text-center py-4 px-10 rounded-xl text-sm text-g100 sm:w-[300px]'>
              반가워요 저는 이오지오에요
            </div>
          </div>
          <div className='border-w border-main bg-bg-home bg-center w-full h-64 sm:h-96 bg-contain sm:bg-contain bg-no-repeat flex justify-center'>
            <Image
              src='/home-character.png'
              alt='character img'
              width={270}
              height={270}
              style={{ height: 'fit-content' }}
            />
          </div>
        </div>
        <div className=' px-6 py-6 flex flex-col'>
          <Link
            href='/chat'
            className='w-full bg-main rounded-lg text-white py-3.5 text-center font-medium'
          >
            이오지오와 대화 시작하기
          </Link>

          <Link
            href='/mypage'
            className='w-full bg-v100 rounded-lg text-white py-3.5 text-center mt-3 font-medium'
          >
            나의 콘텐츠 노트 보러가기
          </Link>
        </div>
      </div>
    </>
  );
}
