import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const screen = Dimensions.get("window");

export default class Garden extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const margin = (screen.height * 4) / 22 - screen.width / 3.5;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 2, backgroundColor: "#57423e" }}></View>
        <View style={{ flex: 3, backgroundColor: "#0e0e0e" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: (screen.height * 3) / 22 - screen.width / 5,
              //   marginLeft: screen.width / 14,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 3.5,
    height: screen.width / 3.5,
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9,
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9,
    marginLeft: screen.width / 10,
  },
});
