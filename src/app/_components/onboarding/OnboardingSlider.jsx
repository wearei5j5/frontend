'use client';

import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from '@/styles/onboardingSlider.module.css';

export default function OnboardingSlider({ contents }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dotsClass: 'dots-custom',
  };

  return (
    <Slider {...settings} className={style.customSlider}>
      {contents?.map((content, index) => (
        <div key={index} className="h-full flex-col">
          <div>
            <div className="text-sm text-g300 text-center">{content.subtitle}</div>
            <div className="text-[22px] text-g300 text-center font-bold md:mb-10 mb-2">
              {content.title}
            </div>
          </div>
          <div className="relative flex-1 min-h-0 h-full">
            <Image
              src={content.imagePath}
              alt={content.title}
              className={`${style.sliderContentImg} object-contain`}
              fill
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
