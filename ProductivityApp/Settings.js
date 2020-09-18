import React, { Component, useState } from "react";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Switch,
} from "react-native";

const screen = Dimensions.get("window");

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: false,
      prevMotivation: "",
      motivationUpdated: "0",
      motivation:
        "This is your note to yourself! You'll see it every time you " +
        "start a sprint. You can edit what it says in Settings.",
    };
  }

  updateMotivation = async () => {
    let motiv = await SecureStore.getItemAsync("motivation");
    console.log("motiv: " + motiv);
    if (motiv != null && motiv != "") {
      console.log("in here");
      this.setState({
        motivation: motiv,
      });
    }
    this.setState({
      prevMotivation: this.state.motivation,
      motivationUpdated: "1",
    });
    console.log("prevMotivation: " + this.state.prevMotivation);
    console.log("motivationUpdated: " + this.state.motivationUpdated);
  };

  //   getPrevMotivation = async () => {
  //     let motiv = await SecureStore.getItemAsync("motivation");
  //     if (motiv != null && motiv != "") {
  //         motiv = this.state.motivation;
  //     }
  //     return motiv;
  //   };

  setMotivationalQuote(text) {
    this.setState({ motivation: text });
  }

  storeMotivationalQuote = async () => {
    await SecureStore.setItemAsync("motivation", this.state.motivation);
  };

  render() {
    if (this.state.motivationUpdated == "0") {
      this.updateMotivation();
    }
    const { navigate } = this.props.navigation;

    return (
      //music? colors?
      <View style={styles.container}>
        <View style={{ flexDirection: "row", flex: 0.4, alignItems: "center" }}>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.3 }}>
            <Text>Edit your personal motivational quote here!</Text>
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View style={{ flex: 0.6 }}>
            <TextInput
              style={{
                width: screen.width / 2,
                borderColor: "gray",
                borderWidth: 1,
                alignSelf: "center",
                padding: screen.width / 50,
              }}
              onChangeText={(text) => this.setMotivationalQuote(text)}
              //   keyboardType="default"
              placeholder={this.state.prevMotivation}
              placeholderTextColor="#9E9D9B"
              maxLength={140}
              multiline={true}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={this.storeMotivationalQuote}
              style={[
                styles.button,
                {
                  backgroundColor: "#36F5F5",
                  alignSelf: "center",
                },
              ]}
            >
              <Text style={{ textAlign: "center" }}>Set quote!</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1 }}></View>
        </View>
        <View style={{ flexDirection: "row", flex: 0.2, alignItems: "center" }}>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.3 }}>
            <Text>Sound</Text>
          </View>
          <View style={{ flex: 0.05 }}></View>
          <View style={{ flex: 0.6 }}>
            <Switch
              trackColor={{ false: "#777777", true: "#818181" }}
              thumbColor={"#000000"}
              value={this.state.value}
              onValueChange={(value) => {
                this.setState({ value: value });
              }}
            />
          </View>
          <View style={{ flex: 0.1 }}></View>
        </View>
        <View style={{ flexDirection: "row", flex: 0.7, alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigate("Home")}>
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
              <Text style={styles.smallWhiteText}>HOME</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#46DC46",
  },
  tinyLogoCenter: {
    width: screen.width / 15,
    height: screen.width / 15,
    alignSelf: "center",
  },
  tinyLogoLeft: {
    width: screen.width / 15,
    height: screen.width / 15,
    marginRight: screen.width / 3,
    alignItems: "flex-end",
  },
  tinyLogoRight: {
    width: screen.width / 15,
    height: screen.width / 15,
    marginLeft: screen.width / 3,
    alignItems: "flex-end",
  },
  encourage: {
    fontSize: 25,
    marginTop: 3,
    marginBottom: 25,
    color: "#CA3DD4",
    textAlign: "center",
  },
  yay: {
    fontSize: 20,
    marginTop: 5,
    color: "#CA3DD4",
    textAlign: "center",
  },
  norm: {
    fontSize: 15,
    marginTop: 60,
    color: "#FCCC00",
  },
  button: {
    width: "50%",
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
  pinkButton2: {
    borderWidth: 2,
    borderColor: "#979797", //"#ff576d",
    width: screen.width / 2.7,
    height: screen.width / 12,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: screen.width / 15,
  },
});
