import DateTime from "luxon/src/datetime.js";
import Duration from "luxon/src/duration.js";
import Interval from "luxon/src/interval.js";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import SeedUtils from "./SeedUtils";
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

export default class GemShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gems: -1,
      gold: 0,
      allPrepared: false,
    };
  }

  prepareAll = async () => {
    if (this.state.allPrepared) {
      return;
    }
    this.setState({ allPrepared: true });
    this.setState({
      gold: await SecureStore.getItemAsync("inventory_gold"),
      gems: await SecureStore.getItemAsync("inventory_gems"),
    });
  };

  render() {
    this.prepareAll();
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#222",
        }}
      >
        <View
          style={{
            backgroundColor: "#000",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {console.log("STATE GEMS: " + this.state.gems)}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={styles.smallButton}
              source={require("./assets/newicons/newgold.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gold}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#000",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("GemShop")}
                >
                  <Image
                    style={styles.smallButton}
                    source={require("./assets/newicons/newplus.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Image
                  style={styles.smallButton}
                  source={require("./assets/newicons/newgemplain.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gems}</Text>
          </View>
        </View>
        <View style={{ backgroundColor: "#fec", flex: 0.5 }}></View>
        <View style={{ backgroundColor: "#ffdced", flex: 0.5 }}></View>
        <View style={{ backgroundColor: "#fff127", flex: 0.5 }}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: 0,
    marginBottom: screen.height / 80,
    width: screen.width / 7,
    height: screen.width / 7,
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9,
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9,
    marginLeft: screen.width / 10,
  },
  pinkButton: {
    borderWidth: 2,
    borderColor: "#ff576d",
    width: screen.width / 25,
    height: screen.width / 25,
    borderRadius: screen.width / 25,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    width: screen.height / 28,
    height: screen.height / 28,
  },
  comingSoon: {
    color: "#74D130",
    fontSize: 40,
    marginTop: screen.height / 20,
  },
  prices: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  poor: {
    color: "#F5493D",
    fontSize: 16,
  },
  bought: {
    color: "#B9C4C4",
    fontSize: 16,
  },
  itemName1: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: screen.height / 50,
    textAlign: "center",
  },
  itemName2: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: screen.height / 70,
    textAlign: "center",
  },
  leftTimesSmol: {
    color: "#ffffff",
    // fontFamily: "SignikaNegative-Regular",
  },
});
