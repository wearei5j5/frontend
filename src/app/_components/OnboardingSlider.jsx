import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from '@/styles/onboardingSlider.module.css';

export default function OnbaordingSlider({ contents }) {
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
        <div key={index} className="flex justify-center align-center h-full">
          <div className="text-sm text-g300 text-center">{content.subtitle}</div>
          <div className="text-[22px] text-g300 text-center font-bold mb-10">{content.title}</div>
          <div
            className={`${style.sliderContentImg} relative h-full bg-bottom-4 bg-no-repeat bg-contain`}
            style={{ backgroundImage: `url(${content.imagePath})` }}
          >
            {content.imgSrc}
          </div>
        </div>
      ))}
    </Slider>
  );
}
