import { useEffect, useState } from 'react';
import { httpPost } from '../services/api';
import { setItemSettings } from '../store/Item';
import { useDispatch, useSelector } from 'react-redux';
const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function useAddItem ()  {

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const settings = useSelector(state => state.itemSettings);

  const addItem = async (username, email, text) => {
    const errors = {};
    if (username.length < 3) errors.username = 'Поле является обязательным для заполнения';
    if (email.length < 3 || !emailRe.test(email.toLowerCase())) errors.email = 'Неверный email';
    if (text.length < 3) errors.text = 'Поле является обязательным для заполнения';

    if (Object.keys(errors).length) {
      setErrors(errors);
    } else {
      setLoading(true);
      const {status, message} = await httpPost('create', {username, email, text});

      if (status === 'ok') {
        dispatch(setItemSettings({total: +settings.total  + 1}));
        setLoading(false)
        return true
      } else {
        setErrors(message);
        return false
      }

    }
  };

  useEffect(() => {

    if (Object.keys(errors).length)
      setTimeout(() => {
        setErrors({});
      }, 3000)

  }, [errors]);

  return [addItem, loading, errors];
}