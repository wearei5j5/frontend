'use client';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ArrowLeftIcon from '@public/icons/icon-arrow-left.svg';

import { useRecoilState } from 'recoil';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

import RcSlider from '@/app/_components/RcSlider';
import OttService from '@/app/_components/OttService';
import Button from '@/app/_components/Button';
import TextGroup from '@/app/_components/TextGroup';

import { userInfoState } from '@/store/userInfo/atom';
import { API_URL } from '@/constants/common';
import axios from 'axios';

export default function Info() {
  const router = useRouter();

  const [slideCount, setSlideCount] = useState([0, 1, 2]);
  const [slideIndex, setSlideIndex] = useState(0);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const sliderRef = useRef(null);

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
            <div key={i} className="w-full bg-g50 rounded-full sm:h-2 h-1.5 mb-4">
              <div
                className={`sm:h-2 h-1.5 rounded-full ${item <= slideIndex ? 'bg-main' : 'bg-g50'}`}
              ></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between h-[calc(100%-22px)] sm:h-[calc(100%-24px)]">
          <Slider {...settings} ref={sliderRef} className="h-full overflow-y-auto">
            <div className="px-5 sm:px-6">
              <TextGroup mainText="뭐라고 불러드릴까요?" subText="닉네임을 입력해주세요" />
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
              <TextGroup mainText="연령대를 선택해주세요" subText="나이를 입력해주세요" />
              <div className="relative mb-6 range-slide">
                <RcSlider value={userInfo.age} onChange={handleChangeAge} />
              </div>
            </div>
            <div className="px-5 sm:px-6 flex flex-col justify-between h-[calc(100%-64px)]">
              <div className="flex-1 overflow-auto">
                <TextGroup
                  mainText="현재 구독중인 OTT서비스를 선택해주세요"
                  subText="이 설정은 나중에 다시 수정할 수 있어요"
                />
                <OttService selectedList={userInfo.ottList} handleClickOtt={handleClickOtt} />
              </div>
            </div>
          </Slider>
          <div className="px-5 sm:px-6 my-3">
            <Button
              text={slideIndex === 2 ? '시작하기' : '다음'}
              disabled={
                (slideIndex === 0 && userInfo.name === '') ||
                (slideIndex === 1 && userInfo.age === 0) ||
                (slideIndex === 2 && userInfo.ottList.length === 0)
              }
              bgColor="bg-main"
              textColor="text-white"
              onClick={handleNextButton}
            />
          </div>
        </div>
      </div>
    </>
  );
}
