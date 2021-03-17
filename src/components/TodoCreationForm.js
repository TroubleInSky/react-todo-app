import React, { useRef, useState } from 'react';
import useAddItem from '../helpers/useAddItem';

export default function TodoCreationForm () {

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const textRef = useRef(null);
  const [addItem, loading, errors] = useAddItem();
  const [showInfo, setShowInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      addItem(
          usernameRef.current.value,
          emailRef.current.value,
          textRef.current.value
      ).then(status => {
        if (status) {
          usernameRef.current.value = '';
          emailRef.current.value = '';
          textRef.current.value = '';
          setShowInfo(true)
          setTimeout(() => {
            setShowInfo(false);
          }, 3000)
        }
      })
    }


  };

  return (
      <>
        <form className={'todo-creation-form-form'} onSubmit={handleSubmit}>

          <div className={'form-item-container'}>
            <div className="form-item">
              <label htmlFor="username" className={errors.username ? 'error' : ''}>Имя {  errors.username ? '(' + errors.username + ')' : null}</label>
              <input type="text" name={'username'} id={'username'} ref={usernameRef}/>
            </div>
            <div className="form-item">
              <label htmlFor="email" className={errors.email ? 'error' : ''}>E-mail {  errors.email ? '(' + errors.email + ')' : null}</label>
              <input type="text" name={'email'} id={'email'} ref={emailRef}/>
            </div>
          </div>
          <div className="form-item-container">
            <div className="form-item">
              <label htmlFor="text" className={errors.text ? 'error' : ''}>Текст {  errors.text ? '(' + errors.text + ')' : null}</label>
              <textarea name={'text'} id={'text'} ref={textRef}/>
            </div>
          </div>
          <button type={'submit'} className={Object.keys(errors).length ? 'error' : ''}>{loading ? '...' : '+'}</button>


        </form>
       <div className={`info ${showInfo ? 'show' : 'hidden'}`}>Успешно добавлено!</div>
      </>
  )
}