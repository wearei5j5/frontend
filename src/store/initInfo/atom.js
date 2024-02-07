import { atom } from 'recoil';
import { sessionStorageEffect } from '../recoilEffect';

export const isTemporaryState = atom({
  key: 'isTemporaryState',
  default: false,
  effects: [sessionStorageEffect('is_temporary')],
});
