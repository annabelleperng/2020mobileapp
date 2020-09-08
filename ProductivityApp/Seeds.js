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
  ScrollView,
  Alert,
} from "react-native";
import SeedUtils2 from "./SeedUtils2";
import RewardUtils from "./RewardUtils";
import Constants from "expo-constants";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import Garden from "./Garden";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils2();
const rewardUtils = new RewardUtils();
// const seeds = seedUtils.getAllSeeds();
// let seeds = {
//   none: { C: 2, U: 0, R: 0 },
//   christmas: { C: 0, U: 127, R: 0 },
//   valentines: { C: 0, U: 0, R: 0 }
// };

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant_position: this.props.route.params.position,

      gold: -1,

      initialized: false,
      eventName: "",
      eventCountdown: -1,

      itemPrices: ["3", "5", "10", "1", "4", "2", "30", 5, "7", "127"],
      price8: "???",
      price9: "???",
      price10: "???",
      price11: "???",

      selectedParents: 2,

      selected_event: "",
      selected_rarity: "",

      seeds: {
        none: { C: 0, U: 0, R: 0 },
        christmas: { C: 0, U: 0, R: 0 },
        valentines: { C: 0, U: 0, R: 0 },
      },
    };
  }

  initialize = async () => {
    console.log("initializing shop");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    this.setState({ gold: 1500 });

    let seedStorage = await seedUtils.getAllSeeds();
    this.setState({ seeds: seedStorage });
  };

  countSeeds = async () => {
    const seeds = JSON.parse(await SecureStore.getItemAsync("inventory_seeds"));
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
    // this.props.navigation.navigate("Seeds", { event: e, rarity: r });
  };

  selectSeed = (e, r) => {
    Alert.alert(
      "Selected seed",
      "Are you sure you wish to select this seed?",
      [
        {
          text: "yes",
          onPress: () =>
            this.props.navigation.navigate("PlantView", {
              position: this.state.plant_position,
              event: e,
              rarity: r,
            }),
        },
        { text: "cancel" },
      ],
      { cancelable: false }
    );
    this.state.seeds[e][r] = this.state.seeds[e][r] - 1;
  };

  render() {
    const { navigate } = this.props.navigation;
    // this.updateStuff();
    if (!this.state.initialized) {
      this.initialize();
      this.setState({ initialized: true });
    }

    const gold = rewardUtils.getGold();

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <SafeAreaView style={([styles.container], { flex: 1 })}>
          <ScrollView style={([styles.scrollView], { flex: 1 })}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#57423e",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 4,
                  backgroundColor: "#57423e",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      backgroundColor: "#000000",
                    }}
                  >
                    <Text style={styles.itemName1}>Regular</Text>
                    <Text style={styles.itemName2}>Seeds</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0,
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View style={{ flex: 0.2 }}></View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds["none"]["C"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          // navigate("PlantView", {
                          //   position: this.state.plant_position,
                          //   event: "none",
                          //   rarity: "C"
                          // })
                          this.selectSeed("none", "C")
                        }
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/common_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.none["U"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("none", "U")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/common_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.none["R"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/common_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("none", "R")}
                      >
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
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.none["C"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.none["C"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.none["C"]}
                        </Text>
                      )}
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
                    <View>
                      {this.state.seeds.none["U"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.none["U"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.none["U"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.none["R"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.none["R"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.none["R"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flex: 0.2 }}></View>
              </View>

              <View
                style={{
                  flex: 4,
                  backgroundColor: "#57423e",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      backgroundColor: "#000000",
                    }}
                  >
                    <Text style={styles.itemName1}>Christmas</Text>
                    <Text style={styles.itemName2}>Seeds</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0,
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View style={{ flex: 0.2 }}></View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.christmas["C"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/uncommon_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("christmas", "C")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/uncommon_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.christmas["U"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/uncommon_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("christmas", "U")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/uncommon_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.christmas["R"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/uncommon_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("christmas", "R")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/uncommon_seed.png")}
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
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.christmas["C"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.christmas["C"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.christmas["C"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.christmas["U"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.christmas["U"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.christmas["U"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.christmas["R"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.christmas["R"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.christmas["R"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flex: 0.2 }}></View>
              </View>

              <View
                style={{
                  flex: 4,
                  backgroundColor: "#57423e",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      backgroundColor: "#000000",
                    }}
                  >
                    <Text style={styles.itemName1}>Valentine's</Text>
                    <Text style={styles.itemName2}>Seed</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 0,
                    //   marginLeft: screen.width / 14,
                  }}
                >
                  <View style={{ flex: 0.2 }}></View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.valentines["C"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/rare_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("valentines", "C")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/rare_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.valentines["U"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/rare_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("valentines", "U")}
                      >
                        <Image
                          style={styles.items}
                          source={require("./assets/rare_seed.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={{ flex: 1, alignItems: "center" }}>
                    {this.state.seeds.valentines["R"] == 0 ? (
                      <Image
                        style={styles.items}
                        source={require("./assets/rare_seed_bought.png")}
                      />
                    ) : (
                      <TouchableOpacity
                        onPress={() => this.selectSeed("valentines", "R")}
                      >
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
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.valentines["C"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.valentines["C"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.valentines["C"]}
                        </Text>
                      )}
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
                    <View>
                      {this.state.seeds.valentines["U"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.valentines["U"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.valentines["U"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      {this.state.seeds.valentines["R"] == 0 ? (
                        <Text style={styles.none}>
                          {this.state.seeds.valentines["R"]}
                        </Text>
                      ) : (
                        <Text style={styles.bought}>
                          {this.state.seeds.valentines["R"]}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                <View style={{ flex: 0.2 }}></View>
              </View>

              <View
                style={{
                  flex: 4,
                  backgroundColor: "#57423e",
                  alignItems: "center",
                }}
              >
                {this.state.eventName != "" && this.state.eventName != null ? (
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
                      marginTop: 0,
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

              <View style={{ flex: 1 }}></View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#472b25",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 10,
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

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#000000",
                  }}
                >
                  <Text style={styles.itemName1}>Launch Event</Text>
                  <Text style={styles.itemName2}>Seeds</Text>
                </View>
              </View>
              <View style={{ flex: 1, backgroundColor: "#57423e" }}>
                <Text></Text>
                <Text></Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#57423e",
                  flexDirection: "row",
                  alignItems: "center",
                }} // breed / cancel buttons
              >
                {/* {this.state.selectedParents == 2 ? ( */}
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigate("PlantView", {
                        position: this.state.plant_position,
                      })
                    }
                  >
                    <View style={styles.pinkButton2}>
                      <Text style={styles.whiteText}>Back</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                {/* ) : (
                  <View style={{ flex: 1, alignItems: "center" }}> */}
                {/* <View style={styles.pinkButton2}>
                <Text style={styles.whiteText}>Cancel</Text>
              </View> */}
                {/* </View>
                )}
                {this.state.selectedParents == 2 ? ( */}
                {/* <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity onPress={() => this.hideBees()}>
                    <View style={styles.pinkButton2}>
                      <Text style={styles.whiteText}>Cancel</Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                {/* ) : (
                  <View style={{ flex: 1, alignItems: "center" }}> */}
                {/* <View style={styles.pinkButton2}>
                <Text style={styles.whiteText}>Cancel</Text>
              </View> */}
                {/* </View>
                )} */}
              </View>
              <View style={{ flex: 1, backgroundColor: "#57423e" }}>
                <Text></Text>
                <Text></Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: screen.height / 80,
    marginBottom: screen.height / 80,
    width: screen.width / 7,
    height: screen.width / 7,
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9,
    marginBottom: 10,
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
  poor: {
    color: "#F5493D",
    fontSize: 16,
  },
  bought: {
    color: "#B9C4C4",
    fontSize: 16,
  },
  none: {
    color: "#ff0000",
    fontSize: 16,
  },
  itemName1: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: screen.height / 50,
    textAlign: "center",
  },
  itemName2: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: screen.height / 70,
    textAlign: "center",
  },
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight
  },
  scrollView: {
    backgroundColor: "pink",
    // marginHorizontal: 20
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
  whiteText: {
    color: "#000",
    fontSize: 23,
  },
});
