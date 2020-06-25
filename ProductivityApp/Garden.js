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
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

let bees = {
  "invis ": require("./assets/invis.png"),
  "bw ": require("./assets/largebeebw.png"),
  "color ": require("./assets/largebee.png"),
};

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancel: false,
      showBees: false,
      status1: 2,
      status2: 2,
      status3: 2,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
    };
  }

  toggleCancel = () => {
    console.log("toggleCancel called");
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

  selectBreeding = (key, position) => {
    console.log("selectBreeding called with (" + key + ", " + position + ")");
    if (
      this.state.selectedParents == 0 ||
      (this.state.selectedParents == 1 && this.state.firstParent == position)
    ) {
      console.log("first case");
      this.setState({ selectedParents: 1, firstParent: position });
    } else if (this.state.selectedParents == 1) {
      console.log("2nd case");
      this.setState({ selectedParents: 2, secondParent: [position] });
    } else {
      console.log("3rd case");
      return;
    }
    this.setState({ [key]: "color " });
  };

  showBees = () => {
    // first implementing it for the first row plants
    this.setState({ showBees: true });
    if (this.state.status1 == 2) {
      this.setState({ bee1: "bw " });
    }
    if (this.state.status2 == 2) {
      this.setState({ bee2: "bw " });
    }
    if (this.state.status3 == 2) {
      this.setState({ bee3: "bw " });
    }
  };

  hideBees = () => {
    this.setState({
      showBees: false,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
    });
  };

  toggleBees = () => {
    if (this.state.showBees == false) {
      this.showBees();
    } else {
      this.hideBees();
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
            <TouchableOpacity onPress={() => this.selectBreeding("bee1", 1)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee1]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee2", 2)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee2]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee3", 3)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee3]}
              />
            </TouchableOpacity>
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
              onPress={() => this.toggleBees()}
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
