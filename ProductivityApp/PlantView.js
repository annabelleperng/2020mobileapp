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
  TouchableNativeFeedbackBase,
  Alert,
  Platform,
} from "react-native";

import CountDown from "react-native-countdown-component";
import DateTime from "luxon/src/datetime.js";
import moment from "moment";

import ProgressBarAnimated from "react-native-progress-bar-animated";

const screen = Dimensions.get("window");
import SeedUtils2 from "./SeedUtils2";
const su = new SeedUtils2();

let images = {
  invis: require("./assets/invis.png"),
  growing: require("./assets/growinglarge.png"),
  plantpot: require("./assets/plantpotlarge.png"),
  ferns: require("./assets/fernsbig.png"),
  tulips: require("./assets/tulipsbig.png"),
};

import * as SecureStore from "expo-secure-store";
import { screensEnabled } from "react-native-screens";
export default class GardenTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant_position: this.props.route.params.position,

      seed_event: this.props.route.params.event,
      seed_rarity: this.props.route.params.rarity,

      plant_status: 0,
      //   plant_waters: 0,

      showCancel: false,
      image1: "invis ",
      temp: false,

      //   soundLoaded: false,
      //   shouldBePlaying: true,
      //   isPlaying: true,

      progress: 0, //current # waters
      inventory_water: 0,
      inventory_fertilizer: 0,
      inventory_bees: 0,
      inventory_elixir: 0,
      inventory_set: false,
      button_x1: false,
      button_x5: false,
      button_max: false,
      //
      waters_set: false,
      fully_watered: false,
      //
      totalDuration: "",
      countdownSet: false,
      countdownFullySet: false,
      //
      plant_image: "",
      plant: "",
      //
      alert_title: "",
      alert_info: "",
    };
  }

  checkInitialized = async () => {
    console.log("checking if initialized!");
    // const initialized = await SecureStore.getItemAsync("garden_initialized");
    // if (initialized === null) {
    //   console.log("not initialized");
    //   this.initializeGarden();
    //   await SecureStore.setItemAsync("garden_initialized", "true");
    // }
    // this.initializeGarden();
  };

  componentWillUnmount = () => {
    console.log("here - unmounted");
    // this.stopPlaying();
  };

  initializeGarden = async () => {};

  toggleCancel = () => {
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
    // await species;
    // return species + " ";
    let name = await su.getImageName(1);

    console.log("\nname12 is " + name + "\n\n");
    return name;
  };

  increase = (key, value) => {
    let v = this.state[key] + value;
    if (v > 100) {
      v = 100;
      this.setState({
        button_x1: false,
        button_x5: false,
        button_max: false,
        fully_watered: true,
      });
    }
    this.setState({
      [key]: v,
    });
  };

  water_1 = async () => {
    // gets inventory water count
    let inventory_water = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );

    // gets this plant's current water count
    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));
    let plant_water = plant["two"]["current_waters"];

    // waters plant once
    inventory_water = inventory_water - 1;
    plant_water = plant_water + 1;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    plant["two"]["current_waters"] = plant_water;
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 6.67);
    await this.checkWateringOptions();
    this.setState({ inventory_water: inventory_water });
  };

  water_5 = async () => {
    // gets inventory water count
    let inventory_water = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );

    // gets this plant's current water count
    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));
    let plant_water = plant["two"]["current_waters"];

    // waters plant five times
    inventory_water = inventory_water - 5;
    plant_water = plant_water + 5;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    plant["two"]["current_waters"] = plant_water;
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 33.35);
    await this.checkWateringOptions();
    this.setState({ inventory_water: inventory_water });
  };

  water_max = async () => {
    // gets inventory water count
    let inventory_water = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );

    // gets this plant's current water count
    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));
    let plant_water = plant["two"]["current_waters"];
    let needed = 15 - plant_water;

    // waters plant till fully watered
    inventory_water = inventory_water - needed;
    plant_water = plant_water + needed;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    plant["two"]["current_waters"] = plant_water;
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 100);
    await this.checkWateringOptions();
    this.setState({ inventory_water: inventory_water });
  };

  useElixir = async () => {
    if (this.state.plant_status != 3) {
      console.log("cannot use elixir on a plant that isn't wilted");
      return -1;
    }

    // gets inventory elixir count
    let inventory_elixir = Number.parseInt(
      await SecureStore.getItemAsync("inventory_elixir")
    );

    if (inventory_elixir < 1) {
      console.log("not enough elixir to use");
      alert(
        "You don't have enough elixir! " + "Elixir can be bought from the shop."
      );
      return -1;
    }

    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));

    inventory_elixir -= 1;

    this.setState({
      progress: 100,
    });

    Alert.alert(
      "SUCCESS!",
      "You used x1 ELIXIR to revitalize the plant.",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );

    plant["status"] = 2;
    plant["two"]["current_waters"] = 0;
    const start = DateTime.local();
    const startMidnight = DateTime.fromObject({
      year: start.year,
      month: start.month,
      day: start.day,
      hour: 0,
      minute: 0,
      second: 0,
    }); // the midnight that just passed

    const endMidnight = startMidnight.plus({ day: 4 });
    plant["two"]["water_start"] = start.toISO();
    plant["two"]["water_end"] = endMidnight.toISO();

    this.setState({
      plant_status: 2,
      inventory_water: 0,
      progress: 0,
    });

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_elixir", "" + inventory_elixir);
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 100);
    this.setState({
      inventory_elixir: inventory_elixir,
      countdownSet: false,
      countdownFullySet: false,
      inventory_set: false,
    });
  };

  useFertilizer = async () => {
    if (this.state.plant_status != 1) {
      console.log("cannot use fertilizer on a plant that isn't growing");
      return -1;
    }

    // gets inventory elixir count
    let inventory_fertilizer = Number.parseInt(
      await SecureStore.getItemAsync("inventory_fertilizer")
    );

    if (inventory_fertilizer < 1) {
      console.log("not enough fertilizer to use");
      alert(
        "You don't have enough fertilizer! " +
          "Fertilizer can be bought from the shop. " +
          "\n\nThis plant will grow up on its own after you sprint for " +
          "3 days in a row."
      );
      return -1;
    }

    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));

    inventory_fertilizer -= 1;

    Alert.alert(
      "SUCCESS!",
      "You used x1 FERTILIZER to speed up the growing process.",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );

    plant["status"] = 2;
    plant["two"]["current_waters"] = 0;
    const start = DateTime.local();
    const startMidnight = DateTime.fromObject({
      year: start.year,
      month: start.month,
      day: start.day,
      hour: 0,
      minute: 0,
      second: 0,
    }); // the midnight that just passed

    const endMidnight = startMidnight.plus({ day: 4 });
    plant["two"]["water_start"] = start.toISO();
    plant["two"]["water_end"] = endMidnight.toISO();

    this.setState({
      plant_status: 2,
      inventory_water: 0,
      progress: 0,
    });

    // sets SecureStore values
    await SecureStore.setItemAsync(
      "inventory_fertilizer",
      "" + inventory_fertilizer
    );
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 100);
    this.setState({
      inventory_fertilizer: inventory_fertilizer,
      countdownSet: false,
      countdownFullySet: false,
      inventory_set: false,
    });
  };

  useShovel = async () => {
    if (this.state.plant_status != 4) {
      console.log("cannot use shovel on a plant that isn't dead");
      return -1;
    }

    await su.createPlant(this.state.plant_position);
    Alert.alert(
      "SUCCESS",
      "Shovel used!",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );

    this.setState({
      countdownSet: false,
      countdownFullySet: false,
      inventory_set: false,
    });
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

  determineInfo = (plant) => {
    if (plant["status"] == 0) {
      var title = "Empty Pot";
      var info = "Plant a seed from your inventory to start growing!";
      this.setState({ alert_title: title, alert_info: info });
      return;
    }

    var title = plant["permanent"]["species"];
    var info = "\n";

    if (plant["permanent"]["rarity"] == "R") {
      info += "Rarity: RARE\n\n";
    } else if (plant["permanent"]["rarity"] == "U") {
      info += "Rarity: UNCOMMON\n\n";
    } else {
      info += "Rarity: COMMON\n\n";
    }

    info += "Event: " + plant["permanent"]["event"] + "\n\n";

    if (plant["status"] == 4) {
      info += "Status: Dead\n\nUse the shovel to dig up dead plants.";
    } else if (plant["status"] == 3) {
      info += "Status: Wilted\n\nUse elixir to revitalize wilted plants.";
    } else if (plant["status"] == 2) {
      info +=
        "Status: Fully Grown\n\nKeep your plant watered! " +
        "Needs 15 waters every 3 days.";
    } else {
      info +=
        "Status: Growing\n\nThis plant will grow up after you sprint " +
        "for 3 days in a row! You can also use fertilizer to speed it up.";
    }

    if (plant["status"] == 1) {
      title = "SPECIES UNKNOWN";
    }
    this.setState({ alert_title: title, alert_info: info });
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

  /* Master setup function */
  getInventoryCounts = async () => {
    if (this.state.inventory_set == false) {
      console.log("getInventoryCounts called");

      this.setState({ inventory_set: true });
      let water = Number.parseInt(
        await SecureStore.getItemAsync("inventory_water")
      );
      let fertilizer = Number.parseInt(
        await SecureStore.getItemAsync("inventory_fertilizer")
      );
      let bees = Number.parseInt(
        await SecureStore.getItemAsync("inventory_bees")
      );
      let elixir = Number.parseInt(
        await SecureStore.getItemAsync("inventory_elixir")
      );
      let plant = JSON.parse(
        await SecureStore.getItemAsync(this.state.plant_position + "_plant")
      );

      let image = this.determineImage(plant);

      this.determineInfo(plant);

      this.setState({
        inventory_water: water,
        inventory_fertilizer: fertilizer,
        inventory_bees: bees,
        inventory_elixir: elixir,
        plant_image: image,
        plant_status: plant["status"],
      });

      await this.prepareSpecifics(plant);
    }
  };

  prepareSpecifics = async (plant) => {
    if (plant["status"] == 4) {
    }
    //
    //
    //
    else if (plant["status"] == 3) {
      this.setState({
        progress: 0,
      });
      await this.getWiltedCountdownLength(plant);
    }
    //
    //
    //
    else if (plant["status"] == 2) {
      let pos_waters = plant["two"]["current_waters"];
      pos_waters *= 6.67;
      if (pos_waters > 100) {
        pos_waters = 100;
      }
      //   console.log(this.state.plant_position + "_waters");
      this.setState({
        progress: pos_waters,
      });
      await this.checkWateringOptions();
      await this.getGrownCountdownLength(plant);
    }
    //
    //
    //
    else if (plant["status"] == 1) {
    }
    //
    //
    //
    else {
    }
  };

  /* Determines which buttons - x1, x5, MAX - to show for
   * watering if the plant can be watered. */
  checkWateringOptions = async () => {
    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));
    let pos_waters = plant["two"]["current_waters"];

    let one = false;
    let five = false;
    let max = false;

    let needed = 15 - pos_waters;

    console.log("pos_waters from CHECKWATERING OPTIONS = " + pos_waters);
    if (needed >= 5) {
      one = true;
      five = true;
      max = true;
    } else if (needed >= 1) {
      one = true;
      max = true;
    } else {
      this.setState({ button_x1: false, button_x5: false, button_max: false });
      return 1;
    }

    let inventory_water = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );

    if (inventory_water < needed) {
      max = false;
    }

    if (inventory_water < 1) {
      one = false;
    }

    if (inventory_water < 5) {
      five = false;
    }

    // console.log("\none = " + one);
    // console.log("\nfive = " + five);
    // console.log("\nmax = " + max);

    this.setState({ button_x1: one, button_x5: five, button_max: max });

    console.log("DONE W/ CHECKING WATERING OPTIONS");
  };

  checkIfWilted = async () => {
    if (this.state.countdownFullySet == true) {
      const res = await su.updateWilting(this.state.plant_position);
      console.log("res is " + res);
      if (res == 3) {
        alert("your plant wilted :(");
      } else if (res == 4) {
        alert("bruh");
      } else {
        alert("new streak started");
        this.setState({
          countdownSet: false,
          countdownFullySet: false,
          inventory_set: false,
        });
        //   this.getCountdownLength();
      }
    }
  };

  showInventoryThird = () => {
    // shows additional inventory item.
    // 4 - shovel
    // 3 - elixir
    // 2 - sell
    // 1 - fertilizer
    // 0 - seeds

    if (this.state.plant_status == 4) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.smallWhiteText, { color: "#d1d1d1" }]}>
            DIG UP
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={() => this.useShovel()}
            activeOpacity={0.5}
            // inventory item: shovel
          >
            <Image
              source={require("./assets/largeshovel.png")}
              style={styles.menuIcons}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.plant_status == 3) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.smallWhiteText, { color: "#6bbf21" }]}>
            {this.state.inventory_elixir}
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("GardenTesting")}
            activeOpacity={0.5}
            // inventory item: elixir
          >
            <Image
              source={require("./assets/largeelixir3.png")}
              style={styles.menuIcons2}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.plant_status == 2) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.smallWhiteText, { color: "#cf8165" }]}>
            SELL
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("GardenTesting")}
            activeOpacity={0.5}
            // inventory item: sell
          >
            <Image
              source={require("./assets/sellxlarge2.png")}
              style={styles.menuIcons3}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.plant_status == 1) {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.smallWhiteText, { color: "#b07437" }]}>
            {this.state.inventory_fertilizer}
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("GardenTesting")}
            activeOpacity={0.5}
            // inventory item: fertilizer
          >
            <Image
              source={require("./assets/fertilizer.png")}
              style={styles.menuIcons}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={[styles.smallWhiteText, { color: "#de9e5d" }]}>
            SEEDS
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("Seeds", {
                position: this.plant_position,
              })
            }
            activeOpacity={0.5}
            // inventory item: seeds
          >
            <Image
              source={require("./assets/common_seed.png")}
              style={styles.menuIcons}
            ></Image>
          </TouchableOpacity>
        </View>
      );
    }
  };

  showRightSide = () => {
    const barWidth = screen.width / 1.7;
    const progressCustomStyles = {
      backgroundColor: "#91faff",
      borderRadius: 10,
      //   maxValue: 100,
      borderColor: "#ffffff",
      height: screen.height / 40,
      barEasing: "linear",
      width: barWidth,
      //   maxValue: 90,
      //   maxValue: 105,
    };

    if (this.state.plant_status == 0) {
      return (
        <View
          style={{
            flex: 2,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          // right side for progress bar and buttons
        >
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 10 }}>
            {/* {Platform.OS == "android" ? (
                <Text style={styles.whiteText}>
                  Tap the seed button in your inventory to start growing!
                </Text>
              ) : (
                <Text style={styles.whiteText}>
                  Plant a seed from your inventory to start growing!
                </Text>
              )} */}

            <Text style={styles.whiteText}>
              Tap the seed button in your inventory to start growing!
            </Text>

            {/* <Text></Text>
              Plant a seed from your inventory to start growing!
              <Text></Text> */}
            <Text></Text>
            <TouchableOpacity
              onPress={() =>
                navigate("Seeds", {
                  position: this.plant_position,
                })
              }
            >
              {/* {Platform.OS == "android" ? (
                  <View></View>
                ) : (
                  <View
                    style={{
                      borderWidth: 1.2,
                      width: screen.width / 2,
                      height: screen.width / 10,
                      borderColor: "#525252",
                      color: "#1ce",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.rectangularText,
                        { fontSize: 18, color: "#eee" },
                      ]}
                    >
                      PLANT SEED
                    </Text>
                  </View>
                )} */}
            </TouchableOpacity>

            {Platform.OS == "android" ? (
              <View style={{ flex: 0 }}></View>
            ) : (
              <View style={{ flex: 0.1 }}></View>
            )}
            {/* <Text></Text>
              <Text></Text> */}
            <Text style={styles.whiteText}>Get more seeds:</Text>
            <View style={{ flex: 0.1 }}></View>
            {/* <Text></Text> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
            >
              <View
                style={{
                  borderWidth: 1.2,
                  width: screen.width / 2,
                  height: screen.width / 13,
                  borderColor: "#25bcdb",
                  color: "#1ce",
                  backgroundColor: "#1a2a3d",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Sprint</Text>
              </View>
            </TouchableOpacity>
            {Platform.OS == "android" ? (
              <View style={{ flex: 0.1 }}></View>
            ) : (
              <View style={{ flex: 0.08 }}></View>
            )}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Shop")}
            >
              <View
                style={{
                  borderWidth: 1.2,
                  width: screen.width / 2,
                  height: screen.width / 13,
                  borderColor: "#5ea9d1",
                  color: "#1ce",
                  backgroundColor: "#111c2b",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Buy from Shop
                </Text>
              </View>
            </TouchableOpacity>
            {Platform.OS == "android" ? (
              <View style={{ flex: 0.1 }}></View>
            ) : (
              <View style={{ flex: 0.08 }}></View>
            )}
            {/* <Text></Text> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Garden2")}
            >
              <View
                style={{
                  borderWidth: 1.2,
                  width: screen.width / 2,
                  height: screen.width / 13,
                  borderColor: "#a6b4e3",
                  color: "#1ce",
                  backgroundColor: "#0c1521",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>
                  Breed Plants
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
      );
    } else if (this.state.plant_status == 1) {
      return <View></View>; // BTS
    } else if (this.state.plant_status == 2) {
      return (
        <View
          style={{
            flex: 2,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
          }}
          // right side for progress bar and buttons
        >
          <View
            style={{
              flex: 0.7,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top margin
          ></View>
          <View
            style={{
              flex: 0.5,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top third - countdown
          >
            {this.state.countdownFullySet ? (
              <CountDown
                until={this.state.totalDuration}
                //duration of countdown in seconds
                timetoShow={("M", "S")}
                //formate to show
                onFinish={() => this.checkIfWilted()}
                //on Finish call
                onPress={() => alert("hello")}
                //on Press call
                size={20}
                //   showSeparator={true}
                //   separatorStyle={{ color: "#fff" }}
                digitStyle={{ backgroundColor: "#333" }}
                digitTxtStyle={{ color: "#fff" }}
              />
            ) : (
              <View></View>
            )}
          </View>
          <View style={{ flex: Platform.OS == "android" ? 0.9 : 0.3 }}>
            {this.state.fully_watered ? (
              <View>
                <Text></Text>
                <Text style={styles.whiteText}>until next reset</Text>
              </View>
            ) : (
              <View>
                <Text></Text>
                <Text style={styles.whiteText}>until wilted</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: 0.3,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top margin
          ></View>
          {/* <View style={{ flex: 0.2 }}></View> */}
          <View
            style={{
              flex: 0.5,
              // backgroundColor: "#ace",
              justifyContent: "center",
              alignItems: "center",
            }}
            // middle third - progress bar
          >
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              value={this.state.progress}
              backgroundColorOnComplete="#ff427b"
              // progress bar
            />
            <Text></Text>
            {this.state.fully_watered ? (
              <Text style={styles.smallWhiteText}>FULLY WATERED</Text>
            ) : (
              <Text style={styles.smallWhiteText}>
                {Math.floor(this.state.progress / 6.66)}/15 WATERS
              </Text>
            )}
            <Text></Text>
          </View>
          <View style={{ flex: 0.2 }}></View>
          <View
            style={{
              flex: 1,
              // backgroundColor: "#cea",
              // justifyContent: "center",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
            // bottom third - 3 buttons
          >
            {this.state.button_x1 ? (
              <TouchableOpacity onPress={this.water_1.bind(this)}>
                <View style={styles.rectangular}>
                  <Text style={styles.rectangularText}>X 1</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.darkRectangular}>
                <Text style={styles.darkRectangularText}>X 1</Text>
              </View>
            )}

            {this.state.button_x5 ? (
              <TouchableOpacity onPress={this.water_5.bind(this)}>
                <View style={styles.rectangular}>
                  <Text style={styles.rectangularText}>X 5</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.darkRectangular}>
                <Text style={styles.darkRectangularText}>X 5</Text>
              </View>
            )}

            {this.state.button_max ? (
              <TouchableOpacity onPress={this.water_max.bind(this)}>
                <View style={styles.rectangular}>
                  <Text style={styles.rectangularText}>MAX</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.darkRectangular}>
                <Text style={styles.darkRectangularText}>MAX</Text>
              </View>
            )}
          </View>
        </View>
      );
    } else if (this.state.plant_status == 3) {
      return (
        <View
          style={{
            flex: 2,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
          }}
          // right side for progress bar and buttons
        >
          <View
            style={{
              flex: 0.5,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top margin
          ></View>
          <View
            style={{
              flex: 0.5,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top third - countdown
          >
            {this.state.countdownFullySet ? (
              <CountDown
                until={this.state.totalDuration}
                //duration of countdown in seconds
                timetoShow={("M", "S")}
                //formate to show
                onFinish={() => this.checkIfWilted()}
                //on Finish call
                onPress={() => alert("hello")}
                //on Press call
                size={20}
                // showSeparator={true}
                // separatorStyle={{ color: "#fff" }}
                digitStyle={{ backgroundColor: "#ff4a66" }}
                digitTxtStyle={{ color: "#fff" }}
              />
            ) : (
              <View></View>
            )}
          </View>
          <View style={{ flex: Platform.OS == "android" ? 0.9 : 0.3 }}>
            {this.state.fully_watered ? (
              <View>
                <Text></Text>
                <Text style={styles.whiteText}>until next reset</Text>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    marginBottom:
                      Platform.OS == "android" ? screen.height / 60 : 0,
                  }}
                ></View>
                {/* <Text></Text> */}
                <Text style={styles.whiteText}>until dead</Text>
              </View>
            )}
          </View>
          <View
            style={{
              flex: Platform.OS == "android" ? 0.1 : 0.2,
              // backgroundColor: "#eac",
              justifyContent: "center",
              alignItems: "center",
            }}
            // top margin
          ></View>
          {/* <View style={{ flex: 0.2 }}></View> */}

          <View
            style={{
              flex: 0.5,
              // backgroundColor: "#ace",
              justifyContent: "center",
              alignItems: "center",
            }}
            // middle third - progress bar
          >
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={screen.width / 2}
              value={this.state.progress}
              backgroundColorOnComplete="#ff427b"
              // progress bar
            />

            {Platform.OS == "android" ? (
              <View style={{ marginBottom: screen.height / 60 }}></View>
            ) : (
              <View style={{ marginBottom: screen.height / 80 }}></View>
            )}
            {/* <Text></Text> */}

            <Text style={styles.smallWhiteText}>0/1 ELIXIR</Text>

            <Text></Text>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.8 }}>
            <View
              style={{
                marginTop: Platform.OS == "android" ? 0 : screen.height / 120,
              }}
            ></View>
            <TouchableOpacity onPress={this.useElixir.bind(this)}>
              <View
                style={{
                  borderWidth: 1.2,
                  width: screen.width / 2,
                  height: screen.width / 10,
                  borderColor: "#525252",
                  color: "#1ce",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {this.state.inventory_elixir > 0 ? (
                  <Text
                    style={[
                      styles.rectangularText,
                      { fontSize: 18, color: "#eee" },
                    ]}
                  >
                    REVITALIZE
                  </Text>
                ) : (
                  <Text
                    style={[
                      styles.rectangularText,
                      { fontSize: 18, color: "#525252" },
                    ]}
                  >
                    REVITALIZE
                  </Text>
                )}

                {/* <Text style={[styles.rectangularText, { fontSize: 18 }]}>
                  REVITALIZE
                </Text> */}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (this.state.plant_status == 4) {
      return (
        <View
          style={{
            flex: 2,
            backgroundColor: "#111",
            justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "row",
          }}
          // right side for progress bar and buttons
        >
          <Text
            style={{
              color: "#ff5271",
              fontSize: 20,
              marginLeft: screen.width / 30,
              marginRight: screen.width / 30,
            }}
          >
            Your plant has died!
          </Text>
          <Text></Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginLeft: screen.width / 30,
              marginRight: screen.width / 30,
            }}
          >
            Plants die if they have not been revived in time after wilting.
          </Text>
          <Text></Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginLeft: screen.width / 30,
              marginRight: screen.width / 30,
            }}
          >
            Use the shovel in your inventory to dig it up.
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 2,
            backgroundColor: "#111",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          // right side for progress bar and buttons
        >
          <Text style={{ color: "#fff", fontSize: 30 }}>Loading...</Text>
        </View>
      );
    }
  };

  getCountdownLength = async () => {
    console.log("getCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const plantKey = pos + "_plant";
      let plant = JSON.parse(await SecureStore.getItemAsync(plantKey));

      const end = DateTime.fromISO(plant["two"]["water_end"]);
      console.log(end.toISO() + "end234321 ");

      const currDate = DateTime.local();

      console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  getGrownCountdownLength = async (plant) => {
    console.log("getGrownCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const end = DateTime.fromISO(plant["two"]["water_end"]);
      console.log(end.toISO() + "end1131grown");

      const currDate = DateTime.local();

      console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  getWiltedCountdownLength = async (plant) => {
    console.log("getWiltedCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const end = DateTime.fromISO(plant["three"]["wilt_end"]);
      console.log(end.toISO() + "end11111wilted");

      const currDate = DateTime.local();

      console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  displayJsxMessage = () => {
    console.log("displayJsxMessage called");
    if (this.state.showCancel) {
      return <Text style={styles.smallWhiteText}> Hello, JSX! </Text>;
    } else {
      return (
        <View style={{ backgroundColor: "#fff" }}>
          <Text style={styles.smallWhiteText}> Goodbye, JSX! </Text>
        </View>
      );
    }
  };

  showInfo = () => {
    // let title =
    // let info = "Fully Grown\n\n"
    // console.log("hi");
    // const pos = this.state.plant_position;
    // console.log(pos);
    // console.log(this.state.image1);
    // let info = this.state.image1;
    // console.log(info + " ");

    const info = this.state.alert_info;
    const title = this.state.alert_title;

    Alert.alert(
      title.toString().toUpperCase(),
      info.toString(),
      [
        {
          text: "OK",
          onPress: () => console.log("Ask me later pressed"),
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    // console.log(this.state.inventory_elixir + "elixir");
    // btwn 1.5 and 2
    console.log(this.state.totalDuration);
    console.log("POSITIONNN IS " + this.state.plant_position);
    const barWidth = screen.width / 1.7;
    const progressCustomStyles = {
      backgroundColor: "#91faff",
      borderRadius: 10,
      //   maxValue: 100,
      borderColor: "#ffffff",
      height: screen.height / 40,
      barEasing: "linear",
      width: barWidth,
      //   maxValue: 90,
      //   maxValue: 105,
    };
    // this.getPlantWaterCount();
    this.checkInitialized();
    this.getInventoryCounts();
    // this.getCountdownLength();

    // console.log("69");
    // const b = su.getImageName("ferns");
    // const vv = this.show13();
    // console.log("96");
    // console.log("\n\n vv = " + vv);
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
          <TouchableOpacity onPress={this.showInfo}>
            <View style={styles.whiteRoundedCorners}>
              <Image
                style={styles.largePlant}
                source={images[this.state.plant_image]}
                // large plant image with rounded corners
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#222",
          }}
          // gray horizontal divider
        >
          {/* <Text style={styles.whiteText}>Blue-Pleated Rhododendron</Text> */}
        </View>

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
              backgroundColor: "#000",
              justifyContent: "center",

              // left side w/ inventory
            }}
          >
            <View style={styles.inventoryOutline}>
              <View
                style={{ flex: Platform.OS == "android" ? 0.2 : 0.38 }}
              ></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.smallWhiteText, { color: "#37d2ed" }]}>
                  {this.state.inventory_water}
                </Text>
                <View style={{ flex: 0.05 }}></View>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("GardenTesting")
                  }
                  activeOpacity={0.5}
                  // inventory item: water
                >
                  <Image
                    source={require("./assets/largewater.png")}
                    style={styles.menuIcons}
                  ></Image>
                </TouchableOpacity>
              </View>
              {/* <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.smallWhiteText}>
                  {this.state.inventory_fertilizer}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("GardenTesting")
                  }
                  activeOpacity={0.5}
                  // imventory item: fertilizer
                >
                  <Image
                    source={require("./assets/shoplogo.png")}
                    style={styles.menuIcons}
                  ></Image>
                </TouchableOpacity>
              </View> */}
              {this.showInventoryThird()}
              {/* <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.smallWhiteText}>
                  SELL
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("GardenTesting")
                  }
                  activeOpacity={0.5}
                  // inventory item: bee / shovel
                >
                  <Image
                    source={require("./assets/largeshovel.png")}
                    style={styles.menuIcons}
                  ></Image>
                </TouchableOpacity>
              </View> */}
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[styles.smallWhiteText, { color: "#ff4b1f" }]}>
                  SHOP
                </Text>
                <View style={{ flex: 0.1 }}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Shop")}
                  activeOpacity={0.5}
                  // inventory item: elixir
                >
                  <Image
                    source={require("./assets/largeshop2.png")}
                    style={styles.menuIcons2}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 0.1 }}></View>
              {/* <Text>Boo</Text> */}
            </View>
            {/* <Image
              style={styles.inventoryBar}
              source={require("./assets/inventorybar.png")}
            ></Image> */}
          </View>
          {this.showRightSide()}
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#222",
          }}
        >
          {/* <View>{this.displayJsxMessage()}</View> */}
        </View>

        <View
          style={{
            flex: Platform.OS == "android" ? 5 : 7, //7
            backgroundColor: "#a9d9de",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Garden2")}
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
  inventoryBar: {
    width: screen.height / 11,
    height: screen.height / 2.7,
    marginLeft: screen.width / 12,
  },
  menuIcons: {
    width: screen.width / 11, // 11
    height: screen.width / 11, // 11
  },
  menuIcons2: {
    width: screen.width / 10, // 9
    height: screen.width / 10, // 9
    // marginLeft: screen.width / 10,
  },
  menuIcons3: {
    width: screen.width / 9.3,
    height: screen.width / 9.3,
    // borderWidth: 1,
    // borderColor: "#854832",
  },
  inventoryOutline: {
    borderWidth: 5,
    borderColor: "#854832",
    width: screen.width / 5,
    height: screen.height / 2.7,
    borderRadius: screen.width / 25,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: screen.width / 12,
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
    borderWidth: 0,
    width: screen.width / 1.5, //1.6
    height: screen.width / 2.4, //2.4
    borderColor: "#fff",
    borderRadius: screen.width / 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  red: {
    borderWidth: 3,
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
  rectangular: {
    borderWidth: 1.2,
    width: screen.width / 7,
    height: screen.width / 13,
    borderColor: "#fff",
    color: "#1ce",
    alignItems: "center",
    justifyContent: "center",
  },
  rectangularText: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  darkRectangular: {
    borderWidth: 1.2,
    width: screen.width / 7,
    height: screen.width / 13,
    borderColor: "#525252",
    color: "#1ce",
    alignItems: "center",
    justifyContent: "center",
  },
  darkRectangularText: {
    color: "#525252",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
  },
  whiteText: {
    color: "#fff",
    fontSize: 19,
  },
  smallWhiteText: {
    color: "#ff547c",
    fontSize: 15,

    // marginLeft: screen.width / 40,
    // marginRight: screen.width / 5,
  },
});
