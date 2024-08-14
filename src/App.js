import logo from './logo.svg';
import styles from './App.module.css';
import React, { useState, useRef } from 'react';

function sendFormData(formData) {
  console.log(JSON.stringify(formData))
}

const rules = {
  login: [
    v => !!v || 'Логин обязателен.',
    v => /^[\w_]*$/.test(v) || 'Допустимые символы: буквы, цифры и нижнее подчёркивание.',
    v => v.length > 2 || 'Должно быть не меньше 3 символов.',
    v => v.length < 21 || 'Должно быть не больше 20 символов.',
  ],
  password: [],
  re_password: []
}

function App() {
  const [formData, setFormData] = useState({
    login: '',
    password: '',
    re_password: ''
  });
  const [errors, setErrors] = useState({
    login: [],
    password: [],
    re_password: []
  });
  const [validate, setValidate] = useState(false);
  const submitRef = useRef(null)

  const validation = (target) => {
    const err = (rules[target.name] || []).map(rule => rule(target.value)).filter(v => v !== true);
    if (err.length) {
      setValidate(false);
    }
    return err;
  }

  const handleChange = ({ target }) => {
    setValidate(true);
    setFormData({ ...formData, [target.name]: target.value });
    setErrors({ ...errors, [target.name]: validation(target) })
  }




  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({ ...formData });
  };

  return (<div className={styles.app}>
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        name="login"
        type="text"
        value={formData.login}
        onChange={handleChange}
        className={styles.input}
        placeholder="Логин" />
      {errors.login.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        className={styles.input}
        placeholder="Пароль" />
      {errors.password.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <input
        name="re_password"
        type="password"
        value={formData.re_password}
        onChange={handleChange}
        className={styles.input}
        placeholder="Повторить пароль" />
      {errors.re_password.map((mes, index) => <div key={index} className={styles.error}>{mes}</div>)}
      <button ref={submitRef} className={styles.button} type="submit" disabled={!validate}>Зарегистрировать</button>
    </form>
  </div>)
}

export default App;
