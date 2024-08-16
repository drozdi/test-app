import styles from './App.module.css';
import React, { useState, useRef, useMemo, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


function sendFormData(formData) {
  console.log(JSON.stringify(formData))
}

const fieldsSchema = yup.object()
  .shape({
    login: yup.string()
      .required('Логин обязателен.')
      .matches(/^[\w_]*$/, 'Допустимые символы: буквы, цифры и нижнее подчёркивание')
      .min(3, 'Должно быть не меньше 3 символов')
      .max(20, 'Должно быть не больше 20 символов'),
    password: yup.string()
      .required('Пароль обязателен.')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, 'Допустимые символы: буквы, цифры и спец. символы @#$%^&*')
      .min(6, 'Должно быть не меньше 6 символов')
      .max(16, 'Должно быть не больше 16 символов'),
    re_password: yup.string()
      .required('Повтор пароль обязателен.')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать!')
  });

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
      re_password: ''
    },
    resolver: yupResolver(fieldsSchema),
  });

  const submitRef = useRef(null);


  useEffect(() => {
    const login = watch('login');
    const password = watch('password');
    const re_password = watch('re_password');
    if (login && password && password === re_password) {
      submitRef.current.disabled = false;
      submitRef.current.focus();
    } else {
      submitRef.current.disabled = true;
    }
  }, [errors.login, errors.password, errors.re_password]);

  return (<div className={styles.app}>
    <form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
      <input
        name="login"
        type="text"
        {...register('login')}
        className={styles.input}
        placeholder="Логин" />
      {errors.login && <div className={styles.error}>{errors.login?.message}</div>}
      <input
        name="password"
        type="password"
        {...register('password')}
        className={styles.input}
        placeholder="Пароль" />
      {errors.password && <div className={styles.error}>{errors.passwor?.messaged}</div>}
      <input
        name="re_password"
        type="password"
        {...register('re_password')}
        className={styles.input}
        placeholder="Повторить пароль" />
      {errors.re_password && <div className={styles.error}>{errors.re_password?.message}</div>}
      <button ref={submitRef} className={styles.button} type="submit" disabled={true}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
