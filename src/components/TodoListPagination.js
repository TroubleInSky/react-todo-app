import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItemSettings } from '../store/Item';

export default function TodoListPagination () {

  const {total, showPerPage, currentPage} = useSelector(state => state.itemSettings);
  const dispatch = useDispatch();
  const totalPages = Math.ceil(total / showPerPage);

  const paginate = (to) => () => {
    if (to === 'next') to = currentPage + 1;
    if (to === 'prev') to = currentPage - 1;
    if (currentPage !== to)
      dispatch(setItemSettings({currentPage: to}));
  };
  if (totalPages > 1)
    return (
        <div className={'todo-list-pagination'}>
          {currentPage > 1 ? (<div className={'todo-list-pagination-prev'} onClick={paginate('prev')}>{'<'}</div>): null}
          {currentPage > 5 ? '...' : null}
          {Array.from({length: totalPages}, (_, i) => i + 1).filter(num => num > currentPage - 5 && num < currentPage + 5).map(p => (
              <div className={`todo-list-pagination-num ${currentPage === p ? 'current':''}`} onClick={paginate(p)}>{p}</div>
          ))}
          {currentPage < totalPages - 5 ? '...' : null}
          {currentPage < totalPages ? (<div className={'todo-list-pagination-next'} onClick={paginate('next')}>{'>'}</div>): null}
        </div>
    )
  else return null;
}