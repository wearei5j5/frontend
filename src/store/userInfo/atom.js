import { atom } from 'recoil';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    name: '',
    age: 0,
    ott: [],
  },
});
