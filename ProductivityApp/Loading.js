// import * as React from 'react';
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Slider,
  Dimensions,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";

// add render, add advice array, add styles: loading_logo

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");

const advice = [
  "TIP: You are a piece of shit",
  "TIP: I am in love with you",
  "TIP: Buy me boba pls",
  "TIP: Stan OOHYO and KIRINJI",
  "TIP: Are you out of your mind?",
];

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 10,
      ltStats: false,
      totalTime: 0,
      unpausedRatio: 0,
      pausedRatio: 0,
    };
  }

  pickAdvice() {
    let randNum = Math.floor(Math.random() * advice.length);
    let adv = advice[randNum];
    return <Text style={{ color: "#fca", fontSize: 20 }}>{adv}</Text>;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 18,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fca", fontSize: 30 }}>
            Loading Components...
          </Text>
        </View>
        <View
          style={{
            flex: 25,
            backgroundColor: "#0c0c0c",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#ffc375" />
          <Image
            style={styles.loading_logo}
            source={require("./assets/loadinglogo1.png")}
          />
        </View>
        <View
          style={{
            flex: 15,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {this.pickAdvice()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  loading_logo: {
    width: screen.width / 1.3,
    height: screen.width / 1.3,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#DBDBD6",
  },
  openButton: {
    backgroundColor: "#979797",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  pinkButton2: {
    borderWidth: 2,
    borderColor: "#979797", //"#ff576d",
    width: screen.width / 2.7,
    height: screen.width / 12,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: screen.width / 15,
  },
  smallWhiteText: {
    color: "#f0ecc5",
    fontSize: 20,
    marginTop: 5,
  },
  smallText: {
    color: "#000000",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallLinkText: {
    color: "#09495c",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallGreenText: {
    color: "#b6f542",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallRedText: {
    color: "#ff4e47",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
});
