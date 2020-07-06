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
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import { enableScreens } from "react-native-screens";
// import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

let bees = {
  "invis ": require("./assets/invis.png"),
  "bw ": require("./assets/largebeebw.png"),
  "color ": require("./assets/largebee.png"),
};

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.initializeGarden();
    this.state = {
      showCancel: false,
      showBees: false,
      status1: 2,
      status2: 2,
      status3: 2,
      status4: 2,
      status5: 1,
      status6: 2,
      status7: 2,
      status8: 2,
      status9: 1,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      bee4: "invis ",
      bee5: "invis ",
      bee6: "invis ",
      bee7: "invis ",
      bee8: "invis ",
      bee9: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
      inventorySynced: false,
      inventory_bees: 0,
      modalVisible: false,
      acquiredSeed: "",
    };
  }

  toggleCancel = () => {
    console.log("toggleCancel called");
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

  _renderCancel = () => {
    if (this.state.showCancel) {
      return (
        <TouchableHighlight onPress={this.toggleCancel()}>
          <View>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  };

  initializeGarden = async () => {
    console.log("initializing garden");
    await SecureStore.setItemAsync("inventory_water", "1000");
    await SecureStore.setItemAsync("inventory_bees", "5");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "2");
    await SecureStore.setItemAsync("inventory_elixir", "1");
    await SecureStore.setItemAsync("1_status", "2");
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

    await SecureStore.setItemAsync("total_sprint_time", "0");
    await SecureStore.setItemAsync("total_unpaused", "0");
    await SecureStore.setItemAsync("total_paused", "0");
    await SecureStore.setItemAsync("timezone", "America/Los_Angeles");
    await SecureStore.setItemAsync("1_waters", "10");
    await SecureStore.setItemAsync("2_status", "2");
    await SecureStore.setItemAsync("3_status", "2");
    await SecureStore.setItemAsync("4_status", "0");
    await SecureStore.setItemAsync("5_status", "0");
    await SecureStore.setItemAsync("6_status", "0");
    await SecureStore.setItemAsync("7_status", "0");
    await SecureStore.setItemAsync("8_status", "0");
    await SecureStore.setItemAsync("9_status", "0");
    await SecureStore.setItemAsync("9_status", "0");
    await SecureStore.setItemAsync("1_event", "christmas");
    await SecureStore.setItemAsync("2_event", "valentines");
    await SecureStore.setItemAsync("3_event", "none");
    await SecureStore.setItemAsync("1_rarity", "R");
    await SecureStore.setItemAsync("2_rarity", "R");
    await SecureStore.setItemAsync("3_rarity", "C");
    // await SecureStore.setItemAsync(
    //   "inventory_seeds",
    //   "%2bitch%1hello%1hi%2i%3am"
    // );
    await SecureStore.setItemAsync("garden_initialized", "true");

    await seedUtils.initializeAllSeeds();
    // await su.plantSeed
    console.log("we're here");
    console.log(await SecureStore.getItemAsync("1_period_end"));
    // su.checkStatus(1, "0");
    // su.checkStatus(1, "1");
  };

  updateStuff = async (position) => {
    const localZone = await SecureStore.getItemAsync("timezone");
    const localTime = DateTime.local();
    const periodStartKey = position + "_period_start";
    const periodStart = DateTime.fromISO(
      await SecureStore.getItemAsync(periodStartKey)
    );
    console.log("localTime is " + localTime.toISO());
    console.log("periodStart is " + periodStart.toISO());
    const diff = localTime.diff(periodStart);
    console.log("difference is" + diff);
    if (diff.hours() >= 24) {
      rewardUtils.updateStreak();
      for (i = 1; i <= 9; i++) {
        seedUtils.updateWilting(i);
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
      //   Alert.alert(
      //     "ERROR",
      //     "Could not breed plants! No bees consumed.",
      //     [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //     { cancelable: false }
      //   );
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
    const status = "status" + position;
    if (this.state[status] != 2) {
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
    if (this.state.status1 == 2) {
      this.setState({ bee1: "bw " });
    }
    if (this.state.status2 == 2) {
      this.setState({ bee2: "bw " });
    }
    if (this.state.status3 == 2) {
      this.setState({ bee3: "bw " });
    }
    if (this.state.status4 == 2) {
      this.setState({ bee4: "bw " });
    }
    if (this.state.status5 == 2) {
      this.setState({ bee5: "bw " });
    }
    if (this.state.status6 == 2) {
      this.setState({ bee6: "bw " });
    }
    if (this.state.status7 == 2) {
      this.setState({ bee7: "bw " });
    }
    if (this.state.status8 == 2) {
      this.setState({ bee8: "bw " });
    }
    if (this.state.status9 == 2) {
      this.setState({ bee9: "bw " });
    }
  };

  hideBees = () => {
    this.setState({
      showBees: false,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      bee4: "invis ",
      bee5: "invis ",
      bee6: "invis ",
      bee7: "invis ",
      bee8: "invis ",
      bee9: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,
    });
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

  render() {
    // this.updateStuff();
    // const isModalVisible = true;
    // const setModalVisible = true;
    this.syncInventory();

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
                onPress={() => this.props.navigation.navigate("PlantView")}
              >
                <Image
                  style={styles.plants}
                  source={require("./assets/fernsbig.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/tulipsbig.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/fernsbig.png")}
              />
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
            <TouchableOpacity onPress={() => this.selectBreeding("bee1", 1)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee1]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee2", 2)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee2]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee3", 3)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee3]}
              />
            </TouchableOpacity>
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
              <TouchableOpacity onPress={this.toggleCancel}>
                <Image
                  style={styles.plants}
                  source={require("./assets/fernsbig.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/tulipsbig.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/fernsbig.png")}
              />
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
            <TouchableOpacity onPress={() => this.selectBreeding("bee4", 4)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee4]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee5", 5)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee5]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee6", 6)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee6]}
              />
            </TouchableOpacity>
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
              <TouchableOpacity onPress={this.toggleCancel}>
                <Image
                  style={styles.plants}
                  source={require("./assets/fernsbig.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/tulipsbig.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.plants}
                source={require("./assets/fernsbig.png")}
              />
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
            <TouchableOpacity onPress={() => this.selectBreeding("bee7", 7)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee7]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee8", 8)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee8]}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.selectBreeding("bee9", 9)}>
              <Image
                style={[styles.smallButton]}
                source={bees[this.state.bee9]}
              />
            </TouchableOpacity>
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
                onPress={() => this.props.navigation.navigate("GardenTesting")}
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
