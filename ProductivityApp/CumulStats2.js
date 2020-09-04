import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Button,
  Platform,
} from "react-native";
import {
  VictoryPie,
  VictoryChart,
  VictoryLabel,
  VictoryAxis,
  VictoryBar,
} from "victory-native";

import * as SecureStore from "expo-secure-store";
import { RECORDING_OPTION_IOS_OUTPUT_FORMAT_APPLELOSSLESS } from "expo-av/build/Audio";
const screen = Dimensions.get("window");

// const data = [
//   { action: "Sprint time", time: 70, fill: "blue" },
//   { action: "Break time", time: 20, fill: "red" },
// ];

const endTime = new Date();
const endHours = endTime.getHours();
const endMins = endTime.getMinutes();

export default class CumulStats2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      morning_count: this.props.route.params.morning_count,
      afternoon_count: this.props.route.params.afternoon_count,
      evening_count: this.props.route.params.evening_count,
      night_count: this.props.route.params.night_count,
      morning_total_happiness: this.props.route.params.morning_total_happiness,
      afternoon_total_happiness: this.props.route.params
        .afternoon_total_happiness,
      evening_total_happiness: this.props.route.params.evening_total_happiness,
      night_total_happiness: this.props.route.params.night_total_happiness,
      morning_total_productivity: this.props.route.params
        .morning_total_productivity,
      afternoon_total_productivity: this.props.route.params
        .afternoon_total_productivity,
      evening_total_productivity: this.props.route.params
        .evening_total_productivity,
      night_total_productivity: this.props.route.params
        .night_total_productivity,
      set: 0,
      // morning_count: 0,
      // afternoon_count: 0,
      // evening_count: 0,
      // night_count: 26,
      // morning_total_happiness: 0,
      // afternoon_total_happiness: 0,
      // evening_total_happiness: 0,
      // night_total_happiness: 0,
      // morning_total_productivity: 204,
      // afternoon_total_productivity: 0,
      // evening_total_productivity: 0,
      // night_total_productivity: 175,
    };
    console.log(this.state);
  }

  refresh = async () => {
    this.setState({ set: 1 });
  };

  findMax(metric) {
    let key = "_total_" + metric;
    let morningKey = "morning" + key;
    let afternoonKey = "afternoon" + key;
    let eveningKey = "evening" + key;
    let nightKey = "night" + key;
    let arr = [
      this.state[morningKey],
      this.state[afternoonKey],
      this.state[eveningKey],
      this.state[nightKey],
    ];
    let max = Math.max(arr);
    if ((max = this.state[morningKey])) {
      return "morning";
    } else if ((max = this.state[afternoonKey])) {
      return "afternoon";
    } else if ((max = this.state[eveningKey])) {
      return "evening";
    } else {
      return "night";
    }
  }

  render() {
    if (this.state.set == 0) {
      //this.refresh;
      this.setState({ set: 1 });
      return <View></View>;
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ marginTop: screen.height / 40 }}>
          <Button
            onPress={() => this.props.navigation.navigate("CumulativeStats")}
            title="Back to general statistics"
            color="#35F2E9"
          />
        </TouchableOpacity>
        <VictoryChart
          domainPadding={{
            x: [30, 30],
            y: [30, 30],
          }}
          width={screen.width / 1.1}
          height={screen.height / 3.7}
        >
          <VictoryLabel
            text="Happiness vs. Time of Day"
            x={200}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            tickFormat={["Morning", "Afternoon", "Evening", "Night"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
          <VictoryBar
            style={{
              data: { fill: (d) => "#83E130" },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barRatio={0.45}
            // data={data}
            // data={[
            //   { action: "Sprint time", time: 70 },
            //   { action: "Break time", time: 20 },
            // ]}
            data={[
              {
                action: "Morning",
                time:
                  this.state.morning_total_happiness / this.state.morning_count,
              },
              {
                action: "Afternoon",
                time:
                  this.state.afternoon_total_happiness /
                  this.state.afternoon_count,
              },
              {
                action: "Evening",
                time:
                  this.state.evening_total_happiness / this.state.evening_count,
              },
              {
                action: "Night",
                time: this.state.night_total_happiness / this.state.night_count,
              },
            ]}
            x="action"
            y="time"
          />
        </VictoryChart>
        <VictoryChart
          domainPadding={{
            x: [30, 30],
            y: [30, 30],
          }}
          width={screen.width / 1.1}
          height={screen.height / 3.7}
        >
          <VictoryLabel
            text="Productivity vs. Time of Day"
            x={200}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            tickFormat={["Morning", "Afternoon", "Evening", "Night"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
          <VictoryBar
            style={{
              data: { fill: (d) => "#83E130" },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barRatio={0.45}
            // data={data}
            // data={[
            //   { action: "Sprint time", time: 70 },
            //   { action: "Break time", time: 20 },
            // ]}
            data={[
              {
                action: "Morning",
                time:
                  this.state.morning_total_productivity /
                  this.state.morning_count,
              },
              {
                action: "Afternoon",
                time:
                  this.state.afternoon_total_productivity /
                  this.state.afternoon_count,
              },
              {
                action: "Evening",
                time:
                  this.state.evening_total_productivity /
                  this.state.evening_count,
              },
              {
                action: "Night",
                time:
                  this.state.night_total_productivity / this.state.night_count,
              },
            ]}
            x="action"
            y="time"
          />
        </VictoryChart>
        <Text style={styles.encourage}>
          You are typically happiest in the {this.findMax("happiness")}
        </Text>
        {this.findMax("happiness") === "morning" ? (
          <Image style={styles.pic} source={require("./assets/morning.png")} />
        ) : (
          <View></View>
        )}
        {this.findMax("happiness") === "afternoon" ? (
          <Image
            style={styles.pic}
            source={require("./assets/afternoon.png")}
          />
        ) : (
          <View></View>
        )}
        {this.findMax("happiness") === "evening" ? (
          <Image style={styles.pic} source={require("./assets/evening.png")} />
        ) : (
          <View></View>
        )}
        {this.findMax("happiness") === "night" ? (
          <Image style={styles.pic} source={require("./assets/night.png")} />
        ) : (
          <View></View>
        )}
        <Text style={styles.encourage}>
          You are typically most productive in the{" "}
          {this.findMax("productivity")}
        </Text>
        {this.findMax("productivity") === "morning" ? (
          <Image style={styles.pic} source={require("./assets/morning.png")} />
        ) : (
          <View></View>
        )}
        {this.findMax("productivity") === "afternoon" ? (
          <Image
            style={styles.pic}
            source={require("./assets/afternoon.png")}
          />
        ) : (
          <View></View>
        )}
        {this.findMax("productivity") === "evening" ? (
          <Image style={styles.pic} source={require("./assets/evening.png")} />
        ) : (
          <View></View>
        )}
        {this.findMax("productivity") === "night" ? (
          <Image style={styles.pic} source={require("./assets/night.png")} />
        ) : (
          <View></View>
        )}
        <TouchableOpacity style={{ marginTop: screen.height / 40 }}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="HOME"
            color="#35F2E9"
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
    backgroundColor: "#f5fcff",
  },
  leftTimes: {
    textAlign: "left",
    color: "#CA3DD4",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 5,
  },
  rightTimes: {
    textAlign: "right",
    color: "#CA3DD4",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 1,
  },
  leftTimesSmol: {
    textAlign: "left",
    color: "#4AEAED",
    fontSize: 25,
    marginBottom: 1,
  },
  rightTimesSmol: {
    textAlign: "right",
    color: "#4AEAED",
    fontSize: 25,
    marginBottom: 5,
  },
  pic: {
    width: screen.width / 10,
    height: screen.width / 10,
  },
  encourage: {
    color: "#74D130",
    fontSize: 15,
    marginTop: 3,
    textAlign: "center",
  },
});
