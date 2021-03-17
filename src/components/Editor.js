import { statusValues } from '../helpers/config';
import React, { useState } from 'react';
import useEditItem from '../helpers/useEditItem';

export const TextEditor = ({value, item}) => {

  const [val, setVal] = useState(value);
  const [$item, editItem] = useEditItem(item.id);

  const onSubmit = e => {
    e.preventDefault();
    if (val !== $item.text)
      editItem({text:val, status: (+$item.status === 0 || +$item.status === 10) ? +$item.status + 1 : +$item.status});
  };

  return (
      <form onSubmit={onSubmit} style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <textarea value={val} onChange={e => setVal(e.target.value)}/>
        <button type={'submit'}>+</button>
      </form>
  )
};

export const StatusEditor = ({value, item}) => {

  const [$item, editItem] = useEditItem(item.id);

  const onChange = (e) => {

    editItem({status: e.target.value})
  };

  const getOptionValue = val => {
    return $item.status === 1 || $item.status === 11 ? val + 1 : val;
  };

  return (
      <>
        <select value={value} onChange={onChange}>
          <option value={getOptionValue(0)}>{statusValues[getOptionValue(0)]}</option>
          <option value={getOptionValue(10)}>{statusValues[getOptionValue(10)]}</option>
        </select>
      </>
  )

};