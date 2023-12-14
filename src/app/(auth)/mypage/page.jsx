'use client';

import ArrowLeftIcon from '@public/icon-arrow-left.svg';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import UserIcon from '@public/icon-user.svg';

export default function Mypage() {
  const router = useRouter();

  const [list, setList] = useState(Array.from({ length: 4 }));

  const handleClickMore = () => {
    const newItems = Array.from({ length: 4 });
    setList((prev) => [...prev, ...newItems]);
  };

  return (
    <>
      <header className='px-4 py-2 sm:px-5 flex items-center'>
        <ArrowLeftIcon
          className='cursor-pointer'
          onClick={() => router.back()}
        />
        <div className='ml-1 text-lg font-bold'>My page</div>
      </header>
      <div className='flex flex-col divide-y-6 divide-b100 h-[calc(100%-64px)]'>
        <div className='px-5 pb-5 flex flex-col items-center'>
          <div className='w-[55px] h-[55px] bg-g50 flex justify-center items-center rounded-2.5xl'>
            <UserIcon />
          </div>
          <div className='text-lg text-g400 font-semibold mt-1'>김오태님</div>
          <div className='text-sm text-g75'>25세</div>
          <div className='flex space-x-2 w-full text-center mt-5'>
            <div className='flex flex-col justify-center grow w-full py-2.5 px-5 shadow-mypage rounded-2xl'>
              <div className='mb-2 text-3xl'>✏️</div>
              <div className='text-xs text-g100 font-semibold'>이름 수정</div>
            </div>
            <div className='flex flex-col justify-center grow w-full py-2.5 px-5 shadow-mypage rounded-2xl'>
              <div className='mb-2 text-3xl'>⏳</div>
              <div className='text-xs text-g100 font-semibold'>연령 수정</div>
            </div>
            <div className='flex flex-col justify-center grow w-full py-2.5 px-5 shadow-mypage rounded-2xl'>
              <div className='mb-2 text-3xl'>🎬</div>
              <div className='text-xs text-g100 font-semibold'>
                구독정보 수정
              </div>
            </div>
          </div>
        </div>
        <div className='px-5 py-8 h-full grow overflow-y-auto'>
          <div className='text-g200 font-semibold text-lg mb-5'>
            나의 콘텐츠 수첩
          </div>
          <div className='grid grid-cols-2 gap-5 px-5'>
            {list.map((item, index) => (
              <div
                key={index}
                className='w-full h-44 sm:h-50 rounded-lg overflow-hidden shadow-square'
              ></div>
            ))}
          </div>
          <div
            className='mt-3 text-center font-semibold text-lg text-g100 cursor-pointer'
            onClick={handleClickMore}
          >
            더보기
          </div>
        </div>
      </div>
    </>
  );
}
