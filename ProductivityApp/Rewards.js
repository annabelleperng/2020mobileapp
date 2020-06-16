import React from "react";
import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import RewardUtils from "./RewardUtils";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

const screen = Dimensions.get("window");
const utils = new RewardUtils();

export default class Rewards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasSet: 0,
      timer_time: this.props.route.params.timer_time,
      water: 0,
      bees: 0,
      timeTilBee: 0,
      gold: 0,
      seed: "",
      percent: 0,
      prevStreak: "",
      currStreak: "",
    };
  }

  earnStuff = async (mins) => {
    console.log("start of earnStuff: " + DateTime.local().toString());
    streak = await SecureStore.getItemAsync("streak_length");
    console.log(streak);
    beeProgress = await SecureStore.getItemAsync("bee_in_progress");
    console.log(beeProgress);
    this.setState({
      hasSet: 1,
      timer_time: this.state.timer_time,
      water: await utils.earnWater(mins, streak),
      bees: await utils.earnBees(mins, streak),
      timeTilBee: beeProgress,
      gold: await utils.earnGold(mins, streak),
      seed: await utils.obtainSeed(streak),
    });
    console.log(this.state.hasSet);
    // console.log("earning stuff");
    utils.updateStreak();
    // console.log(SecureStore.getItemAsync("inventory_water"));
    // console.log(SecureStore.getItemAsync("inventory_bees"));
    // console.log(SecureStore.getItemAsync("inventory_gold"));
    console.log("end of earnStuff: " + DateTime.local().toString());
  };

  doStuff = async () => {
    if (hasSet == 0) {
      console.log("start of doStuff: " + DateTime.local().toString());
      var prevS = await SecureStore.getItemAsync("streak_length");
      this.setState({ prevStreak: prevS });
      await this.earnStuff(this.state.timer_time);
      var currS = await SecureStore.getItemAsync("streak_length");
      this.setState({ prevStreak: currS });
      console.log("end of doStuff: " + DateTime.local().toString());
    }
  };

  render() {
    console.log("start of render: " + DateTime.local().toString());
    const prevStreak = "3";
    const currStreak = "4";
    console.log(this.props);
    console.log("im a sneaky bitch");
    this.doStuff();
    return (
      <View style={styles.container}>
        <Text style={styles.encourage}>
          Congratulations on finishing today's sprint! {"\n\n"}
        </Text>
        {/* {!(prevStreak === currStreak) ? (
          <View style={styles.tinyLogoCenter}>
            <Image
              style={styles.tinyLogoCenter}
              source={require("./assets/flame.png")}
            />
            <Text>
              {"Streak increased! Your resource multiplier next time will be 1." +
                prevStreak}
            </Text>
          </View>
        ) : (
          <Text>
            Keep it up to build a streak and earn a resourced multiplier.
          </Text>
        )} */}
        <Text>You earned: </Text>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <Image
            style={styles.tinyLogoLeft}
            source={require("./assets/water.png")}
          />
          <Image
            style={styles.tinyLogoCenter}
            source={require("./assets/bee.png")}
          />
          <Image
            style={styles.tinyLogoRight}
            source={require("./assets/gold.png")}
          />
        </View>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyLogoCenter}
          source={require("./assets/water.png")}
        /> */}
          <Text>{"+" + this.state.water + " water"}</Text>
          {/* </View> */}
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyLogoCenter}
          source={require("./assets/bee.png")}
        /> */}
          <Text>{"+" + this.state.bees + " bees"}</Text>
          {/* </View> */}
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyCenter}
          source={require("./assets/gold.png")}
        /> */}
          <Text>{"+" + this.state.gold + " gold"}</Text>
          {/* </View> */}
        </View>
        <Text>{this.state.timeTilBee + " minutes 'til your next bee!"}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#46DC46",
  },
  tinyLogoCenter: {
    width: screen.width / 15,
    height: screen.width / 15,
    alignItems: "center",
  },
  tinyLogoLeft: {
    width: screen.width / 15,
    height: screen.width / 15,
    marginRight: screen.width / 3,
    alignItems: "flex-end",
  },
  tinyLogoRight: {
    width: screen.width / 15,
    height: screen.width / 15,
    marginLeft: screen.width / 3,
    alignItems: "flex-end",
  },
  encourage: {
    fontSize: 15,
    marginTop: 3,
  },
});
