import OnboardingSlider from '@/app/_components/onboarding/OnboardingSlider';
import OnboardingButtons from '@/app/_components/onboarding/OnboardingButtons';

const slideContents = [
  {
    title: 'OTT 통합 콘텐츠 추천 서비스',
    subtitle: '내가 구독하고 있는 OTT를 한 번에!',
    imagePath: '/imgs/onboarding1.png',
  },
  {
    title: '당신에게 꼭 맞는 콘텐츠 추천',
    subtitle: '당신을 위한 오때의 만능 AI 이오지오의',
    imagePath: '/imgs/onboarding2.png',
  },
  {
    title: '나의 콘텐츠 수첩 기능',
    subtitle: '원하는 영화는 저장하고 두고두고 꺼내보세요',
    imagePath: '/imgs/onboarding3.png',
  },
];

export default function Onboarding() {
  return (
    <div className="bg-white flex flex-col justify-between px-6 pb-8 pt-10 sm:px-10 h-full">
      <div className="h-full flex-1 min-h-0">
        <OnboardingSlider contents={slideContents} />
      </div>
      <OnboardingButtons />
    </div>
  );
}
