'use client';
import { ACCESS_TOKEN_STR } from '@/constants/common';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout(props) {
  useEffect(() => {
    if (
      localStorage.getItem(ACCESS_TOKEN_STR) === null ||
      localStorage.getItem(ACCESS_TOKEN_STR) === ''
    ) {
      redirect('/login');
    }
  }, []);
  return <>{props.children}</>;
}
