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

export default class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 10,
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View
        style={{
          flex: 1,
        }} // top part: header + subheader
      >
        <View
          style={{
            flex: 2.5,
            backgroundColor: "#0ffcff",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
            }}
          >
            Time to get grinding!{" "}
          </Text>
          <Text></Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
            }}
          >
            Start a sprint now or
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 18,
            }}
          >
            view your past statistics!
          </Text>
        </View>

        <View
          style={{
            flex: 2,
            backgroundColor: "#2edcf2",
            alignItems: "center",
          }} // enter time to start a sprint
        >
          <View style={{ flex: 0.7 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TextInput
              onChangeText={(minutes) => this.setState({ minutes })}
              placeholder={"# of minutes"}
              keyboardType="number-pad"
              style={[
                styles.input,
                { height: Platform.OS == "android" ? 40 : 35 },
              ]}
            />
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity>
              <Button
                title="LET'S GO"
                onPress={() =>
                  navigate("Timer5", {
                    JSON_ListView_Clicked_Item: this.state.minutes,
                  })
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
          <Button title="Go to garden." onPress={() => navigate("Garden")} />
          <Button
            title="Go to GardenTesting"
            onPress={() => navigate("GardenTesting")}
          />
          <Button
            title="Go to PlantView"
            onPress={() => navigate("PlantView")}
          />
        </View>
        <View
          style={{
            flex: 2.5,
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
        <View
          style={{
            flex: 2.5,
            justifyContent: "center",
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
