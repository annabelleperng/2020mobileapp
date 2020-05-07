// TO DO:
// Timer for ___ amount of time should correspond to
// length of actual focus period (specified by user).
// (Change text and actual timer).
// Hard coded: Motivation message.
// Hard coded: Color scheme.

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feedback from "./Feedback";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const screen = Dimensions.get("window");
const Stack = createStackNavigator();

const formatNumber = (number) => `0${number}`.slice(-2);
const getRemaining = (time) => {
  const mins = Math.floor(time / 60);
  const secs = time - mins * 60;
  return { mins: formatNumber(mins), secs: formatNumber(secs) };
};

export default function AppSaved() {
  const [remainingSecs, setRemainingSecs] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const { mins, secs } = getRemaining(remainingSecs);

  const toggle = useCallback(() => {
    setIsActive(!isActive);
  });

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
      <View style={{ flex: 1.5, backgroundColor: "#222" }}>
        {/* <View style={styles.container}>
          <TouchableOpacity>
            <Image
              style={styles.tinyLogo}
              source={require("./assets/offbutton.png")}
            />
          </TouchableOpacity>
          <Text style={styles.fullTimeText}>Timer for 00:00:10</Text>
        </View> */}

        <View style={{ flexDirection: "row", marginTop: 50 }}>
          <Text style={styles.fullTimeText}>Timer for 00:00:10</Text>
          <TouchableOpacity>
            <Image
              style={styles.tinyLogo}
              source={require("./assets/offbutton.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4, backgroundColor: "skyblue" }}>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.timerText}>{`${mins}:${secs}`}</Text>
        </View>
      </View>
      <View style={{ flex: 4, backgroundColor: "steelblue" }}>
        <View style={styles.container}>
          <TouchableOpacity onPress={toggle} style={styles.button}>
            <Text style={styles.buttonText}>
              {isActive ? (
                <Text style={styles.unfocused}>I'M NOT FOCUSED</Text>
              ) : (
                // this.props.navigation.navigate('Feedback')
                <Text style={styles.focused}>FOCUS</Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 2, backgroundColor: "#222" }}>
        <View style={styles.containerChopped}>
          <Text style={styles.red}>
            This is your personal motivational quote if you entered one. Or
            we'll just pick from ours.
          </Text>
          {/* <View style={{ flex: 0.5 }}>
            <Image source={require("./assets/icon.png")} />
          </View> */}
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
  containerChopped: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    color: "#B9AAFF",
    fontSize: 20,
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
    fontSize: 20,
    color: "#595959",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 90,
    marginBottom: 20,
  },
  fullTimeText: {
    color: "#fff",
    fontSize: 30,
    marginLeft: screen.width / 12,
    marginTop: screen.height / 200,
    alignItems: "center",
  },
  focused: {
    color: "#a8ffff",
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  unfocused: {
    color: "#ffb6a8",
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: screen.width / 7,
    alignItems: "flex-end",
  },
});
