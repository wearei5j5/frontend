'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect, useState } from 'react';
import ChatBubble from './_components/ChatBubble';
import Link from 'next/link';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '@/store/userInfo/atom';
import Modal from '@/app/_components/Modal';

import { modalState } from '@/store/modal/atom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
dayjs.locale('ko');
import './_style/style.css';
import { useQuery } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getMovieList = async (params) => {
  const queryParams = new URLSearchParams(params).toString();
  const response = await fetch(
    `${API_URL}/api/v1/movie/recommended?${queryParams}`
  );
  return response.json();
};

const MessageBubble = ({ speaker, message, isLoading }) => {
  const userInfo = useRecoilValue(userInfoState);
  const setOpen = useSetRecoilState(modalState);

  if (isLoading) {
    return (
      <ChatBubble key={`${Math.random()}`} sender={speaker} message={'•••'} />
    );
  }

  return message.map((text, index) =>
    text === '' ? (
      <div key={`${Math.random()}-${index}`}>
        <ChatBubble sender={speaker}>
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
      </div>
    ) : (
      <ChatBubble
        key={`${Math.random()}-${index}`}
        sender={speaker}
        message={text}
      />
    )
  );
};

export default function Chat() {
  const [showIntro, setShowIntro] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [open, setOpen] = useRecoilState(modalState);

  const [userInput, setUserInput] = useState('');
  const [sendCount, setSendCount] = useState(0);

  const [searchParams, setSearchParams] = useState({
    ottList: userInfo.ott,
    feeling: '',
    situation: '',
  });

  const today = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd)');

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['movieData', searchParams],
    queryFn: () => getMovieList(searchParams),
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    if (
      searchParams.ottList.length > 0 &&
      searchParams.feeling !== '' &&
      searchParams.situation !== ''
    ) {
      getMovieList(searchParams);
    }
  }, [searchParams]);

  const [chat, setChat] = useState([
    {
      speaker: 'ai',
      message: [
        `${userInfo.name}님 안녕하세요!`,
        '저는 오태님에게 최적의 맞춤 콘텐츠 \n추천을 위해 탄생한 이오지오입니다.',
        '오늘 오태님에게 가장 기억에 남는 \n일과 기분을 알려주세요.',
        '저는 오늘 개발자님에게 혼나서 속상했어요 😭',
        '오태님은 어떠셨나요?',
      ],
    },
  ]);

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

  useEffect(() => {
    const sendMessage = (speaker, messages) => {
      setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            speaker,
            message: messages,
          },
        ]);
      }, 1000);
    };

    if (sendCount === 1) {
      setSearchParams((prev) => ({ ...prev, feeling: userInput }));
      setUserInput('');

      sendMessage('ai', [
        '오태님의 얘기를 들어보니, 어떤 콘텐츠를 \n추천해드릴지 가닥이 잡히는 것 같아요.',
        '지금 어떤 느낌의 영화가 보고 싶으신가요?',
        '저는.. 오늘 제 마음을 위로해주는 \n힐링 영화가 필요해요.',
      ]);
    }

    if (sendCount === 2) {
      setSearchParams((prev) => ({ ...prev, situation: userInput }));
      setUserInput('');

      sendMessage('ai', [
        '마침 딱 오태님만을 위한 영화가 생각 \n나는군요!',
        '',
        '어때요? 이오지오가 피땀흘려 찾아온 영화랍니다!',
      ]);
    }
  }, [sendCount]);

  const handleChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClickSend = () => {
    if (userInput === '' || showIntro || isPending) {
      return;
    }
    setChat((prev) => [
      ...prev,
      {
        speaker: 'user',
        message: [userInput],
      },
    ]);
    setSendCount((prev) => prev + 1);
  };

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
              <ChatBubble
                message={`저는 오태님에게 최적의 맞춤 콘텐츠 \n추천을 위해 탄생한 이오지오입니다.`}
                sender='ai'
              />
            </div>
          ) : (
            <div className='w-full '>
              <div className='w-full flex-1'>
                {/* {chat?.map((item, i) =>
                  item.speaker === 'ai' ? (
                    <div key={i} className='flex justify-start'>
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

                        {item.message?.map((text, index) =>
                          text === '' ? (
                            <div key={`${i}-${index}`}>
                              <ChatBubble sender={item.speaker}>
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
                            </div>
                          ) : (
                            <ChatBubble
                              key={`${i}-${index}`}
                              sender={item.speaker}
                              message={text}
                            />
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className='flex justify-end'>
                      <div className=''>
                        {item.message?.map((text, index) => (
                          <ChatBubble
                            key={`${i}-${index}`}
                            sender={item.speaker}
                            message={text}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )} */}

                {chat?.map((item, i) =>
                  item.speaker === 'ai' ? (
                    <div key={i} className='flex justify-start'>
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
                        <MessageBubble
                          speaker={item.speaker}
                          message={item.message}
                          isLoading={isPending && i === chat.length - 1} // 마지막 메시지만 로딩 상태 적용
                        />
                      </div>
                    </div>
                  ) : (
                    <div key={i} className='flex justify-end'>
                      <div className=''>
                        {item.message?.map((text, index) => (
                          <ChatBubble
                            key={`${i}-${index}`}
                            sender={item.speaker}
                            message={text}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>

        <footer className='fixed h-16 py-2 px-5 bg-white bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]'>
          <div className='relative flex'>
            <input
              value={userInput}
              onKeyUp={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229)
                  return;
                if (event.code === 'Enter') {
                  handleClickSend();
                }
              }}
              onChange={handleChangeInput}
              type='text'
              className='bg-white border border-gray-300 text-gray-900 text-sm w-full py-2 pl-5 pr-20 rounded-xl max-h-12 h-12 align-middle focus:border-main focus:outline-none inline-block leading-7 placeholder:leading-7'
              placeholder='이오지오에게 말해보세요'
              required
            />
            <button
              type='button'
              onClick={handleClickSend}
              disabled={userInput === '' || showIntro || isPending}
              className={
                'text-white absolute end-3 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 disabled:bg-gray-300  disabled:cursor-not-allowed'
              }
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
          <div className='w-full h-full flex flex-col relative'>
            <div className='flex justify-center mb-5 mt-5 w-full'>
              <div className='rounded-3xl border-1 font-semibold  text-white py-3 px-4 border-white w-fit'>
                {userInfo.name}님을 위한 추천 결과
              </div>
            </div>
            <Slider {...settings} className='w-full h-[calc(100%-68px)] grow'>
              {data?.data?.map((movie, idx) => (
                <div
                  key={idx}
                  className='w-full sm:h-full flex sm:max-h-[700px] flex-col text-center'
                >
                  <div className='shadow-poster rounded-lg overflow-hidden relative min-h-[340px] h-full grow m-4'>
                    <Image
                      src={
                        movie.posterImageUrl === null
                          ? '/home-character.png'
                          : movie.posterImageUrl
                      }
                      className='w-full h-full object-cover'
                      fill
                      alt='movie poster img'
                    />
                  </div>
                  <div className='text-lg text-white font-bold mb-0.5'>
                    {movie.movieName}
                  </div>
                  <div className='text-g100 mb-1 text-xs '>2016</div>
                  <div className='flex justify-center items-center flex-wrap space-x-1'>
                    {movie.keywords.map((keyword, i) => (
                      <div
                        key={i}
                        className='border-1 text-sm text-v50 py-1.5 px-3 border-v50 rounded-3xl mb-1'
                      >
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
            <div className='px-4 pb-4 absolute bottom-0 w-full'>
              <div
                onClick={() => setOpen(false)}
                className='modal-close w-full rounded-xl p-4 bg-main text-center text-white text-sm z-50'
              >
                닫기
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
