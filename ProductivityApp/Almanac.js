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
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Modal
} from "react-native";
import SeedUtils from "./SeedUtils";
import SeedUtils2 from "./SeedUtils2";
import RewardUtils from "./RewardUtils";
import AlmanacUtils from "./AlmanacUtils";

import Loading from "./Loading";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import { enableScreens } from "react-native-screens";
import { RotationGestureHandler } from "react-native-gesture-handler";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";
// import { ConsoleWriter } from "istanbul-lib-report";
// import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils2();
const almanacUtils = new AlmanacUtils();

let images = {
  plantpot: require("./assets/plantpotlarge.png"),
  yellow_pinwheel: require("./assets/plants/yellow_pinwheel2.png"),
  yellow_pinwheelA: require("./assets/almanac/yellow_pinwheelA.png"),

  wild_redquill: require("./assets/plants/wild_redquill2.png"),
  wild_redquillA: require("./assets/almanac/wild_redquillA.png"),

  white_frostflower: require("./assets/plants/white_frostflower2.png"),
  white_frostflowerA: require("./assets/almanac/white_frostflowerA.png"),

  white_cupcake: require("./assets/plants/white_cupcake2.png"),
  white_cupcakeA: require("./assets/almanac/white_cupcakeA.png"),

  undersea_pineapple: require("./assets/plants/undersea_pineapple2.png"),
  undersea_pineappleA: require("./assets/almanac/undersea_pineappleA.png"),

  titled_rose: require("./assets/plants/titled_rose2.png"),
  titled_roseA: require("./assets/almanac/titled_roseA.png"),

  sunset_shrooms: require("./assets/plants/sunset_shrooms2.png"),
  sunset_shroomsA: require("./assets/almanac/sunset_shroomsA.png"),

  summer_cactus: require("./assets/plants/summer_cactus2.png"),
  summer_cactusA: require("./assets/almanac/summer_cactusA.png"),

  stocky_corn: require("./assets/plants/stocky_corn2.png"),
  stocky_cornA: require("./assets/almanac/stocky_cornA.png"),

  startrail_dandelion: require("./assets/plants/startrail_dandelion2.png"),
  startrail_dandelionA: require("./assets/almanac/startrail_dandelionA.png"),

  snowcrested_fern: require("./assets/plants/snowcrested_fern2.png"),
  snowcrested_fernA: require("./assets/almanac/snowcrested_fernA.png"),

  sharp_succulent: require("./assets/plants/sharp_succulent2.png"),
  sharp_succulentA: require("./assets/almanac/sharp_succulentA.png"),

  scarlet_spiderlily: require("./assets/plants/scarlet_spiderlily2.png"),
  scarlet_spiderlilyA: require("./assets/almanac/scarlet_spiderlilyA.png"),

  robin_tulip: require("./assets/plants/robin_tulip2.png"),
  robin_tulipA: require("./assets/almanac/robin_tulipA.png"),

  powderball_flower: require("./assets/plants/powderball_flower2.png"),
  powderball_flowerA: require("./assets/almanac/powderball_flowerA.png"),

  monarch_grass: require("./assets/plants/monarch_grass2.png"),
  monarch_grassA: require("./assets/almanac/monarch_grassA.png"),

  mario_mushrooms: require("./assets/plants/mario_mushrooms2.png"),
  mario_mushroomsA: require("./assets/almanac/mario_mushroomsA.png"),

  lemon_daisy: require("./assets/plants/lemon_daisy2.png"),
  lemon_daisyA: require("./assets/almanac/lemon_daisyA.png"),

  "forget-me-not_wildflower": require("./assets/plants/forget-me-not_wildflower2.png"),
  "forget-me-not_wildflowerA": require("./assets/almanac/forget-me-not_wildflowerA.png"),

  flowery_bush: require("./assets/plants/flowery_bush2.png"),
  flowery_bushA: require("./assets/almanac/flowery_bushA.png"),

  flowering_cactus: require("./assets/plants/flowering_cactus2.png"),
  flowering_cactusA: require("./assets/almanac/flowering_cactusA.png"),

  flamingo_tulip: require("./assets/plants/flamingo_tulip2.png"),
  flamingo_tulipA: require("./assets/almanac/flamingo_tulipA.png"),

  fishy_seaweed: require("./assets/plants/fishy_seaweed2.png"),
  fishy_seaweedA: require("./assets/almanac/fishy_seaweedA.png"),

  "first-frost_bluebell": require("./assets/plants/first-frost_bluebell2.png"),
  "first-frost_bluebellA": require("./assets/almanac/first-frost_bluebellA.png"),

  ducky_reeds: require("./assets/plants/ducky_reeds2.png"),
  ducky_reedsA: require("./assets/almanac/ducky_reedsA.png"),

  dotted_cactus: require("./assets/plants/dotted_cactus2.png"),
  dotted_cactusA: require("./assets/almanac/dotted_cactusA.png"),

  common_carrots: require("./assets/plants/common_carrots2.png"),
  common_carrotsA: require("./assets/almanac/common_carrotsA.png"),

  cherry_grass: require("./assets/plants/cherry_grass2.png"),
  cherry_grassA: require("./assets/almanac/cherry_grassA.png"),

  calla_lily: require("./assets/plants/calla_lily2.png"),
  calla_lilyA: require("./assets/almanac/calla_lilyA.png"),

  californian_chaparral: require("./assets/plants/californian_chaparral2.png"),
  californian_chaparralA: require("./assets/almanac/californian_chaparralA.png"),

  butterfly_iris: require("./assets/plants/butterfly_iris2.png"),
  butterfly_irisA: require("./assets/almanac/butterfly_irisA.png"),

  bushy_butterfly: require("./assets/plants/bushy_butterfly2.png"),
  bushy_butterflyA: require("./assets/almanac/bushy_butterflyA.png"),

  "blue-dotted_bush": require("./assets/plants/blue-dotted_bush2.png"),
  "blue-dotted_bushA": require("./assets/almanac/blue-dotted_bushA.png"),

  blue_cerealcup: require("./assets/plants/blue_cerealcup2.png"),
  blue_cerealcupA: require("./assets/almanac/blue_cerealcupA.png"),

  blue_burst: require("./assets/plants/blue_burst2.png"),
  blue_burstA: require("./assets/almanac/blue_burstA.png"),

  bark_mushroom: require("./assets/plants/bark_mushroom2.png"),
  bark_mushroomA: require("./assets/almanac/bark_mushroomA.png"),

  apple_lotus: require("./assets/plants/apple_lotus2.png"),
  apple_lotusA: require("./assets/almanac/apple_lotusA.png"),

  sunstruck_rose: require("./assets/plants/sunstruck_rose2.png"),
  sunstruck_roseA: require("./assets/almanac/sunstruck_roseA.png"),

  simpson_flower: require("./assets/plants/simpson_flower2.png"),
  simpson_flowerA: require("./assets/almanac/simpson_flowerA.png"),

  purple_cactusflower: require("./assets/plants/purple_cactusflower2.png"),
  purple_cactusflowerA: require("./assets/almanac/purple_cactusflowerA.png"),

  powder_bloom: require("./assets/plants/powder_bloom2.png"),
  powder_bloomA: require("./assets/almanac/powder_bloomA.png"),

  pointy_aloe: require("./assets/plants/pointy_aloe2.png"),
  pointy_aloeA: require("./assets/almanac/pointy_aloeA.png"),

  pink_lily: require("./assets/plants/pink_lily2.png"),
  pink_lilyA: require("./assets/almanac/pink_lilyA.png"),

  peachy_tree: require("./assets/plants/peachy_tree2.png"),
  peachy_treeA: require("./assets/almanac/peachy_treeA.png"),

  paper_fer2: require("./assets/plants/paper_fern2.png"),
  paper_fernA: require("./assets/almanac/paper_fernA.png"),

  miniature_sakura: require("./assets/plants/miniature_sakura2.png"),
  miniature_sakuraA: require("./assets/almanac/miniature_sakuraA.png"),

  lantern_mushroom: require("./assets/plants/lantern_mushroom2.png"),
  lantern_mushroomA: require("./assets/almanac/lantern_mushroomA.png"),

  imposter_corn: require("./assets/plants/imposter_corn2.png"),
  imposter_cornA: require("./assets/almanac/imposter_cornA.png"),

  icefrost_rose: require("./assets/plants/icefrost_rose2.png"),
  icefrost_roseA: require("./assets/almanac/icefrost_roseA.png"),

  henny_flower: require("./assets/plants/henny_flower2.png"),
  henny_flowerA: require("./assets/almanac/henny_flowerA.png"),

  hedgy_lettuce: require("./assets/plants/hedgy_lettuce2.png"),
  hedgy_lettuceA: require("./assets/almanac/hedgy_lettuceA.png"),

  frost_bluebell: require("./assets/plants/frost_bluebell2.png"),
  frost_bluebellA: require("./assets/almanac/frost_bluebellA.png"),

  flame_bud: require("./assets/plants/flame_bud2.png"),
  flame_budA: require("./assets/almanac/flame_budA.png"),

  firefly_fern: require("./assets/plants/firefly_fern2.png"),
  firefly_fernA: require("./assets/almanac/firefly_fernA.png"),

  "dusk-purple_pendents": require("./assets/plants/dusk-purple_pendents2.png"),
  "dusk-purple_pendentsA": require("./assets/almanac/dusk-purple_pendentsA.png"),

  dawn_hibiscus: require("./assets/plants/dawn_hibiscus2.png"),
  dawn_hibiscusA: require("./assets/almanac/dawn_hibiscusA.png"),

  crimson_carnation: require("./assets/plants/crimson_carnation2.png"),
  crimson_carnationA: require("./assets/almanac/crimson_carnationA.png"),

  "cotton-candy_wildflower": require("./assets/plants/cotton-candy_wildflower2.png"),
  "cotton-candy_wildflowerA": require("./assets/almanac/cotton-candy_wildflowerA.png"),

  christmas_tree: require("./assets/plants/christmas_tree2.png"),
  christmas_treeA: require("./assets/almanac/christmas_treeA.png"),

  blue_tulip: require("./assets/plants/blue_tulip2.png"),
  blue_tulipA: require("./assets/almanac/blue_tulipA.png"),

  blue_pinwheel: require("./assets/plants/blue_pinwheel2.png"),
  blue_pinwheelA: require("./assets/almanac/blue_pinwheelA.png"),

  blood_flower: require("./assets/plants/blood_flower2.png"),
  blood_flowerA: require("./assets/almanac/blood_flowerA.png"),

  "yellow-spotted_mushrooms": require("./assets/plants/yellow-spotted_mushrooms2.png"),
  "yellow-spotted_mushroomsA": require("./assets/almanac/yellow-spotted_mushroomsA.png"),

  viney_flower: require("./assets/plants/viney_flower2.png"),
  viney_flowerA: require("./assets/almanac/viney_flowerA.png"),

  venus_flytrap: require("./assets/plants/venus_flytrap2.png"),
  venus_flytrapA: require("./assets/almanac/venus_flytrapA.png"),

  stardust_nightshroom: require("./assets/plants/stardust_nightshroom2.png"),
  stardust_nightshroomA: require("./assets/almanac/stardust_nightshroomA.png"),

  snow_violet: require("./assets/plants/snow_violet2.png"),
  snow_violetA: require("./assets/almanac/snow_violetA.png"),

  skydrop_ghostflower: require("./assets/plants/skydrop_ghostflower2.png"),
  skydrop_ghostflowerA: require("./assets/almanac/skydrop_ghostflowerA.png"),

  quartz_wildflower: require("./assets/plants/quartz_wildflower2.png"),
  quartz_wildflowerA: require("./assets/almanac/quartz_wildflowerA.png"),

  frost_indigo: require("./assets/plants/frost_indigo2.png"),
  frost_indigoA: require("./assets/almanac/frost_indigoA.png"),

  "double-layered_bloom": require("./assets/plants/double-layered_bloom2.png"),
  "double-layered_bloomA": require("./assets/almanac/double-layered_bloomA.png"),

  conchy_flower: require("./assets/plants/conchy_flower2.png"),
  conchy_flowerA: require("./assets/almanac/conchy_flowerA.png"),

  "blue_dames-rocket": require("./assets/plants/blue_dames-rocket2.png"),
  "blue_dames-rocketA": require("./assets/almanac/blue_dames-rocketA.png"),

  blue_daisy: require("./assets/plants/blue_daisy2.png"),
  blue_daisyA: require("./assets/almanac/blue_daisyA.png"),

  amethyst_spikeplant: require("./assets/plants/amethyst_spikeplant2.png"),
  amethyst_spikeplantA: require("./assets/almanac/amethyst_spikeplantA.png")
};

let index = {
  c1: "apple_lotus",
  c2: "bark_mushroom",
  c3: "blue_burst",
  c4: "blue_cerealcup",
  c5: "blue-dotted_bush",
  c6: "bushy_butterfly",
  c7: "butterfly_iris",
  c8: "californian_chaparral",
  c9: "calla_lily",
  c10: "cherry_grass",
  c11: "common_carrots",
  c12: "dotted_cactus",
  c13: "ducky_reeds",
  c14: "first-frost_bluebell",
  c15: "fishy_seaweed",
  c16: "flamingo_tulip",
  c17: "flowering_cactus",
  c18: "flowery_bush",
  c19: "forget-me-not_wildflower",
  c20: "lemon_daisy",
  c21: "mario_mushrooms",
  c22: "monarch_grass",
  c23: "powderball_flower",
  c24: "robin_tulip",
  c25: "scarlet_spiderlily",
  c26: "sharp_succulent",
  c27: "snowcrested_fern",
  c28: "startrail_dandelion",
  c29: "stocky_corn",
  c30: "summer_cactus",
  c31: "undersea_pineapple",
  c32: "white_cupcake",
  c33: "white_frostflower",
  c34: "wild_redquill",
  c35: "yellow_pinwheel",
  c36: "titled_rose",

  u1: "sunstruck_rose",
  u2: "simpson_flower",
  u3: "purple_cactusflower",
  u4: "powder_bloom",
  u5: "pointy_aloe",
  u6: "pink_lily",
  u7: "peachy_tree",
  u8: "paper_fern",
  u9: "miniature_sakura",
  u10: "lantern_mushroom",
  u11: "imposter_corn",
  u12: "icefrost_rose",
  u13: "henny_flower",
  u14: "hedgy_lettuce",
  u15: "frost_bluebell",
  u16: "flame_bud",
  u17: "firefly_fern",
  u18: "dusk-purple_pendents",
  u19: "dawn_hibiscus",
  u20: "crimson_carnation",
  u21: "cotton-candy_wildflower",
  u22: "christmas_tree",
  u23: "blue_tulip",
  u24: "blue_pinwheel",
  u25: "blood_flower",

  r1: "yellow-spotted_mushrooms",
  r2: "viney_flower",
  r3: "venus_flytrap",
  r4: "stardust_nightshroom",
  r5: "snow_violet",
  r6: "skydrop_ghostflower",
  r7: "quartz_wildflower",
  r8: "frost_indigo",
  r9: "double-layered_bloom",
  r10: "conchy_flower",
  r11: "blue_dames-rocket",
  r12: "blue_daisy",
  r13: "amethyst_spikeplant"
};

let ic = 1;
let iu = 1;
let ir = 1;
let currentIndex = "";

export default class Garden extends Component {
  constructor(props) {
    super(props);

    this.assureRefresh();
    this.state = {
      myPlants: "",
      plantsInitialized: false,
      plantsInitialized2: false
    };
  }

  getIndex = r => {
    let index = "";
    if (r == "c") {
      index = r + ic;
      ic++;
    } else if (r == "u") {
      index = r + iu;
      iu++;
    } else {
      index = r + ir;
      ir++;
    }
    currentIndex = index;
    console.log("current index " + currentIndex);
    return index;
  };

  assureRefresh = () => {
    //empty
  };

  initializePlants = async () => {
    this.setState({
      plantsInitialized: true,
      myPlants: await SecureStore.getItemAsync("almanac"),
      plantsInitialized2: true
    });
  };

  renderLoading() {
    return <Loading />;
  }

  render() {
    // console.log("rendering!!");
    this.assureRefresh();
    if (this.state.plantsInitialized == false) this.initializePlants();
    if (this.state.plantsInitialized2 == false) {
      return this.renderLoading();
    } else {
      return this.renderNormal();
    }
  }

  renderNormal() {
    // this.assureRefresh();
    const margin = (screen.height * 4) / 22 - screen.width / 3.5;
    return (
      <SafeAreaView>
        <ScrollView>
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
              <View style={{ flex: 0.1, marginTop: 10 }}>
                <Text style={{ color: "#ffffff", fontSize: 24 }}>COMMON</Text>
              </View>
              <View
                style={{
                  flexDirection: "row"
                  // marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants["none"]["common"]["yellow_pinwheel"][
                    "count"
                  ] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("c")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 0.1, marginTop: 20 }}>
                <Text style={{ color: "#ffffff", fontSize: 24 }}>UNCOMMON</Text>
              </View>
              <View
                style={{
                  flexDirection: "row"
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("u")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 4,
                backgroundColor: "#57423e",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 0.1, marginTop: 20 }}>
                <Text style={{ color: "#ffffff", fontSize: 24 }}>RARE</Text>
              </View>
              <View
                style={{
                  flexDirection: "row"
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
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
                  marginTop: margin
                }} // first row of plants
              >
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.myPlants[index[this.getIndex("r")]] > 0 ? (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex]]}
                    />
                  ) : (
                    <Image
                      style={styles.plants}
                      source={images[index[currentIndex] + "A"]}
                    />
                  )}
                </View>
              </View>
            </View>

            <View
              style={{ flex: 3, backgroundColor: "#0e0e0e", marginTop: 20 }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  //   marginTop: (screen.height * 3) / 22 - screen.width / 5,
                  marginTop: (screen.height * 3) / 22 - screen.width / 4
                  //   marginLeft: screen.width / 14,
                }} // navigation icons
              >
                <View style={{ flex: 0.4 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Home")}
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
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 3.5,
    height: screen.width / 3.5
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9
    // marginLeft: screen.width / 10,
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
  notif: {
    width: screen.height / 28,
    height: screen.height / 28
    // marginBottom: 25
  },
  hidden: {
    width: 0,
    height: 0
  },
  whiteText: {
    color: "#000",
    fontSize: 26
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
    justifyContent: "center"
  },
  smallWhiteText: {
    color: "#ebbd34",
    fontSize: 15,
    marginTop: 5
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
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
