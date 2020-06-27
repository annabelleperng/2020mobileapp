import DateTime from "luxon/src/datetime.js";
import Duration from "luxon/src/duration.js";
import Interval from "luxon/src/interval.js";

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
} from "react-native";
import SeedUtils from "./SeedUtils";
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancel: false,
      showBees: false,
      status1: 2,
      status2: 2,
      status3: 2,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,

      hasEvent: false,
      itemPrices: [
        "100",
        "100",
        "100",
        "300",
        "150",
        "150",
        "200",
        "600",
        "???",
        "???",
        "???",
        "???",
      ],
    };
  }

  buy = () => {
    console.log("buying");
  };

  render() {
    // this.updateStuff();

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
              flex: 1,
              alignItems: "center",
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName}>Common Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName}>Common Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName}>Common Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName}>Fertilizer</Text>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* <Text style={styles.itemName}>Common Seed</Text> */}
              <TouchableOpacity>
                <Image
                  style={styles.items}
                  source={require("./assets/common_seed.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/common_seed.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/common_seed.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/fertilizer.png")}
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
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity onPress={() => this.buy()}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[0]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[1]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[2]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[3]}</Text>
              </View>
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
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <TouchableOpacity>
                <Image
                  style={styles.items}
                  source={require("./assets/uncommon_seed.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/uncommon_seed.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/rare_seed.png")}
              />
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Image
                style={styles.items}
                source={require("./assets/elixir.png")}
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
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[4]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[5]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[6]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[7]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>
        {console.log(this.state.hasEvent)}
        <View
          style={{
            flex: 4,
            backgroundColor: "#57423e",
            alignItems: "center",
          }}
        >
          {this.state.hasEvent ? (
            <View
              style={{
                flexDirection: "row",
                marginTop: margin,
                //   marginLeft: screen.width / 14,
              }}
            >
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity>
                  <Image
                    style={styles.items}
                    source={require("./assets/fernsbig.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  style={styles.items}
                  source={require("./assets/tulipsbig.png")}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  style={styles.items}
                  source={require("./assets/fernsbig.png")}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Image
                  style={styles.items}
                  source={require("./assets/tulipsbig.png")}
                />
              </View>
              <View style={{ flex: 0.2 }}></View>
            </View>
          ) : (
            <View>
              <Text style={styles.comingSoon}>Event coming soon!</Text>
            </View>
          )}
        </View>

        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[8]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[9]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[10]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={[styles.smallButton]}
                  source={require("./assets/gold.png")}
                />
                <Text style={styles.prices}>{this.state.itemPrices[11]}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>

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
              onPress={() => this.toggleBees()}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/largebee.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Shop")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("GardenTesting")}
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
  items: {
    marginTop: 0,
    marginBottom: screen.height / 80,
    width: screen.width / 7,
    height: screen.width / 7,
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
  comingSoon: {
    color: "#74D130",
    fontSize: 40,
    marginTop: screen.height / 20,
  },
  prices: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: screen.height / 70,
    textAlign: "center",
  },
});
