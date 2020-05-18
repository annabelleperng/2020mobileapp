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

const endTime = new Date();
const hours = endTime.getHours();
const mins = endTime.getMinutes();

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
    const startHours = hours - Math.floor(this.state.total_time / 3600000);
    const startHours12h = startHours <= 12 ? startHours : startHours % 12;
    const startAMPM = startHours <= 12 ? " AM" : " PM";
    if (startHours == 24) {
      startHours12h = 12;
      startAMPM = " AM";
    }
    const startMins = mins - Math.floor(this.state.total_time / 60000);
    const endHours12h = hours <= 12 ? hours : hours % 12;
    const endAMPM = hours <= 12 ? " AM" : " PM";
    if (hours == 24) {
      endHours12h = 12;
      endAMPM = " AM";
    }

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
            {(startHours12h < 10 ? "0" + startHours12h : startHours12h) +
              ":" +
              (startMins < 10 ? "0" + startMins : startMins) +
              startAMPM +
              "             "}
          </Text>
          <Text style={styles.rightTimesSmol}>
            {" "}
            {(endHours12h < 10 ? "0" + endHours12h : endHours12h) +
              ":" +
              (mins < 10 ? "0" + mins : mins) +
              endAMPM}{" "}
          </Text>
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
