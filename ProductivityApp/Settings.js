import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const screen = Dimensions.get("window");

export default class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      motivationUpdated: false,
      motivation:
        "This is your personal motivational quote if you entered one. Or we'll just pick from ours.",
    };
  }

  setMotivationalQuote(text) {
    this.setState({ motivation: text });
  }

  storeMotivationalQuote = async () => {
    await SecureStore.setItemAsync("motivation", this.state.motivation);
  };

  updateMotivation = async () => {
    let motiv = await SecureStore.getItemAsync("motivation");
    if (motiv != null && motiv != "") {
      this.setState({ motivationUpdated: true, motivation: motiv });
    }
  };

  render() {
    if (!this.state.motivationUpdated) {
      this.updateMotivation();
    }
    return (
      //music? colors?
      <View style={styles.container}>
        <Text>Edit your personal motivational quote here!</Text>
        <TextInput
          style={{
            height: 60,
            borderColor: "gray",
            borderWidth: 1,
            marginHorizontal: screen.width / 10,
          }}
          onChangeText={(text) => this.setMotivationalQuote(text)}
          //   keyboardType="default"
          placeholder={this.state.motivation}
          placeholderTextColor="#9E9D9B"
          maxLength={140}
          multiline={true}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={this.storeMotivationalQuote}>
          <Text>Set my motivational quote!</Text>
        </TouchableOpacity>
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
});
