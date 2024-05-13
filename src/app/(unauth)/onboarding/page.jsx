'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';
import KakaoIcon from '@public/icons/icon-kakaotalk.svg';

import Button from '@/app/_components/Button';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/userInfo/atom';
import { useRouter } from 'next/navigation';
import { isTemporaryState } from '@/store/initInfo/atom';
import OnbaordingSlider from '@/app/_components/OnboardingSlider';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Onboarding() {
  const [showSplash, setShowSplash] = useState(true);
  const [isTemp, setIsTemp] = useRecoilState(isTemporaryState);
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'dots-custom',
  };

  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/code/kakao?state=/info`;
  };

  const handleClickTemp = () => {
    setIsTemp(true);

    if (userInfo.name !== '' && userInfo.age !== 0) {
      router.push('/');
    } else {
      router.push('/info');
    }
  };

  const contents = [
    {
      title: 'OTT 통합 콘텐츠 추천 서비스',
      subtitle: '내가 구독하고 있는 OTT를 한 번에!',
      imagePath: '/imgs/onboarding1.png',
    },
    {
      title: '당신에게 꼭 맞는 콘텐츠 추천',
      subtitle: '당신을 위한 오때의 만능 AI 이오지오의',
      imagePath: '/imgs/onboarding2.png',
    },
    {
      title: '나의 콘텐츠 수첩 기능',
      subtitle: '원하는 영화는 저장하고 두고두고 꺼내보세요',
      imagePath: '/imgs/onboarding3.png',
    },
  ];

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="bg-white flex flex-col justify-between px-6 pb-8 pt-10 sm:px-10 h-full">
          <div className="h-full">
            <OnbaordingSlider contents={contents} />
          </div>

          <div className="flex flex-col items-center">
            <Button
              bgColor="bg-kakao"
              textColor="text-black"
              onClick={handleKakaoLogin}
              icon={<KakaoIcon className="absolute top-3 left-5" />}
              text="카카오톡으로 시작하기"
              isLink={false}
            />
            <Button
              isLink={false}
              onClick={handleClickTemp}
              // href={userInfo ? '/info' : '/'}
              textColor="text-white"
              bgColor="bg-main"
              text="로그인 없이 사용하기"
              styleClass="mt-3"
            />

            <div className="mt-3 px-4 py-2.5 bg-b400 text-white text-xs text-center rounded-2xl w-fit relative before:border-b400 before:w-0 before:h-0 before:border-l-[4px] before:border-l-transparent before:border-b-[5px]  before:border-r-[4px] before:border-r-transparent before:absolute before:bottom-9 before:left-1/2">
              ⚠️나의 OTT 콘텐츠 수첩 기능을 사용할 수 없어요️⚠️
            </div>
          </div>
        </div>
      )}
    </>
  );
}
