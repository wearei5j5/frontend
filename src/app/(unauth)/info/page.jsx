'use client';

import { isFirstState } from '@/store/initInfo/atom';
import Slider from 'react-slick';
import ArrowLeftIcon from '@public/icon-arrow-left.svg';

import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef, useState, useEffect } from 'react';

export default function Info() {
  const setIsFirst = useSetRecoilState(isFirstState);

  const [slideIndex, setSlideIndex] = useState(0);

  const sliderRef = useRef(null);

  const handleNextButton = () => {
    sliderRef.current.slickNext();
  };

  const handlePrevButton = () => {
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
    beforeChange: (current, next) => setSlideIndex(next),
  };

  return (
    <div className='flex flex-col h-full'>
      <header className='px-4 pt-2 sm:px-5'>
        <ArrowLeftIcon className='cursor-pointer' onClick={handlePrevButton} />
      </header>
      <div className='grow overflow-auto'>
        <input
          onChange={(e) => sliderRef.current.slickGoTo(e.target.value)}
          value={slideIndex}
          type='range'
          min={0}
          max={2}
        />
        <div className='px-5 sm:px-6 flex flex-col justify-between h-[calc(100%-56px)]'>
          <Slider {...settings} ref={sliderRef} className='flex-1'>
            <div>
              <div className='text-2xl font-bold text-g400 sm:mb-4 mb-3'>
                뭐라고 불러드릴까요?
              </div>
              <div className='text-sm text-g100'>이름을 입력해주세요</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-g400 sm:mb-3 mb-2'>
                연령대를 선택해주세요
              </div>
              <div className='text-sm text-g100'>나이를 입력해주세요</div>
            </div>
            <div>
              <div className='text-2xl font-bold text-g400 sm:mb-3 mb-2 break-keep'>
                현재 구독중인 OTT서비스를 선택해주세요
              </div>
              <div className='text-sm text-g100'>
                이 설정은 나중에 다시 수정할 수 있어요
              </div>
            </div>
          </Slider>
          <button
            className='w-full bg-btn rounded-lg text-white py-3.5'
            onClick={handleNextButton}
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
