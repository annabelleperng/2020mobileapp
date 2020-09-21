import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";

import * as SecureStore from "expo-secure-store";
import { RECORDING_OPTION_IOS_OUTPUT_FORMAT_APPLELOSSLESS } from "expo-av/build/Audio";
import { TapGestureHandler } from "react-native-gesture-handler";
import Loading from "./Loading";
const screen = Dimensions.get("window");

// const data = [
//   { action: "Sprint time", time: 70, fill: "blue" },
//   { action: "Break time", time: 20, fill: "red" },
// ];

let endTime = new Date();
let endHours = endTime.getHours();
let endMins = endTime.getMinutes();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.route.params.JSON_ListView_Clicked_Item,
      timer_time: this.props.route.params.timer_time,
      total_time: this.props.route.params.total_time,
      addedTotals: false,
      message: "message before loaded",
      message_boolean: false,
      update_daily_boolean: false,
      time_of_day_1: "",
      time_of_day_2: "",
    };
  }

  UNSAFE_componentWillReceiveProps = () => {
    this.endTime = new Date();
    this.endHours = this.endTime.getHours();
    this.endMins = this.endTime.getMinutes();
    console.log("endtime = " + this.endTime + "          !!!!!!!!!!!!!!!");
  };

  timeOfDay(hours) {
    // "params": Object {
    //   "JSON_ListView_Clicked_Item": "5/16/2020, 12:37:00 AM",
    //   "timer_time": "1", //minutes
    //   "total_time": 70953, //millisecs
    // },
    if (5 <= hours && hours <= 11) {
      return "morning";
    } else if (12 <= hours && hours <= 16) {
      return "afternoon";
    } else if (17 <= hours && hours <= 19) {
      return "evening";
    } else {
      return "night";
    }
  }

  encourage = async (start, end) => {
    if (this.state.message_boolean == true) {
      return;
    } else {
      this.setState({ message_boolean: true });
      if (start === end) {
        this.setState({ time_of_day_1: start });
        let key = start + "_count";
        let count = Number.parseInt(await SecureStore.getItemAsync(key));
        if (count !== count) {
          count = 0;
        }
        count += 1;
        await SecureStore.setItemAsync(key, count + "");
        this.setState({ message: "Grinding through the " + start + "!" });
      } else {
        this.setState({ time_of_day_1: start, time_of_day_2: end });
        let key1 = start + "_count";
        let count1 = Number.parseInt(await SecureStore.getItemAsync(key1));
        if (count1 !== count1) {
          count1 = 0;
        }
        count1 += 1;
        await SecureStore.setItemAsync(key1, count1 + "");
        let key2 = start + "_count";
        let count2 = Number.parseInt(await SecureStore.getItemAsync(key2));
        if (count2 !== count2) {
          count2 = 0;
        }
        count2 += 1;
        await SecureStore.setItemAsync(key2, count2 + "");
        this.setState({
          message: "Grinding from " + start + " 'til " + end + "!",
        });
      }
    }
  };

  updateDailyStats = async () => {
    if (this.state.update_daily_boolean == true) {
      return;
    } else {
      this.setState({ update_daily_boolean: true });
      this.endTime = new Date();
      this.endHours = this.endTime.getHours();
      this.endMins = this.endTime.getMinutes();
      console.log("endtime = " + this.endTime + "    2      !!!!!!!!!!!!!!!");
    }
    let sprintCount = Number.parseInt(
      await SecureStore.getItemAsync("sprint_count")
    );
    if (sprintCount !== sprintCount) {
      sprintCount = 0;
    }
    sprintCount += 1;
    await SecureStore.setItemAsync("sprint_count", sprintCount + "");
    if (this.state.addedTotals == false) {
      let total = Number.parseInt(
        await SecureStore.getItemAsync("total_sprint_time")
      );
      let paused = Number.parseInt(
        await SecureStore.getItemAsync("total_paused")
      );
      let unpaused = Number.parseInt(
        await SecureStore.getItemAsync("total_unpaused")
      );
      if (total !== total) {
        total = 0;
      }
      if (paused !== paused) {
        paused = 0;
      }
      if (unpaused !== unpaused) {
        unpaused = 0;
      }

      // console.log(this.state);
      // console.log(this.state.timer_time);
      // console.log(this.state.total_time);
      // console.log(paused + " " + unpaused + " " + total);

      total += Number.parseInt(this.state.timer_time);

      unpaused += Number.parseInt(this.state.timer_time);

      paused +=
        Number.parseFloat(this.state.total_time / 60000) -
        Number.parseInt(this.state.timer_time);

      console.log(
        total +
          " was total; " +
          unpaused +
          " was unpaused; " +
          paused +
          " was paused"
      );

      await SecureStore.setItemAsync("total_sprint_time", total + "");
      await SecureStore.setItemAsync("total_unpaused", unpaused + "");
      await SecureStore.setItemAsync("total_paused", paused + "");

      this.setState({ addedTotals: true });
      //   await SecureStore this.state.timer_time
      // securestore variables:
      // today_time = (25 + 50 + 10 + 12) = 97
      // today_productiviity = (100*25 + 85*50 + 86*10 + 95*12) = 8750
      // today_happiness = similar to today_productivity ^^^
      // when calculating avg productivity, divide productivity by time
      // (don't store avgs in securestore)
      // update time by adding time, update productivity and happiness
      // by weights (not by averages)
    }
  };

  renderN() {
    this.updateDailyStats();

    const startHours = endHours - Math.floor(this.state.total_time / 3600000);
    const startHours12h = startHours <= 12 ? startHours : startHours % 12;
    const startAMPM = startHours <= 12 ? " AM" : " PM";
    if (startHours == 24) {
      startHours12h = 12;
      startAMPM = " AM";
    }
    const startMins = endMins - Math.floor(this.state.total_time / 60000);
    const endHours12h = endHours <= 12 ? endHours : endHours % 12;
    const endAMPM = endHours <= 12 ? " AM" : " PM";
    if (endHours == 24) {
      endHours12h = 12;
      endAMPM = " AM";
    }
    const startTimeOfDay = this.timeOfDay(startHours);
    const endTimeOfDay = this.timeOfDay(endHours);

    this.encourage(startTimeOfDay, endTimeOfDay);

    if (
      this.state.message_boolean == true &&
      this.state.update_daily_boolean == true
    ) {
      return this.renderNormal();
    } else {
      return this.renderLoading();
    }
  }

  renderLoading() {
    return <Loading />;
  }

  render() {
    // ~✰~ moved to render() - uncomment here if needed
    this.updateDailyStats();

    const startHours = endHours - Math.floor(this.state.total_time / 3600000);
    const startHours12h = startHours <= 12 ? startHours : startHours % 12;
    const startAMPM = startHours <= 12 ? " AM" : " PM";
    if (startHours == 24) {
      startHours12h = 12;
      startAMPM = " AM";
    }
    const startMins = endMins - Math.floor(this.state.total_time / 60000);
    const endHours12h = endHours <= 12 ? endHours : endHours % 12;
    const endAMPM = endHours <= 12 ? " AM" : " PM";
    if (endHours == 24) {
      endHours12h = 12;
      endAMPM = " AM";
    }
    const startTimeOfDay = this.timeOfDay(startHours);
    const endTimeOfDay = this.timeOfDay(endHours);

    // ~✰~ moved to render() - uncomment here if needed
    this.encourage(startTimeOfDay, endTimeOfDay);

    // if (12 <= startHours <= 4) {
    //   var firstTimeOfDay = "./assets/afternoon.png";
    // } else if (17 <= startHours <= 19) {
    //   var firstTimeOfDay = "./assets/evening.png";
    // } else if (startHours >= 20 || startHours < 5) {
    //   var firstTimeOfDay = "./assets/night.png";
    // }

    const breakMins = this.state.total_time / 60000 - this.state.timer_time;

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {this.timeOfDay(startHours) === "morning" ? (
            <Image
              style={styles.pic}
              source={require("./assets/morning.png")}
            />
          ) : (
            <View></View>
          )}
          {this.timeOfDay(startHours) === "afternoon" ? (
            <Image
              style={styles.pic}
              source={require("./assets/afternoon.png")}
            />
          ) : (
            <View></View>
          )}
          {this.timeOfDay(startHours) === "evening" ? (
            <Image
              style={styles.pic}
              source={require("./assets/evening.png")}
            />
          ) : (
            <View></View>
          )}
          {this.timeOfDay(startHours) === "night" ? (
            <Image style={styles.pic} source={require("./assets/night.png")} />
          ) : (
            <View></View>
          )}
          {this.timeOfDay(startHours) != this.timeOfDay(endHours) ? (
            (this.timeOfDay(endHours) === "morning" ? (
              <Image
                style={styles.pic}
                source={require("./assets/morning.png")}
              />
            ) : (
              <View></View>
            ))(
              this.timeOfDay(endHours) === "afternoon" ? (
                <Image
                  style={styles.pic}
                  source={require("./assets/afternoon.png")}
                />
              ) : (
                <View></View>
              )
            )(
              this.timeOfDay(endHours) === "evening" ? (
                <Image
                  style={styles.pic}
                  source={require("./assets/evening.png")}
                />
              ) : (
                <View></View>
              )
            )(
              this.timeOfDay(endHours) === "night" ? (
                <Image
                  style={styles.pic}
                  source={require("./assets/night.png")}
                />
              ) : (
                <View></View>
              )
            )
          ) : (
            <View></View>
          )}
        </View>

        <Text style={styles.encourage}>{this.state.message}</Text>
        <VictoryChart
          domainPadding={{
            x: [100, 100],
            y: [
              0,
              ((this.state.total_time / 60000 - this.state.timer_time) /
                this.state.timer_time) *
                90,
            ],
          }}
          width={screen.width / 1.1}
          height={screen.height / 2}
        >
          <VictoryLabel
            text="Sprint versus Break Time"
            x={180}
            y={30}
            textAnchor="middle"
            style={{ fill: "white" }}
          />

          <VictoryAxis
            tickFormat={["Sprint time", "Break time"]}
            style={{
              axis: { stroke: "white" },
              axisLabel: { padding: 5, fill: "white" },
              ticks: { stroke: "white", size: 5 },
              tickLabels: { padding: 5, fill: "white" },
            }}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}\nmins`}
            style={{
              axis: { stroke: "white" },
              axisLabel: { padding: 5, fill: "white" },
              ticks: { stroke: "white", size: 5 },
              tickLabels: { padding: 5, fill: "white" },
            }}
          />

          <VictoryBar
            style={{ data: { fill: (d) => "#ff3d74" } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barRatio={0.8}
            // data={data}
            // data={[
            //   { action: "Sprint time", time: 70 },
            //   { action: "Break time", time: 20 },
            // ]}
            data={[
              { action: "Sprint time", time: this.state.timer_time },
              {
                action: "Break time",
                time: this.state.total_time / 60000 - this.state.timer_time,
              },
            ]}
            x="action"
            y="time"
          />
        </VictoryChart>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 0.15 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.leftTimes}>Started at</Text>
            <Text style={styles.leftTimesSmol}>
              {(startHours12h < 10 ? "0" + startHours12h : startHours12h) +
                ":" +
                (startMins < 10 ? "0" + startMins : startMins) +
                startAMPM}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.rightTimes}>Ended at</Text>
            <Text style={styles.rightTimesSmol}>
              {(endHours12h < 10 ? "0" + endHours12h : endHours12h) +
                ":" +
                (endMins < 10 ? "0" + endMins : endMins) +
                endAMPM}
            </Text>
          </View>
          <View style={{ flex: 0.15 }}></View>
        </View>
        <TouchableOpacity style={{ marginTop: screen.height / 40 }}>
          <Button
            onPress={() =>
              this.props.navigation.navigate("Feedback", {
                timer_time: this.props.route.params.timer_time,
                time_of_day_1: this.state.time_of_day_1,
                time_of_day_2: this.state.time_of_day_2,
              })
            }
            title="Okay!"
            color="#d9d9d9" //button bg for android, text for ios
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222222",
  },
  leftTimes: {
    textAlign: "left",
    color: "#ffbb00",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "SignikaNegative-Regular",
  },
  rightTimes: {
    textAlign: "right",
    color: "#ffbb00",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 1,
    fontFamily: "SignikaNegative-Regular",
  },
  leftTimesSmol: {
    textAlign: "left",
    color: "#74d130",
    fontSize: 25,
    marginBottom: 1,
    fontFamily: "SignikaNegative-Regular",
  },
  rightTimesSmol: {
    textAlign: "right",
    color: "#74d130",
    fontSize: 25,
    marginBottom: 5,
    fontFamily: "SignikaNegative-Regular",
  },
  pic: {
    width: screen.width / 10,
    height: screen.width / 10,
  },
  encourage: {
    color: "#ff4f7d",
    fontFamily: "Quicksand-Medium",
    fontSize: 20,
    marginTop: 3,
  },
});
