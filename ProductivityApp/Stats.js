import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";

// const data = [
//   { action: "Sprint time", time: 70, fill: "blue" },
//   { action: "Break time", time: 20, fill: "red" },
// ];

const startTime = "03:15 PM"; //placeholder
const endTime = "04:45 PM"; //placeholder

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.route.params.JSON_ListView_Clicked_Item,
      timer_time: this.props.route.params.timer_time,
      total_time: this.props.route.params.total_time,
    };
  }

  timeOfDay() {
    // "params": Object {
    //   "JSON_ListView_Clicked_Item": "5/16/2020, 12:37:00 AM",
    //   "timer_time": "1", //minutes
    //   "total_time": 70953, //millisecs
    // },
  }

  render() {
    return (
      <View style={styles.container}>
        <VictoryChart
          domainPadding={{ x: [100, 100], y: [0, 20] }}
          width={360}
          theme={VictoryTheme.material}
        >
          <VictoryLabel
            text="Sprint versus Break Time"
            x={180}
            y={30}
            textAnchor="middle"
          />
          <VictoryAxis tickFormat={["Sprint time", "Break time"]} />
          <VictoryAxis dependentAxis tickFormat={(x) => `${x}\nmins`} />
          <VictoryBar
            style={{ data: { fill: (d) => "#74D130" } }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barRatio={0.8}
            // data={data}
            data={[
              { action: "Sprint time", time: 70 },
              { action: "Break time", time: 20 },
            ]}
            // data = {[
            //   { action: "Sprint time", time: this.state.timer_time },
            //   { action: "Break time", time: (this.state.total_time / 1000 - this.state.timer_time) },
            // ]}
            x="action"
            y="time"
          />
        </VictoryChart>
        <View
          style={{
            flexDirection: "row",
            alignContent: "space-between",
            marginTop: 30,
          }}
        >
          <Text style={styles.leftTimes}>Started at {"        "}</Text>
          <Text style={styles.rightTimes}>Ended at </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignContent: "space-between",
            marginTop: 3,
          }}
        >
          <Text style={styles.leftTimesSmol}>
            {startTime + "              "}
          </Text>
          <Text style={styles.rightTimesSmol}> {endTime} </Text>
        </View>
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
    fontFamily: "sans-serif-light",
    marginBottom: 5,
  },
  rightTimes: {
    textAlign: "right",
    color: "#CA3DD4",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "sans-serif-light",
    marginBottom: 1,
  },
  leftTimesSmol: {
    textAlign: "left",
    color: "#4AEAED",
    fontFamily: "Roboto",
    fontSize: 25,
    marginBottom: 1,
  },
  rightTimesSmol: {
    textAlign: "right",
    color: "#4AEAED",
    fontFamily: "Roboto",
    fontSize: 25,
    marginBottom: 5,
  },
});
