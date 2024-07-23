import style from './App.module.css';
import { useState } from 'react';

function App() {
  const [operator, setOperator] = useState('');
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [isResult, setIsResult] = useState(false);
   
  const NUMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const OPERATORS = ['+', '-', 'C', '='];

  const onNumClic = (num) => {
    if (operator) {
      setOperand2(operand2? operand2+num: String(num||''));
    } else {
      setOperand1(operand1? operand1+num: String(num||''));
    }
  }
  const onOperatorClick = (operator) => {
    if (operator === "=") {
      resultClick();
    } else if (operator === "C") {
      clearClick();
    } else if (operand2) {
      resultClick();
      setOperator(operator);
      setIsResult(false)
    } else {
      setOperator(operator);
      setIsResult(false)
    }
  }
  const clearClick = () => {
    setOperator('');
    setOperand1('');
    setOperand2('');
    setIsResult(false)
  }
  const resultClick = () => {
    let num1 = +operand1;
    let num2 = +operand2;
    setOperand1('')
    setOperand2('')
    switch (operator) {
      case '+':
        setOperand1(num1 + num2)
        setOperator('')
        break;
      case '-':
        setOperand1(num1 - num2)
        setOperator('')
        break;  
    }
    setIsResult(true)
  }

  return (<div className={style['app-calculator']}>
      <div className={style['app-calculator__display']+(isResult? ' '+style['app-calculator__display--result']:'')}>
        {operand1+operator+operand2}
      </div>
      <div className={style['app-calculator__buttons']}>
        {NUMS.map((num) => {
          return (<button key={num} className={style['app-calculator__button']} onClick={() => onNumClic(num)}>{num}</button>);
        })}
      </div>
      <div className={style['app-calculator__buttons']}>
        {OPERATORS.map((operator) => {
          return (<button key={operator} className={style['app-calculator__button']} onClick={() => onOperatorClick(operator)}>{operator}</button>);
        })}
      </div>
  </div>)
}

export default App;
