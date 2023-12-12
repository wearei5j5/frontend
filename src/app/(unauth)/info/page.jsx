'use client';

import { isFirstState } from '@/store/initInfo/atom';
import Slider from 'react-slick';

import ArrowLeftIcon from '@public/icon-arrow-left.svg';

import Link from 'next/link';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './_styles/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import NetflixIcon from '@public/icon-netflix.svg';
import TvingIcon from '@public/icon-tving.svg';
import DisneyPlusIcon from '@public/icon-disney-plus.svg';
import CoupangPlayIcon from '@public/icon-coupang-play.svg';
import WatchaIcon from '@public/icon-watcha.svg';
import WavveIcon from '@public/icon-wavve.svg';
import AppleTvIcon from '@public/icon-apple-tv.svg';
import SeeznIcon from '@public/icon-seezn.svg';

import RcSlider from './_components/RcSlider';
import { userInfoState } from '@/store/userInfo/atom';

export default function Info() {
  const setIsFirst = useSetRecoilState(isFirstState);
  const router = useRouter();

  const [slideCount, setSlideCount] = useState([0, 1, 2]);
  const [slideIndex, setSlideIndex] = useState(0);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const sliderRef = useRef(null);

  const ottServices = [
    [
      {
        value: 'tving',
        name: '티빙',
        icon: <TvingIcon />,
      },
      {
        value: 'netflix',
        name: '넷플릭스',
        icon: <NetflixIcon />,
      },
      {
        value: 'coupang play',
        name: '쿠팡플레이',
        icon: <CoupangPlayIcon />,
      },
    ],
    [
      {
        value: 'seezn',
        name: '시즌',
        icon: <SeeznIcon />,
      },
      {
        value: 'disney plus',
        name: '디즈니플러스',
        icon: <DisneyPlusIcon />,
      },
      {
        value: 'watcha',
        name: '왓차',
        icon: <WatchaIcon />,
      },
    ],
    [
      {
        value: 'wavve',
        name: '웨이브',
        icon: <WavveIcon />,
      },
      {
        value: 'apple tv',
        name: '애플티비',
        icon: <AppleTvIcon />,
      },
    ],
  ];

  const handleNextButton = () => {
    if (slideIndex === 2) {
      setIsFirst(false);
      router.push('/');
      return;
    }
    sliderRef.current.slickNext();
  };

  const handlePrevButton = () => {
    if (slideIndex === 0) {
      router.back();
      return;
    }
    sliderRef.current.slickPrev();
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    draggable: false,
    swipe: false,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  console.log(userInfo);

  const handleChangeAge = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      age: e,
    }));
  };

  const handleClickOtt = (value) => {
    if (userInfo.ott.includes(value)) {
      const newItems = userInfo.ott.filter((item) => item !== value);
      console.log('new ITEM', newItems);
      setUserInfo((prev) => ({ ...prev, ott: newItems }));
    } else {
      // setSelectedDivs([...selectedDivs, id]);
      setUserInfo((prev) => ({ ...prev, ott: [...prev.ott, value] }));
    }
  };

  // const isSelected = ottServices
  //   .flat()
  //   .filter((item) => userInfo.ott.includes(item.value));
  // console.log(isSelected);

  return (
    <div className='flex flex-col h-full'>
      <header className='px-4 py-2 sm:px-5'>
        <ArrowLeftIcon className='cursor-pointer' onClick={handlePrevButton} />
      </header>
      <div className='grow overflow-auto'>
        <div className='flex space-x-0.5'>
          {slideCount.map((item, i) => (
            <div
              key={i}
              className='w-full bg-[#E2E2E2] rounded-full sm:h-2 h-1.5 mb-4'
            >
              <div
                className={`sm:h-2 h-1.5 rounded-full ${
                  item <= slideIndex ? 'bg-main' : 'bg-[#E2E2E2]'
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className='flex flex-col justify-between h-[calc(100%-56px)] overflow-hidden'>
          <Slider {...settings} ref={sliderRef} className='flex-1'>
            <div className='px-5 sm:px-6'>
              <div className='text-2xl font-bold text-g400 sm:mb-4 mb-3'>
                뭐라고 불러드릴까요?
              </div>
              <div className='text-sm text-g100 mb-14'>이름을 입력해주세요</div>
              <div>
                <input
                  type='text'
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  id='name'
                  className='bg-white border border-gray-300 text-gray-900 sm:text-base text-sm block w-full sm:p-4.5 p-3.5 rounded-xl focus:border-main focus:outline-none'
                  placeholder='이름을 입력해주세요 (3~5자)'
                  required
                />
              </div>
            </div>
            <div className='px-5 sm:px-6'>
              <div className='text-2xl font-bold text-g400 sm:mb-3 mb-2'>
                연령대를 선택해주세요
              </div>
              <div className='text-sm text-g100 mb-14'>나이를 입력해주세요</div>
              <div className='relative mb-6 range-slide'>
                <RcSlider value={userInfo.age} onChange={handleChangeAge} />
              </div>
            </div>
            <div className='px-5 sm:px-6'>
              <div className='text-2xl font-bold text-g400 sm:mb-3 mb-2 break-keep'>
                현재 구독중인 OTT서비스를 선택해주세요
              </div>
              <div className='text-sm text-g100 mb-9 sm:mb-14'>
                이 설정은 나중에 다시 수정할 수 있어요
              </div>
              <div className='flex flex-col sm:space-y-6 space-y-3'>
                {ottServices.map((item, i) => (
                  <div
                    key={i}
                    className='flex justify-center sm:space-x-6 space-x-3'
                  >
                    {item.map((ott) => (
                      <div
                        onClick={() => handleClickOtt(ott.value)}
                        key={ott.value}
                        className={`sm:w-32 w-[102px] sm:h-32 h-[102px] rounded-3xl  py-3 px-2.5 flex flex-col justify-center items-center   ${
                          userInfo.ott.find((el) => el === ott.value)
                            ? 'shadow-line bg-v50'
                            : 'shadow-square'
                        }`}
                      >
                        {ott.icon}
                        <div className='text-g200 font-semibold text-sm mt-2'>
                          {ott.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Slider>
          <div className='px-5 sm:px-6'>
            <button
              className='w-full bg-main rounded-lg text-white py-3.5 disabled:bg-light-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300'
              onClick={handleNextButton}
              disabled={
                (slideIndex === 0 && userInfo.name === '') ||
                (slideIndex === 1 && userInfo.age === 0) ||
                (slideIndex === 2 && userInfo.ott.length === 0)
              }
            >
              {slideIndex === 2 ? '시작하기' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
