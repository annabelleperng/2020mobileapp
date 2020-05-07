// import * as React from 'react';
import React, { Component } from "react";
// import {
//   FormLabel,
//   FormInput,
//   FormValidationMessage,
// } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Slider,
  Dimensions,
  Image,
  TextInput,
} from "react-native";

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import './App.js';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 50,
    };
  }

  //   someFunction(minutes, seconds) {
  //     this.setState({ states: [minutes, seconds] });
  //   }
  //   someFunction(minutes) {
  //     this.setState({ states: [minutes, this.states.states[1]] });
  //   }

  //   const [value, onChangeText] = useState('Useless Placeholder');

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
              onPress={
                // ('SecondPage', {
                // JSON_ListView_Clicked_Item: this.state.username,
                // })
                () =>
                  this.props.navigation.navigate("Timer", {
                    JSON_ListView_Clicked_Item: this.state.minutes,
                  })
              }
              title="Go back to timer!"
              color="#35F2E9" //button bg for android, text for ios
            />
            <TextInput
              value={this.state.minutes}
              onChangeText={(minutes) => this.setState({ minutes })}
              placeholder={"Enter # of Minutes"}
              keyboardType="number-pad"
              style={styles.input}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1.5, backgroundColor: "#5aceef" }}>
          <Text>YOURE A BITCHASS HOE!</Text>
          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("TextInput")}
              title="Go back to TEXTINPUT"
              color="#35F2E9" //button bg for android, text for ios
            />
            {/* <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={(text) => onChangeText(text)}
              value={value}
            /> */}
            {/* <FormLabel>Name</FormLabel>
            <FormInput onChangeText={this.someFunction} />
            <FormValidationMessage>Error message</FormValidationMessage> */}
            {/* <input
              type="number"
              value={this.state.states[0]}
              onChange={this.someFunction(value)}
            /> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
// export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#DBDBD6",
  },
});
