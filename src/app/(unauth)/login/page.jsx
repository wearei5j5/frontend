'use client';

import Logo from '@public/logo-otte.svg';
import KakaoIcon from '@public/icon-kakaotalk.svg';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/code/kakao?state=/mypage`;
  };

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div className='mb-2.5'>
        <Logo width='106' height='100%' />
      </div>
      <div className='text-g200 text-sm mb-4'>
        나만의 취향저격 영화 추천은 오때?
      </div>

      <div className='relative w-[274px] aspect-square'>
        <Image src='/home-character.png' alt='character img' fill />
      </div>
      <div className='w-full px-5'>
        <div
          onClick={handleKakaoLogin}
          className='w-full cursor-pointer text-sm bg-[#FEE500] rounded-lg py-3.5 text-center text-black font-medium relative'
        >
          카카오톡으로 시작하기
          <KakaoIcon className='absolute top-3 left-5' />
        </div>
      </div>
    </div>
  );
}
