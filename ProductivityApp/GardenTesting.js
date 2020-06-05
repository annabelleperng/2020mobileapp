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
      showCancel: false,
      image1: "invis ",
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
    // this.initializeGarden();
    // su.plantSeed(1, "1none");
  };

  initializeGarden = async () => {
    console.log("initializing garden");
    await SecureStore.setItemAsync("inventory_water", "0");
    await SecureStore.setItemAsync("inventory_bees", "0");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "0");
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
    console.log("we're here");
    // su.checkStatus(1, "0");
    // su.checkStatus(1, "1");
  };
  toggleCancel = () => {
    console.log(" ");
    // this.state.showCancel = !this.state.showCancel;
    // var showC = !this.state.showCancel;
    // console.log(this.state.showCancel);
    // console.log("aeafa " + !this.state.showCancel);
    if (this.state.showCancel) {
      this.setState({ showCancel: false });
    } else {
      this.setState({ showCancel: true });
    }
  };

  show1 = () => {
    console.log("\nshow1 called");
    // console.log("\ncalling checkStatus");
    // if (su.checkStatus(1, "1") === 1) {
    //   console.log("ferns it is");
    //   return "ferns ";
    //   //   const species = await SecureStore.getItemAsync("1_species");
    //   //   return species + " ";
    // } else {
    //   console.log("ferns it isn't");
    //   return "ferns ";
    // }
    const name = su.getImageName(1);
    console.log("\nname is " + name + "\n\n");
    // return "hoiaklfs";
    return "ferns ";
    return name;
  };

  show12 = async () => {
    console.log("\nshow12 called");
    // console.log("\ncalling checkStatus");
    // if (su.checkStatus(1, "1") === 1) {
    //   console.log("ferns it is");
    //   return "ferns ";
    //   //   const species = await SecureStore.getItemAsync("1_species");
    //   //   return species + " ";
    // } else {
    //   console.log("ferns it isn't");
    //   return "ferns ";
    // }
    // console.log("hey;)");
    let species = await SecureStore.getItemAsync("1_species");
    console.log("\n\nATTENTION!!!!!!! species for show12 = " + species);
    console.log("uwu");
    await species;
    return species + " ";
    let name = await su.getImageName(1);
    // return "hoiaklfs";
    // return "ferns ";
    // await name;
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
    // su.removeSeedFromInventory(3);
    console.log("69");
    // const b = su.getImageName("ferns");
    const v = this.show1();
    const vv = this.show13();
    console.log("96");
    console.log("\n\n v = " + v);
    console.log("\n\n vv = " + vv);
    // console.log(this.props);
    return (
      <View
        style={{
          flex: 1 /*}, alignItems: "center", justifyContent: "center" */,
        }}
      >
        {console.log("you are here" + vv)}
        <TouchableOpacity onPress={this.toggleCancel}>
          <Image source={images[this.state.image1]} style={styles.plants} />
        </TouchableOpacity>
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
});
