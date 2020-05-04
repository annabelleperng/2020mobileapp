import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screen = Dimensions.get("window");

const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 660;
  return { mins, secs };
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "powderblue" }}>
        <View style={styles.container}>
          <Text style={styles.red}>We're no strangers to love.</Text>
          <View style={{ flex: 0.5 }}>
            <Image source={require("./assets/icon.png")} />
          </View>
        </View>
      </View>
      <View style={{ flex: 2, backgroundColor: "skyblue" }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <TouchableOpacity onPress={() => null} style={styles.button}>
            <Text style={styles.buttonText}>START</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: "steelblue" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    color: "red",
  },
  button: {
    borderWidth: 5,
    borderColor: "#B9AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 50,
    color: "#595959",
  },
});
