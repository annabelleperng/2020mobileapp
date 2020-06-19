import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ImageStore,
  Button,
} from "react-native";

const screen = Dimensions.get("window");
import SeedUtils from "./SeedUtils";
const su = new SeedUtils();

let images = {
  "ferns ": require("./assets/fernsbig.png"),
  "tulips ": require("./assets/tulipsbig.png"),
  "invis ": require("./assets/invis.png"),
};

import * as SecureStore from "expo-secure-store";
export default class GardenTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantNum: 1,
      showCancel: false,
      image1: "invis ",
      temp: false,
      soundLoaded: false,
      shouldBePlaying: true,
      isPlaying: true,
    };
  }

  checkInitialized = async () => {
    console.log("checking if initialized!");
    const initialized = await SecureStore.getItemAsync("garden_initialized");
    if (initialized === null) {
      console.log("not initialized");
      this.initializeGarden();
      await SecureStore.setItemAsync("garden_initialized", "true");
    }
    this.initializeGarden();
  };

  componentWillUnmount = () => {
    console.log("here - unmounted");
    // this.stopPlaying();
  };

  initializeGarden = async () => {
    console.log("initializing garden");
    await SecureStore.setItemAsync("inventory_water", "0");
    await SecureStore.setItemAsync("inventory_bees", "0");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "1");
    await SecureStore.setItemAsync("1_status", "0");
    await SecureStore.setItemAsync("2_status", "0");
    await SecureStore.setItemAsync("3_status", "0");
    await SecureStore.setItemAsync("4_status", "0");
    await SecureStore.setItemAsync("5_status", "0");
    await SecureStore.setItemAsync("6_status", "0");
    await SecureStore.setItemAsync("7_status", "0");
    await SecureStore.setItemAsync("8_status", "0");
    await SecureStore.setItemAsync("9_status", "0");
    await SecureStore.setItemAsync("9_status", "0");
    await SecureStore.setItemAsync(
      "inventory_seeds",
      "%2bitch%1hello%1hi%2i%3am"
    );
    await SecureStore.setItemAsync("garden_initialized", "true");
    // await su.plantSeed
    console.log("we're here");
    // su.checkStatus(1, "0");
    // su.checkStatus(1, "1");
  };
  toggleCancel = () => {
    console.log(" ");
    if (this.state.showCancel) {
      this.setState({ showCancel: false });
    } else {
      this.setState({ showCancel: true });
    }
  };

  show12 = async () => {
    console.log("\nshow12 called");

    let species = await SecureStore.getItemAsync("1_species");
    console.log("\n\nATTENTION!!!!!!! species for show12 = " + species);
    console.log("uwu");
    // await species;
    // return species + " ";
    let name = await su.getImageName(1);

    console.log("\nname12 is " + name + "\n\n");
    return name;
  };

  show13 = async () => {
    console.log("show13 called");
    let ret = await this.show12();
    console.log("awaaited");
    if (this.state.image1 !== ret) {
      this.setState({ image1: ret });
    }

    return ret;
  };

  render() {
    this.checkInitialized();
    console.log("69");
    // const b = su.getImageName("ferns");
    const vv = this.show13();
    console.log("96");
    console.log("\n\n vv = " + vv);
    // console.log(this.props);
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 13,
            backgroundColor: "#2ac",
            alignItems: "center",
            justifyContent: "center",
          }}
          // top part
        >
          <View style={styles.whiteRoundedCorners}>
            <Image
              style={styles.largePlant}
              source={require("./assets/fernsbig.png")}
              // plant image with curved sides
            />
          </View>
          {/* <Image
            style={styles.plants}
            source={require("./assets/fernshuge.png")}
            // plant image with curved sides
          /> */}
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#222",
          }}
        ></View>
        <View
          style={{
            flex: 21,
            backgroundColor: "#fff",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#aca",
            }}
          ></View>
          <View
            style={{
              flex: 2,
              backgroundColor: "#111",
            }}
          ></View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#222",
          }}
        ></View>

        <View
          style={{
            flex: 7,
            backgroundColor: "#34626d",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Garden")}
            activeOpacity={0.5}
          >
            <View style={styles.red}>
              <Text style={styles.redText}> Return to Garden </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: "row" }}></View> */}
        {/* {console.log("you are here" + vv)}
        <TouchableOpacity onPress={this.toggleCancel}>
          <Image source={images[this.state.image1]} style={styles.plants} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.toggleCancel}>
          <Image source={images[this.state.image1]} style={styles.plants} />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 1.6,
    height: screen.width / 2.4,
    alignItems: "center",
    justifyContent: "center",
  },
  largePlant: {
    width: screen.width / 2.7,
    height: screen.width / 2.7,
    alignItems: "flex-end",
    justifyContent: "center",
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
  pinkButton: {
    borderWidth: 2,
    borderColor: "#ff576d",
    width: screen.width / 25,
    height: screen.width / 25,
    borderRadius: screen.width / 25,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    width: screen.height / 28,
    height: screen.height / 28,
  },
  hidden: {
    width: 0,
    height: 0,
  },
  whiteRoundedCorners: {
    borderWidth: 2,
    width: screen.width / 1.6, //1.6
    height: screen.width / 2.4, //2.4
    borderColor: "#fff",
    borderRadius: screen.width / 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  red: {
    borderWidth: 2,
    width: screen.width / 1.25,
    height: screen.width / 8,
    borderColor: "#fff",
    borderRadius: screen.width / 25,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  redText: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
  },
});
