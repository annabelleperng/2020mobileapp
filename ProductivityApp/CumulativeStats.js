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

export default class CumulativeStats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshed: 0,
      longest_streak: 0,
      sprint_count: -1,
      morning_count: -1,
      afternoon_count: -1,
      evening_count: -1,
      night_count: -1,
      total_unpaused: 0,
      total_paused: 0,
      total_happiness: 0,
      morning_total_happiness: 0,
      afternoon_total_happiness: 0,
      evening_total_happiness: 0,
      night_total_happiness: 0,
      total_productivity: 0,
      morning_total_productivity: 0,
      afternoon_total_productivity: 0,
      evening_total_productivity: 0,
      night_total_productivity: 0,
    };
  }

  refresh = async () => {
    let val = Number.parseInt(await SecureStore.getItemAsync("longest_streak"));
    let currStreak = Number.parseInt(
      await SecureStore.getItemAsync("streak_length")
    );
    this.setSpecific("sprint_count");
    if (currStreak > val) {
      this.setState({ longest_streak: currStreak });
    } else {
      this.setState({ longest_streak: val });
    }
    this.setSpecific("morning_count");
    this.setSpecific("afternoon_count");
    this.setSpecific("evening_count");
    this.setSpecific("night_count");
    this.setSpecific("total_unpaused");
    this.setSpecific("total_paused");
    this.setSpecific("total_happiness");
    this.setSpecific("morning_total_happiness");
    this.setSpecific("afternoon_total_happiness");
    this.setSpecific("evening_total_happiness");
    this.setSpecific("night_total_happiness");
    this.setSpecific("total_productivity");
    this.setSpecific("morning_total_productivity");
    this.setSpecific("afternoon_total_productivity");
    this.setSpecific("evening_total_productivity");
    this.setSpecific("night_total_productivity");
    this.setState({ refreshed: 1 });
  };

  setSpecific = async (key) => {
    let val = Number.parseInt(await SecureStore.getItemAsync(key));
    console.log(key + ": " + val);
    if (
      (key == "morning_count" ||
        key == "afternoon_count" ||
        key == "evening_count" ||
        key == "night_count") &
      (val == 0)
    ) {
      val = -1;
      await SecureStore.setItemAsync(key, val + "");
    }
    if (val != val) {
      if (key.indexOf("count") == -1) {
        val = 0;
      } else {
        val = -1;
      }
      await SecureStore.setItemAsync(key, val + "");
    }
    this.setState({ [key]: val });
    console.log(key + " AFTER: " + val);
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
    if (this.state.refreshed == 0) {
      this.refresh();
    }

    return (
      <View style={styles.container}>
        {this.state.sprint_count >= 0 ? (
          <View>
            <Text style={styles.noSprints}>No data to show yet.</Text>
            <Text style={styles.noSprints}>
              Start sprinting to get your statistics!
            </Text>
            <View style={{ height: screen.height / 10 }}></View>
            <TouchableOpacity
              style={{
                marginTop: screen.height / 40,
                width: screen.width / 2,
                alignSelf: "center",
              }}
            >
              <Button
                onPress={() => this.props.navigation.navigate("Home")}
                title="HOME"
                color="#35F2E9"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Text>Total Sprints: {this.state.sprint_count}</Text>
            <Text>Longest Streak: {this.state.longest_streak}</Text>
            {/* <VictoryChart
          domainPadding={{
            x: [100, 100],
            y: [300, 300],
          }}
          width={250}
          height={250}
        >
          <VictoryLabel
            text="Happiness vs. Time of Day"
            x={180}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            tickFormat={["Morning", "Afternoon", "Evening", "Night"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}\npoints`} />
          <VictoryBar
            style={{ data: { fill: (d) => "#83E130" } }}
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
                  this.state.morning_total_happiness / this.state.sprint_count,
              },
              {
                action: "Afternoon",
                time:
                  this.state.afternoon_total_happiness /
                  this.state.sprint_count,
              },
              {
                action: "Evening",
                time:
                  this.state.evening_total_happiness / this.state.sprint_count,
              },
              {
                action: "Night",
                time:
                  this.state.night_total_happiness / this.state.sprint_count,
              },
            ]}
            x="action"
            y="time"
          />
        </VictoryChart>
        <VictoryChart
          domainPadding={{
            x: [100, 100],
            y: [300, 300],
          }}
          width={250}
          height={250}
        >
          <VictoryLabel
            text="Productivity vs. Time of Day"
            x={180}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis
            tickFormat={["Morning", "Afternoon", "Evening", "Night"]}
          />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}\npoints`} />
          <VictoryBar
            style={{ data: { fill: (d) => "#83E130" } }}
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
                  this.state.sprint_count,
              },
              {
                action: "Afternoon",
                time:
                  this.state.afternoon_total_productivity /
                  this.state.sprint_count,
              },
              {
                action: "Evening",
                time:
                  this.state.evening_total_productivity /
                  this.state.sprint_count,
              },
              {
                action: "Night",
                time:
                  this.state.night_total_productivity / this.state.sprint_count,
              },
            ]}
            x="action"
            y="time"
          />
        </VictoryChart> */}
            <Text>
              Average Focus Time Per Sprint:{" "}
              {this.state.total_unpaused / this.state.sprint_count} minutes
            </Text>
            <Text>
              Average Break Time Per Sprint:{" "}
              {this.state.total_paused / this.state.sprint_count} minutes
            </Text>
            <Text>
              Average Happiness During Sprints:{" "}
              {this.state.total_happiness / this.state.sprint_count}
            </Text>
            <Text>
              Average Productivity During Sprints:{" "}
              {this.state.total_productivity / this.state.sprint_count}
            </Text>
            <VictoryPie
              startAngle={-90}
              endAngle={90}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              colorScale={["gold", "orange", "tomato", "navy"]}
              data={[
                { x: "Morning", y: this.state.morning_count },
                { x: "Afternoon", y: this.state.afternoon_count },
                { x: "Evening", y: this.state.evening_count },
                { x: "Night", y: this.state.night_count },
              ]}
              // data={[
              //   { x: "Morning", y: 3 },
              //   { x: "Afternoon", y: 5 },
              //   { x: "Evening", y: 2 },
              //   { x: "Night", y: 8 },
              // ]}
              labels={({ datum }) => (datum.y > 0 ? `${datum.x}` : ``)}
            />
            <TouchableOpacity style={{ marginTop: screen.height / 40 }}>
              <Button
                onPress={() =>
                  this.props.navigation.navigate("CumulStats2", {
                    morning_count: this.state.morning_count,
                    afternoon_count: this.state.afternoon_count,
                    evening_count: this.state.evening_count,
                    night_count: this.state.night_count,
                    morning_total_happiness: this.state.morning_total_happiness,
                    afternoon_total_happiness: this.state
                      .afternoon_total_happiness,
                    evening_total_happiness: this.state.evening_total_happiness,
                    night_total_happiness: this.state.night_total_happiness,
                    night_count: this.state.night_count,
                    morning_total_productivity: this.state
                      .morning_total_productivity,
                    afternoon_total_productivity: this.state
                      .afternoon_total_productivity,
                    evening_total_productivity: this.state
                      .evening_total_productivity,
                    night_total_productivity: this.state
                      .night_total_productivity,
                  })
                }
                title="Details"
                color="#35F2E9"
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: screen.height / 40 }}>
              <Button
                onPress={() => this.props.navigation.navigate("Home")}
                title="HOME"
                color="#35F2E9"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
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
  },
  noSprints: {
    textAlign: "center",
    color: "#4AEAED",
    fontSize: 40,
  },
});
