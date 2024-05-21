import Slider from 'react-slick';
import Image from 'next/image';

import BookmarkIcon from '@public/icons/icon-bookmark.svg';
import BookmarkFullIcon from '@public/icons/icon-bookmark-full.svg';

import style from '@/styles/recommendSlider.module.css';

export default function RecommendSlider({ recommendedList, handleClickBookmark }) {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '40px',
    slidesToShow: 1,
    speed: 500,
  };

  return (
    <Slider {...settings} className={style.recommendSlider}>
      {recommendedList?.map((movie, idx) => (
        <div
          key={idx}
          className="w-full h-full flex flex-col justify-center items-center text-center"
        >
          <div className="h-3/4 px-5 pb-5">
            <div className="h-full relative shadow-poster rounded-lg overflow-hidden">
              {movie.posterImageUrl === null ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="relative  w-[158px] h-[135px]">
                    <Image
                      src="/imgs/null-character.png"
                      className="w-full grow object-cover"
                      fill
                      alt="movie poster null img"
                    />
                  </div>
                  <div className="text-xl mb-2 font-semibold text-v75">Sorry💦</div>
                  <div className="text-sm text-v75">영화 이미지를 불러오지 못했어요!</div>
                </div>
              ) : (
                <div className="relative h-full">
                  <Image
                    src={movie.posterImageUrl}
                    className="w-full h-full object-cover"
                    fill
                    alt="movie poster img"
                  />
                  {localStorage.getItem('access_token') && (
                    <div
                      className="absolute top-3.5 right-3.5 cursor-pointer"
                      onClick={() => handleClickBookmark(movie)}
                    >
                      {movie.isCollected ? <BookmarkFullIcon /> : <BookmarkIcon />}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="text-lg text-white font-bold mb-0.5">{movie.movieName}</div>
            <div className="text-g100 mb-1 text-xs">
              {movie.releaseDate !== null && movie.releaseDate.split('-')[0]}
            </div>
            <div className="flex justify-center items-center flex-wrap space-x-1">
              {movie.keywords.map(
                (keyword, i) =>
                  keyword.length !== 0 && (
                    <div
                      key={i}
                      className="border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl mb-1"
                    >
                      {keyword}
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
