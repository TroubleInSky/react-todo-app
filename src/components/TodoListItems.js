import React from 'react';
import { useSelector } from 'react-redux';

import useItems from '../helpers/useItems';
import useUser from '../helpers/useUser';
import { StatusEditor, TextEditor } from './Editor';
import { statusValues, todoFilters } from '../helpers/config';

const ItemField = ({type, value, item}) => {
  const user = useUser();

  switch (type) {

    case todoFilters.STATUS:
      if (user.logged) return <StatusEditor value={value} item={item}/>;
      else return <div className={`dot dot-${value}`}>{statusValues[value]}</div>;
    case todoFilters.TEXT:
      if (user.logged) return <TextEditor value={value} item={item}/>;
      break;
    default: return value;
  }

};

export default function TodoListItems () {

  const settings = useSelector(state => state.itemSettings);
  const [items, loading] = useItems();



  return (
      <div className={'todo-list-items'}>
        {loading ? <div className={'no-data'}>Загрузка</div> : (
            <>
              {items.length ? items.slice(0, settings.showPerPage).map(item => (
                  <div className={`todo-list-items-item`} key={'item' + item.id}>
                    {settings.fieldsShowOrder.map((field, i) => (
                        <div className={`todo-list-items-item-field`} key={'' + item.id + i}>
                          <ItemField type={field} value={item[field]} item={item}/>
                        </div>
                    ))}
                  </div>
              )) : <div className={'no-data'}>Нет Созданных тасков</div>}
            </>
        )}


      </div>
  )
}