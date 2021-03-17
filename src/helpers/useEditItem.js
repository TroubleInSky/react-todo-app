import { useDispatch, useSelector } from 'react-redux';
import { editItem } from '../store/Item';
import { httpPost } from '../services/api';
import { getToken } from './authToken';

export default function useEditItem (id) {

  let canRequest = true;
  let timer = null;
  const item = useSelector(state => state.item.find(item => item.id === id));
  const dispatch = useDispatch();

  const save = (item) => {
    if (timer) clearTimeout(timer);
    if (canRequest) {
      canRequest = false;


      httpPost(`edit/${item.id}`, {
        text: item.text,
        status: +item.status,
        token: getToken()
      });


      setTimeout(() => {
        canRequest = true;
      }, 3000)
    } else {
      timer = setTimeout(() => {
        save(item);
      }, 1000)
    }
  };
  const updateItem = (object) => {
    const newItem = {...item, ...object};
    dispatch(editItem(newItem));

   save(newItem)

  };



  return [item, updateItem]

}