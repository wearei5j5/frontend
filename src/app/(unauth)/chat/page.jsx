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
      <div className='px-5 flex-1 flex flex-col items-center overflow-y-auto'>
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
          <div className='w-full  border-2'>
            {/* AI */}
            <div className='w-full flex-1'>
              <div className='flex justify-start'>
                <div>
                  <Image
                    src='/chat-character.png'
                    width={40}
                    height={40}
                    alt='character img'
                  />
                </div>
                <div className='ml-2'>
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
                  <div className='flex space-x-1'>
                    {feelings.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleClickFeeling(item.value)}
                        className='bg-v200 rounded-2xl py-1.5 px-3 text-sm cursor-pointer'
                      >
                        {item.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {feeling !== null && (
              <div className='flex justify-end'>
                <ChatBubble sender='user' message='행복한 하루였어!' />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
