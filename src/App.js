import styles from './App.module.css';
import React, { useState, useRef, useMemo } from 'react';
import { useInput } from "./hooks/useInput.js";

function sendFormData(formData) {
  console.log(JSON.stringify(formData))
}

function App() {
  const login = useInput('', [
    v => !!v || 'Логин обязателен.',
    v => /^[\w_]*$/.test(v) || 'Допустимые символы: буквы, цифры и нижнее подчёркивание.',
    v => v.length > 2 || 'Должно быть не меньше 3 символов.',
    v => v.length < 21 || 'Должно быть не больше 20 символов.',
  ]);
  const password = useInput('', [
    v => !!v || 'Пароль обязателен.',
    v => /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(v) || 'Допустимые символы: буквы, цифры и спец. символы @#$%^&*',
    v => v.length > 5 || 'Должно быть не меньше 6 символов.',
    v => v.length < 17 || 'Должно быть не больше 16 символов.'
  ]);
  const re_password = useInput('', [
    v => !!v || 'Повтор пароль обязателен.',
    v => password.value === v || 'Пароли должны совпадать!'
  ]);
  const submitRef = useRef(null);

  // наверно можно как то подругому, но это получаеться удобно
  const validate = useMemo(() => {
    return !(login.errors.length || password.errors.length || re_password.errors.length);
  }, [login.errors, password.errors, re_password.errors]);

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({
      login: login.value,
      password: password.value,
      re_password: re_password.value
    });
  };
  const onChangeRePassword = (event) => {
    re_password.onChange(event);
    if (password.value === event.target.value) {
      event.target.blur();
      // не придумал как иначе
      setTimeout(() => submitRef.current.focus(), 0);
    }
  }

  return (<div className={styles.app}>
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        name="login"
        type="text"
        value={login.value}
        onBlur={(e) => login.onBlur(e)}
        onChange={(e) => login.onChange(e)}
        className={styles.input}
        placeholder="Логин" />
      {login.dirty && login.errors.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <input
        name="password"
        type="password"
        value={password.value}
        onBlur={(e) => password.onBlur(e)}
        onChange={(e) => password.onChange(e)}
        className={styles.input}
        placeholder="Пароль" />
      {password.dirty && password.errors.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <input
        name="re_password"
        type="password"
        value={re_password.value}
        onBlur={(e) => re_password.onBlur(e)}
        onChange={(e) => onChangeRePassword(e)}
        className={styles.input}
        placeholder="Повторить пароль" />
      {re_password.dirty && re_password.errors.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <button ref={submitRef} className={styles.button} type="submit" disabled={!validate}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
