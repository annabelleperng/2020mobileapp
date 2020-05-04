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

const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function App() {
  const [remainingSecs, setRemainingSecs] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);
  toggle = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    let interval = null;
    if (isActive && remainingSecs > 0) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs - 1);
      }, 1000);
    } else if (isActive) {
      //   setRemainingSecs(0);
      clearInterval(interval);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, remainingSecs]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 5, backgroundColor: "skyblue" }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
        </View>
      </View>
      <View style={{ flex: 4, backgroundColor: "steelblue" }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.toggle} style={styles.button}>
            <Text style={styles.buttonText}>
              {isActive ? "PAUSE" : "START"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, backgroundColor: "powderblue" }}>
        <View style={styles.container}>
          <Text style={styles.red}>We're no strangers to love.</Text>
          <View style={{ flex: 0.5 }}>
            <Image source={require("./assets/icon.png")} />
          </View>
        </View>
      </View>
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
  timerText: {
    color: "#fff",
    fontSize: 90,
    marginBottom: 20,
  },
});
