export const initialState = {
  prevValue: "",
  secondValue: "",
  operator: null,
  onDisplay: "0",
};
//Функціонал встановлення максимальної довжини значення
const getMaxValueLength = (value) => {
  const isDecimal = value.includes(".");
  return isDecimal ? 10 : 9;
};
//Калькулятор
const calculate = (prevValue, secondValue, operator) => {
  const prevValueNum = parseFloat(prevValue);
  const secondValueNum = parseFloat(secondValue);
  switch (operator) {
    case "+":
      return prevValueNum + secondValueNum;
    case "-":
      return prevValueNum - secondValueNum;
    case "×":
      return prevValueNum * secondValueNum;
    case "÷":
      return prevValueNum !== 0 ? prevValueNum / secondValueNum : "Error";
  }
};


//  0123456789 - введення значень
const handleNumber = (prevState, button) => {
  const { prevValue, secondValue, operator, onDisplay } = prevState;

  const maxPrevValueLength = getMaxValueLength(prevValue);
  const maxSecondValueLength = getMaxValueLength(secondValue);

  if (secondValue === "" && operator === null && prevValue.length < maxPrevValueLength) {
    if (onDisplay === "0") {
      return {
        ...prevState,
        onDisplay: button,
        prevValue: button,
      };
    } else if (onDisplay === "-0") {
      return {
        ...prevState,
        onDisplay: "-" + button,
        prevValue: "-" + button,
      };
    } else {
      return {
        onDisplay: onDisplay + button,
        prevValue: prevValue + button,
        secondValue: "",
        operator: null,
      };
    }
  } else if (prevValue !== "" && operator !== null && secondValue.length < maxSecondValueLength) {
    return {
      ...prevState,
      onDisplay: secondValue + button,
      secondValue: secondValue + button,
    };
  }
  return prevState;
};

//  +-×÷ - операції над значеннями
const handleOperation = (prevState, button) => {
  const { prevValue, secondValue, operator, onDisplay } = prevState;

  if (prevValue !== "" && secondValue !== "" && operator !== null) {
    const result = String(calculate(prevValue, secondValue, operator));
    return {
      onDisplay: result,
      prevValue: result,
      secondValue: "",
      operator: button,
    };
  } else {
    return {
      onDisplay: onDisplay,
      prevValue: onDisplay,
      secondValue: secondValue,
      operator: button,
    };
  }
};
//  = - результат
const handleEqual = (prevState) => {
  const { prevValue, secondValue, operator } = prevState;

  if (prevValue !== "" && secondValue !== "") {
    const result = String(calculate(prevValue, secondValue, operator));
    return {
      onDisplay: result,
      prevValue: result,
      secondValue: "",
      operator: null,
    };
  }
  return prevState;
};
//  . - встановлення .
const handleDecimal = (prevState) => {
  const { operator, prevValue, secondValue, onDisplay } = prevState;

  if (!prevValue.includes(".") && operator === null) {
    return {
      ...prevState,
      onDisplay: onDisplay + ".",
      prevValue: onDisplay + ".",
    };
  } else if (!secondValue.includes(".") && operator !== null) {
    if (secondValue === "") {
      return {
        ...prevState,
        onDisplay: "0.",
        secondValue: "0.",
      };
    } else {
      return {
        ...prevState,
        onDisplay: onDisplay + ".",
        secondValue: onDisplay + ".",
      };
    }
  }
  return prevState;
};
//  +/- -встановлення знаку -
const handleNegate = (prevState) => {
  const { onDisplay } = prevState;
  return {
    ...prevState,
    onDisplay:
      onDisplay.charAt(0) === "-" ? onDisplay.slice(1) : "-" + onDisplay,
  };
};
//  % - визначення відсотка від числа
const handlePercentage = (prevState) => {
  const { onDisplay } = prevState;
  const value = parseFloat(onDisplay) / 100;
  return {
    ...prevState,
    onDisplay: String(value),
  };
};

//  AC - очищення даних
const handleAllClear = () => initialState;

const handleButtonPress = (prevState, button) => {
  switch (button) {
    case "+":
    case "-":
    case "×":
    case "÷":
      return handleOperation(prevState, button);
    case "=":
      return handleEqual(prevState);
    case ".":
      return handleDecimal(prevState);
    case "+/-":
      return handleNegate(prevState);
    case "%":
      return handlePercentage(prevState);
    case "AC":
      return handleAllClear();
    default:
      return handleNumber(prevState, button);
  }
};

const calculator = (prevState, button) => {
  return handleButtonPress(prevState, button);
};

export default calculator;
