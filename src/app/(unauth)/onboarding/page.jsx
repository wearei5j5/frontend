'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';
import NetflixIcon from '@public/icon-netflix.svg';
import TvingIcon from '@public/icon-tving.svg';
import DisneyPlusIcon from '@public/icon-disney-plus.svg';
import CoupangPlayIcon from '@public/icon-coupang-play.svg';
import WatchaIcon from '@public/icon-watcha.svg';
import WavveIcon from '@public/icon-wavve.svg';
import AppleTvIcon from '@public/icon-apple-tv.svg';
import SeeznIcon from '@public/icon-seezn.svg';
import KakaoIcon from '@public/icon-kakaotalk.svg';

import './_styles/slider.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function OnBoarding() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className='bg-white flex flex-col justify-between px-6 pb-8 pt-10 sm:px-10 h-full'>
          <div className='h-full'>
            <Slider {...settings}>
              <div className='flex flex-col justify-between align-center h-full'>
                <div className='text-center'>OTT 통합</div>
                <div className='h-full flex flex-col justify-center'>
                  <div className='flex justify-evenly'>
                    <NetflixIcon />
                    <TvingIcon />
                    <DisneyPlusIcon />
                  </div>
                  <div className='flex justify-evenly'>
                    <CoupangPlayIcon />
                    <WatchaIcon />
                    <WavveIcon />
                  </div>
                  <div className='flex justify-evenly'>
                    <AppleTvIcon />
                    <SeeznIcon />
                  </div>
                </div>
              </div>
              <div className='flex flex-col justify-between align-center h-full'>
                <div className='text-center break-keep'>
                  오때의 만능 AI, 이오지오가 수많은 OTT 콘텐츠들 중 지금의
                  당신에게 꼭 맞는 작품을 골라줘요!
                </div>
              </div>

              <div className='flex flex-col justify-between align-center h-full'>
                <div className='text-center'>저장 기능</div>
                <div className='flex justify-center items-center h-full'>
                  <Image
                    src='/onboarding-character.svg'
                    width={200}
                    height={58}
                    alt='dummy img'
                  />
                </div>
              </div>
            </Slider>
          </div>

          {/* <Slider {...settings}>
            <div className='h-full min-h-full'>
              <div className='flex-1'>
                <Image
                  src='https://dummyimage.com/200x300/cfcfcf/000000'
                  width={0}
                  height={0}
                  style={{ width: '100%', height: 'auto' }}
                  sizes='100vw'
                  unoptimized
                  className='object-cover'
                  alt='dummy img'
                />
              </div>
            </div>
            <div className='h-full'>
              <Image
                src='https://dummyimage.com/200x300/cfcfcf/000000'
                width={0}
                height={0}
                unoptimized
                className='object-cover'
                alt='dummy img'
              />
            </div>
            <div className='h-full'>
              <Image
                src='https://dummyimage.com/200x300/cfcfcf/000000'
                width={0}
                height={0}
                unoptimized
                className='object-cover'
                alt='dummy img'
              />
            </div>
          </Slider> */}
          <div className='flex flex-col'>
            <Link
              href='/login'
              className='w-full bg-[#FEE500] rounded-lg py-3.5 text-center text-black font-medium relative'
            >
              카카오톡으로 시작하기
              <KakaoIcon className='absolute top-4 left-5' />
            </Link>

            <Link
              href='/info'
              className='w-full bg-main rounded-lg text-white py-3.5 text-center mt-3 font-medium'
            >
              로그인 없이 사용하기
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
