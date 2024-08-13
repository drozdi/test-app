import logo from './logo.svg';
import style from './App.module.css';
import React, { useState } from 'react';

function sendFormData (formData) {
  console.log(JSON.stringify(formData))
}

function App() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [errors, setErrors] = useState(null);

  const onLoginChange = ({ target }) => {
    setLogin(target.value);
    let newError = null;

    if (!/^[\w_]*$/.test(target.value)) {
        newError = 'Неверный логин. Допустимые символы: буквы, цифры и нижнее подчёркивание';
    } else if (target.value.length > 20) {
        newError = 'Неверный логин. Должно быть не больше 20 символов';
    }

    setLoginError(newError);
};

  const onSubmit = (event) => {
      event.preventDefault();
      sendFormData({ login, password, rePassword });
  };

  return (<div className={style.app}>
    <form onSubmit={onSubmit} className={style.form}>
      
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
        className={style.input}
        placeholder="Пароль" />

      <input
        name="re_password"
        type="password"
        value={rePassword}
        className={style.input}
        placeholder="Повторить пароль" />

        <button className={style.button} type="submit" disabled={!!loginError}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
