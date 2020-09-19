// import * as React from 'react';
import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements";

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
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import DateTime from "luxon/src/datetime.js";
import SeedUtils2 from "./SeedUtils2";

import * as SecureStore from "expo-secure-store";
import AlmanacUtils from "./AlmanacUtils";

import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

//import CombinedButton from "react-native-combined-button";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

const screen = Dimensions.get("window");

const seedUtils2 = new SeedUtils2();
const almanacUtils = new AlmanacUtils();

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.setFirstTimeValues();
    this.state = {
      minutes: 10,
      ltStats: false,
      totalTime: 0,
      unpausedRatio: 0,
      pausedRatio: 0,
    };
  }

  // alertThis = () => {
  //   Alert.alert(
  //     "Hello friends",
  //     "What boba you want",
  //     [
  //       {
  //         text: "jasmine green milk tea plus boba and lychee jelly",
  //         onPress: () => console.log("Ask me later pressed"),
  //       },
  //       {
  //         text: "adult capri sun WITHOUT BOBA",
  //         onPress: () => console.log("adult capri sun WITHOUT BOBA"),
  //         style: "cancel",
  //       },
  //       {
  //         text: "osmanthus milk tea with extra boba",
  //         onPress: () => console.log("OK Pressed"),
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

  setFirstTimeValues = async () => {
    // boolean to see if it's the first time the user
    // is opening the app

    let valuesSet = await SecureStore.getItemAsync("first_time_set");
    if (valuesSet == "true") {
      return;
    }
    await SecureStore.setItemAsync("first_time_set", "true");

    // initial inventory item values

    await SecureStore.setItemAsync("inventory_water", "0");
    await SecureStore.setItemAsync("inventory_bees", "1");
    await SecureStore.setItemAsync("inventory_gold", "250");
    await SecureStore.setItemAsync("inventory_fertilizer", "1");
    await SecureStore.setItemAsync("inventory_elixir", "0");
    await SecureStore.setItemAsync("inventory_gems", "1");

    await SecureStore.setItemAsync("bee_in_progress", "0");

    // const localTime = DateTime.local();
    // const localMidnight = DateTime.fromObject({
    //   year: localTime.year,
    //   month: localTime.month,
    //   day: localTime.day,
    //   hour: 0,
    //   minute: 0,
    //   second: 0,
    // });
    // const localPrevMidnight = localMidnight.minus({ days: 1 });

    // sprint statistics values

    await SecureStore.setItemAsync("sprint_count", "0");
    await SecureStore.setItemAsync("morning_count", "0");
    await SecureStore.setItemAsync("afternoon_count", "0");
    await SecureStore.setItemAsync("evening_count", "0");
    await SecureStore.setItemAsync("night_count", "0");
    await SecureStore.setItemAsync("total_happiness", "0");
    await SecureStore.setItemAsync("morning_total_happiness", "0");
    await SecureStore.setItemAsync("afternoon_total_happiness", "0");
    await SecureStore.setItemAsync("evening_total_happiness", "0");
    await SecureStore.setItemAsync("night_total_happiness", "0");
    await SecureStore.setItemAsync("total_productivity", "0");
    await SecureStore.setItemAsync("morning_total_productivity", "0");
    await SecureStore.setItemAsync("afternoon_total_productivity", "0");
    await SecureStore.setItemAsync("evening_total_productivity", "0");
    await SecureStore.setItemAsync("night_total_productivity", "0");

    await SecureStore.setItemAsync("total_sprint_time", "0");
    await SecureStore.setItemAsync("total_unpaused", "0");
    await SecureStore.setItemAsync("total_paused", "0");

    await SecureStore.setItemAsync("streak_length", "0");
    await SecureStore.setItemAsync("longest_streak", "0");

    await SecureStore.setItemAsync("latest_sprint", "");
    await SecureStore.setItemAsync("temp_sprint", "");

    // date placeholders

    let currDate = DateTime.local().toISO();
    await SecureStore.setItemAsync("garden_last_updated", currDate);
    await SecureStore.setItemAsync("shop_refreshed", currDate);

    // events

    await SecureStore.setItemAsync("event_name", "welcome");
    await SecureStore.setItemAsync("event_countdown", "7");
    await SecureStore.setItemAsync("rolled", "0");
    await SecureStore.setItemAsync("eventPic8", "");
    await SecureStore.setItemAsync("eventPic9", "");
    await SecureStore.setItemAsync("eventPic10", "");
    await SecureStore.setItemAsync("rarity8", "");
    await SecureStore.setItemAsync("rarity9", "");
    await SecureStore.setItemAsync("rarity10", "");

    // creates almanac

    await almanacUtils.createAlmanac();

    // x_plant

    await seedUtils2.createPlants();

    // inventory_seeds

    await seedUtils2.initializeAllSeeds();

    // misc.

    await SecureStore.setItemAsync(
      "motivation",
      "This is your note to yourself! You'll see it every time you " +
        "start a sprint. You can edit what it says in Settings."
    );

    // everything hardcoded for testing

    let hardcoded_plant = {
      status: 2,
      position: 1,
      permanent: {
        event: "none",
        rarity: "R",
        species: "stardust_nightshroom",
        date_planted: "",
        price: "550",
      },
      zero: { zero_image: "plantpot" },
      one: {
        one_image: "growing_r",
        grow_start: "",
        grow_offset: 0,
        grow_streak_length: 2,
      },
      two: {
        two_image: "stardust_nightshroom2",
        current_waters: 8,
        water_start: "",
        water_end: "2020-09-16T17:52:25.437-07:00",
      },
      three: {
        three_image: "stardust_nightshroom3",
        wilt_start: "",
        wilt_end: "2020-09-18T17:52:25.437-07:00",
      },
      four: { four_image: "stardust_nightshroom4" },
    };

    let seeds2 = {
      none: { C: 8, U: 50, R: 50 },
      welcome: { C: 0, U: 0, R: 0 },
    };
    let seedsString2 = JSON.stringify(seeds2);

    await SecureStore.setItemAsync("inventory_seeds", seedsString2);

    let hardcoded_plant_str = JSON.stringify(hardcoded_plant);
    await SecureStore.setItemAsync("1_plant", hardcoded_plant_str);
  };

  getStats = async () => {
    if (this.state.ltStats == false) {
      this.setState({ ltStats: true });

      let unpaused = Number.parseFloat(
        await SecureStore.getItemAsync("total_unpaused")
      );
      let paused = Number.parseFloat(
        await SecureStore.getItemAsync("total_paused")
      );

      if (unpaused == 0 || unpaused == NaN || paused == NaN) {
        return;
      }

      let total = unpaused + paused;

      let pausedRatio = Math.floor((paused / total) * 10000) / 100;
      let unpausedRatio = Math.floor((unpaused / total) * 10000) / 100;

      console.log(
        "total " +
          total +
          "pausedRatio " +
          pausedRatio +
          "unpausedRatio " +
          unpausedRatio
      );
      this.setState({
        totalTime: unpaused,
        unpausedRatio: unpausedRatio,
        pausedRatio: pausedRatio,
      });
    }
  };

  letsGo = () => {
    if (this.state.minutes < 1) {
      alert("Sprints must be at least 5 minutes long!");
      return;
    }
    this.props.navigation.navigate("Timer5", {
      JSON_ListView_Clicked_Item: Math.ceil(this.state.minutes),
    });
  };

  UNSAFE_componentWillReceiveProps() {
    console.log("componentWillReceiveProps called in Details");
    this.setState({ ltStats: false });
  }

  refreshStats = () => {
    this.setState({ ltStats: false });
  };

  render() {
    this.getStats();
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
        <View
          style={{
            flex: 1,
          }} // top part: header + subheader
        >
          <View
            style={{
              flex: 2.5,
              backgroundColor: "#BADFE7",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 30,
              }}
            >
              Time to get grinding!{" "}
            </Text>
            <Text></Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
              }}
            >
              Start a sprint now or
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
              }}
            >
              view your past statistics!
            </Text>

            {/* // for testing: buttons to go to cumulativestats, garden2 */}
            {/* <TouchableOpacity onPress={() => navigate("CumulativeStats")}>
              <Text>Click for CumulativeStats</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate("Garden2")}>
              <Text>Click for Garden2</Text>
            </TouchableOpacity> */}
          </View>

          <View
            style={{
              flex: 2,
              backgroundColor: "#e7f2e5",
              alignItems: "center",
            }} // enter time to start a sprint
          >
            <View style={{ flex: 0.7 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* // for testing: button to go to loading page */}
              {/* <TouchableOpacity onPress={() => navigate("Loading")}>
                <Text>Loading</Text>
              </TouchableOpacity> */}
              <TextInput
                onChangeText={(minutes) => this.setState({ minutes })}
                placeholder={"# of minutes"}
                keyboardType="number-pad"
                style={[
                  styles.input,
                  { height: Platform.OS == "android" ? 40 : 35 },
                ]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={this.letsGo}>
                <View style={styles.openButton}>
                  <Text>Let's go!</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 5,
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: "#64A0B1",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#64A0B1" }}>
              <View style={{ flex: 0.6 }}></View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.smallText, { fontSize: 23 }]}>
                  QUICK STATS
                </Text>
                <Text style={styles.smallText}></Text>
                <Text style={styles.smallText}></Text>

                <Text style={styles.smallText}>You've sprinted for</Text>
                <Text style={styles.smallText}>
                  {this.state.totalTime} minutes total.
                </Text>
                <Text style={styles.smallText}></Text>

                <Text style={styles.smallText}>
                  <Text style={styles.smallGreenText}>
                    {this.state.unpausedRatio}%
                  </Text>{" "}
                  working
                </Text>

                <Text style={styles.smallText}>
                  <Text style={styles.smallRedText}>
                    {this.state.pausedRatio}%
                  </Text>{" "}
                  paused
                </Text>
                <Text style={styles.smallText}></Text>

                {/* <TouchableOpacity onPress={this.refreshStats}>
                  <Text style={styles.smallLinkText}>[Refresh]</Text>
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => navigate("CumulativeStats")}>
                  <Text style={styles.smallText}></Text>
                  <Text
                    style={{
                      color: "#09495c",
                      fontSize: 20,
                      marginLeft: screen.width / 15,
                    }}
                  >
                    See more stats!
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }}></View>
            </View>
            <View style={{ flex: 1, backgroundColor: "#3e7496" }}>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                {/* Deleted seeds button: */}
                {/* <TouchableOpacity onPress={() => navigate("Seeds")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>SEEDS</Text>
                  </View>
                </TouchableOpacity> */}
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Garden2")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>GARDEN</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Shop")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>SHOP</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Settings")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>SETTINGS</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("CumulativeStats")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>STATS</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Help")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>HELP</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Almanac")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>ALMANAC</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }}></View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
// export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
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
