'use client';

import { isFirstState } from '@/store/initInfo/atom';
import Link from 'next/link';
import { useSetRecoilState } from 'recoil';

export default function Info() {
  const setIsFirst = useSetRecoilState(isFirstState);

  return (
    <>
      <div>Info page</div>
      <div>
        <Link
          href='/'
          // replace
          onClick={() => setIsFirst(false)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          HOME
        </Link>
      </div>
    </>
  );
}
