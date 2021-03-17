import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItemSettings } from '../store/Item';
import { todoFilters, todoSorts } from '../helpers/config';


const filterValues = {
  id: 'ID',
  username: 'Имя',
  email: 'E-mail',
  text: 'Текст',
  status: 'Статус'
};

export default function TodoListFilters () {

  const {filter, sort, fieldsShowOrder} = useSelector(state => state.itemSettings);
  const dispatch = useDispatch();

  const setSort = (field) => () => {
    if (field === todoFilters.TEXT || field === todoFilters.DEFAULT) return;
    if (filter === field) {
      dispatch(setItemSettings({sort: sort === todoSorts.ASC ? todoSorts.DESC : todoSorts.ASC}));
    } else {
      dispatch(setItemSettings({sort: todoSorts.ASC, filter: field}));
    }
  };

  return (
      <div className={'todo-list-filters'}>

        {fieldsShowOrder.map(field => (
            <div className={`todo-list-filters-item ${filter === field ? 'sort' : ''}`} key={field} onClick={setSort(field)}>
              {filterValues[field]} {filter === field ? (
                  sort === todoSorts.ASC ? (<div>⇑</div>) : (<div>⇓</div>)
            ) : null}
            </div>
        ))}

      </div>
  )
}