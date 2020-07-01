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
} from "react-native";

import CountDown from "react-native-countdown-component";
import DateTime from "luxon/src/datetime.js";
import moment from "moment";

import ProgressBarAnimated from "react-native-progress-bar-animated";

const screen = Dimensions.get("window");
import SeedUtils from "./SeedUtils";
const su = new SeedUtils();

let images = {
  "ferns ": require("./assets/fernsbig.png"),
  "tulips ": require("./assets/tulipsbig.png"),
  "invis ": require("./assets/invis.png"),
};

import * as SecureStore from "expo-secure-store";
import { screensEnabled } from "react-native-screens";
export default class GardenTesting extends Component {
  constructor(props) {
    super(props);
    this.initializeGarden();
    this.state = {
      plant_position: 1,
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

  initializeGarden = async () => {
    console.log("initializing garden");
    await SecureStore.setItemAsync("inventory_water", "1000");
    await SecureStore.setItemAsync("inventory_bees", "200");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "2");
    await SecureStore.setItemAsync("inventory_elixir", "1");
    await SecureStore.setItemAsync("1_status", "2");
    // const localZone = await SecureStore.getItemAsync("timezone");
    // const datePlanted = DateTime.local().setZone(localZone).toISO();
    // console.log("dateplanted issss" + datePlanted);
    await SecureStore.setItemAsync(
      "1_period_start",
      "2020-06-28T18:50:15.437-07:00"
    );
    await SecureStore.setItemAsync(
      "1_period_end",
      "2020-07-01T18:50:15.437-07:00"
    );
    // await SecureStore.setItemAsync("1_period_start", "2");
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
    let pos = this.state.plant_position + "_waters";
    let plant_water = Number.parseInt(await SecureStore.getItemAsync(pos));

    // waters plant once
    inventory_water = inventory_water - 1;
    plant_water = plant_water + 1;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    await SecureStore.setItemAsync(pos, "" + plant_water);

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
    let pos = this.state.plant_position + "_waters";
    let plant_water = Number.parseInt(await SecureStore.getItemAsync(pos));

    // waters plant five times
    inventory_water = inventory_water - 5;
    plant_water = plant_water + 5;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    await SecureStore.setItemAsync(pos, "" + plant_water);

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
    let pos = this.state.plant_position + "_waters";
    let plant_water = Number.parseInt(await SecureStore.getItemAsync(pos));
    let needed = 15 - plant_water;

    // waters plant till fully watered
    inventory_water = inventory_water - needed;
    plant_water = plant_water + needed;

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_water", "" + inventory_water);
    await SecureStore.setItemAsync(pos, "" + plant_water);

    // updates progress bar, display number
    this.increase("progress", 100);
    await this.checkWateringOptions();
    this.setState({ inventory_water: inventory_water });
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

  getInventoryCounts = async () => {
    if (this.state.inventory_set == false) {
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
      let pos_waters = Number.parseInt(
        await SecureStore.getItemAsync(this.state.plant_position + "_waters")
      );
      pos_waters *= 6.67;
      console.log(this.state.plant_position + "_waters");
      this.setState({
        inventory_water: water,
        inventory_fertilizer: fertilizer,
        inventory_bees: bees,
        inventory_elixir: elixir,
        progress: pos_waters,
        inventory_set: true,
      });
      this.checkWateringOptions();
    }
  };

  getPlantWaterCount = async () => {
    let pos = this.state.plant_position;
    let plant_waters = SecureStore.getItemAsync(pos + "_waters");
    console.log(pos + "_waters gotten\n\n\n");
    this.setState({ progress: plant_waters });
  };

  /* Determines which buttons - x1, x5, MAX - to show for
   * watering if the plant can be watered. */
  checkWateringOptions = async () => {
    let pos = this.state.plant_position.toString() + "_waters";
    let pos_waters = Number.parseInt(await SecureStore.getItemAsync(pos));
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

    console.log("DONE CHECKING WATERING OPTIONS I THINK");
  };

  //   componentDidMount = async () => {
  //     var that = this;

  //     //We are showing the coundown timer for a given expiry date-time
  //     //If you are making an quize type app then you need to make a simple timer
  //     //which can be done by using the simple like given below
  //     //that.setState({ totalDuration: 30 }); //which is 30 sec

  //     var date = moment().utcOffset("+05:30").format("YYYY-MM-DD hh:mm:ss");
  //     //Getting the current date-time with required formate and UTC

  //     var expirydate = "2020-10-23 04:00:45"; //You can set your own date-time
  //     //Let suppose we have to show the countdown for above date-time

  //     var diffr = moment.duration(moment(expirydate).diff(moment(date)));
  //     //difference of the expiry date-time given and current date-time

  //     var hours = parseInt(diffr.asHours());
  //     var minutes = parseInt(diffr.minutes());
  //     var seconds = parseInt(diffr.seconds());

  //     var d = hours * 60 * 60 + minutes * 60 + seconds;
  //     //converting in seconds

  //     that.setState({ totalDuration: 50 });
  //     //Settign up the duration of countdown in seconds to re-render
  //   }

  getCountdownLength = async () => {
    console.log("getCountdownLength called");
    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    if (pos < 1 || pos >= 9) {
      console.log("position not set correctly");
      return;
    }
    const posString = pos + "";

    if (this.state.countdownSet == false) {
      console.log("WAS FALSE!?!??!?????????????????????");

      //   this.setState({ countdownSet: true, totalDuration: 50 });

      const endKey = posString + "_period_end";
      console.log(endKey + "endKey");
      const end = DateTime.fromISO(await SecureStore.getItemAsync(endKey));
      console.log(end.toISO() + "end");
      const localZone = await SecureStore.getItemAsync("timezone");
      console.log("localzone is " + localZone);
      const currDate = DateTime.local().setZone(localZone);
      const diff = end.diff(currDate).as("seconds");
      console.log("\n\n\ndiff = " + diff);

      //   const tempst = DateTime.fromISO("2020-06-28T18:50:15.437-07:00");
      //   const tempend = DateTime.fromISO("2020-07-01T18:50:15.437-07:00");
      //   const diff = tempend.diff(tempst).as("seconds");
      //   console.log("diff = " + diff);

      this.setState({ totalDuration: diff, countdownSet: true });
    }
  };

  render() {
    // btwn 1.5 and 2
    console.log(this.state.totalDuration);
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
    this.getCountdownLength();
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
          <View style={styles.whiteRoundedCorners}>
            <Image
              style={styles.largePlant}
              source={require("./assets/fernsbig.png")}
              // large plant image with rounded corners
            />
          </View>
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
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.smallWhiteText}>
                  {this.state.inventory_water}
                </Text>
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
              <View style={{ flex: 1, alignItems: "center" }}>
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
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.smallWhiteText}>
                  SELL
                  {/* {this.state.inventory_bees} */}
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
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.smallWhiteText}>
                  {this.state.inventory_elixir}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("GardenTesting")
                  }
                  activeOpacity={0.5}
                  // inventory item: elixir
                >
                  <Image
                    source={require("./assets/largeelixir3.png")}
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
              {this.state.countdownSet ? (
                <CountDown
                  until={this.state.totalDuration}
                  //duration of countdown in seconds
                  timetoShow={("M", "S")}
                  //formate to show
                  onFinish={() => alert("finished")}
                  //on Finish call
                  onPress={() => alert("hello")}
                  //on Press call
                  size={20}
                  digitStyle={{ backgroundColor: "#333" }}
                  digitTxtStyle={{ color: "#fff" }}
                />
              ) : (
                <View></View>
              )}

              {/* <Text style={styles.whiteText}>02:25:36:45</Text> */}
              <Text style={styles.whiteText}>until wilted</Text>
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
                  {Math.floor(this.state.progress / 6.67)}/15 WATERS
                </Text>
              )}
              <Text></Text>
            </View>
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

              {/* <View style={styles.buttonContainer}>
                <View style={styles.buttonInner}>
                  <Button
                    title="Increase 1/15th"
                    onPress={this.increase.bind(this, "progress", 6.67)}
                  />
                </View>
              </View> */}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: "#222",
          }}
        ></View>

        <View
          style={{
            flex: 7, //7
            backgroundColor: "#a9d9de",
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
    width: screen.width / 9,
    height: screen.width / 9,
    // marginLeft: screen.width / 10,
  },
  menuIcons3: {
    width: screen.width / 11,
    height: screen.width / 11,
    borderWidth: 1,
    borderColor: "#854832",
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
    fontSize: 30,
  },
  smallWhiteText: {
    color: "#ff547c",
    fontSize: 15,

    // marginLeft: screen.width / 40,
    // marginRight: screen.width / 5,
  },
});
