'use client';

import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfoState } from '@/store/userInfo/atom';
import { isTemporaryState } from '@/store/initInfo/atom';
import { API_URL } from '@/constants/common';

import Button from '../Button';
import KakaoIcon from '@public/icons/icon-kakaotalk.svg';

export default function OnboardingButtons() {
  const setIsTemporary = useSetRecoilState(isTemporaryState);
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();

  const handleKakaoLogin = () => {
    window.location.href = `${API_URL}/oauth2/code/kakao?state=${
      userInfo.name === '' ? '/info' : '/'
    }`;
  };

  const handleClickTemp = () => {
    setIsTemporary(true);

    if (userInfo.name !== '' && userInfo.age !== 0) {
      router.push('/');
    } else {
      router.push('/info');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Button
        bgColor="bg-kakao"
        textColor="text-black"
        onClick={handleKakaoLogin}
        icon={<KakaoIcon className="absolute top-3 left-5" />}
        text="카카오톡으로 시작하기"
        isLink={false}
      />
      <Button
        isLink={false}
        onClick={handleClickTemp}
        textColor="text-white"
        bgColor="bg-main"
        text="로그인 없이 사용하기"
        styleClass="mt-3"
      />

      <div className="mt-3 px-4 py-2.5 bg-b400 text-white text-xs text-center rounded-2xl w-fit relative before:border-b400 before:w-0 before:h-0 before:border-l-[4px] before:border-l-transparent before:border-b-[5px]  before:border-r-[4px] before:border-r-transparent before:absolute before:bottom-9 before:left-1/2">
        ⚠️나의 OTT 콘텐츠 수첩 기능을 사용할 수 없어요️⚠️
      </div>
    </div>
  );
}
