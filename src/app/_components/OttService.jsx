import NetflixIcon from '@public/icons/icon-netflix.svg';
import TvingIcon from '@public/icons/icon-tving.svg';
import DisneyPlusIcon from '@public/icons/icon-disney-plus.svg';
import CoupangPlayIcon from '@public/icons/icon-coupang-play.svg';
import WatchaIcon from '@public/icons/icon-watcha.svg';
import WavveIcon from '@public/icons/icon-wavve.svg';
import AppleTvIcon from '@public/icons/icon-apple-tv.svg';
import SeeznIcon from '@public/icons/icon-seezn.svg';

const ottServices = [
  {
    value: 'TVING',
    name: '티빙',
    icon: <TvingIcon />,
  },
  {
    value: 'NETFLIX',
    name: '넷플릭스',
    icon: <NetflixIcon />,
  },
  {
    value: 'COUPANG_PLAY',
    name: '쿠팡플레이',
    icon: <CoupangPlayIcon />,
  },

  {
    value: 'SEEZN',
    name: '시즌',
    icon: <SeeznIcon />,
  },
  {
    value: 'DISNEY_PLUS',
    name: '디즈니플러스',
    icon: <DisneyPlusIcon />,
  },
  {
    value: 'WATCHA',
    name: '왓차',
    icon: <WatchaIcon />,
  },

  {
    value: 'WAVVE',
    name: '웨이브',
    icon: <WavveIcon />,
  },
  {
    value: 'APPLE_TV',
    name: '애플티비',
    icon: <AppleTvIcon />,
  },
  {
    value: 'NONE',
    name: '구독하지 않음',
    icon: '❎',
  },
];

const OttService = ({ selectedList, handleClickOtt }) => {
  return (
    <div className="grid grid-cols-3 gap-x-2 gap-y-4 pb-4 ">
      {ottServices.map((item, index) => (
        <div
          key={index}
          onClick={() => handleClickOtt(item.value)}
          className={`flex flex-col justify-center items-center rounded-3xl py-3 px-2.5 ${
            selectedList.find((el) => el === item.value) ? 'shadow-line bg-v50' : 'shadow-square'
          }`}
        >
          <div className={`${item.value === 'none' && 'text-3xl mt-3'}`}>{item.icon}</div>
          <div className={`text-g200 text-sm mt-2 ${item.value === 'none' && 'mt-3'}`}>
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OttService;
