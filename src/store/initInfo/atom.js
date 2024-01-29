import { atom } from 'recoil';
import { localStorageEffect } from '../recoilEffect';

export const isFirstState = atom({
  key: 'isFirstState',
  default: true,
  effects: [localStorageEffect('is_first')],
});
