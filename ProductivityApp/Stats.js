import React from "react";
import { StyleSheet, View } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis,
} from "victory-native";

const data = [
  { action: "Sprint time", time: 70 },
  { action: "Break time", time: 20 },
];

// const data = [
//   { quarter: 1, earnings: 13000 },
//   { quarter: 2, earnings: 16500 },
//   { quarter: 3, earnings: 14250 },
//   { quarter: 4, earnings: 19000 },
// ];

export default class App extends React.Component {
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
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            barRatio={0.8}
            data={data}
            x="action"
            y="time"
          />
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
});
