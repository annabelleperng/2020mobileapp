// import * as React from 'react';
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Slider,
  Dimensions,
  Image,
} from "react-native";

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import './App.js';

export default class Details extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={{ flex: 1.5, backgroundColor: "#0ffcff" }}>
          <Text>YOURE A BITCHASS HOE!</Text>
          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Feedback")}
              title="Go back to feedback!"
              color="#35F2E9" //button bg for android, text for ios
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.5, backgroundColor: "#2edcf2" }}>
          <Text>YOURE A BITCHASS HOE!</Text>
          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Timer")}
              title="Go back to timer!"
              color="#35F2E9" //button bg for android, text for ios
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.5, backgroundColor: "#5aceef" }}>
          <Text>YOURE A BITCHASS HOE!</Text>
          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("AppSaved")}
              title="Go back to...!"
              color="#35F2E9" //button bg for android, text for ios
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// export default Details;
