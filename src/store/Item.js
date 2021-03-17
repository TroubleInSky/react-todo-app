import { todoFilters, todoSorts } from '../helpers/config';

export const SET_ITEMS = 'SET_ITEMS';
export const EDIT_ITEM = 'EDIT_ITEM';
export const SET_ITEM_SETTINGS = 'SET_ITEM_SETTINGS';




const defaultState = [];
const defaultSettings = {
  total: 0,
  showPerPage: 3,
  filter: todoFilters.DEFAULT,
  sort: todoSorts.ASC,
  fieldsShowOrder: ["id", "username", "email", "text", "status"],
  currentPage:1,
};



export const item = (state = defaultState, {type, payload}) => {

  switch (type) {
    case SET_ITEMS: return payload;
    case EDIT_ITEM:
      const findIndex = state.findIndex(item => item.id === payload.id);
      if (findIndex > -1)
        state[findIndex] = {...state[findIndex], ...payload};
      return [...state];
    default: return state;
  }
};


export const itemSettings = (state = defaultSettings, {type, payload}) => {

  switch (type) {
    case SET_ITEM_SETTINGS: return {...state, ...payload};
    default: return state;
  }
};


export const setItems = items => {
  return {
    type: SET_ITEMS,
    payload: items
  }
};

export const editItem = item => {
  return {
    type: EDIT_ITEM,
    payload: item
  }
};
export const setItemSettings = settings => {
  return {
    type: SET_ITEM_SETTINGS,
    payload: settings
  }
};