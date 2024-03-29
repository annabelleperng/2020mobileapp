import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import * as SecureStore from "expo-secure-store";

const screen = Dimensions.get("window");

export default class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = {
      states: [0, 0],
      timer_time: this.props.route.params.timer_time,
      time_of_day_1: this.props.route.params.time_of_day_1,
      time_of_day_2: this.props.route.params.time_of_day_2,
    };
  }

  getValHappiness = async (val) => {
    let totalHappiness = Number.parseInt(
      await SecureStore.getItemAsync("total_happiness")
    );
    if (totalHappiness !== totalHappiness) {
      totalHappiness = 0;
    }
    totalHappiness += val;
    await SecureStore.setItemAsync("total_happiness", totalHappiness + "");
    let key1 = this.state.time_of_day_1 + "_total_happiness";
    let total1 = Number.parseInt(await SecureStore.getItemAsync(key1));
    if (total1 !== total1) {
      total1 = 0;
      console.log("IN HEEEEEEEEERE, SETTING TOTAL1 TO 0");
    }
    console.log("OUT HEREEEEEEE " + key1 + ": " + total1);
    total1 += val;
    await SecureStore.setItemAsync(key1, total1 + "");
    if (this.state.time_of_day_2 != "") {
      let key2 = this.state.time_of_day_2 + "_total_happiness";
      let total2 = Number.parseInt(await SecureStore.getItemAsync(key2));
      if (total2 !== total2) {
        total2 = 0;
      }
      total2 += val;
      await SecureStore.setItemAsync(key2, total2 + "");
    }
    return val;
  };

  getValProductivity = async (val) => {
    let totalProductivity = Number.parseInt(
      await SecureStore.getItemAsync("total_productivity")
    );
    if (totalProductivity !== totalProductivity) {
      totalProductivity = 0;
    }
    totalProductivity += val;
    await SecureStore.setItemAsync(
      "total_productivity",
      totalProductivity + ""
    );
    let key1 = this.state.time_of_day_1 + "_total_productivity";
    let total1 = Number.parseInt(await SecureStore.getItemAsync(key1));
    if (total1 !== total1) {
      total1 = 0;
    }
    total1 += val;
    await SecureStore.setItemAsync(key1, total1 + "");
    if (this.state.time_of_day_2 != "") {
      let key2 = this.state.time_of_day_2 + "_total_productivity";
      let total2 = Number.parseInt(await SecureStore.getItemAsync(key2));
      if (total2 !== total2) {
        total2 = 0;
      }
      total2 += val;
      await SecureStore.setItemAsync(key2, total2 + "");
    }
    return val;
  };

  render() {
    // console.log(this.props);
    return (
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 0.5 }}>
            <Text style={styles.welcome}>
              How happy did you feel during this focus session?
            </Text>
            <Slider
              style={{ width: screen.width * 0.8, alignSelf: "center" }}
              step={1}
              minimumValue={0}
              maximumValue={100}
              happ={this.state.states[0]}
              onValueChange={(val) =>
                this.setState({ states: [val, this.state.states[1]] })
              }
              onSlidingComplete={(val) => this.getValHappiness(val)}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Image
                  style={styles.tinyLogoLeft}
                  source={require("./assets/sad_jeno.png")}
                />
              </View>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 0.5 }}>
                <Image
                  style={styles.tinyLogoRight}
                  source={require("./assets/puta.png")}
                />
              </View>
            </View>
            <Text style={styles.welcome}>{this.state.states[0]}</Text>
          </View>

          <View style={{ flex: 0.5 }}>
            <Text style={styles.welcome}>
              How productive did you feel during this focus session?
            </Text>
            <Slider
              style={{ width: screen.width * 0.8, alignSelf: "center" }}
              step={1}
              minimumValue={0}
              maximumValue={100}
              prod={this.state.states[1]}
              onValueChange={(val) =>
                this.setState({ states: [this.state.states[0], val] })
              }
              onSlidingComplete={(val) => this.getValProductivity(val)}
            />
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
                alignItems: "center",
              }}
            >
              <View style={{ flex: 0.5 }}>
                <Image
                  style={styles.tinyLogoLeft}
                  source={require("./assets/sad_jeno.png")}
                />
              </View>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 0.5 }}>
                <Image
                  style={styles.tinyLogoRight}
                  source={require("./assets/puta.png")}
                />
              </View>
            </View>
            <Text style={styles.welcome}>{this.state.states[1]}</Text>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.3 }}>
            <TouchableOpacity>
              <Button
                onPress={() =>
                  this.props.navigation.navigate("Rewards", {
                    timer_time: this.props.route.params.timer_time,
                    happiness: this.state.states[0],
                    productivity: this.state.states[1],
                  })
                }
                title="Submit!"
                color="#ffa959" //button bg for android, text for ios
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    color: "#ff3d74",
    margin: 10,
    fontFamily: "Quicksand-Medium",
  },
  instructions: {
    textAlign: "center",
    color: "#CA3DD4",
    marginBottom: 5,
  },
  tinyLogoLeft: {
    width: screen.width / 15,
    height: screen.width / 15,
    // marginRight: screen.width / 3,
    alignSelf: "center",
  },
  tinyLogoRight: {
    width: screen.width / 15,
    height: screen.width / 15,
    // marginLeft: screen.width / 3,
    alignSelf: "center",
  },
  invisibleNum: {
    fontSize: 20,
    textAlign: "center",
    color: "#46DC46",
    margin: 0,
  },
});
