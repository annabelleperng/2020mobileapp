import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Dimensions
} from "react-native";

const screen = Dimensions.get("window");

export default class Garden extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          styles={{
            flex: 0.25,
            backgroundColor: "lavender",
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
            purchase one of our premium henderies
          </Text>
        </View>

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