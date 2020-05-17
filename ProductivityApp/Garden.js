import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from "react-native";

const screen = Dimensions.get("window");

export default class Garden extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center"
        }}
      >
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: screen.height / 20,
              marginLeft: screen.width / 14
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
              marginTop: screen.height / 20,
              marginLeft: screen.width / 14
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
              marginTop: screen.height / 20,
              marginLeft: screen.width / 14
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
        <View style={{ flex: 2.5, backgroundColor: "#57423e" }}></View>
        <View style={{ flex: 2.5, backgroundColor: "#0e0e0e" }}>
          <View
            style={{
              alignItems: "left",
              backgroundColor: "#0ffcff",
              padding: 20
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate("Shop")}
            >
              <Image
                source={require("./assets/hendery.png")}
                style={{
                  width: 40,
                  height: 40
                }}
              />
            </TouchableOpacity>
            <Text styles={{ color: "lime" }}>
              Visit the hendery sculpture garden!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 3.5,
    height: screen.width / 3.5
  },
  menuButton: {
    width: screen.width / 6,
    height: screen.width / 6,
    marginLeft: screen.width / 7,
    alignItems: "flex-end"
  }
});
