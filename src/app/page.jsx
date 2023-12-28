'use client';

import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isFirstState } from '@/store/initInfo/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import Link from 'next/link';

import Logo from '@public/icons/logo-otte.svg';
import MypageIcon from '@public/icons/icon-mypage.svg';
import Image from 'next/image';
import SplashScreen from './_components/SplashScreen';
import Button from './_components/Button';

export default function Home() {
  const [welcomeText, setWelcomeText] = useState('반가워요 저는 이오지오에요');

  const isFirst = useRecoilValue(isFirstState);

  useEffect(() => {
    if (isFirst) {
      redirect('/onboarding');
    }
  }, [isFirst]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeText('당신에게 딱 맞는 영화를 추천해줄게요!');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return isFirst ? (
    <SplashScreen />
  ) : (
    <>
      <header className="h-16 w-full py-2 px-5 flex items-center justify-between">
        <Link href="/">
          <Logo width="64" height="100%" className="cursor-pointer" />
        </Link>
        <Link href="/mypage">
          <MypageIcon className="cursor-pointer " />
        </Link>
      </header>
      <div className="flex flex-col justify-between h-[calc(100%-64px)] pt-8 sm:pt-10 overflow-y-auto">
        <div>
          <div className="flex justify-center text-center text-g200 text-xl mb-6 sm:mb-10">
            <div>
              AI 이오지오가 추천하는 <br />
              나만의 추천 영화 보러가는 거,
              <span className="font-semibold">오때?</span>
            </div>
          </div>
          <div className="px-8 flex justify-center mb-4 sm:mb-8">
            <div className="shadow-square text-center py-4 px-10 rounded-xl text-sm text-g100 sm:w-[300px]">
              {welcomeText}
            </div>
          </div>

          <div
            className="border-w border-main bg-cover bg-center bg-no-repeat w-full h-64 sm:h-96 sm:bg-contain flex justify-center"
            style={{
              backgroundImage: 'url("/imgs/bg-home.png")',
            }}
          >
            <Image
              src="/imgs/home-character.png"
              alt="character img"
              width={270}
              height={270}
              style={{ height: 'fit-content' }}
            />
          </div>
        </div>

        <div className=" px-6 py-6 flex flex-col">
          <Button
            isLink={true}
            href="/chat"
            textColor="text-white"
            bgColor="bg-main"
            text="이오지오와 대화 시작하기"
          />
          <Button
            isLink={true}
            href="/mypage"
            textColor="text-white"
            bgColor="bg-v100"
            text="나의 콘텐츠 노트 보러가기"
            styleClass="mt-3"
          />
        </div>
      </div>
    </>
  );
}
