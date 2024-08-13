import logo from './logo.svg';
import style from './App.module.css';
import React, { useState, useRef } from 'react';

function sendFormData(formData) {
  console.log(JSON.stringify(formData))
}

const rules = {
  login: [
    v => !!v || 'Логин обязателен',
    v => /^[\w_]*$/.test(v) || 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание',
    v => v.length > 2 || 'Неверный логин. Должно быть не меньше 3 символов',
    v => v.length < 21 || 'Неверный логин. Должно быть не больше 20 символов',
  ]
}

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState([]);
  const submit = useRef(null)

  const validation = (target) => {
    return (rules[target.name] || []).map(rule => rule(target.value)).filter(v => v !== true);
  }

  const onLoginChange = ({ target }) => {
    setLogin(target.value);
    setErrors(validation(target));
  };
  const onPasswordChange = ({ target }) => {
    setPassword(target.value);
    const newError = validation(target);
    if (rePassword && rePassword !== target.value) {
      newError.push('Пароли должны совпадать!');
    }
    setErrors(newError);
  };
  const onRePasswordChange = ({ target }) => {
    setRePassword(target.value);
    if (password === target.value) {
      setErrors([]);
      submit.current.focus();
    } else {
      setErrors(['Пароли должны совпадать!']);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({ login, password, rePassword });
  };

  return (<div className={style.app}>
    <form onSubmit={onSubmit} className={style.form}>
      {errors.map((mes, index) => <div key={index} className={style.error}>{mes}</div>)}
      <input
        name="login"
        type="text"
        value={login}
        onChange={onLoginChange}
        className={style.input}
        placeholder="Логин" />

      <input
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChange}
        className={style.input}
        placeholder="Пароль" />

      <input
        name="re_password"
        type="password"
        value={rePassword}
        onChange={onRePasswordChange}
        className={style.input}
        placeholder="Повторить пароль" />

      <button ref={submit} className={style.button} type="submit" disabled={errors.length}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
