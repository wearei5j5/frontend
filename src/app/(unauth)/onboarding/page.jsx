'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import Link from 'next/link';
import SplashScreen from '@/app/_components/SplashScreen';
import netflixIcon from '../../../../public/icon-netflix.svg';
import tvingIcon from '../../../../public/icon-tving.svg';
import disneyPlusIcon from '../../../../public/icon-disney-plus.svg';
import coupangPlayIcon from '../../../../public/icon-coupang-play.svg';
import watchaIcon from '../../../../public/icon-watcha.svg';
import wavveIcon from '../../../../public/icon-wavve.svg';
import appleTvIcon from '../../../../public/icon-apple-tv.svg';
import seeznIcon from '../../../../public/icon-seezn.svg';

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
                    <Image
                      src={netflixIcon}
                      width={86}
                      height={58}
                      alt='dummy img'
                    />
                    <Image
                      src={tvingIcon}
                      width={86}
                      height={58}
                      alt='dummy img'
                    />
                    <Image
                      src={disneyPlusIcon}
                      width={86}
                      height={58}
                      alt='dummy img'
                    />
                  </div>
                  <div className='flex justify-evenly'>
                    <Image
                      src={coupangPlayIcon}
                      width={86}
                      height={58}
                      // style={{ width: '100%', height: 'auto' }}
                      // unoptimized
                      // className='object-cover'
                      alt='dummy img'
                    />
                    <Image
                      src={watchaIcon}
                      width={86}
                      height={58}
                      // style={{ width: '100%', height: 'auto' }}
                      // unoptimized
                      // className='object-cover'
                      alt='dummy img'
                    />
                    <Image
                      src={wavveIcon}
                      width={86}
                      height={58}
                      // style={{ width: '100%', height: 'auto' }}
                      // unoptimized
                      // className='object-cover'
                      alt='dummy img'
                    />
                  </div>
                  <div className='flex justify-evenly'>
                    <Image
                      src={appleTvIcon}
                      width={86}
                      height={58}
                      // style={{ width: '100%', height: 'auto' }}
                      // unoptimized
                      // className='object-cover'
                      alt='dummy img'
                    />
                    <Image
                      src={seeznIcon}
                      width={86}
                      height={58}
                      // style={{ width: '100%', height: 'auto' }}
                      // unoptimized
                      // className='object-cover'
                      alt='dummy img'
                    />
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
            <div className='mx-auto h-12 border-gray-600 mt-12'>
              <Link
                href='/login'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                카카오톡으로 시작하기
              </Link>
            </div>
            <div
              className='mx-auto h-12 bo
          rder-gray-600'
            >
              <Link
                href='/info'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              >
                로그인 없이 사용하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
