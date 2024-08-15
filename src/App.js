import styles from './App.module.css';
import React, { useState, useRef, useMemo } from 'react';

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
      .matches(/^[w_]*$/, 'Допустимые символы: буквы, цифры и нижнее подчёркивание')
      .min(3, 'Должно быть не меньше 3 символов')
      .max(20, 'Должно быть не больше 20 символов'),
    password: yup.string()
      .required('Пароль обязателен.')
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/, 'Допустимые символы: буквы, цифры и спец. символы @#$%^&*')
      .min(6, 'Должно быть не меньше 6 символов')
      .max(16, 'Должно быть не больше 16 символов'),
    confirmPassword: yup.string()
      .required('Повтор пароль обязателен.')
      .oneOf([yup.ref('password')], 'Пароли должны совпадать!')
  });

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
      re_password: ''
    },
    resolver: yupResolver(fieldsSchema),
  });


  const submitRef = useRef(null);

  const validate = true;
  // наверно можно как то подругому, но это получаеться удобно
  /*const validate = useMemo(() => {
    return !(login.errors.length || password.errors.length || re_password.errors.length);
  }, [login.errors, password.errors, re_password.errors]);*/


  return (<div className={styles.app}>
    <form onSubmit={handleSubmit(sendFormData)} className={styles.form}>
      <input
        name="login"
        type="text"
        {...register('login')}
        className={styles.input}
        placeholder="Логин" />
      {errors.login && <div className={styles.error}>{errors.login}</div>}
      <input
        name="password"
        type="password"
        {...register('password')}
        className={styles.input}
        placeholder="Пароль" />
      {errors.password && <div className={styles.error}>{errors.password}</div>}
      <input
        name="re_password"
        type="password"
        {...register('re_password')}
        className={styles.input}
        placeholder="Повторить пароль" />
      {errors.re_password && <div className={styles.error}>{errors.re_password}</div>}
      <button ref={submitRef} className={styles.button} type="submit" disabled={!validate}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
