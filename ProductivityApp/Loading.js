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

import * as Font from "expo-font";

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
      fontsLoaded: false,
    };
  }

  loadAllFonts = () => {
    if (this.state.fontsLoaded == true) return;
    console.log("loading all fonts...");
    Font.loadAsync({
      "AlegreyaSansSC-Medium": require("./assets/fonts/AlegreyaSansSC-Medium.ttf"),
      "AlegreyaSansSC-MediumItalic": require("./assets/fonts/AlegreyaSansSC-MediumItalic.ttf"),
      "AlegreyaSansSC-Regular": require("./assets/fonts/AlegreyaSansSC-Regular.ttf"),

      Dosis: require("./assets/fonts/Dosis.ttf"),

      JosefinSans: require("./assets/fonts/JosefinSans.ttf"),
      "JosefinSans-Italic": require("./assets/fonts/JosefinSans-Italic.ttf"),

      "NanumGothic-Bold": require("./assets/fonts/NanumGothic-Bold.ttf"),
      "NanumGothic-ExtraBold": require("./assets/fonts/NanumGothic-ExtraBold.ttf"),
      "NanumGothic-Regular": require("./assets/fonts/NanumGothic-Regular.ttf"),

      "Quicksand-Bold": require("./assets/fonts/Quicksand-Bold.ttf"),
      "Quicksand-Light": require("./assets/fonts/Quicksand-Light.ttf"),
      "Quicksand-Medium": require("./assets/fonts/Quicksand-Medium.ttf"),
      "Quicksand-Regular": require("./assets/fonts/Quicksand-Regular.ttf"),
      "Quicksand-SemiBold": require("./assets/fonts/Quicksand-SemiBold.ttf"),

      Raleway: require("./assets/fonts/Raleway.ttf"),
      "Raleway-Light": require("./assets/fonts/Raleway-Light.ttf"),
      "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
      "Raleway-Italic": require("./assets/fonts/Raleway-Italic.ttf"),
      "Raleway-Medium": require("./assets/fonts/Raleway-Medium.ttf"),

      "SignikaNegative-Regular": require("./assets/fonts/SignikaNegative-Regular.ttf"),
      "SignikaNegative-Light": require("./assets/fonts/SignikaNegative-Light.ttf"),
    }).then(() => this.setState({ fontsLoaded: true }));
  };

  pickAdvice() {
    let randNum = Math.floor(Math.random() * advice.length);
    let adv = advice[randNum];
    return (
      <Text
        style={{
          color: "#dadada",
          fontSize: 20,
          fontFamily: "Quicksand-Medium",
        }}
      >
        {adv}
      </Text>
    );
  }

  render() {
    this.loadAllFonts();
    if (!this.state.fontsLoaded) {
      return (
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 18,
              backgroundColor: "#0c0c0c",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#dadada", fontSize: 25 }}>
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
            {/* <ActivityIndicator size="large" color="#ffbb39" /> */}
            <Image
              style={styles.loading_logo}
              source={require("./assets/newicons/newloading.png")}
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
            {/* {this.pickAdvice()} */}
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 18,
            backgroundColor: "#0c0c0c",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#dadada",
              fontSize: 27,
              fontFamily: "NanumGothic-Regular", //"SignikaNegative-Regular"
            }}
          >
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
          {/* <ActivityIndicator size="large" color="#ffbb39" /> */}
          <Image
            style={styles.loading_logo}
            source={require("./assets/newicons/newloading.png")}
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
        <View
          style={{
            flex: 3,
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></View>
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
