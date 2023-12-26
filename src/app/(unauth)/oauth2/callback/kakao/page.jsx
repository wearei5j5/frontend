'use client';

import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SplashScreen from '@/app/_components/SplashScreen';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isFirstState } from '@/store/initInfo/atom';
import { userInfoState } from '@/store/userInfo/atom';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function KakaoLogin() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setIsFirst = useSetRecoilState(isFirstState);
  const userInfo = useRecoilValue(userInfoState);

  const code = searchParams.get('code');
  const provider = searchParams.get('provider');
  const redirectUrl = searchParams.get('state');

  useEffect(() => {
    axios
      .post(`${API_URL}/oauth2/login`, {
        provider,
        code,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.data.accessToken);
          localStorage.setItem('refresh_token', res.data.data.refreshToken);
          setIsFirst(false);
          axios.post(
            `${API_URL}/api/v1/user`,
            {
              name: userInfo.name,
              age: userInfo.age,
              ottList: userInfo.ottList,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
            },
          );
          router.replace(redirectUrl);
        } else {
          router.replace('/login');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router]);

  return (
    <>
      <SplashScreen />
    </>
  );
}
