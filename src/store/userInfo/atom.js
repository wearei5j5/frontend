import { atom } from 'recoil';
import { localStorageEffect } from '../recoilEffect';

export const userInfoState = atom({
  key: 'userInfoState',
  default: {
    name: '',
    age: 0,
    ottList: [],
    profileImageUrl: '',
  },
  effects: [localStorageEffect('user_info')],
});
