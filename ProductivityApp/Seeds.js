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
  SafeAreaView,
  ScrollView
} from "react-native";
import SeedUtils from "./SeedUtils";
import RewardUtils from "./RewardUtils";
import Constants from "expo-constants";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import Garden from "./Garden";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();
const seeds = seedUtils.getAllSeeds();

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gold: -1,
      canBuyRarePlant: false,
      canBuyElixir: false,
      isUpdated: false,
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

      initialized: false,
      eventName: "",
      eventCountdown: -1,
      itemPrices: ["100", "100", "100", "300", "150", "150", "200", "600"],
      price8: "???",
      price9: "???",
      price10: "???",
      price11: "???",
      bought0: 0,
      bought1: 0,
      bought2: 0,
      bought3: 0,
      bought4: 0,
      bought5: 0,
      bought6: 0,
      bought7: 0,
      bought8: 0,
      bought9: 0,
      bought10: 0,
      bought11: 0,
      rarity10: "uncommon",
      rarity11: "uncommon"
    };
  }

  initialize = async () => {
    console.log("initializing shop");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    this.setState({ gold: 1500 });
  };

  eventChance = () => {
    const rarityRand = Math.floor(Math.random() * 100) + 1;
    if (rarityRand > 50) {
      this.setState({ rarity11: "rare" });
    }
    if (rarityRand > 75) {
      this.setState({ rarity10: "rare" });
    }
  };

  garden = (e, r) => {
    this.props.navigation.navigate("Seeds", { event });
  };

  render() {
    // this.updateStuff();
    if (!this.state.initialized) {
      this.initialize();
      this.setState({ initialized: true });
    }

    const gold = rewardUtils.getGold();

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View
            style={{
              flex: 1,
              backgroundColor: "#57423e",
              justifyContent: "center"
            }}
          >
            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center"
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#000000"
                  }}
                >
                  <Text style={styles.itemName1}>Common</Text>
                  <Text style={styles.itemName2}>Seed</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought0 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity onPress={this.garden("none", "C")}>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought1 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought2 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
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
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View>
                    <Text style={styles.prices}>
                      {this.state.itemPrices[0]}
                    </Text>
                  </View>

                  {/* {gold < Number.parseInt(this.state.itemPrices[0]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[0]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[0]}</Text>
                </View>
              )} */}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought1 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[1]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought2 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[2]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ flex: 0.2 }}></View>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center"
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#000000"
                  }}
                >
                  <Text style={styles.itemName1}>Uncommon</Text>
                  <Text style={styles.itemName2}>Seed</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought4 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/uncommon_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/uncommon_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought5 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/uncommon_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/uncommon_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought6 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/rare_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/rare_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
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
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought4 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[4]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[4]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[4]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[4]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought5 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[5]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[5]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[5]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[5]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought6 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[6]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[6]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[6]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[6]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ flex: 0.2 }}></View>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center"
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#000000"
                  }}
                >
                  <Text style={styles.itemName1}>Rare</Text>
                  <Text style={styles.itemName2}>Seed</Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought0 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought1 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought2 == 1 ? (
                    <Image
                      style={styles.items}
                      source={require("./assets/common_seed_bought.png")}
                    />
                  ) : (
                    <TouchableOpacity>
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed.png")}
                      />
                    </TouchableOpacity>
                  )}
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
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought0 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[0]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[0]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[0]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[0]}
                      </Text>
                    </View>
                  )}

                  {/* {gold < Number.parseInt(this.state.itemPrices[0]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[0]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[0]}</Text>
                </View>
              )} */}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought1 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[1]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[1]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {this.state.bought2 == 1 ? (
                    <View>
                      <Text style={styles.bought}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  ) : gold < Number.parseInt(this.state.itemPrices[2]) ? (
                    <View>
                      <Text style={styles.poor}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>
                        {this.state.itemPrices[2]}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <View style={{ flex: 0.2 }}></View>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              {this.state.eventName != "" && this.state.eventName != null ? (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center"
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View style={{ flex: 0.2 }}></View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.itemName1}>STAN</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.itemName1}>B</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.itemName1}>T</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    <Text style={styles.itemName1}>S</Text>
                  </View>
                  <View style={{ flex: 0.2 }}></View>
                </View>
              ) : (
                <View></View>
              )}

              {this.state.eventName != "" && this.eventName != null ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View style={{ flex: 0.2 }}></View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.bought8 == 1 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/fernsbig.png")}
                      />
                    ) : (
                      <TouchableOpacity>
                        <Image
                          style={styles.items}
                          source={require("./assets/fernsbig.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.bought9 == 1 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/fernsbig.png")}
                      />
                    ) : (
                      <TouchableOpacity>
                        <Image
                          style={styles.items}
                          source={require("./assets/fernsbig.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.rarity10 == "uncommon" ? (
                      this.state.bought10 == 1 ? (
                        <Image
                          style={styles.items}
                          source={require("./assets/fernsbig.png")}
                        />
                      ) : (
                        <TouchableOpacity>
                          <Image
                            style={styles.items}
                            source={require("./assets/fernsbig.png")}
                          />
                        </TouchableOpacity>
                      )
                    ) : this.state.bought10 == 1 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/tulipsbig.png")}
                      />
                    ) : (
                      <TouchableOpacity>
                        <Image
                          style={styles.items}
                          source={require("./assets/tulipsbig.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.rarity11 == "uncommon" ? (
                      this.state.bought10 == 1 ? (
                        <Image
                          style={styles.items}
                          source={require("./assets/fernsbig.png")}
                        />
                      ) : (
                        <TouchableOpacity>
                          <Image
                            style={styles.items}
                            source={require("./assets/fernsbig.png")}
                          />
                        </TouchableOpacity>
                      )
                    ) : this.state.bought11 == 1 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/tulipsbig.png")}
                      />
                    ) : (
                      <TouchableOpacity>
                        <Image
                          style={styles.items}
                          source={require("./assets/tulipsbig.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 0.2 }}></View>
                </View>
              ) : (
                <View>
                  <Text style={styles.comingSoon}>Event</Text>
                </View>
              )}
            </View>

            <View
              style={{
                flex: 1.1,
                backgroundColor: "#472b25",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <View style={{ flex: 0.2 }}></View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {gold < Number.parseInt(this.state.itemPrices[8]) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price8}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price8}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {gold < Number.parseInt(this.state.itemPrices[9]) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price9}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price9}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {gold < Number.parseInt(this.state.itemPrices[10]) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price10}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price10}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {gold < Number.parseInt(this.state.itemPrices[11]) == 1 ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price11}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price11}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ flex: 0.2 }}></View>
            </View>

            <View style={{ flex: 2, backgroundColor: "#57423e" }}></View>
            {/* <View
          style={{
            flex: 0.7,
            backgroundColor: "#333333",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "#ffffff" }}> gold: {this.state.gold}</Text>
        </View> */}
            <View style={{ flex: 3, backgroundColor: "#0e0e0e" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: 40,
                  marginRight: 40,
                  marginTop: (screen.height * 3) / 22 - screen.width / 5
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
                {/* <TouchableOpacity
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
            </TouchableOpacity> */}
                <View
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <Text style={{ color: "#ffffff" }}>gold:</Text>
                  <Text style={{ color: "#ffffff" }}> {this.state.gold}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: 0,
    marginBottom: screen.height / 80,
    width: screen.width / 7,
    height: screen.width / 7
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9,
    marginLeft: screen.width / 10
  },
  pinkButton: {
    borderWidth: 2,
    borderColor: "#ff576d",
    width: screen.width / 25,
    height: screen.width / 25,
    borderRadius: screen.width / 25,
    alignItems: "center",
    justifyContent: "center"
  },
  smallButton: {
    width: screen.height / 28,
    height: screen.height / 28
  },
  comingSoon: {
    color: "#74D130",
    fontSize: 40,
    marginTop: screen.height / 20
  },
  prices: {
    color: "#FFFFFF",
    fontSize: 16
  },
  poor: {
    color: "#F5493D",
    fontSize: 16
  },
  bought: {
    color: "#B9C4C4",
    fontSize: 16
  },
  itemName1: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: screen.height / 50,
    textAlign: "center"
  },
  itemName2: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: screen.height / 70,
    textAlign: "center"
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20
  }
});
