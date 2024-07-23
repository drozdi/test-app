import { useState } from 'react';
import styles from './App.module.css';
import data from './data.json';

export const App = () => {
	// Можно задать 2 состояния — steps и activeIndex
  const [steps, setSteps] = useState(data);
	const [activeIndex, setActiveIndex] = useState(0);

	const [isFirst, setIsFirst] = useState(activeIndex === 0);
  const [isLast, setIsLast] = useState(activeIndex === steps.length - 1);
	
  /** Вариант с тремя обработчиками */
  const onFirstCliick = () => {
    setActiveIndex(0)
    setIsFirst(true)
    setIsLast(false)
  }

  const onNextClick = () => {
    const index = activeIndex+1
    setActiveIndex(index)
    setIsFirst(false)
    setIsLast(index === steps.length - 1)
  }

  const onPreviousClick = () => {
    const index = activeIndex-1
    setActiveIndex(index)
    setIsFirst(index === 0)
    setIsLast(false)
  }

  /** 
   * Вариант перехода по индексам, вызывать 
   * 
   * goIndex(0) - начало
   * goIndex(activeIndex+1) - далее
   * goIndex(activeIndex-1) - Назад
   * 
   * onFirstCliick = () => goIndex(0)
   * onNextClick = () => goIndex(activeIndex+1)
   * onPreviousClick = () => goIndex(activeIndex-1)
   * */
	const goStep = (index) => {
    setActiveIndex(index)
    setIsFirst(index === 0)
    setIsLast(index === steps.length - 1)
  }
	
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles['steps-content']}>
            {steps[activeIndex].content}
					</div>
					<ul className={styles['steps-list']}>
						{/* Выводите <li> с помощью массива steps и метода map(), подставляя в разметку нужные значения и классы */}
						{steps.map(({id, title, content}, index) => (
              <li className={styles['steps-item'] + (index<=activeIndex? ' '+styles.done: '') + (index===activeIndex? ' '+styles.active: '')} key={id} onClick={() => setActiveIndex(index)}>
                <button className={styles['steps-item-button']} onClick={() => goStep(index)}>{index + 1}</button>
                {title}
              </li>
            ))}
					</ul>
					<div className={styles['buttons-container']}>
						<button className={styles.button} disabled={isFirst} onClick={onPreviousClick}>Назад</button>
						{isLast? 
              <button className={styles.button} onClick={onFirstCliick}>Начать сначала</button>:
              <button className={styles.button} onClick={onNextClick}>Далее</button>}
					</div>
				</div>
			</div>
		</div>
	);
};
