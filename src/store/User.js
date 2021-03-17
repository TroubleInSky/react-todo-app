import { getToken } from '../helpers/authToken';

export const SET_USER = 'SET_USER';

const defaultState = {
  logged: !!getToken()
};
export const user = (state = defaultState, {type, payload}) => {

  switch (type) {
    case SET_USER: return {...state, ...payload};
    default: return state;
  }

};


export const updateUser = payload => {
  return {
    type: SET_USER,
    payload
  }
};