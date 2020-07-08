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
      addedWeighted: false,
      water: 0,
      bees: 0,
      timeTilBee: 0,
      gold: 0,
      seed: "",
      percent: 0,
      prevStreak: "",
      currStreak: "",
      setStreakTemp: 0,
    };
  }

  earnStuff = async (mins) => {
    console.log("\n\nstart of earnStuff: " + DateTime.local().toString());
    const streak = await SecureStore.getItemAsync("streak_length");
    console.log(streak);
    const beeProgress = await SecureStore.getItemAsync("bee_in_progress");
    console.log(beeProgress);
    this.setState({
      water: await utils.earnWater(mins, streak),
      bees: await utils.earnBees(mins, streak),
      timeTilBee: beeProgress,
      gold: await utils.earnGold(mins, streak),
      seed: await utils.obtainSeed("none", "C"),
      hasSet: 1,
    });
    console.log(this.state.hasSet);
    // console.log("earning stuff");
    utils.updateStreak();
    console.log("YOYOYOYOYOYOYOYOYOYOYO");
    // console.log(SecureStore.getItemAsync("inventory_water"));
    // console.log(SecureStore.getItemAsync("inventory_bees"));
    // console.log(SecureStore.getItemAsync("inventory_gold"));
    console.log("end of earnStuff: " + DateTime.local().toString());
  };

  doStuff = async () => {
    if (this.state.hasSet == 0) {
      this.setState({ hasSet: 1 });
      console.log("hasSet was 0");
      console.log("\n\nstart of doStuff: " + DateTime.local().toString());
      const prevS = await SecureStore.getItemAsync("streak_length");
      console.log("\n\nprevS from doStuff = " + prevS);
      this.setState({ prevStreak: prevS });
      await this.earnStuff(this.state.timer_time);
      const currS = await SecureStore.getItemAsync("streak_length");
      console.log("\n\ncurrS from doStuff = " + currS);
      this.setState({ currStreak: currS });
      console.log("end of doStuff: " + DateTime.local().toString());
    } else {
      console.log("hasSet was not 0");
    }
  };

  setStreak = async () => {
    if (this.state.setStreakTemp == 0) {
      await SecureStore.setItemAsync("streak_length", "3");
      this.setState({ setStreakTemp: 1 });
      console.log("setting temp");
    }
  };

  addWeighted = async () => {
    if (this.state.addedWeighted == false) {
      console.log(this.state.timer_time);
      this.setState({ addedWeighted: true });
      let prod = Number.parseInt(
        await SecureStore.getItemAsync("weighted_productivity")
      );
      let happiness = Number.parseInt(
        await SecureStore.getItemAsync("weighted_happiness")
      );
      if (prod == NaN) {
        prod = 0;
      }
      if (happiness == NaN) {
        happiness = 0;
      }

      console.log("prod " + prod + "happiness " + happiness);

      prod += this.state.timer_time * this.props.route.params.productivity;
      happiness += this.state.timer_time * this.props.route.params.happiness;

      console.log("prod " + prod + "happiness " + happiness);

      await SecureStore.setItemAsync("weighted_productivity", prod + "");
      await SecureStore.setItemAsync("weighted_happiness", happiness + "");
    }
  };

  render() {
    this.addWeighted();
    this.setStreak();
    console.log("start of render: " + DateTime.local().toString());
    // console.log(this.props);
    this.doStuff();
    return (
      <View style={styles.container}>
        <Text style={styles.encourage}>
          Congratulations on finishing {"\n"} today's sprint!
        </Text>
        <Image
          style={styles.tinyLogoCenter}
          source={require("./assets/flame.png")}
        />
        {console.log("prev: " + this.state.prevStreak)}
        {console.log("curr: " + this.state.currStreak)}
        {this.state.currStreak == "" ? (
          <Text style={{ marginTop: 5 }}>Calculating...</Text>
        ) : !(this.state.prevStreak == this.state.currStreak) ? (
          <View>
            <Text style={styles.yay}>
              {"Streak increased!\nYour resource multiplier for tomorrow is 1." +
                this.state.currStreak +
                "."}{" "}
            </Text>
          </View>
        ) : (
          <Text style={styles.yay}>
            Keep it up{" "}
            {this.state.currStreak < 3 ? (
              <Text>
                for {3 - this.state.currStreak} more{" "}
                {this.state.currStreak == "2" ? (
                  <Text>day </Text>
                ) : (
                  <Text>days </Text>
                )}
                to build a streak{"\n "}
              </Text>
            ) : (
              <Text>to build your streak {"\n "}</Text>
            )}
            and earn a boosted resource multiplier!
            {this.state.currStreak >= 3 ? (
              <Text>
                {"\n"}Your resource multiplier today was 1.
                {this.state.prevStreak}.
              </Text>
            ) : (
              <Text></Text>
            )}
          </Text>
        )}

        <Text style={styles.norm}>You earned: </Text>
        {/* <View style={{ flexDirection: "row", marginTop: 10 }}>
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
        </View> */}
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyLogoCenter}
          source={require("./assets/water.png")}
        /> */}
          <View style={{ flex: 1 }}>
            <Image
              style={styles.tinyLogoCenter}
              source={require("./assets/water.png")}
            />
            <Text style={{ textAlign: "center" }}>
              {"+" + this.state.water + " water"}
            </Text>
          </View>
          {/* </View> */}
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyLogoCenter}
          source={require("./assets/bee.png")}
        /> */}
          <View style={{ flex: 1 }}>
            <Image
              style={styles.tinyLogoCenter}
              source={require("./assets/bee.png")}
            />
            <Text style={{ textAlign: "center" }}>
              {"+" + this.state.bees + " bees"}
            </Text>
          </View>
          {/* </View> */}
          {/* <View style={{ flexDirection: "column" }}> */}
          {/* <Image
          style={styles.tinyCenter}
          source={require("./assets/gold.png")}
        /> */}
          <View style={{ flex: 1 }}>
            <Image
              style={styles.tinyLogoCenter}
              source={require("./assets/gold.png")}
            />
            <Text style={{ textAlign: "center" }}>
              {"+" + this.state.gold + " gold"}
            </Text>
          </View>
          {/* </View> */}
        </View>
        <Text>{this.state.timeTilBee + " minutes 'til your next bee!"}</Text>

        <TouchableOpacity style={{ marginTop: screen.width / 4 }}>
          <Button
            onPress={() => this.props.navigation.navigate("Details")}
            title="Go back home"
            color="#35F2E9" //button bg for android, text for ios
          />
        </TouchableOpacity>
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
    alignSelf: "center",
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
    fontSize: 25,
    marginTop: 3,
    marginBottom: 25,
    color: "#CA3DD4",
    textAlign: "center",
  },
  yay: {
    fontSize: 20,
    marginTop: 5,
    color: "#CA3DD4",
    textAlign: "center",
  },
  norm: {
    fontSize: 15,
    marginTop: 60,
    color: "#FCCC00",
  },
});
