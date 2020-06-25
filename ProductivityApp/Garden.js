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
} from "react-native";
import SeedUtils from "./SeedUtils";
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancel: false,
    };
  }

  toggleCancel = () => {
    console.log(" ");
    // this.state.showCancel = !this.state.showCancel;
    // var showC = !this.state.showCancel;
    // console.log(this.state.showCancel);
    // console.log("aeafa " + !this.state.showCancel);
    if (this.state.showCancel) {
      this.setState({ showCancel: false });
    } else {
      this.setState({ showCancel: true });
    }
  };

  _renderCancel = () => {
    if (this.state.showCancel) {
      return (
        <TouchableHighlight onPress={this.toggleCancel()}>
          <View>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  };

  updateStuff = async (position) => {
    const localZone = await SecureStore.getItemAsync("timezone");
    const localTime = DateTime.local().setZone(localZone);
    const periodStartKey = position + "_period_start";
    const periodStart = DateTime.fromISO(
      await SecureStore.getItemAsync(periodStartKey)
    );
    console.log("localTime is " + localTime.toISO());
    console.log("periodStart is " + periodStart.toISO());
    const diff = localTime.diff(periodStart);
    console.log("difference is" + diff);
    if (diff.hours() >= 24) {
      rewardUtils.updateStreak();
      for (i = 1; i <= 9; i++) {
        seedUtils.updateWilting(i);
      }
    }
  };

  render() {
    // this.updateStuff();

    const margin = (screen.height * 4) / 22 - screen.width / 3.5;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center",
        }}
      >
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={this.toggleCancel}>
                <Image
                  style={styles.plants}
                  source={require("./assets/fernsbig.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/tulipsbig.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/fernsbig.png")}
              />
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={[
                styles.smallButton,
                //   this.state.showCancel ? {} : styles.hidden,
              ]}
              source={require("./assets/puta.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={[
                styles.smallButton,
                //   this.state.showCancel ? {} : styles.hidden,
              ]}
              source={require("./assets/puta.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Image
              style={[
                styles.smallButton,
                //   this.state.showCancel ? {} : styles.hidden,
              ]}
              source={require("./assets/puta.png")}
            />
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            flexDirection: "row",
            backgroundColor: "#472b25",
          }}
        >
          <Image
            style={styles.smallButton}
            source={require("./assets/fernsbig.png")}
          />
          <Image
            style={styles.smallButton}
            source={require("./assets/fernsbig.png")}
          />
          <Image
            style={styles.smallButton}
            source={require("./assets/fernsbig.png")}
          />
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 2, backgroundColor: "#57423e" }}></View>
        <View style={{ flex: 3, backgroundColor: "#0e0e0e" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: (screen.height * 3) / 22 - screen.width / 5,
              //   marginLeft: screen.width / 14,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/largebee.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("GardenTesting")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 3.5,
    height: screen.width / 3.5,
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
  hidden: {
    width: 0,
    height: 0,
  },
});
