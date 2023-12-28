'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';
import KakaoIcon from '@public/icons/icon-kakaotalk.svg';

import Button from '@/app/_components/Button';

import './_styles/slider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OnBoarding() {
  const [showSplash, setShowSplash] = useState(true);

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

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="bg-white flex flex-col justify-between px-6 pb-8 pt-10 sm:px-10 h-full">
          <div className="h-full">
            <Slider {...settings}>
              <div className="flex justify-center align-center h-full">
                <div className="text-sm text-g300 text-center">
                  내가 구독하고 있는 OTT를 한 번에!
                </div>
                <div className="text-[22px] text-g300 text-center font-bold mb-10">
                  OTT 통합 콘텐츠 추천 서비스
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/imgs/onboarding1.png")] bg-contain'></div>
              </div>
              <div className="flex flex-col justify-center align-center h-full">
                <div className="text-sm text-g300 text-center">
                  당신을 위한 오때의 만능 AI 이오지오의
                </div>
                <div className="text-[22px] text-g300 text-center font-bold mb-10">
                  당신에게 꼭 맞는 콘텐츠 추천
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/imgs/onboarding2.png")] bg-contain'></div>
              </div>
              <div className="flex flex-col justify-center align-center h-full">
                <div className="text-sm text-g300 text-center">
                  원하는 영화는 저장하고 두고두고 꺼내보세요
                </div>
                <div className="text-[22px] text-g300 text-center font-bold mb-10">
                  나의 콘텐츠 수첩 기능
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/imgs/onboarding3.png")] bg-contain'></div>
              </div>
            </Slider>
          </div>

          <div className="flex flex-col items-center">
            <Button
              bgColor="bg-[#FEE500]"
              textColor="text-black"
              onClick={handleKakaoLogin}
              icon={<KakaoIcon className="absolute top-3 left-5" />}
              text="카카오톡으로 시작하기"
              isLink={false}
            />
            <Button
              isLink={true}
              href="/info"
              textColor="text-white"
              bgColor="bg-main"
              text="로그인 없이 사용하기"
              styleClass="mt-3"
            />

            <div className="mt-3 px-4 py-2.5 bg-[#BFBFBF] text-white text-xs text-center rounded-2xl w-fit relative before:border-[#BFBFBF] before:w-0 before:h-0 before:border-l-[4px] before:border-l-transparent before:border-b-[5px]  before:border-r-[4px] before:border-r-transparent before:absolute before:bottom-9 before:left-1/2">
              ⚠️나의 OTT 콘텐츠 수첩 기능을 사용할 수 없어요️⚠️
            </div>
          </div>
        </div>
      )}
    </>
  );
}
