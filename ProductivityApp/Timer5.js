import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { screensEnabled } from "react-native-screens";
import DateTime from "luxon/src/datetime.js";
import Duration from "luxon/src/duration.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";

const screen = Dimensions.get("window");

import { Audio } from "expo-av";
const soundObject = new Audio.Sound();

export default class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutes_Counter: this.props.route.params.JSON_ListView_Clicked_Item,
      seconds_Counter: "00",
      startDisable: false,
      start: new Date(),
      startedFirst: false,
      confirm: false,
      motivation:
        "This is your note to yourself! You'll see it every time you " +
        "start a sprint. You can edit what it says in Settings.",
      motivationSet: false,
      quitConfirm: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  playSound = async () => {
    try {
      console.log("called playSound at some point");
      await soundObject.loadAsync(require("./assets/timer_done.mp3"));
      await soundObject.playAsync();
    } catch (error) {}
  };

  updateLatestSprints = async () => {
    var localZone = await SecureStore.getItemAsync("timezone");
    var startTime = DateTime.local().setZone(localZone).toISO();
    var newLatestSprint = await SecureStore.getItemAsync("temp_sprint");
    await SecureStore.setItemAsync("latest_sprint", newLatestSprint);
    await SecureStore.setItemAsync("temp_sprint", startTime);
    this.setState({ setLatestSprint: 1 });
  };

  onButtonStart = async () => {
    let timer = setInterval(() => {
      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;

      if (!this.startDisable) {
        this.startDisable = true;
        // console.log("old start = " + this.state.start);
        this.state.start = new Date();
        // console.log("new start = " + this.state.start);
      }
      if (
        Number(this.state.seconds_Counter) == 0 &&
        Number(this.state.minutes_Counter) == 0
      ) {
        count = "00";
        num = "00";
        this.playSound();
        clearInterval(this.state.timer);
        this.onButtonStop;
        var currentTime = new Date();
        var diff = currentTime.getTime() - this.state.start.getTime();
        // console.log(diff);
        // console.log("currentttt start = " + this.state.start);
        // console.log("currentttt start = " + currentTime);
        this.props.navigation.navigate("Stats", {
          JSON_ListView_Clicked_Item: this.state.start.toLocaleString(),
          total_time: diff,
          timer_time: this.props.route.params.JSON_ListView_Clicked_Item,
        });
        // var localZone = await SecureStore.getItemAsync("timezone");
        // const currDate = DateTime.local().setZone(localZone);
        // if (currDate.diff(periodStart).hours() > 5)
        // this.updateLatestSprints();
      }

      if (
        Number(this.state.seconds_Counter) == 0 &&
        Number(this.state.minutes_Counter) > 0
      ) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = "59";
      }

      this.setState({
        minutes_Counter: count.length == 1 ? "0" + count : count,
        seconds_Counter: num.length == 1 ? "0" + num : num,
      });
    }, 1000);
    this.setState({ timer });

    this.setState({ startDisable: true });
  };

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false });
  };

  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: "60",
      seconds_Counter: "00",
    });
  };

  printHi = () => {
    console.log("I am");
  };

  quitSprint = () => {
    Alert.alert(
      "Quit Sprint",
      "\nAre you sure you wish to quit this sprint?\n\n Your progress " +
        "so far will be lost.",
      [
        {
          text: "Quit",
          onPress: () => this.props.navigation.navigate("Home"),
          // this.props.navigation.navigate("PlantView", {
          //   position: this.state.plant_position,
          //   event: e,
          //   rarity: r
          // })
          // this.setState({ quitConfirm: true }),
        },
        { text: "Cancel" },
      ],
      { cancelable: false }
    );
  };
  setMotivation = async () => {
    let motivation = await SecureStore.getItemAsync("motivation");
    if (motivation == null || motivation.trim() == "") {
      motivation = this.state.motivation;
      await SecureStore.setItemAsync("motivation", motivation);
    }
    this.setState({ motivation: motivation, motivationSet: true });
  };

  render() {
    // console.log("hello");

    if (!this.state.motivationSet) {
      this.setMotivation();
    }

    return (
      //   <View style={styles.MainContainer}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1.5, backgroundColor: "#000" }}>
          <View
            style={{
              marginTop:
                Platform.OS == "android"
                  ? screen.height / 35
                  : screen.height / 20,
            }}
          >
            <Text style={styles.fullTimeText}>
              Timer for {this.props.route.params.JSON_ListView_Clicked_Item}
              :00
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 8,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#222",
          }}
        >
          <Text style={styles.counterText}>
            {this.state.minutes_Counter} : {this.state.seconds_Counter}
          </Text>

          <Text style={styles.buttonText}></Text>
          <Text style={styles.buttonText}></Text>
          <Text style={styles.buttonText}></Text>
          <TouchableOpacity
            onPress={this.onButtonStart}
            activeOpacity={0.5}
            style={[
              styles.button,
              {
                backgroundColor: this.state.startDisable
                  ? "#B0BEC5"
                  : "#74d130",
              },
            ]}
            disabled={this.state.startDisable}
          >
            <Text style={styles.buttonText}>FOCUS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.onButtonStop}
            activeOpacity={0.5}
            style={[
              styles.button,
              {
                backgroundColor: this.state.startDisable
                  ? "#ff3d74"
                  : "#74d130",
              },
            ]}
          >
            <Text style={styles.buttonText}>I'M NOT FOCUSED</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this.quitSprint}
            activeOpacity={0.5}
            style={[
              styles.button,
              {
                backgroundColor: this.state.startDisable
                  ? "#B0BEC5"
                  : "#74d130",
              },
            ]}
            disabled={this.state.startDisable}
          >
            <Text style={styles.buttonText}> QUIT SPRINT</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2.5, backgroundColor: "#000" }}>
          <View style={styles.containerChopped}>
            <Text style={styles.red}>{this.state.motivation}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  button: {
    width: "80%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Assistant-SemiBold",
  },
  counterText: {
    fontSize: 50,
    color: "#888",
  },
  fullTimeText: {
    color: "#fff",
    fontSize: 30,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "SignikaNegative-Regular",
  },
  red: {
    color: "#ff3d74",
    fontSize: 20,
    fontFamily: "SignikaNegative-Regular",
  },
  containerChopped: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
