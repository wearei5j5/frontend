'use client';

import ArrowLeftIcon from '@public/icons/icon-arrow-left.svg';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/app/_components/Modal';
import RcSlider from '@/app/(unauth)/info/_components/RcSlider';
import Image from 'next/image';

import UserIcon from '@public/icons/icon-user.svg';
import CloseIcon from '@public/icons/icon-close.svg';
import NetflixIcon from '@public/icons/icon-netflix.svg';
import TvingIcon from '@public/icons/icon-tving.svg';
import DisneyPlusIcon from '@public/icons/icon-disney-plus.svg';
import CoupangPlayIcon from '@public/icons/icon-coupang-play.svg';
import WatchaIcon from '@public/icons/icon-watcha.svg';
import WavveIcon from '@public/icons/icon-wavve.svg';
import AppleTvIcon from '@public/icons/icon-apple-tv.svg';
import SeeznIcon from '@public/icons/icon-seezn.svg';
import axios from 'axios';
import { userInfoState } from '@/store/userInfo/atom';
import { useRecoilState } from 'recoil';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Mypage() {
  const router = useRouter();

  const [list, setList] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [tempUserInfo, setTempUserInfo] = useState(userInfo);

  const [openModal, setOpenModal] = useState({
    isName: false,
    isAge: false,
    isSubscribe: false,
  });

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

  const handleClickOtt = (value) => {
    if (value === 'NONE') {
      setTempUserInfo((prev) => ({ ...prev, ottList: [value] }));
    } else {
      if (tempUserInfo.ottList.includes('NONE')) {
        setTempUserInfo((prev) => ({
          ...prev,
          ottList: tempUserInfo.ottList.filter((item) => item !== 'NONE'),
        }));
      }
      if (tempUserInfo.ottList.includes(value)) {
        const newItems = tempUserInfo.ottList.filter((item) => item !== value);
        setTempUserInfo((prev) => ({ ...prev, ottList: newItems }));
      } else {
        setTempUserInfo((prev) => ({
          ...prev,
          ottList: [...prev.ottList, value],
        }));
      }
    }
  };

  const handleClickMore = () => {
    const newItems = Array.from({ length: 4 });
    setList((prev) => [...prev, ...newItems]);
  };

  const handleChangeName = (e) => {
    setTempUserInfo((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChangeAge = (e) => {
    setTempUserInfo((prev) => ({
      ...prev,
      age: e,
    }));
  };

  useEffect(() => {
    if (window.localStorage.getItem('access_token') === null) {
      redirect('/login');
    }

    axios
      .get(`${API_URL}/api/v1/movie`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => setList(res.data.data));

    axios
      .get(`${API_URL}/api/v1/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((res) => {
        setUserInfo(res.data.data);
        setTempUserInfo(res.data.data);
      });
  }, []);

  return (
    <>
      <header className="px-4 py-2 sm:px-5 flex items-center">
        <ArrowLeftIcon className="cursor-pointer" onClick={() => router.push('/')} />
        <div className="ml-1 text-lg font-bold">My page</div>
      </header>
      <div className="flex flex-col divide-y-6 divide-b100 h-[calc(100%-64px)] overflow-y-auto">
        <div className="px-5 pb-5 flex flex-col items-center">
          <div className="w-[55px] h-[55px] bg-g50 flex justify-center items-center rounded-2.5xl overflow-hidden relative">
            {/* <UserIcon /> */}
            <Image src={userInfo.profileImageUrl} alt="profile img" fill />
          </div>
          <div className="text-lg text-g400 font-semibold mt-1">{userInfo.name}님</div>
          <div className="text-sm text-g75">{userInfo.age}세</div>
          <div className="flex space-x-2 w-full text-center mt-5">
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isName: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">✏️</div>
              <div className="text-xs text-g100 font-semibold">이름 수정</div>
            </div>
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isAge: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">⏳</div>
              <div className="text-xs text-g100 font-semibold">연령 수정</div>
            </div>
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isSubscribe: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">🎬</div>
              <div className="text-xs text-g100 font-semibold">구독정보 수정</div>
            </div>
          </div>
        </div>
        <div className="px-5 py-8 h-full grow">
          <div className="text-g200 font-semibold text-lg mb-5">나의 콘텐츠 수첩</div>
          <div className="grid grid-cols-2 gap-5 px-5 pb-3">
            {list?.map((item, index) => (
              <div
                key={index}
                className="w-full h-44 sm:h-80 rounded-lg overflow-hidden shadow-square relative"
              >
                <Image src={item.posterImageUrl} alt="poster img" fill className="object-cover" />
              </div>
            ))}
          </div>
          {/* <div className='flex justify-center items-center pt-2 pb-3'>
            <div
              className='border shadow-more rounded-xl border-g50 text-center font-semibold text-lg text-g100 cursor-pointer px-xl py-3 w-fit'
              onClick={handleClickMore}
            >
              더보기
            </div>
          </div> */}
        </div>
      </div>

      {/* 이름 수정 modal */}
      {openModal.isName && (
        <Modal bg="bg-white">
          <header className="px-4 py-2 sm:px-5 flex items-center">
            <CloseIcon
              className="cursor-pointer"
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isName: false }));
                setTempUserInfo(userInfo);
              }}
            />
            <div className="ml-1 text-lg font-bold">이름 수정</div>
          </header>
          <div className="px-5 sm:px-6 pt-8 flex flex-col justify-between h-[calc(100%-64px)]">
            <div className="flex-1">
              <div className="text-2xl font-bold text-g400 sm:mb-4 mb-3 break-keep">
                뭐라고 불러드릴까요?
              </div>
              <div className="text-sm text-g100 mb-14">닉네임을 입력해주세요</div>
              <div>
                <input
                  type="text"
                  defaultValue={tempUserInfo.name}
                  onChange={(e) => handleChangeName(e)}
                  id="name"
                  className="bg-white border border-gray-300 text-gray-900 sm:text-base text-sm block w-full sm:p-4.5 p-3.5 rounded-xl focus:border-main focus:outline-none"
                  placeholder="닉네임을 입력해주세요"
                  required
                  maxLength={30}
                />
              </div>
            </div>

            <button
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isName: false }));
                setUserInfo((prev) => ({ ...prev, name: tempUserInfo.name }));

                axios.post(
                  `${API_URL}/api/v1/user`,
                  {
                    name: tempUserInfo.name,
                    age: userInfo.age,
                    ottList: userInfo.ottList,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  },
                );
              }}
              disabled={tempUserInfo.name === ''}
              className="mb-3 w-full bg-main rounded-lg text-white py-3.5 disabled:bg-light-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300"
            >
              완료
            </button>
          </div>
        </Modal>
      )}

      {/* 연령 수정 modal */}
      {openModal.isAge && (
        <Modal bg="bg-white">
          <header className="px-4 py-2 sm:px-5 flex items-center">
            <CloseIcon
              className="cursor-pointer"
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isAge: false }));
                setTempUserInfo(userInfo);
              }}
            />
            <div className="ml-1 text-lg font-bold">연령 수정</div>
          </header>
          <div className="px-5 sm:px-6 pt-8 flex flex-col justify-between h-[calc(100%-64px)]">
            <div className="flex-1">
              <div className="text-2xl font-bold text-g400 sm:mb-4 mb-3 break-keep">
                연령대를 선택해주세요
              </div>
              <div className="text-sm text-g100 mb-14">나이를 입력해주세요</div>
              <div className="relative mb-6 range-slide">
                <RcSlider value={tempUserInfo.age} onChange={handleChangeAge} />
              </div>
            </div>

            <button
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isAge: false }));
                setUserInfo((prev) => ({ ...prev, age: tempUserInfo.age }));

                axios.post(
                  `${API_URL}/api/v1/user`,
                  {
                    name: userInfo.name,
                    age: tempUserInfo.age,
                    ottList: userInfo.ottList,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  },
                );
              }}
              disabled={tempUserInfo.age === 0}
              className="mb-3 w-full bg-main rounded-lg text-white py-3.5 disabled:bg-light-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300"
            >
              완료
            </button>
          </div>
        </Modal>
      )}

      {/* 구독정보 수정 modal */}
      {openModal.isSubscribe && (
        <Modal bg="bg-white">
          <header className="px-4 py-2 sm:px-5 flex items-center">
            <CloseIcon
              className="cursor-pointer"
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isSubscribe: false }));
                setTempUserInfo(userInfo);
              }}
            />
            <div className="ml-1 text-lg font-bold">구독정보 수정</div>
          </header>

          <div className="px-5 sm:px-6 pt-8 flex flex-col justify-between h-[calc(100%-64px)]">
            <div className="flex-1 overflow-y-auto">
              <div className="text-2xl font-bold text-g400 sm:mb-4 mb-3 break-keep">
                현재 구독중인 OTT서비스를 선택해주세요
              </div>
              <div className="text-sm text-g100 mb-9 sm:mb-14">
                이 설정은 나중에 다시 수정할 수 있어요
              </div>
              <div className="grid grid-cols-3 gap-x-2 gap-y-4 pb-4 ">
                {ottServices.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleClickOtt(item.value)}
                    className={`flex flex-col justify-center items-center rounded-3xl py-3 px-2.5 ${
                      tempUserInfo.ottList.find((el) => el === item.value)
                        ? 'shadow-line bg-v50'
                        : 'shadow-square'
                    }`}
                  >
                    <div className={`${item.value === 'none' && 'text-3xl mt-3'}`}>{item.icon}</div>
                    <div className={`text-g200 text-sm mt-2 ${item.value === 'none' && 'mt-3'}`}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setOpenModal((prev) => ({ ...prev, isSubscribe: false }));
                axios.post(
                  `${API_URL}/api/v1/user`,
                  {
                    name: userInfo.name,
                    age: userInfo.age,
                    ottList: tempUserInfo.ottList,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                  },
                );
              }}
              disabled={tempUserInfo.ottList.length === 0}
              className="mb-3 w-full bg-main rounded-lg text-white py-3.5 disabled:bg-light-gray disabled:cursor-not-allowed disabled:opacity-50 disabled:text-b300"
            >
              완료
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
