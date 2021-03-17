import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { httpGet } from '../services/api';
import { setItems, setItemSettings } from '../store/Item';

export default function useItems () {

  const {items, settings} = useSelector(state => ({items:  state.item, settings:  state.itemSettings}));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
   useEffect(() => {
     (async () => {
       setLoading(true);
       const {status, message} = await httpGet('', {
         sort_field: settings.filter,
         sort_direction: settings.sort,
         page : settings.currentPage,
       });
       setLoading(false);
       if (status === 'ok') {
         dispatch(setItems(message.tasks));
         if (settings.total !== message.total_task_count)
          dispatch(setItemSettings({total: message.total_task_count}));
       }
     })()
   }, [settings.sort, settings.filter, settings.currentPage, settings.total, dispatch]);




   return [items, loading];
}