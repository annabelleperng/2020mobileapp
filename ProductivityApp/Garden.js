import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Garden extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#52FF33",
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Marker Felt",
            textAlign: "center",
            fontSize: 24
          }}
        >
          BABY WERE 2 DISTANT STRANGERS IK U DONT SPEAK MY LANGUAGE BUT I LOVE
          THE WAY UR TALKIN TO ME
        </Text>
      </View>
    );
  }
}
