import Image from 'next/image';

export default function SplashScreen() {
  return (
    <div className="h-full bg-main flex justify-center items-center flex-col">
      <Image
        src="/imgs/otte.png"
        priority
        alt="otte 로고 이미지"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-52"
      />
      <div className="mt-6 white text-g50">나만의 취향저격 영화 추천은 오때?</div>
    </div>
  );
}
