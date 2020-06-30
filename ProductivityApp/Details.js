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
  KeyboardAvoidingView,
} from "react-native";
//import CombinedButton from "react-native-combined-button";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";

const screen = Dimensions.get("window");

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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
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
              <TouchableOpacity
                onPress={() =>
                  navigate("Timer5", {
                    JSON_ListView_Clicked_Item: this.state.minutes,
                  })
                }
              >
                <View style={styles.openButton}>
                  <Text>Let's go!</Text>
                </View>
                {/* <Button
                title="LET'S GO!"
                onPress={() =>
                  navigate("Timer5", {
                    JSON_ListView_Clicked_Item: this.state.minutes,
                  })
                }
              /> */}
              </TouchableOpacity>
            </View>
          </View>
          {/* <View style={{ flex: 1.5 }}>
          <Button title="Go to garden." onPress={() => navigate("Garden")} />
          <Button
            title="Go to GardenTesting"
            onPress={() => navigate("GardenTesting")}
          />
          <Button
            title="Go to PlantView"
            onPress={() => navigate("PlantView")}
          />
        </View> */}
          <View
            style={{
              flex: 5,
              justifyContent: "center",
              flexDirection: "row",
              backgroundColor: "#0ffcff",
            }}
          >
            <View style={{ flex: 1, backgroundColor: "#b19999" }}>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.smallText}>You've sprinted for</Text>
                <Text style={styles.smallText}>25 minutes today.</Text>
                <Text style={styles.smallText}></Text>
                <Text style={styles.smallText}></Text>
                <Text style={styles.smallText}>
                  - <Text style={styles.smallGreenText}>87.5%</Text> working
                </Text>
                <Text style={styles.smallText}></Text>
                <Text style={styles.smallText}>
                  - <Text style={styles.smallRedText}>12.5%</Text> paused
                </Text>
                <Text style={styles.smallText}></Text>
                <Text style={styles.smallText}></Text>
                <TouchableOpacity onPress={() => navigate("Timer5")}>
                  <Text style={styles.smallLinkText}>See more stats!</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }}></View>
              {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            </View>
            <View style={{ flex: 1, backgroundColor: "#9a7993" }}>
              <View style={{ flex: 0.5 }}></View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Shop")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>SHOP</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity onPress={() => navigate("Garden")}>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>GARDEN</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>SETTINGS</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.35, justifyContent: "center" }}>
                <TouchableOpacity>
                  <View
                    style={[
                      styles.pinkButton2,
                      {
                        height:
                          Platform.OS == "android"
                            ? screen.width / 12
                            : screen.width / 10,
                      },
                    ]}
                  >
                    <Text style={styles.smallWhiteText}>HELP</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.5 }}></View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  openButton: {
    backgroundColor: "#979797",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  pinkButton2: {
    borderWidth: 2,
    borderColor: "#979797", //"#ff576d",
    width: screen.width / 2.7,
    height: screen.width / 10,
    borderRadius: screen.width / 2,
    alignItems: "center",
    // backgroundColor: "#fca",
    // color: "#fff",
    // fontSize: 30,
    justifyContent: "center",
    marginLeft: screen.width / 15,
  },
  smallWhiteText: {
    color: "#632985",
    fontSize: 20,
    marginTop: 5,
  },
  smallText: {
    color: "#000000",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallLinkText: {
    color: "purple",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallGreenText: {
    color: "#b6f542",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
  smallRedText: {
    color: "#ff4e47",
    fontSize: 20,
    marginLeft: screen.width / 15,
  },
});
