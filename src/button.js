import React from "react";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";

const Button = ({ text, onPress }) => {
  const screen = Dimensions.get("window");

  const buttonSize = screen.width * 0.21;
  const buttonWidth = text === "0" ? buttonSize * 2 + 10 : buttonSize;
  const buttonType2 = ["AC", "+/-", "%"].includes(text);
  const buttonType3 = ["÷", "×", "+", "-", "="].includes(text);

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { width: buttonWidth, height: buttonSize },
        buttonType2 && styles.buttonType2,
        buttonType3 && styles.buttonType3,
      ]}
      onPress={() => onPress(text)}
    >
      <Text style={[styles.text, buttonType2 && styles.buttonType2]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    margin: 5,
    borderRadius: "50%",
    backgroundColor: "#1C1C1C",
  },
  text: {
    fontSize: 40,
    color: "#fff",
  },
  buttonType2: {
    backgroundColor: "#D4D4D2",
    color: "#000",
  },
  buttonType3: {
    backgroundColor: "#FF9500",
  },
});

export default Button;

/*
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

export default ({ onPress, text, size, theme }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];

  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }

  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  }

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};


const screen = Dimensions.get("window");
const buttonWidth = screen.width / 4;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    height: Math.floor(buttonWidth - 10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Math.floor(buttonWidth),
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    width: screen.width / 2 - 10,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6",
  },
  buttonAccent: {
    backgroundColor: "#ffc107",
  },
});
*/