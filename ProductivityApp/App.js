// TO DO:
// Timer for ___ amount of time should correspond to
// length of actual focus period (specified by user).
// (Change text and actual timer).
// Hard coded: Motivation message.
// Hard coded: Color scheme.

import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Feedback from "./Feedback";
// import Timer from "./Timer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const screen = Dimensions.get("window");
const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Feedback")}
      />
    </View>
  );
}

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Timer">
          {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
          <Stack.Screen name="Feedback" component={Feedback} />
          {/* <Stack.Screen name="Timer" component={Timer} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  containerChopped: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  red: {
    color: "#B9AAFF",
    fontSize: 20,
  },
  button: {
    borderWidth: 5,
    borderColor: "#B9AAFF",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#595959",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  timerText: {
    color: "#fff",
    fontSize: 90,
    marginBottom: 20,
  },
  fullTimeText: {
    color: "#fff",
    fontSize: 30,
    marginLeft: screen.width / 12,
    marginTop: screen.height / 200,
    alignItems: "center",
  },
  focused: {
    color: "#a8ffff",
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  unfocused: {
    color: "#ffb6a8",
    fontSize: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: screen.width / 7,
    alignItems: "flex-end",
  },
});
