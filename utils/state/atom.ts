/**********************************************************
 * Define recoil atoms.
 *
 * @author Yuto Watanabe <yuto.w51942@gmail.com>
 * @version 1.0.0
 *
 * Copyright (C) 2021 hello-slide
 **********************************************************/

import {atom, DefaultValue} from 'recoil';
import {UserData} from '../../@types/userData';

/**
 * Save and load from localStorage
 *
 * @param {string} key - key
 * @returns {{setSelf, onSet}} value
 */
const localStorageEffect =
  (key: string) =>
  ({setSelf, onSet}) => {
    if (process.browser) {
      const savedValue = localStorage.getItem(key);
      if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue: DefaultValue | string) => {
        if (newValue instanceof DefaultValue) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, JSON.stringify(newValue));
        }
      });
    }
  };

export const UserDataState = atom<UserData>({
  key: 'userData',
  default: {name: '', image: ''},
  effects_UNSTABLE: [localStorageEffect('userData')],
});
