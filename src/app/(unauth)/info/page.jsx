'use client';

import Slider from 'react-slick';

import ArrowLeftIcon from '@public/icons/icon-arrow-left.svg';

import { useRecoilState, useSetRecoilState } from 'recoil';

import './_styles/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import NetflixIcon from '@public/icons/icon-netflix.svg';
import TvingIcon from '@public/icons/icon-tving.svg';
import DisneyPlusIcon from '@public/icons/icon-disney-plus.svg';
import CoupangPlayIcon from '@public/icons/icon-coupang-play.svg';
import WatchaIcon from '@public/icons/icon-watcha.svg';
import WavveIcon from '@public/icons/icon-wavve.svg';
import AppleTvIcon from '@public/icons/icon-apple-tv.svg';
import SeeznIcon from '@public/icons/icon-seezn.svg';

import RcSlider from './_components/RcSlider';
import { userInfoState } from '@/store/userInfo/atom';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Info() {
  const router = useRouter();

  const [slideCount, setSlideCount] = useState([0, 1, 2]);
  const [slideIndex, setSlideIndex] = useState(0);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const sliderRef = useRef(null);

  const ottServices = [
    {
      value: 'TVING',
      name: '티빙',
      icon: <TvingIcon />,
    },
    {
      value: 'NETFLIX',
      name: '넷플릭스',
      icon: <NetflixIcon />,
    },
    {
      value: 'COUPANG_PLAY',
      name: '쿠팡플레이',
      icon: <CoupangPlayIcon />,
    },

    {
      value: 'SEEZN',
      name: '시즌',
      icon: <SeeznIcon />,
    },
    {
      value: 'DISNEY_PLUS',
      name: '디즈니플러스',
      icon: <DisneyPlusIcon />,
    },
    {
      value: 'WATCHA',
      name: '왓차',
      icon: <WatchaIcon />,
    },

    {
      value: 'WAVVE',
      name: '웨이브',
      icon: <WavveIcon />,
    },
    {
      value: 'APPLE_TV',
      name: '애플티비',
      icon: <AppleTvIcon />,
    },
    {
      value: 'NONE',
      name: '구독하지 않음',
      icon: '❎',
    },
  ];

  const handleNextButton = () => {
    if (slideIndex === 2) {
      if (localStorage.getItem('access_token')) {
        axios.post(
          `${API_URL}/api/v1/user`,
          {
            name: userInfo.name,
            age: userInfo.age,
            ottList: userInfo.ottList,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            },
          },
        );
      }
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
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    swipe: false,
    beforeChange: (current, next) => setSlideIndex(next),
  };

  const handleChangeAge = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      age: e,
    }));
  };

  const handleClickOtt = (value) => {
    if (value === 'NONE') {
      setUserInfo((prev) => ({ ...prev, ottList: [value] }));
    } else {
      if (userInfo.ottList.includes('NONE')) {
        setUserInfo((prev) => ({
          ...prev,
          ottList: userInfo.ottList.filter((item) => item !== 'NONE'),
        }));
      }
      if (userInfo.ottList.includes(value)) {
        const newItems = userInfo.ottList.filter((item) => item !== value);
        setUserInfo((prev) => ({ ...prev, ottList: newItems }));
      } else {
        setUserInfo((prev) => ({ ...prev, ottList: [...prev.ottList, value] }));
      }
    }
  };

  return (
    <>
      <header className="px-4 py-2 sm:px-5">
        <ArrowLeftIcon className="cursor-pointer" onClick={handlePrevButton} />
      </header>
      <div className="h-[calc(100%-64px)]">
        <div className="flex space-x-0.5">
          {slideCount.map((item, i) => (
            <div key={i} className="w-full bg-[#E2E2E2] rounded-full sm:h-2 h-1.5 mb-4">
              <div
                className={`sm:h-2 h-1.5 rounded-full ${
                  item <= slideIndex ? 'bg-main' : 'bg-[#E2E2E2]'
                }`}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-22px)] sm:h-[calc(100%-24px)]">
          <Slider {...settings} ref={sliderRef} className="h-full overflow-y-auto">
            <div className="px-5 sm:px-6">
              <div className="text-2xl font-bold text-g400 sm:mb-4 mb-3">뭐라고 불러드릴까요?</div>
              <div className="text-sm text-g100 mb-14">닉네임을 입력해주세요</div>
              <div>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
                  id="name"
                  className="bg-white border border-gray-300 text-gray-900 sm:text-base text-sm block w-full sm:p-4.5 p-3.5 rounded-xl focus:border-main focus:outline-none"
                  placeholder="닉네임을 입력해주세요"
                  required
                  maxLength={30}
                />
              </div>
            </div>
            <div className="px-5 sm:px-6">
              <div className="text-2xl font-bold text-g400 sm:mb-3 mb-2">연령대를 선택해주세요</div>
              <div className="text-sm text-g100 mb-14">나이를 입력해주세요</div>
              <div className="relative mb-6 range-slide">
                <RcSlider value={userInfo.age} onChange={handleChangeAge} />
              </div>
            </div>
            <div className="px-5 sm:px-6">
              <div className="text-2xl font-bold text-g400 sm:mb-3 mb-2 break-keep">
                현재 구독중인 OTT서비스를 선택해주세요
              </div>
              <div className="text-sm text-g100 mb-9 sm:mb-14">
                이 설정은 나중에 다시 수정할 수 있어요
              </div>
              <div className="grid grid-cols-3 gap-x-2 gap-y-4 pb-4 ">
                {ottServices.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleClickOtt(item.value)}
                    className={`flex flex-col justify-center items-center rounded-3xl py-3 px-2.5 ${
                      userInfo.ottList.find((el) => el === item.value)
                        ? 'shadow-line bg-v50'
                        : 'shadow-square'
                    }`}
                  >
                    <div className={`${item.value === 'none' && 'text-3xl mt-3'}`}>{item.icon}</div>
                    <div className={`text-g200 text-sm mt-2 ${item.value === 'none' && 'mt-3'}`}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Slider>
          <div className="px-5 sm:px-6 my-3">
            <button
              className="w-full bg-main rounded-lg text-white py-3.5 disabled:bg-light-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300"
              onClick={handleNextButton}
              disabled={
                (slideIndex === 0 && userInfo.name === '') ||
                (slideIndex === 1 && userInfo.age === 0) ||
                (slideIndex === 2 && userInfo.ottList.length === 0)
              }
            >
              {slideIndex === 2 ? '시작하기' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
