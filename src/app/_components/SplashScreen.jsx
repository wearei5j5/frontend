import Image from 'next/image';

export default function SplashScreen() {
  return (
    <div className='h-full bg-main flex justify-center items-center flex-col'>
      <Image src='/otte.png' alt='otte 로고 이미지' width={200} height={200} />
      <div className='mt-6 white text-g50'>
        나만의 취향저격 OTT 콘텐츠는 오때?
      </div>
    </div>
  );
}
