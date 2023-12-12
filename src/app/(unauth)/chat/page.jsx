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
  const [open, setOpen] = useState(false);

  const today = dayjs(new Date()).format('YYYY년 MM월 DD일 (dd)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log(open);

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
                  <ChatBubble sender='ai' message='역시 탁월한 선택입니다🕶️' />
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

      {/* Modal */}
      {open && (
        <div className='modal bg-white pointer-events-none fixed w-full sm:max-w-[600px] h-full top-0 left-1/2 flex items-center justify-center z-10   -translate-x-1/2 '>
          <div className='modal-overlay absolute w-full h-full bg-white'></div>

          <div className='modal-container fixed w-full h-full z-50 overflow-y-auto '>
            <div
              onClick={() => setOpen(false)}
              className='modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-black text-sm z-50'
            >
              (Esc)
            </div>

            {/* Add margin if you want to see grey behind the modal */}
            <div className='modal-content container mx-auto h-auto text-left p-4'>
              {/* Title */}
              <div className='flex justify-between items-center pb-2'>
                <p className='text-2xl font-bold'>Full Screen Modal!</p>
              </div>

              {/* Body */}
              <p>Modal content can go here</p>

              {/* Footer */}
              <div className='flex justify-end pt-2'>
                <button className='px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2'>
                  Action
                </button>
                <button className='modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
