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

import { Audio } from "expo-av";
const soundObject = new Audio.Sound();

// Audio.Sound.createAsync(
//   source,
//   (initialStatus = {}),
//   (onPlaybackStatusUpdate = null),
//   (downloadFirst = true)
// );

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
    // this.initializeGarden();
    // su.plantSeed(1, "1none");
    // su.plantSeed(2, "1none");
    // su.fertilizePlant(2);
    // const rem = await su.waterPlant(2, 5);

    // this.setState({ temp: rem });
    // console.log(
    //   "now 2_waters is " + (await SecureStore.getItemAsync("2_waters"))
    // );
    // console.log("remainder was" + rem);
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
    await SecureStore.setItemAsync("1_status", "2");
    await SecureStore.setItemAsync("2_status", "2");
    await SecureStore.setItemAsync("3_status", "2");
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

  stopPlaying = async () => {
    try {
      console.log("called stopPlaying at some point");
      await soundObject.pauseAsync();
      this.setState({ isPlaying: false });
      //   await soundObject.stopAndUnloadAsync();
    } catch (error) {}
  };

  pauseSound = async () => {
    try {
      console.log("called pauseSound at some point");
      if (this.state.shouldBePlaying == false) {
        this.setState({ shouldBePlaying: true });
      } else {
        this.setState({ shouldBePlaying: false });
      }

      //   await soundObject.stopAndUnloadAsync();
    } catch (error) {}
  };

  playSound = async () => {
    try {
      console.log("called playSound at some point");
      if (this.state.soundLoaded == false) {
        await soundObject.loadAsync(require("./assets/plants.mp3"));
        this.setState({ soundLoaded: true });
      }
      if (this.state.shouldBePlaying == true) {
        await soundObject.playAsync();
        this.setState({ isPlaying: true });
      } else {
        await soundObject.pauseAsync();
        this.setState({ isPlaying: false });
      }

      // Your sound is playing!
    } catch (error) {
      // An error occurred!
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
    // this.playSound();
    // if (0 === "0") {
    //   console.log('0 ==="0"');
    // }
    // if (0 == "0") {
    //   console.log('0=="0"');
    // }
    // su.removeSeedFromInventory(3);
    console.log("69");
    // const b = su.getImageName("ferns");
    const vv = this.show13();
    console.log("96");
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
        <TouchableOpacity onPress={this.pauseSound}>
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
