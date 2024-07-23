import logo from './logo.svg';
import style from './App.module.css';
import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [isValueVaild, setIsValueVaild] = useState(false);

  const onClick = (e) => {
    let val = prompt('Введите значение');
    val &&= val = val.trim()
    setValue(val);
    setError(false);
    setIsValueVaild(true);
    if ((val || '').length < 3) {
      setError(true);
      setIsValueVaild(false);
    }
  }
  const onAddClick = () => {
    setList([...list, {
      value,
      id: Date.now(),
      date: new Date().toLocaleString()
    }]);

    setValue('');
    setError(false);
    setIsValueVaild(false);
  }

  return (<div className={style.app}>
    <h1 className={style['page-heading']}>Ввод значения</h1>
    <p className={style['no-margin-text']}>
      Текущее значение <code>value</code>: "<output className={style['current-value']}>{value}</output>"
    </p>
    {error && <div className={style.error}>Введенное значение должно содержать минимум 3 символа</div>}
    <div className={style['buttons-container']}>
      <button className={style.button} onClick={onClick}>Ввести новое</button>
      <button className={style.button} onClick={onAddClick} disabled={!isValueVaild}>Добавить в список</button>
    </div>
    <div className={style['list-container']}>
      < h2 className={style['list-heading']}>Список:</h2>
      {!list.length && < p className={style['no-margin-text']}>Нет добавленных элементов</p>}
      <ul className={style.list}>
        {list.map(({ id, value, date }) => {
          return <li key={id} className={style['list-item']}>{value} - {date}</li>
        })}
      </ul>
    </div>
  </div >)
}

export default App;
