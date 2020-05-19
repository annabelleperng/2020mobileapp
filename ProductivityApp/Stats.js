import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";

const screen = Dimensions.get("window");

// const data = [
//   { action: "Sprint time", time: 70, fill: "blue" },
//   { action: "Break time", time: 20, fill: "red" },
// ];

const endTime = new Date();
const endHours = endTime.getHours();
const endMins = endTime.getMinutes();

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: this.props.route.params.JSON_ListView_Clicked_Item,
      timer_time: this.props.route.params.timer_time,
      total_time: this.props.route.params.total_time,
    };
  }

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

  encourage(start, end) {
    if (start === end) {
      return "Grinding through the " + start + "!";
    } else {
      return "Grinding from " + start + " 'til " + end + "!";
    }
  }

  render() {
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

        <Text style={styles.encourage}>
          {this.encourage(startTimeOfDay, endTimeOfDay)}
        </Text>
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
          <Text style={styles.leftTimes}>
            {this.state.total_time / 60000 - this.state.timer_time} at{" "}
            {"        "}
          </Text>
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
              startAMPM}
            {"          "}
          </Text>
          <Text style={styles.rightTimesSmol}>
            {" "}
            {(endHours12h < 10 ? "0" + endHours12h : endHours12h) +
              ":" +
              (endMins < 10 ? "0" + endMins : endMins) +
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
  pic: {
    width: screen.width / 10,
    height: screen.width / 10,
  },
  encourage: {
    color: "#74D130",
    fontSize: 15,
    marginTop: 3,
  },
});
