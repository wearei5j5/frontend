'use client';

import ArrowLeftIcon from '@public/icons/icon-arrow-left.svg';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Modal from '@/app/_components/Modal';
import RcSlider from '@/app/_components/RcSlider';
import Image from 'next/image';

import UserIcon from '@public/icons/icon-user.svg';
import CloseIcon from '@public/icons/icon-close.svg';

import axios from 'axios';
import { userInfoState } from '@/store/userInfo/atom';
import { useRecoilState } from 'recoil';
import { ACCESS_TOKEN_STR, API_URL } from '@/constants/common';

import TextGroup from '@/app/_components/TextGroup';
import OttService from '@/app/_components/OttService';
import Button from '@/app/_components/Button';

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

  const handleClickChageName = async () => {
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
  };

  const handleClickChageAge = async () => {
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
  };

  const handleClickChageOtt = async () => {
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
  };

  useEffect(() => {
    if (
      localStorage.getItem(ACCESS_TOKEN_STR) !== null &&
      localStorage.getItem(ACCESS_TOKEN_STR) !== ''
    ) {
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
    }
  }, []);

  return (
    <div className="h-full">
      <header className="px-4 py-2 sm:px-5 flex items-center">
        <ArrowLeftIcon className="cursor-pointer" onClick={() => router.push('/')} />
        <div className="ml-1 text-lg font-bold">My page</div>
      </header>
      <div className="flex flex-col divide-y-6 divide-b100 h-[calc(100%-64px)] overflow-y-auto">
        <div className="px-5 pb-5 flex flex-col items-center">
          <div className="w-[55px] h-[55px] bg-g50 flex justify-center items-center rounded-2.5xl overflow-hidden relative">
            {/* <UserIcon /> */}
            {userInfo?.profileImageUrl && (
              <Image
                src={userInfo?.profileImageUrl}
                alt="profile img"
                className="w-full h-full object-cover"
                fill
              />
            )}
          </div>
          <div className="text-lg text-g400 font-semibold mt-1">{userInfo.name}님</div>
          <div className="text-sm text-g75">{userInfo.age}세</div>
          <div className="flex space-x-2 w-full text-center mt-5">
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isName: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">✏️</div>
              <div className="text-xs text-g100 font-semibold break-keep">이름 수정</div>
            </div>
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isAge: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">⏳</div>
              <div className="text-xs text-g100 font-semibold break-keep">연령 수정</div>
            </div>
            <div
              onClick={() => setOpenModal((prev) => ({ ...prev, isSubscribe: true }))}
              className="flex flex-col justify-center grow w-full py-2.5 sm:py-5 px-5 shadow-mypage rounded-2xl cursor-pointer"
            >
              <div className="mb-2 text-3xl">🎬</div>
              <div className="text-xs text-g100 font-semibold break-keep">구독정보 수정</div>
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
              <TextGroup mainText="뭐라고 불러드릴까요?" subText="닉네임을 입력해주세요" />
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
            <Button
              bgColor="bg-main"
              textColor="text-white"
              styleClass="mb-3"
              text="완료"
              disabled={tempUserInfo.name === ''}
              onClick={handleClickChageName}
            />
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
              <TextGroup mainText="연령대를 선택해주세요" subText="나이를 입력해주세요" />
              <div className="relative mb-6 range-slide">
                <RcSlider value={tempUserInfo.age} onChange={handleChangeAge} />
              </div>
            </div>
            <Button
              bgColor="bg-main"
              textColor="text-white"
              styleClass="mb-3"
              text="완료"
              disabled={tempUserInfo.age === 0}
              onClick={handleClickChageAge}
            />
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
            <div className="flex-1">
              <TextGroup
                mainText="현재 구독중인 OTT서비스를 선택해주세요"
                subText="이 설정은 나중에 다시 수정할 수 있어요"
              />
              <OttService selectedList={tempUserInfo.ottList} handleClickOtt={handleClickOtt} />
            </div>
            <Button
              bgColor="bg-main"
              textColor="text-white"
              styleClass="mb-3"
              text="완료"
              disabled={tempUserInfo.ottList.length === 0}
              onClick={handleClickChageOtt}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
