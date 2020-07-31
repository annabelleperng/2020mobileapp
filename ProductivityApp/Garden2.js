import DateTime from "luxon/src/datetime.js";
import Duration from "luxon/src/duration.js";
import Interval from "luxon/src/interval.js";
// import Modal from "react-native-modal";

import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import SeedUtils from "./SeedUtils";
import SeedUtils2 from "./SeedUtils2";
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import { enableScreens } from "react-native-screens";
import { RotationGestureHandler } from "react-native-gesture-handler";
// import { ConsoleWriter } from "istanbul-lib-report";
// import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const seedUtils2 = new SeedUtils2();
const rewardUtils = new RewardUtils();

let bees = {
  "invis ": require("./assets/invis.png"),
  "bw ": require("./assets/largebeebw.png"),
  "color ": require("./assets/largebee.png"),
  "notif ": require("./assets/dostuff.png"),
};

let images = {
  invis: require("./assets/invis.png"),
  growing: require("./assets/growinglarge.png"),
  plantpot: require("./assets/plantpotlarge.png"),
  ferns: require("./assets/fernsbig.png"),
  tulips: require("./assets/tulipsbig.png"),
};

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.initializeGarden();
    console.log("Constructed");
    this.assureRefresh();
    this.state = {
      showCancel: false,
      showBees: false,

      plant1: "",
      plant2: "",
      plant3: "",
      plant4: "",
      plant5: "",
      plant6: "",
      plant7: "",
      plant8: "",
      plant9: "",

      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      bee4: "invis ",
      bee5: "invis ",
      bee6: "invis ",
      bee7: "invis ",
      bee8: "invis ",
      bee9: "invis ",

      plant_image_1: "",
      plant_image_2: "",
      plant_image_3: "",
      plant_image_4: "",
      plant_image_5: "",
      plant_image_6: "",
      plant_image_7: "",
      plant_image_8: "",
      plant_image_9: "",

      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
      inventorySynced: false,
      plantSynced: false,
      inventory_bees: 0,
      modalVisible: false,
      acquiredSeed: "",

      plantsInitialized: false,
    };
  }

  assureRefresh = () => {
    console.log("hi");
    console.log("hi");
    console.log("hi");
    console.log("hi");
    console.log("hi");
  };

  initializeGarden = async () => {
    console.log("initializing garden");
    await SecureStore.setItemAsync("inventory_water", "1000");
    await SecureStore.setItemAsync("inventory_bees", "5");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "1");
    await SecureStore.setItemAsync("inventory_elixir", "10");
    await SecureStore.setItemAsync(
      "1_period_start",
      "2020-06-29T18:50:15.437-07:00" // "2020-06-2T18:50:15.437-07:00"
    );
    await SecureStore.setItemAsync(
      "1_period_end",
      "2020-07-05T17:52:25.437-07:00"
    ); // "2020-07-02T18:50:15.437-07:00"
    await SecureStore.setItemAsync("weighted_productivity", "0");
    await SecureStore.setItemAsync("weighted_happiness", "0");

    let currDate = DateTime.local().toISO();
    await SecureStore.setItemAsync("garden_last_updated", currDate);

    await SecureStore.setItemAsync("total_sprint_time", "0");
    await SecureStore.setItemAsync("total_unpaused", "0");
    await SecureStore.setItemAsync("total_paused", "0");
    await seedUtils2.createPlants();

    await SecureStore.setItemAsync("garden_initialized", "true");

    await seedUtils2.initializeAllSeeds();

    let hardcoded_plant = {
      status: 1,
      position: 1,
      permanent: {
        event: "none",
        rarity: "C",
        species: "snowcrested fern",
        date_planted: "",
      },
      zero: { zero_image: "plantpot" },
      one: {
        one_image: "growing",
        grow_start: "",
        grow_offset: 0,
        grow_streak_length: 2,
      },
      two: {
        two_image: "ferns",
        current_waters: 8,
        water_start: "",
        water_end: "2020-07-28T17:52:25.437-07:00",
      },
      three: {
        three_image: "ferns",
        wilt_start: "",
        wilt_end: "2020-07-28T17:52:25.437-07:00",
      },
      four: { four_image: "ferns" },
    };

    let hardcoded_plant_str = JSON.stringify(hardcoded_plant);
    await SecureStore.setItemAsync("1_plant", hardcoded_plant_str);

    console.log("we're here");
  };
  componentDidMount() {
    console.log("hello");
    this.assureRefresh();
  }

  updateStuff = async (plant) => {
    const localTime = DateTime.local();

    const gardenLastUpdated = DateTime.fromISO(
      await SecureStore.getItemAsync("garden_last_updated")
    );
    console.log("garden last updated: " + gardenLastUpdated);

    // let start;
    // if (plant["status"] == 2) {
    //   start = DateTime.fromISO(
    //     plant["two"]["water_start"]
    //   );
    // } else  if (plant["status"] == 3) {
    //   start = DateTime.fromISO(plant["three"]["wilt_start"]);
    // }

    console.log("localTime is " + localTime.toISO());
    console.log("periodStart is " + periodStart.toISO());
    const diff = localTime.diff(gardenLastUpdated);
    console.log("difference is" + diff);
    if (diff.hours() >= 24) {
      rewardUtils.updateStreak();
      var i;
      for (i = 1; i <= 9; i++) {
        let plantStr = await SecureStore("" + i + "_plant");
        let plant = JSON.parse(plantStr);
        seedUtils2.updateWilting(plant);
        seedUtils2.updateGrowthStreak(plant);
        plantStr = JSON.stringify(plant);
        await SecureStore("" + i + "_plant");
      }
    }
  };

  breedTwo = async () => {
    const res = await seedUtils.breedPlants(
      this.state.firstParent,
      this.state.secondParent
    );
    if (res == -1) {
      this.setState({
        inventorySynced: false,
        firstParent: 0,
        secondParent: 0,
        selectedParents: 0,
        modalVisible: true,
        acquiredSeed: "ERROR\n\nCould not breed plants!\n\nNo bees consumed.",
      });
      this.hideBees();
      return;
    }
    let resEvent = res.substring(1, res.length);
    let resRarity = res.substring(0, 1);
    let resString = "Successfully bred plants!\n\nACQUIRED: 1 ";
    if (resRarity == "R") {
      resString += "RARE ";
    } else if (resRarity == "U") {
      resString += "UNCOMMON ";
    } else {
      resString += "COMMON ";
    }
    resString += "seed\n\nEvent type: " + resEvent.toUpperCase();
    this.setState({
      inventorySynced: false,
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
      modalVisible: true,
      acquiredSeed: resString,
    });
    await this.syncInventory();
    this.hideBees();
  };

  selectBreeding = (key, position) => {
    console.log("selectBreeding called with (" + key + ", " + position + ")");
    if (this.state.showBees == false) {
      return;
    }
    // const status = "status" + position;
    const plant = "plant" + position;
    // if (this.state[status] != 2) {
    //   return;
    // }
    if (this.state[plant]["status"] != 2) {
      console.log("can't take big dick but i suck on it");
      return;
    }
    if (
      this.state.selectedParents == 0 ||
      (this.state.selectedParents == 1 && this.state.firstParent == position)
    ) {
      console.log("first case");
      this.setState({ selectedParents: 1, firstParent: position });
    } else if (this.state.selectedParents == 1) {
      console.log("2nd case");
      this.setState({ selectedParents: 2, secondParent: position });
    } else {
      console.log("3rd case");
      console.log(this.state);
      return;
    }
    this.setState({ [key]: "color " });
  };

  showBees = () => {
    // first implementing it for the first row plants
    if (this.state.inventory_bees < 1) {
      return;
    }
    this.setState({ showBees: true });
    if (this.state.plant1["status"] == 2) {
      this.setState({ bee1: "bw " });
    } else this.setState({ bee1: "invis " });

    if (this.state.plant2["status"] == 2) {
      this.setState({ bee2: "bw " });
    } else this.setState({ bee2: "invis " });

    if (this.state.plant3["status"] == 2) {
      this.setState({ bee3: "bw " });
    } else this.setState({ bee3: "invis " });

    if (this.state.plant4["status"] == 2) {
      this.setState({ bee4: "bw " });
    } else this.setState({ bee4: "invis " });

    if (this.state.plant5["status"] == 2) {
      this.setState({ bee5: "bw " });
    } else this.setState({ bee5: "invis " });

    if (this.state.plant6["status"] == 2) {
      this.setState({ bee6: "bw " });
    } else this.setState({ bee6: "invis " });

    if (this.state.plant7["status"] == 2) {
      this.setState({ bee7: "bw " });
    } else this.setState({ bee7: "invis " });

    if (this.state.plant8["status"] == 2) {
      this.setState({ bee8: "bw " });
    } else this.setState({ bee8: "invis " });

    if (this.state.plant9["status"] == 2) {
      this.setState({ bee9: "bw " });
    } else this.setState({ bee9: "invis " });
  };

  hideBees = () => {
    this.setState({
      showBees: false,
      // bee1: "invis ",
      // bee2: "invis ",
      // bee3: "invis ",
      // bee4: "invis ",
      // bee5: "invis ",
      // bee6: "invis ",
      // bee7: "invis ",
      // bee8: "invis ",
      // bee9: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
    });

    this.showNotifs();
  };

  toggleBees = () => {
    if (this.state.showBees == false) {
      this.showBees();
    } else {
      this.hideBees();
    }
  };

  syncInventory = async () => {
    if (this.state.inventorySynced == false) {
      var bees = Number.parseInt(
        await SecureStore.getItemAsync("inventory_bees")
      );
      this.setState({ inventorySynced: true, inventory_bees: bees });
      console.log("bees = " + bees);
    }
  };

  initializePlants = async () => {
    if (this.state.plantsInitialized == false) {
      this.setState({ plantsInitialized: true });

      let plant1 = JSON.parse(await SecureStore.getItemAsync("1_plant"));
      let plant2 = JSON.parse(await SecureStore.getItemAsync("2_plant"));
      let plant3 = JSON.parse(await SecureStore.getItemAsync("3_plant"));
      let plant4 = JSON.parse(await SecureStore.getItemAsync("4_plant"));
      let plant5 = JSON.parse(await SecureStore.getItemAsync("5_plant"));
      let plant6 = JSON.parse(await SecureStore.getItemAsync("6_plant"));
      let plant7 = JSON.parse(await SecureStore.getItemAsync("7_plant"));
      let plant8 = JSON.parse(await SecureStore.getItemAsync("8_plant"));
      let plant9 = JSON.parse(await SecureStore.getItemAsync("9_plant"));

      this.setState({
        plant1: plant1,
        plant2: plant2,
        plant3: plant3,
        plant4: plant4,
        plant5: plant5,
        plant6: plant6,
        plant7: plant7,
        plant8: plant8,
        plant9: plant9,
      });

      this.initializePlant(plant1);
      this.initializePlant(plant2);
      this.initializePlant(plant3);
      this.initializePlant(plant4);
      this.initializePlant(plant5);
      this.initializePlant(plant6);
      this.initializePlant(plant7);
      this.initializePlant(plant8);
      this.initializePlant(plant9);

      this.setState({
        plant_image_1: this.determineImage(plant1),
        plant_image_2: this.determineImage(plant2),
        plant_image_3: this.determineImage(plant3),
        plant_image_4: this.determineImage(plant4),
        plant_image_5: this.determineImage(plant5),
        plant_image_6: this.determineImage(plant6),
        plant_image_7: this.determineImage(plant7),
        plant_image_8: this.determineImage(plant8),
        plant_image_9: this.determineImage(plant9),
      });

      this.state.plant1["status"] = 2;
      this.state.plant3["status"] = 2;
      this.state.plant4["status"] = 2;
      this.state.plant5["status"] = 2;
      this.state.plant8["status"] = 2;

      this.state.plant1["two"]["current_waters"] = 74;
      this.state.plant5["two"]["current_waters"] = 32;

      this.showNotifs();
    }
  };

  showNotifs = () => {
    if (
      (this.state.plant1["status"] == 2 || this.state.plant1["status"] == 3) &&
      this.state.plant1["two"]["current_waters"] <= 15
    )
      this.setState({ bee1: "notif " });
    else this.setState({ bee1: "invis " });

    if (
      (this.state.plant2["status"] == 2 || this.state.plant2["status"] == 3) &&
      this.state.plant2["two"]["current_waters"] <= 15
    )
      this.setState({ bee2: "notif " });
    else this.setState({ bee2: "invis " });

    if (
      (this.state.plant3["status"] == 2 || this.state.plant3["status"] == 3) &&
      this.state.plant3["two"]["current_waters"] <= 15
    )
      this.setState({ bee3: "notif " });
    else this.setState({ bee3: "invis " });

    if (
      (this.state.plant4["status"] == 2 || this.state.plant4["status"] == 3) &&
      this.state.plant4["two"]["current_waters"] <= 15
    )
      this.setState({ bee4: "notif " });
    else this.setState({ bee4: "invis " });

    if (
      (this.state.plant5["status"] == 2 || this.state.plant5["status"] == 3) &&
      this.state.plant5["two"]["current_waters"] <= 15
    )
      this.setState({ bee5: "notif " });
    else this.setState({ bee5: "invis " });

    if (
      (this.state.plant6["status"] == 2 || this.state.plant6["status"] == 3) &&
      this.state.plant6["two"]["current_waters"] <= 15
    )
      this.setState({ bee6: "notif " });
    else this.setState({ bee6: "invis " });

    if (
      (this.state.plant7["status"] == 2 || this.state.plant7["status"] == 3) &&
      this.state.plant7["two"]["current_waters"] <= 15
    )
      this.setState({ bee7: "notif " });
    else this.setState({ bee7: "invis " });

    if (
      (this.state.plant8["status"] == 2 || this.state.plant8["status"] == 3) &&
      this.state.plant8["two"]["current_waters"] <= 15
    )
      this.setState({ bee8: "notif " });
    else this.setState({ bee8: "invis " });

    if (
      (this.state.plant9["status"] == 2 || this.state.plant9["status"] == 3) &&
      this.state.plant9["two"]["current_waters"] <= 15
    )
      this.setState({ bee9: "notif " });
    else this.setState({ bee9: "invis " });
  };

  determineImage = (plant) => {
    if (plant["status"] == 4) {
      return plant["four"]["four_image"];
    } else if (plant["status"] == 3) {
      return plant["three"]["three_image"];
    } else if (plant["status"] == 2) {
      return plant["two"]["two_image"];
    } else if (plant["status"] == 1) {
      return plant["one"]["one_image"];
    } else {
      return plant["zero"]["zero_image"];
    }
  };

  initializePlant = (plant) => {};

  refreshPlants = () => {
    this.setState({ plantsInitialized: false });
  };

  render() {
    // this.updateStuff();
    console.log("HIIIIIIIIIIIIIIIIIIII");
    console.log(this.state.plantsInitialized);
    // const isModalVisible = true;
    // const setModalVisible = true;
    this.assureRefresh();
    this.syncInventory();
    if (this.state.plantSynced == false) this.initializePlants();

    const margin = (screen.height * 4) / 22 - screen.width / 3.5;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center",
        }}
      >
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }} // first row of plants
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 1,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_1]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 2,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_2]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 3,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_3]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
          // first row of bees
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee1]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee1", 1)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee1]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <TouchableOpacity onPress={() => this.selectBreeding("bee2", 2)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee2]}
              />
            </TouchableOpacity>
            {this.state.showBees == 0 && this.state.showExclamation2 == 1 ? (
              <Image
                style={[styles.smallButton]}
                source={require("./assets/dostuff.png")}
              />
            ) : (
              <View></View>
            )} */}
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee2]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee2", 2)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee2]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee3]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee3", 3)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee3]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }} // second row of plants
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 4,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_4]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 5,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_5]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 6,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_6]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible} //this.state.modalVisible
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }} // successfully bred plants / error message modal
        >
          {/* <View style={{ flex: 1 }}>
            <Text>Hello there</Text>
          </View> */}
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Successfully bred plants!</Text> */}
              <Text style={styles.modalText}>{this.state.acquiredSeed}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }} // second row of bees
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee4]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee4", 4)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee4]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee5]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee5", 5)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee5]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee6]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee6", 6)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee6]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }} // third row of plants
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 7,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_7]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 8,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_8]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("PlantView", {
                    position: 9,
                    event: "",
                    rarity: "",
                  })
                }
              >
                <Image
                  style={styles.plants}
                  source={images[this.state.plant_image_9]}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }} // third row of bees
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee7]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee7", 7)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee7]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee8]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee8", 8)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee8]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            {this.state.showBees == false ? (
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee9]}
              />
            ) : (
              <TouchableOpacity onPress={() => this.selectBreeding("bee9", 9)}>
                <Image
                  style={[styles.smallButton]}
                  source={bees[this.state.bee9]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#57423e",
            flexDirection: "row",
            alignItems: "center",
          }} // breed / cancel buttons
        >
          {this.state.selectedParents == 2 ? (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.breedTwo()}>
                <View style={styles.pinkButton2}>
                  <Text style={styles.whiteText}>Breed</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* <View style={styles.pinkButton2}>
                <Text style={styles.whiteText}>Cancel</Text>
              </View> */}
            </View>
          )}
          {this.state.selectedParents == 2 ? (
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity onPress={() => this.hideBees()}>
                <View style={styles.pinkButton2}>
                  <Text style={styles.whiteText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* <View style={styles.pinkButton2}>
                <Text style={styles.whiteText}>Cancel</Text>
              </View> */}
            </View>
          )}
        </View>
        <View style={{ flex: 3, backgroundColor: "#0e0e0e" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              //   marginTop: (screen.height * 3) / 22 - screen.width / 5,
              marginTop: (screen.height * 3) / 22 - screen.width / 4,
              //   marginLeft: screen.width / 14,
            }} // navigation icons
          >
            <View style={{ flex: 0.4 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Details")}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.menuIcons}
                  source={require("./assets/largeshop.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.toggleBees()}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.menuIcons2}
                  source={require("./assets/largebee.png")}
                />
              </TouchableOpacity>
              <Text style={styles.smallWhiteText}>
                {this.state.inventory_bees}
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Shop")}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.menuIcons2}
                  source={require("./assets/largeshop.png")}
                />
              </TouchableOpacity>
              {/* <Text style={styles.smallWhiteText}>SHOP</Text> */}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity
                onPress={this.refreshPlants}
                activeOpacity={0.5}
              >
                <Image
                  style={styles.menuIcons2}
                  source={require("./assets/largeshop.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.4 }}></View>
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
    // marginLeft: screen.width / 10,
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
  notif: {
    width: screen.height / 28,
    height: screen.height / 28,
    // marginBottom: 25
  },
  hidden: {
    width: 0,
    height: 0,
  },
  whiteText: {
    color: "#000",
    fontSize: 26,
  },
  pinkButton2: {
    borderWidth: 2,
    borderColor: "#ff576d",
    width: screen.width / 3,
    height: screen.width / 12,
    borderRadius: screen.width / 2,
    alignItems: "center",
    backgroundColor: "#fca",
    // color: "#fff",
    // fontSize: 30,
    justifyContent: "center",
  },
  smallWhiteText: {
    color: "#ebbd34",
    fontSize: 15,
    marginTop: 5,
  },
  tinyWhiteText: {
    // color: "#ff547c",
    // fontSize: 3,
    // marginTop: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
