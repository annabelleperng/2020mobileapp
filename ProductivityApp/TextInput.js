import React, { Component } from "react";
import { TextInput } from "react-native";

export default function UselessTextInput() {
  const [value, onChangeText] = React.useState("");

  return (
    <TextInput
      style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
      keyboardType="number-pad"
      onChangeText={(text) => onChangeText(text)}
      value={value}
    />
  );
}
