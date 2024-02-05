'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect, useRef, useState } from 'react';
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

import BookmarkIcon from '@public/icons/icon-bookmark.svg';
import BookmarkFullIcon from '@public/icons/icon-bookmark-full.svg';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const MessageBubble = ({
  speaker,
  message,
  isLoading,
  handleClickSatisfyButton,
  handleClickFeelingButton,
}) => {
  const userInfo = useRecoilValue(userInfoState);
  const setOpen = useSetRecoilState(modalState);

  if (isLoading) {
    return <ChatBubble key={`${Math.random()}`} sender={speaker} message={'•••'} />;
  }

  return message.map((text, index) => {
    if (text === '') {
      return (
        <div key={`${Math.random()}-${index}`} className="w-fit">
          <ChatBubble sender={speaker}>
            <div className="flex items-center justify-center space-x-1">
              <Image
                src="/imgs/meditation-character.png"
                alt="character img"
                width={55}
                height={55}
              />
              <div className="font-medium break-keep sm:max-w-fit">
                {userInfo.name}님에게 딱 맞는 영화 추천 결과
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="w-full text-white bg-main hover:bg-v400 focus:outline-none font-medium rounded-lg text-sm py-2 mt-1 sm:mt-2"
            >
              보러가기
            </button>
          </ChatBubble>
        </div>
      );
    }
    if (text === 'satisfy') {
      return (
        <div key={`${Math.random()}-${index}`} className="flex space-x-1.5">
          <button
            onClick={() => handleClickSatisfyButton('GOOD')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white"
          >
            좋아요!
          </button>
          <button
            onClick={() => handleClickSatisfyButton('BAD')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white"
          >
            조금 아쉬운데?
          </button>
        </div>
      );
    }
    if (text === 'feeling') {
      return (
        <div key={`${Math.random()}-${index}`} className="flex flex-wrap mb-2">
          <button
            onClick={() => handleClickFeelingButton('행복해요')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white whitespace-nowrap mr-1 mt-1"
          >
            😍 행복해요
          </button>
          <button
            onClick={() => handleClickFeelingButton('즐거워요')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white whitespace-nowrap mr-1 mt-1"
          >
            😆 즐거워요
          </button>
          <button
            onClick={() => handleClickFeelingButton('슬퍼요')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white whitespace-nowrap mr-1 mt-1"
          >
            😭 슬퍼요
          </button>
          <button
            onClick={() => handleClickFeelingButton('화나요')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white whitespace-nowrap mr-1 mt-1"
          >
            😤 화나요
          </button>
          <button
            onClick={() => handleClickFeelingButton('피곤해요')}
            className="text-center text-xs bg-v200 py-1.5 px-3 rounded-2xl text-white whitespace-nowrap mt-1"
          >
            😒 피곤해요
          </button>
        </div>
      );
    }

    return <ChatBubble key={`${Math.random()}-${index}`} sender={speaker} message={text} />;
  });
};

export default function Chat() {
  const [showIntro, setShowIntro] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [open, setOpen] = useRecoilState(modalState);

  const [userInput, setUserInput] = useState('');
  const [sendCount, setSendCount] = useState(0);

  const [isPending, setIsPending] = useState(true);

  const [satisfy, setSatisfy] = useState(null);
  const [satisfyTrigger, setSatisfyTrigger] = useState(false);
  const [recommendedList, setRecommendedList] = useState([]);

  const [searchBody, setSearchBody] = useState({
    ottList: userInfo.ottList,
    situation: '',
    feeling: '',
    genre: '',
  });

  const messageEndRef = useRef(null);

  const today = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd)');

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '40px',
    slidesToShow: 1,
    speed: 500,
  };

  const [chat, setChat] = useState([]);

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

    if (
      searchBody.ottList.length > 0 &&
      searchBody.feeling !== '' &&
      searchBody.situation !== '' &&
      searchBody.genre !== '' &&
      sendCount === 3
    ) {
      const getMovieList = async () => {
        axios
          .post(`${API_URL}/api/v1/movie/recommended`, searchBody)
          .then((res) => {
            setIsPending(true);
            setRecommendedList(res.data.data);
            sendMessage('ai', [
              `마침 딱 ${userInfo.name || '오태'}님만을 위한 영화가 생각 \n나는군요!`,
              '잠시만 기다려주세요!',
              '',
              `${userInfo.name || '오태'}님만을 위한 이오지오의 추천 영화 어떠신가요?`,
              'satisfy',
            ]);
          })
          .catch((error) => {
            if (error.response.data.message === '호출 횟수를 초과했습니다') {
              setIsPending(true);
              sendMessage('ai', ['추천 횟수 3회를 이미 달성하였습니다.', '다음에 만나요!']);
            }
          })
          .finally(() => {
            setUserInput('');
            // setIsPending(false);
          });
      };

      getMovieList();
    }
  }, [searchBody]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
      setIsPending(true);

      const timer2 = setTimeout(() => {
        setChat((prev) => [
          ...prev,
          {
            speaker: 'ai',
            message: [
              `안녕하세요 ${userInfo.name || '오태'}님! \n저는 ${
                userInfo.name || '오태'
              }님에게 최적의 맞춤 영화 추천을 위해 탄생한 이오지오입니다.`,
              `${userInfo.name || '오태'}님, 오늘 하루 어떠셨나요?`,
            ],
          },
        ]);
      }, 500);

      return () => clearTimeout(timer2);
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
      setSearchBody((prev) => ({
        ...prev,
        situation: userInput,
      }));
      setUserInput('');

      sendMessage('ai', ['그렇다면 지금 기분은 어떠세요?', 'feeling']);
    }

    if (sendCount === 2) {
      sendMessage('ai', [
        `${userInfo.name || '오태'}님, 지금 어떤 장르의 영화를 보고 싶으세요?`,
        '액션? 로맨스? 스릴러?',
        ,
      ]);
    }

    if (sendCount === 3) {
      setSearchBody((prev) => ({
        ...prev,
        genre: userInput,
      }));
    }
  }, [sendCount]);

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
      }, 2000);
    };

    if (satisfy !== null) {
      axios.post(`${API_URL}/api/v1/review`, { satisfaction: satisfy });
      setIsPending(true);

      if (satisfy === 'GOOD') {
        setChat((prev) => [
          ...prev,
          {
            speaker: 'user',
            message: ['오 괜찮은데?'],
          },
        ]);

        sendMessage('ai', [
          '제가 추천드린 영화가 만족스러우신 것 같아 감격입니다...',
          '다음에도 또 찾아주세요! ',
        ]);
      } else {
        setChat((prev) => [
          ...prev,
          {
            speaker: 'user',
            message: ['아..조금 아쉬워..'],
          },
        ]);

        sendMessage('ai', ['정말 죄송합니다...', '다음에는 더... 노력해보겠습니다....😭 ']);
      }
    }
  }, [satisfy]);

  useEffect(() => {
    if (searchBody.feeling !== '' && sendCount === 2) {
      setIsPending(true);

      switch (searchBody.feeling) {
        case '행복해요':
          setChat((prev) => [
            ...prev,
            {
              speaker: 'user',
              message: ['😍 행복해요'],
            },
          ]);
          break;
        case '즐거워요':
          setChat((prev) => [
            ...prev,
            {
              speaker: 'user',
              message: ['😆 즐거워요'],
            },
          ]);
          break;
        case '슬퍼요':
          setChat((prev) => [
            ...prev,
            {
              speaker: 'user',
              message: ['😭 슬퍼요'],
            },
          ]);
          break;
        case '화나요':
          setChat((prev) => [
            ...prev,
            {
              speaker: 'user',
              message: ['😤 화나요'],
            },
          ]);
          break;
        case '피곤해요':
          setChat((prev) => [
            ...prev,
            {
              speaker: 'user',
              message: ['😒 피곤해요'],
            },
          ]);
          break;
      }
    }
  }, [searchBody]);

  useEffect(() => {
    if (!messageEndRef.current) return;

    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chat, isPending]);

  const handleClickSatisfyButton = (review) => {
    if (satisfy === null) {
      setSatisfy(review);
    }
  };

  const handleClickFeelingButton = (feeling) => {
    setSearchBody((prev) => ({ ...prev, feeling }));
    setSendCount((prev) => prev + 1);
  };

  const handleModalClose = () => {
    setOpen(false);
    setSatisfyTrigger(true);
  };

  const handleChangeInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClickSend = () => {
    setIsPending(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPending(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [chat]);

  const handleClickBookmark = (movieData) => {
    if (movieData.isCollected === false) {
      const { movieName, keywords, posterImageUrl, releaseDate } = movieData;
      const body = {
        movieName,
        keywords,
        posterImageUrl,
        releaseDate,
      };

      axios.post(`${API_URL}/api/v1/movie`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      });

      const updatedItem = recommendedList.map((item) => {
        if (item.movieName === movieData.movieName) {
          return {
            ...item,
            isCollected: true,
          };
        }
        return item;
      });

      setRecommendedList(updatedItem);
    }
  };

  return (
    <>
      <div className="relative flex flex-col h-full">
        <header className="flex justify-center px-5 py-4 relative bg-main">
          <div className="font-semibold text-white text-md">이오지오와의 대화</div>
          <Link
            href="/"
            className="absolute right-4 text-sm bg-v400 rounded-md text-white py-1 px-3 font-semibold cursor-pointer"
          >
            대화 종료
          </Link>
        </header>
        <div className="px-5 grow-1 h-[calc(100%-120px)] flex flex-col items-center overflow-y-auto">
          <div className="flex justify-center my-7">
            <div className="bg-g75 text-center w-fit text-xs py-0.5 px-6 rounded-md text-white">
              {today}
            </div>
          </div>
          {showIntro ? (
            <div className="h-full w-full mb-10 flex-1 flex flex-col space-y-1.5 justify-center items-center">
              <Image src="/imgs/chat-character.png" width={140} height={140} alt="character img" />
              <div className="flex items-center">
                <div className="text-[#656565] text-sm">이오지오</div>
                <span className="ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block">
                  AI
                </span>
              </div>
              <ChatBubble message={`${userInfo.name || '오태'}님 안녕하세요!`} sender="ai" />
              <ChatBubble
                message={`저는 ${
                  userInfo.name || '오태'
                }님에게 최적의 맞춤 콘텐츠 \n추천을 위해 탄생한 이오지오입니다.`}
                sender="ai"
              />
            </div>
          ) : (
            <div className="w-full ">
              <div className="w-full flex-1">
                {chat?.map((item, i) =>
                  item.speaker === 'ai' ? (
                    <div key={i} className="flex justify-start">
                      <div className="min-w-[40px]">
                        <Image
                          src="/imgs/chat-character.png"
                          width={40}
                          height={40}
                          alt="character img"
                        />
                      </div>
                      <div className="mx-2 flex-1">
                        <div className="flex items-center">
                          <div className="text-[#656565] text-sm">이오지오</div>
                          <span className="ml-2 bg-main rounded-lg py-0.5 px-1.5 text-xs text-white display-block">
                            AI
                          </span>
                        </div>
                        <MessageBubble
                          speaker={item.speaker}
                          message={item.message}
                          isLoading={isPending && i === chat.length - 1} // 마지막 메시지만 로딩 상태 적용
                          handleClickSatisfyButton={handleClickSatisfyButton}
                          handleClickFeelingButton={handleClickFeelingButton}
                        />
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="flex justify-end">
                      {item.message?.map((text, index) => (
                        <ChatBubble key={`${i}-${index}`} sender={item.speaker} message={text} />
                      ))}
                    </div>
                  ),
                )}
              </div>
              <div ref={messageEndRef}></div>
            </div>
          )}
        </div>

        <footer className="fixed h-16 py-2 px-5 bg-white bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px]">
          <div className="relative flex">
            <input
              value={userInput}
              onKeyUp={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (event.code === 'Enter') {
                  handleClickSend();
                }
              }}
              onChange={handleChangeInput}
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm w-full py-2 pl-5 pr-20 rounded-xl max-h-12 h-12 align-middle focus:border-main focus:outline-none inline-block leading-7 placeholder:leading-7"
              placeholder="이오지오에게 말해보세요"
              required
              disabled={sendCount >= 3 || sendCount === 1 || showIntro || isPending}
              maxLength={30}
            />
            <button
              type="button"
              onClick={handleClickSend}
              disabled={
                userInput === '' || sendCount >= 3 || sendCount == 1 || showIntro || isPending
              }
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
        <Modal bg={'bg-gradient-movie'} handleClickCloseModal={() => setOpen(false)}>
          <div className="w-full h-full flex flex-col relative">
            <div className="flex justify-center mb-5 mt-5 w-full">
              <div className="rounded-3xl border-1 font-semibold  text-white py-3 px-4 border-white w-fit">
                {userInfo.name || '오태'}
                님을 위한 추천 결과
              </div>
            </div>
            <div className="h-[calc(100%-50px)] flex flex-col justify-between">
              <div className="grow">
                <Slider {...settings} className="h-full">
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
                              <div className="text-sm text-v75">
                                영화 이미지를 불러오지 못했어요!
                              </div>
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
              </div>
              <div className="px-4 pb-4">
                <div
                  onClick={handleModalClose}
                  className="modal-close w-full rounded-xl p-4 bg-main text-center text-white text-sm z-50"
                >
                  닫기
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
