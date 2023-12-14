'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';
import KakaoIcon from '@public/icon-kakaotalk.svg';

import './_styles/slider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { isFirstState } from '@/store/initInfo/atom';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OnBoarding() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const isFirst = useRecoilValue(isFirstState);
  console.log('isFirst?', isFirst);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => <ul>{dots}</ul>,
    dotsClass: 'dots-custom',
  };

  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/code/kakao?state=/`;
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className='bg-white flex flex-col justify-between px-6 pb-8 pt-10 sm:px-10 h-full'>
          <div className='h-full'>
            <Slider {...settings}>
              <div className='flex justify-center align-center h-full'>
                <div className='text-sm text-g300 text-center'>
                  내가 구독하고 있는 OTT를 한 번에!
                </div>
                <div className='text-[22px] text-g300 text-center font-bold mb-10'>
                  OTT 통합 추천 서비스
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/onboarding1.png")] bg-contain'></div>
              </div>
              <div className='flex flex-col justify-center align-center h-full'>
                <div className='text-sm text-g300 text-center'>
                  당신을 위한 오때의 만능 AI 이오지오의
                </div>
                <div className='text-[22px] text-g300 text-center font-bold mb-10'>
                  당신에게 꼭 맞는 작품 추천
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/onboarding2.png")] bg-contain'></div>
              </div>
              <div className='flex flex-col justify-center align-center h-full'>
                <div className='text-sm text-g300 text-center'>
                  원하는 영화는 저장하고 두고두고 꺼내보세요
                </div>
                <div className='text-[22px] text-g300 text-center font-bold mb-10'>
                  나의 콘텐츠 노트 기능
                </div>
                <div className='slide-content-img relative h-full bg-bottom-4 bg-no-repeat bg-[url("/onboarding3.png")] bg-contain'></div>
              </div>
            </Slider>
          </div>

          <div className='flex flex-col items-center'>
            <div
              onClick={handleKakaoLogin}
              className='w-full bg-[#FEE500] rounded-lg py-3.5 text-center text-black font-medium relative'
            >
              카카오톡으로 시작하기
              <KakaoIcon className='absolute top-4 left-5' />
            </div>

            <Link
              href='/info'
              className='w-full bg-main rounded-lg text-white py-3.5 text-center mt-3 font-medium'
            >
              로그인 없이 사용하기
            </Link>
            <div className='mt-3 px-4 py-2.5 bg-[#BFBFBF] text-white text-xs text-center rounded-2xl w-fit relative before:border-[#BFBFBF] before:w-0 before:h-0 before:border-l-[4px] before:border-l-transparent before:border-b-[5px]  before:border-r-[4px] before:border-r-transparent before:absolute before:bottom-9 before:left-1/2'>
              ⚠️추천된 영화 저장하기 기능을 사용할 수 없어요!⚠️
            </div>
          </div>
        </div>
      )}
    </>
  );
}
