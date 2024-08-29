import styles from './App.module.css';
import React, { useState, useEffect } from 'react';

import { XButton } from './components/ui/Button/XButton';
import { XIcon } from './components/ui/Icon/XIcon';

function App({endpoind}) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(endpoind)
      .then(res => res.json())
      .then(data => setTodos(data))
      .finally(() => setIsLoading(false))
  }, [endpoind]);

  return (<div className={styles.app}>
    <div className={styles.container}>
      {
      isLoading? 
      <div className={styles.loader}></div>:
      <> 
        <h2 className={styles['list-heading']}>Список:</h2>
        {!todos.length && <p>Нет элементов</p>}
        <ul className={styles.list}>
          {todos.map(({ id, title }) => {
            return <li key={id} className={styles['list-item']}>
              {title}
              <div className={styles.actions}>
                <XButton color="secondary" size="xs" onClick={() => {}} title="Изменить">
                  <XIcon>mdi-note-edit-outline</XIcon>
                </XButton>
                <XButton color="danger" size="xs" onClick={() => {}} title="Удалить">
                  <XIcon>mdi-note-remove-outline</XIcon>
                </XButton>
              </div>
            </li>
          })}
        </ul>
      </>
    }
    </div>
  </div >)
}

export default App;
