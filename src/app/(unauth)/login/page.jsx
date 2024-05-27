'use client';

import Logo from '@public/icons/logo-otte.svg';
import KakaoIcon from '@public/icons/icon-kakaotalk.svg';
import Image from 'next/image';
import Button from '@/app/_components/Button';
import Link from 'next/link';
import { API_URL } from '@/constants/common';

export default function Login() {
  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/code/kakao?state=/mypage`;
  };

  return (
    <div className="h-full flex flex-col items-center justify-around">
      <div></div>
      <div className="flex flex-col justify-center items-center">
        <Link href="/" className="mb-2.5">
          <Logo width="106" height="100%" />
        </Link>
        <div className="text-g200 text-sm mb-4">나만의 취향저격 영화 추천은 오때?</div>

        <div className="relative w-[274px] aspect-square">
          <Image src="/imgs/home-character.png" alt="character img" fill />
        </div>
      </div>
      <div className="w-full px-5">
        <Button
          bgColor="bg-kakao"
          textColor="text-black"
          onClick={handleKakaoLogin}
          icon={<KakaoIcon className="absolute top-3 left-5" />}
          text="카카오톡으로 시작하기"
          isLink={false}
        />
      </div>
    </div>
  );
}
