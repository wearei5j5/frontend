'use client';

import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import ChatBubble from './_components/ChatBubble';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { userInfoState } from '@/store/userInfo/atom';
dayjs.locale('ko');

export default function Chat() {
  const [showIntro, setShowIntro] = useState(true);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [feeling, setFeeling] = useState(null);

  const today = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const feelings = [
    {
      value: 'happy',
      icon: '🥰',
    },
    {
      value: 'funny',
      icon: '😄',
    },
    {
      value: 'soso',
      icon: '😐',
    },
    {
      value: 'sad',
      icon: '😭',
    },
    {
      value: 'angry',
      icon: '😡',
    },
  ];

  const handleClickFeeling = (val) => {
    setFeeling(val);
  };

  return (
    <div className='flex flex-col h-full'>
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
          <div className='h-full w-full mb-4 flex-1 flex flex-col space-y-1.5 justify-center items-center'>
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
                  <ChatBubble sender='ai' message='역시 탁월한 선택입니다🕶️' />
                  <ChatBubble sender='ai' message='마크업' />
                  <ChatBubble sender='ai' message='결과가 맘에 드시나요?' />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className='fixed w-full h-16 py-2 px-5 bg-white bottom-0'>
        <div className='relative flex'>
          <textarea
            rows={1}
            type='text'
            className='bg-white border border-gray-300 text-gray-900 text-sm block w-full py-2 px-5 rounded-xl max-h-12 h-12 align-middle focus:border-main focus:outline-none inline-block'
            placeholder='메시지'
            required
          />
          <button
            type='submit'
            className='text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2'
          >
            전송
          </button>
        </div>
      </footer>
    </div>
  );
}
