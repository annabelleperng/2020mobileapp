import React, { Component } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutes_Counter: "60",
      seconds_Counter: "00",
      startDisable: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  onButtonStart = () => {
    let timer = setInterval(() => {
      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 0) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = "59";
      }

      this.setState({
        minutes_Counter: count.length == 1 ? "0" + count : count,
        seconds_Counter: num.length == 1 ? "0" + num : num,
      });
    }, 1000);
    this.setState({ timer });

    this.setState({ startDisable: true });
  };

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({ startDisable: false });
  };

  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: "60",
      seconds_Counter: "00",
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <Text style={styles.counterText}>
          {this.state.minutes_Counter} : {this.state.seconds_Counter}
        </Text>

        <TouchableOpacity
          onPress={this.onButtonStart}
          activeOpacity={0.6}
          style={[
            styles.button,
            {
              backgroundColor: this.state.startDisable ? "#B0BEC5" : "#b3a6ff",
            },
          ]}
          disabled={this.state.startDisable}
        >
          <Text style={styles.buttonText}>START</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: "#b3a6ff" }]}
        >
          <Text style={styles.buttonText}>STOP</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[
            styles.button,
            {
              backgroundColor: this.state.startDisable ? "#B0BEC5" : "#b3a6ff",
            },
          ]}
          disabled={this.state.startDisable}
        >
          <Text style={styles.buttonText}> QUIT </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  button: {
    width: "80%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  counterText: {
    fontSize: 28,
    color: "#000",
  },
});

// import { Stopwatch, Timer } from "react-native-stopwatch-timer";

// import React, { Component } from "react";

// import {
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   TouchableOpacity,
//   Slider,
//   Dimensions,
//   TouchableHighlight,
//   Image,
//   TextInput,
// } from "react-native";
// import { screensEnabled } from "react-native-screens";

// const screen = Dimensions.get("window");

// // timerDuration: 90000,

// export default class Timer5 extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isTimerStart: false,
//       isStopwatchStart: false,
//       timerDuration: props.route.params.JSON_ListView_Clicked_Item * 1000,
//       resetTimer: false,
//       resetStopwatch: false,
//     };
//     this.startStopTimer = this.startStopTimer.bind(this);
//     this.resetTimer = this.resetTimer.bind(this);
//     this.startStopStopWatch = this.startStopStopWatch.bind(this);
//     this.resetStopwatch = this.resetStopwatch.bind(this);
//   }
//   startStopTimer() {
//     this.setState({
//       isTimerStart: !this.state.isTimerStart,
//       resetTimer: false,
//     });
//   }
//   resetTimer() {
//     this.setState({ isTimerStart: false, resetTimer: true });
//   }
//   startStopStopWatch() {
//     this.setState({
//       isStopwatchStart: !this.state.isStopwatchStart,
//       resetStopwatch: false,
//     });
//   }
//   resetStopwatch() {
//     this.setState({ isStopwatchStart: false, resetStopwatch: true });
//   }
//   getFormattedTime(time) {
//     this.currentTime = time;
//   }
//   render() {
//     console.log(this.props);
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <View style={{ flex: 1.5, backgroundColor: "#222" }}>
//           <View
//             style={{
//               flex: 1,
//               marginTop: 32,
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             <Stopwatch
//               laps
//               msecs
//               start={this.state.isStopwatchStart}
//               //To start
//               reset={this.state.resetStopwatch}
//               //To reset
//               options={options}
//               //options for the styling
//               getTime={this.getFormattedTime}
//             />
//             <TouchableHighlight onPress={this.startStopStopWatch}>
//               <Text style={{ fontSize: 20, marginTop: 10 }}>
//                 {!this.state.isStopwatchStart ? "START" : "STOP"}
//               </Text>
//             </TouchableHighlight>
//             <TouchableHighlight onPress={this.resetStopwatch}>
//               <Text style={{ fontSize: 20, marginTop: 10 }}>RESET</Text>
//             </TouchableHighlight>
//           </View>
//         </View>
//         <View
//           style={{
//             flex: 1,
//             marginTop: 32,
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <Timer
//             totalDuration={this.state.timerDuration}
//             msecs
//             //Time Duration
//             start={this.state.isTimerStart}
//             //To start
//             reset={this.state.resetTimer}
//             //To reset
//             options={options}
//             //options for the styling
//             handleFinish={handleTimerComplete}
//             //can call a function On finish of the time
//             getTime={this.getFormattedTime}
//           />
//           <TouchableHighlight onPress={this.startStopTimer}>
//             <Text style={{ fontSize: 20, marginTop: 10 }}>
//               {!this.state.isTimerStart ? "START" : "STOP"}
//             </Text>
//           </TouchableHighlight>
//           <TouchableHighlight onPress={this.resetTimer}>
//             <Text style={{ fontSize: 20, marginTop: 10 }}>RESET</Text>
//           </TouchableHighlight>
//         </View>
//       </View>
//     );
//   }
// }

// const handleTimerComplete = () => alert("Custom Completion Function");
// const options = {
//   container: {
//     backgroundColor: "#FF0000",
//     padding: 5,
//     borderRadius: 5,
//     width: screen.width,
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 25,
//     color: "#FFF",
//     marginLeft: 7,
//   },
// };
