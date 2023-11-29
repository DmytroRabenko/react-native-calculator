import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./src/button";
import calculator, { initialState } from "./src/calculator";
import Row from "./src/row";

const buttons = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];

const formatDisplay = (displayValue) => {
  // Форматуємо число, додаючи пробіли кожні три символи
  return displayValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
const getFontSize = (length) => {
  if (length > 9) {
    return 58;
  } else if (length > 8) {
    return 70;
  } 
  else if (length > 7) {
    return 80;
  }else {
    return 90;
  }
};

const chunkedButtons = (arr, chunkSize) => {
  return Array.from({ length: Math.ceil(arr.length / chunkSize) }, (v, i) =>
    arr.slice(i * chunkSize, i * chunkSize + chunkSize)
  );
};

export default function App() {
  const [calculatorState, setCalculatorState] = useState(initialState);

  const onPress = (button) => {
    const newState = calculator(calculatorState, button);
    setCalculatorState(newState);
  };

  const formattedDisplayValue = formatDisplay(calculatorState.onDisplay);
  const fontSize = getFontSize(formattedDisplayValue.length);

  return (
    <View style={styles.container}>
      <Text style={[styles.display, { fontSize }]}>{formattedDisplayValue}</Text>
      <View style={styles.buttonsContainer}>
        {chunkedButtons(buttons, 4).map((rowButtons, rowIndex) => (
          <Row key={rowIndex}>
            {rowButtons.map((item) => (
              <Button key={item} text={item} onPress={() => onPress(item)} />
            ))}
          </Row>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 70,
  },
  display: {
    textAlign: "right",
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 90,
    color: "#fff",
  },
  buttonsContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});
