'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import ChatBubble from './_components/ChatBubble';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/store/userInfo/atom';
import Modal from '@/app/_components/Modal';

import { modalState } from '@/store/modal/atom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
dayjs.locale('ko');
import './_style/style.css';

export default function Chat() {
  const [showIntro, setShowIntro] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [open, setOpen] = useRecoilState(modalState);

  const today = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd)');

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '50px',
    slidesToShow: 1,
    speed: 500,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='relative flex flex-col h-full'>
        <header className='flex justify-center px-5 py-4 relative bg-main'>
          <div className='font-semibold text-white text-md'>
            이오지오와의 대화
          </div>
          <Link
            href='/'
            className='absolute right-4 text-sm bg-v400 rounded-md text-white py-1 px-3 font-semibold cursor-pointer'
          >
            대화 종료
          </Link>
        </header>
        <div className='px-5 grow-1 h-[calc(100%-120px)] flex flex-col items-center overflow-y-auto'>
          <div className='flex justify-center my-7'>
            <div className='bg-g75 text-center w-fit text-xs py-0.5 px-6 rounded-md text-white'>
              {today}
            </div>
          </div>
          {showIntro ? (
            <div className='h-full w-full mb-10 flex-1 flex flex-col space-y-1.5 justify-center items-center'>
              <Image
                src='/chat-character.png'
                width={140}
                height={140}
                alt='character img'
              />
              <div className='flex items-center'>
                <div className='text-[#656565] text-sm'>이오지오</div>
                <span className='ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block'>
                  AI
                </span>
              </div>
              <ChatBubble
                message={`${userInfo.name || '오태'}님 안녕하세요!`}
                sender='ai'
              />
              <ChatBubble message='오늘 하루는 어떠셨나요?' sender='ai' />
            </div>
          ) : (
            <div className='w-full '>
              <div className='w-full flex-1'>
                {/* AI */}
                <div className='flex justify-start'>
                  <div className='min-w-[40px]'>
                    <Image
                      src='/chat-character.png'
                      width={40}
                      height={40}
                      alt='character img'
                    />
                  </div>
                  <div className='mx-2 flex-1'>
                    <div className='flex items-center'>
                      <div className='text-[#656565] text-sm'>이오지오</div>
                      <span className='ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block'>
                        AI
                      </span>
                    </div>
                    <ChatBubble
                      sender='ai'
                      message={`${userInfo.name || '오태'}님 안녕하세요!`}
                    />
                    <ChatBubble sender='ai' message='오늘 하루는 어떠셨나요?' />
                  </div>
                </div>

                {/* USER */}
                <div className='flex justify-end'>
                  <div className=''>
                    <ChatBubble sender='user' message='행복한 하루였어!' />
                  </div>
                </div>

                {/* AI */}
                <div className='flex justify-start'>
                  <div className='min-w-[40px]'>
                    <Image
                      src='/chat-character.png'
                      width={40}
                      height={40}
                      alt='character img'
                    />
                  </div>
                  <div className='mx-2 flex-1'>
                    <div className='flex items-center'>
                      <div className='text-[#656565] text-sm'>이오지오</div>
                      <span className='ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block'>
                        AI
                      </span>
                    </div>
                    <ChatBubble sender='ai' message='그랬군요!' />
                    <ChatBubble
                      sender='ai'
                      message='오늘 같은 날 딱 맞는 영화로 하루를 마무리하면
더 완벽한 하루가 될거에요!🍀'
                    />
                    <ChatBubble
                      sender='ai'
                      message='어떤 장르의 영화가 좋으세요?'
                    />
                  </div>
                </div>

                {/* USER */}
                <div className='flex justify-end'>
                  <div className=''>
                    <ChatBubble sender='user' message='로맨스가 보고싶어!' />
                  </div>
                </div>

                {/* AI */}
                <div className='flex justify-start'>
                  <div className='min-w-[40px]'>
                    <Image
                      src='/chat-character.png'
                      width={40}
                      height={40}
                      alt='character img'
                    />
                  </div>
                  <div className='mx-2 flex-1'>
                    <div className='flex items-center'>
                      <div className='text-[#656565] text-sm'>이오지오</div>
                      <span className='ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block'>
                        AI
                      </span>
                    </div>
                    <ChatBubble
                      sender='ai'
                      message='역시 탁월한 선택입니다🕶️'
                    />
                    <ChatBubble sender='ai'>
                      <div className='flex items-center justify-center space-x-1'>
                        <Image
                          src='/meditation-character.png'
                          alt='character img'
                          width={55}
                          height={55}
                        />
                        <div className='font-medium break-keep sm:max-w-fit max-w-[112px]'>
                          {userInfo.name}님에게 딱 맞는 영화 추천 결과
                        </div>
                      </div>
                      <button
                        onClick={() => setOpen(true)}
                        className='w-full text-white bg-main hover:bg-v400 focus:outline-none font-medium rounded-lg text-sm py-2 mt-1 sm:mt-2'
                      >
                        보러가기
                      </button>
                    </ChatBubble>
                    <ChatBubble sender='ai' message='결과가 맘에 드시나요?' />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className='fixed h-16 py-2 px-5 bg-white bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]'>
          <div className='relative flex'>
            <input
              type='text'
              className='bg-white border border-gray-300 text-gray-900 text-sm block w-full py-2 pl-5 pr-20 rounded-xl max-h-12 h-12 align-middle focus:border-main focus:outline-none inline-block leading-7 placeholder:leading-7'
              placeholder='이오지오에게 말해보세요'
              required
            />
            <button
              type='submit'
              className='text-white absolute end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2'
            >
              전송
            </button>
          </div>
        </footer>
      </div>
      {open && (
        <Modal
          bg={'bg-gradient-movie'}
          handleClickCloseModal={() => setOpen(false)}
        >
          <div className='w-full h-full flex flex-col'>
            <div className='flex justify-center mb-6 mt-1 w-full mt-6'>
              <div className='rounded-3xl	border-1  font-semibold text-lg  text-white py-3 px-4 border-white w-fit'>
                {userInfo.name}님을 위한 추천 결과
              </div>
            </div>
            <Slider {...settings} ce className='w-full h-full grow'>
              <div className='w-full flex flex-col text-center'>
                <div className='shadow-poster rounded-lg overflow-hidden relative sm:h-full max-h-[700px] min-h-[340px] grow m-4'>
                  <Image
                    src={'/movie-poster1.jpeg'}
                    className='w-full h-full'
                    fill
                    alt='movie poster img'
                    objectFit='cover'
                  />
                </div>
                <div className='text-lg text-white font-bold mb-0.5'>
                  라라랜드
                </div>
                <div className='text-md text-g100 mb-1'>2016</div>
                <div className='flex justify-center items-center space-x-1'>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤직
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    드라마
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤지컬
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-col text-center'>
                <div className='shadow-poster rounded-lg overflow-hidden relative sm:h-full max-h-[700px] min-h-[340px] grow m-4'>
                  <Image
                    src={'/movie-poster1.jpeg'}
                    className='w-full h-full'
                    fill
                    alt='movie poster img'
                    objectFit='cover'
                  />
                </div>
                <div className='text-lg text-white font-bold mb-0.5'>
                  라라랜드
                </div>
                <div className='text-md text-g100 mb-1'>2016</div>
                <div className='flex justify-center items-center space-x-1'>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤직
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    드라마
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤지컬
                  </div>
                </div>
              </div>
              <div className='w-full flex flex-col text-center'>
                <div className='shadow-poster rounded-lg overflow-hidden relative sm:h-full max-h-[700px] min-h-[340px] grow m-4'>
                  <Image
                    src={'/movie-poster1.jpeg'}
                    className='w-full h-full'
                    fill
                    alt='movie poster img'
                    objectFit='cover'
                  />
                </div>
                <div className='text-lg text-white font-bold mb-0.5'>
                  라라랜드
                </div>
                <div className='text-md text-g100 mb-1'>2016</div>
                <div className='flex justify-center items-center space-x-1'>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤직
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    드라마
                  </div>
                  <div className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl'>
                    뮤지컬
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </Modal>
      )}
    </>
  );
}
