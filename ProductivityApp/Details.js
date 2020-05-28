// import * as React from 'react';
import React, { Component } from "react";
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from "react-native-elements";
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
//import CombinedButton from "react-native-combined-button";

// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import './App.js';

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 50,
    };
  }
  static navigationOptions = {
    //Setting the header of the screen
    title: "Detailsss",
  };

  //   someFunction(minutes, seconds) {
  //     this.setState({ states: [minutes, seconds] });
  //   }
  //   someFunction(minutes) {
  //     this.setState({ states: [minutes, this.states.states[1]] });
  //   }

  //   const [value, onChangeText] = useState('Useless Placeholder');

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1 /*}, alignItems: "center", justifyContent: "center" */,
        }}
      >
        <View
          style={{
            flex: 0.25,
            backgroundColor: "#0ffcff",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Marker Felt",
              textAlign: "center",
              fontSize: 24,
            }}
          >
            {" "}
            Time to get grinding!{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Marker Felt",
              textAlign: "center",
              fontSize: 20,
            }}
          >
            {" "}
            View past statistics or start a sprint:
          </Text>
        </View>

        <View
          style={{
            flex: 0.25,
            backgroundColor: "#2edcf2",
            alignItems: "center",
          }}
        >
          <TextInput
            value={this.state.minutes}
            onChangeText={(minutes) => this.setState({ minutes })}
            placeholder={"Enter Any value"}
            keyboardType="number-pad"
            style={[
              styles.input,
              { height: Platform.OS == "android" ? 40 : 35 },
            ]}
          />
          {/* <Button
          title="Go to timer, pass minutes 1"
          //Button Title
          onPress={() =>
            navigate({
              name: "Timer",
              routeName: "Timer",
              params: {
                JSON_ListView_Clicked_Item: this.state.minutes
              }
            })
          }
        />
        <Button
          title="Go to timer, pass minutes"
          //Button Title
          onPress={() =>
            navigate("Timer", {
              JSON_ListView_Clicked_Item: this.state.minutes
            })
          }
        />
        <Button
          title="Go to timer, pass minutes and 101"
          //Button Title
          onPress={() =>
            navigate("Timer", {
              userName: this.state.minutes,
              otherParam: "101"
            })
          }
        /> */}
          {/* <Button
          title="Go to timer, pass itemID"
          onPress={() => {
            /* 1. Navigate to the Details route with params */}
          {/*navigate("Timer", {
              itemId: 86,
              otherParam: "anything you want here"
            });
          }}
        /> */}
          <TouchableOpacity>
            <Button
              title="Enter an amount of time and start a sprint!"
              //Button Title
              onPress={() =>
                navigate("Timer5", {
                  JSON_ListView_Clicked_Item: this.state.minutes,
                })
              }
            />
            <Button
              title="Go to garden."
              //Button Title
              onPress={() => navigate("Garden")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 0.25,
            backgroundColor: "#0ffcff",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Feedback")}
              title="Go back to feedback!"
              color="#000000" //button bg for android, text for ios
            />
          </TouchableOpacity>
        </View>
        {/*View style={{ flex: 1.5, backgroundColor: "#5aceef" }}>*/}
        {/* <Text>YOURE A BITCHASS HOE!</Text>
        <Button
          onPress={() => this.props.navigation.navigate("TextInput")}
          title="Go back to TEXTINPUT"
          color="#35F2E9" //button bg for android, text for ios
        /> */}
        {/*</View>*/}
        <View
          style={{
            flex: 0.25,
            justifyContent: "center",
            alignItems: "left",
            backgroundColor: "#0ffcff",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.props.navigation.navigate("Garden")}
          >
            <Image
              source={require("./assets/hendery.png")}
              style={{
                width: 150,
                height: 150,
              }}
            />
          </TouchableOpacity>
          {/* <CombinedButton
            style={styles.iconBtn}
            iconPosition="left"
            icon={require("./assets/hendery.png")}
          /> */}
          <Text styles={{ color: "lime" }}>Visit your garden!</Text>
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
