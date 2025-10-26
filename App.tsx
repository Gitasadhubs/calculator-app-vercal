import React, { useState } from 'react';
import Button from './components/Button';
import type { Operator } from './types';

const App: React.FC = () => {
  const [currentOperand, setCurrentOperand] = useState<string>('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [overwrite, setOverwrite] = useState<boolean>(true);

  const formatOperand = (operand: string | null): string => {
    if (operand === null) return '';
    if (operand.includes('NaN') || operand.includes('Infinity')) return 'Error';
    
    const [integerPart, decimalPart] = operand.split('.');
    const formattedInteger = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 20,
    }).format(BigInt(integerPart));

    if (decimalPart != null) {
      return `${formattedInteger}.${decimalPart}`;
    }
    
    return formattedInteger;
  };

  const calculate = (): string => {
    const prev = parseFloat(previousOperand || '0');
    const current = parseFloat(currentOperand);

    let result: number;
    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return currentOperand;
    }
    return result.toString();
  };

  const handleNumberClick = (num: string) => {
    if (overwrite) {
      setCurrentOperand(num);
      setOverwrite(false);
    } else {
      if (currentOperand === '0' && num === '0') return;
      if (currentOperand === '0' && num !== '0') {
        setCurrentOperand(num);
      } else {
        if (currentOperand.length >= 16) return;
        setCurrentOperand(currentOperand + num);
      }
    }
  };
  
  const handleOperatorClick = (op: Operator) => {
    if (previousOperand !== null && !overwrite) {
      const result = calculate();
      setCurrentOperand(result);
      setPreviousOperand(result);
    } else {
      setPreviousOperand(currentOperand);
    }
    setOperator(op);
    setOverwrite(true);
  };
  
  const handleEqualsClick = () => {
    if (operator && previousOperand !== null) {
      const result = calculate();
      setCurrentOperand(result);
      setPreviousOperand(null);
      setOperator(null);
      setOverwrite(true);
    }
  };

  const handleClearClick = () => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleDecimalClick = () => {
    if (overwrite) {
        setCurrentOperand('0.');
        setOverwrite(false);
        return;
    }
    if (!currentOperand.includes('.')) {
      setCurrentOperand(currentOperand + '.');
    }
  };

  const handleToggleSignClick = () => {
    setCurrentOperand((parseFloat(currentOperand) * -1).toString());
  };

  const handlePercentClick = () => {
    setCurrentOperand((parseFloat(currentOperand) / 100).toString());
  };

  const handleButtonClick = (label: string) => {
    switch (label) {
      case 'AC':
        handleClearClick();
        break;
      case '+/-':
        handleToggleSignClick();
        break;
      case '%':
        handlePercentClick();
        break;
      case '/':
      case '*':
      case '-':
      case '+':
        handleOperatorClick(label as Operator);
        break;
      case '=':
        handleEqualsClick();
        break;
      case '.':
        handleDecimalClick();
        break;
      default: // Numbers
        handleNumberClick(label);
        break;
    }
  };
  
  const functionBtnClass = "bg-slate-400 hover:bg-slate-300 text-black";
  const operatorBtnClass = "bg-amber-500 hover:bg-amber-400 text-white";
  const numberBtnClass = "bg-slate-700 hover:bg-slate-600 text-white";

  return (
    <div className="w-full max-w-sm mx-auto bg-black rounded-3xl shadow-2xl p-4 space-y-4">
      <div className="bg-black text-white p-4 rounded-lg text-right break-words">
        <div className="text-gray-400 text-2xl h-8">
            {previousOperand && operator && `${formatOperand(previousOperand)} ${operator}`}
        </div>
        <div className="text-6xl font-light" style={{ minHeight: '60px' }}>
            {formatOperand(currentOperand)}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button label="AC" onClick={handleButtonClick} className={functionBtnClass} />
        <Button label="+/-" onClick={handleButtonClick} className={functionBtnClass} />
        <Button label="%" onClick={handleButtonClick} className={functionBtnClass} />
        <Button label="/" onClick={handleButtonClick} className={operatorBtnClass} />
        
        <Button label="7" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="8" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="9" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="*" onClick={handleButtonClick} className={operatorBtnClass} />
        
        <Button label="4" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="5" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="6" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="-" onClick={handleButtonClick} className={operatorBtnClass} />
        
        <Button label="1" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="2" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="3" onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="+" onClick={handleButtonClick} className={operatorBtnClass} />
        
        <div className="col-span-2">
            <Button label="0" onClick={handleButtonClick} className={`${numberBtnClass} w-full`} />
        </div>
        <Button label="." onClick={handleButtonClick} className={numberBtnClass} />
        <Button label="=" onClick={handleButtonClick} className={operatorBtnClass} />
      </div>
    </div>
  );
};

export default App;