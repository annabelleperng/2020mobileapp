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
  Modal
} from "react-native";
import SeedUtils from "./SeedUtils";
import SeedUtils2 from "./SeedUtils2";
import RewardUtils from "./RewardUtils";

import Loading from "./Loading";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";
import { enableScreens } from "react-native-screens";
import { RotationGestureHandler } from "react-native-gesture-handler";
import { getNativeSourceAndFullInitialStatusForLoadAsync } from "expo-av/build/AV";
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
  "notif ": require("./assets/newicons/newnotif.png")
};

let images1 = {
  invis: require("./assets/invis.png"),
  growing: require("./assets/growinglarge.png"),
  plantpot: require("./assets/plantpotlarge.png"),
  ferns: require("./assets/fernsbig.png"),
  tulips: require("./assets/tulipsbig.png")
};

let images = {
  plantpot: require("./assets/plantpotlarge.png"),
  invis: require("./assets/invis.png"),
  growing: require("./assets/growinglarge.png"),

  growing_c: require("./assets/plants/growing_c.png"),
  growing_u: require("./assets/plants/growing_u.png"),
  growing_r: require("./assets/plants/growing_r.png"),

  yellow_pinwheel2: require("./assets/plants/yellow_pinwheel2.png"),
  yellow_pinwheel3: require("./assets/plants/yellow_pinwheel3.png"),
  yellow_pinwheel4: require("./assets/plants/yellow_pinwheel4.png"),

  wild_redquill2: require("./assets/plants/wild_redquill2.png"),
  wild_redquill3: require("./assets/plants/wild_redquill3.png"),
  wild_redquill4: require("./assets/plants/wild_redquill4.png"),

  white_frostflower2: require("./assets/plants/white_frostflower2.png"),
  white_frostflower3: require("./assets/plants/white_frostflower3.png"),
  white_frostflower4: require("./assets/plants/white_frostflower4.png"),

  white_cupcake2: require("./assets/plants/white_cupcake2.png"),
  white_cupcake3: require("./assets/plants/white_cupcake3.png"),
  white_cupcake4: require("./assets/plants/white_cupcake4.png"),

  undersea_pineapple2: require("./assets/plants/undersea_pineapple2.png"),
  undersea_pineapple3: require("./assets/plants/undersea_pineapple3.png"),
  undersea_pineapple4: require("./assets/plants/undersea_pineapple4.png"),

  titled_rose2: require("./assets/plants/titled_rose2.png"),
  titled_rose3: require("./assets/plants/titled_rose3.png"),
  titled_rose4: require("./assets/plants/titled_rose4.png"),

  sunset_shrooms2: require("./assets/plants/sunset_shrooms2.png"),
  sunset_shrooms3: require("./assets/plants/sunset_shrooms3.png"),
  sunset_shrooms4: require("./assets/plants/sunset_shrooms4.png"),

  summer_cactus2: require("./assets/plants/summer_cactus2.png"),
  summer_cactus3: require("./assets/plants/summer_cactus3.png"),
  summer_cactus4: require("./assets/plants/summer_cactus4.png"),

  stocky_corn2: require("./assets/plants/stocky_corn2.png"),
  stocky_corn3: require("./assets/plants/stocky_corn3.png"),
  stocky_corn4: require("./assets/plants/stocky_corn4.png"),

  startrail_dandelion2: require("./assets/plants/startrail_dandelion2.png"),
  startrail_dandelion3: require("./assets/plants/startrail_dandelion3.png"),
  startrail_dandelion4: require("./assets/plants/startrail_dandelion4.png"),

  snowcrested_fern2: require("./assets/plants/snowcrested_fern2.png"),
  snowcrested_fern3: require("./assets/plants/snowcrested_fern3.png"),
  snowcrested_fern4: require("./assets/plants/snowcrested_fern4.png"),

  sharp_succulent2: require("./assets/plants/sharp_succulent2.png"),
  sharp_succulent3: require("./assets/plants/sharp_succulent3.png"),
  sharp_succulent4: require("./assets/plants/sharp_succulent4.png"),

  scarlet_spiderlily2: require("./assets/plants/scarlet_spiderlily2.png"),
  scarlet_spiderlily3: require("./assets/plants/scarlet_spiderlily3.png"),
  scarlet_spiderlily4: require("./assets/plants/scarlet_spiderlily4.png"),

  robin_tulip2: require("./assets/plants/robin_tulip2.png"),
  robin_tulip3: require("./assets/plants/robin_tulip3.png"),
  robin_tulip4: require("./assets/plants/robin_tulip4.png"),

  powderball_flower2: require("./assets/plants/powderball_flower2.png"),
  powderball_flower3: require("./assets/plants/powderball_flower3.png"),
  powderball_flower4: require("./assets/plants/powderball_flower4.png"),

  monarch_grass2: require("./assets/plants/monarch_grass2.png"),
  monarch_grass3: require("./assets/plants/monarch_grass3.png"),
  monarch_grass4: require("./assets/plants/monarch_grass4.png"),

  mario_mushrooms2: require("./assets/plants/mario_mushrooms2.png"),
  mario_mushrooms3: require("./assets/plants/mario_mushrooms3.png"),
  mario_mushrooms4: require("./assets/plants/mario_mushrooms4.png"),

  lemon_daisy2: require("./assets/plants/lemon_daisy2.png"),
  lemon_daisy3: require("./assets/plants/lemon_daisy3.png"),
  lemon_daisy4: require("./assets/plants/lemon_daisy4.png"),

  "forget-me-not_wildflower2": require("./assets/plants/forget-me-not_wildflower2.png"),
  "forget-me-not_wildflower3": require("./assets/plants/forget-me-not_wildflower3.png"),
  "forget-me-not_wildflower4": require("./assets/plants/forget-me-not_wildflower4.png"),

  flowery_bush2: require("./assets/plants/flowery_bush2.png"),
  flowery_bush3: require("./assets/plants/flowery_bush3.png"),
  flowery_bush4: require("./assets/plants/flowery_bush4.png"),

  flowering_cactus2: require("./assets/plants/flowering_cactus2.png"),
  flowering_cactus3: require("./assets/plants/flowering_cactus3.png"),
  flowering_cactus4: require("./assets/plants/flowering_cactus4.png"),

  flamingo_tulip2: require("./assets/plants/flamingo_tulip2.png"),
  flamingo_tulip3: require("./assets/plants/flamingo_tulip3.png"),
  flamingo_tulip4: require("./assets/plants/flamingo_tulip4.png"),

  fishy_seaweed2: require("./assets/plants/fishy_seaweed2.png"),
  fishy_seaweed3: require("./assets/plants/fishy_seaweed3.png"),
  fishy_seaweed4: require("./assets/plants/fishy_seaweed4.png"),

  "first-frost_bluebell2": require("./assets/plants/first-frost_bluebell2.png"),
  "first-frost_bluebell3": require("./assets/plants/first-frost_bluebell3.png"),
  "first-frost_bluebell4": require("./assets/plants/first-frost_bluebell4.png"),

  ducky_reeds2: require("./assets/plants/ducky_reeds2.png"),
  ducky_reeds3: require("./assets/plants/ducky_reeds3.png"),
  ducky_reeds4: require("./assets/plants/ducky_reeds4.png"),

  dotted_cactus2: require("./assets/plants/dotted_cactus2.png"),
  dotted_cactus3: require("./assets/plants/dotted_cactus3.png"),
  dotted_cactus4: require("./assets/plants/dotted_cactus4.png"),

  common_carrots2: require("./assets/plants/common_carrots2.png"),
  common_carrots3: require("./assets/plants/common_carrots3.png"),
  common_carrots4: require("./assets/plants/common_carrots4.png"),

  cherry_grass2: require("./assets/plants/cherry_grass2.png"),
  cherry_grass3: require("./assets/plants/cherry_grass3.png"),
  cherry_grass4: require("./assets/plants/cherry_grass4.png"),

  calla_lily2: require("./assets/plants/calla_lily2.png"),
  calla_lily3: require("./assets/plants/calla_lily3.png"),
  calla_lily4: require("./assets/plants/calla_lily4.png"),

  californian_chaparral2: require("./assets/plants/californian_chaparral2.png"),
  californian_chaparral3: require("./assets/plants/californian_chaparral3.png"),
  californian_chaparral4: require("./assets/plants/californian_chaparral4.png"),

  butterfly_iris2: require("./assets/plants/butterfly_iris2.png"),
  butterfly_iris3: require("./assets/plants/butterfly_iris3.png"),
  butterfly_iris4: require("./assets/plants/butterfly_iris4.png"),

  bushy_butterfly2: require("./assets/plants/bushy_butterfly2.png"),
  bushy_butterfly3: require("./assets/plants/bushy_butterfly3.png"),
  bushy_butterfly4: require("./assets/plants/bushy_butterfly4.png"),

  "blue-dotted_bush2": require("./assets/plants/blue-dotted_bush2.png"),
  "blue-dotted_bush3": require("./assets/plants/blue-dotted_bush3.png"),
  "blue-dotted_bush4": require("./assets/plants/blue-dotted_bush4.png"),

  blue_cerealcup2: require("./assets/plants/blue_cerealcup2.png"),
  blue_cerealcup3: require("./assets/plants/blue_cerealcup3.png"),
  blue_cerealcup4: require("./assets/plants/blue_cerealcup4.png"),

  blue_burst2: require("./assets/plants/blue_burst2.png"),
  blue_burst3: require("./assets/plants/blue_burst3.png"),
  blue_burst4: require("./assets/plants/blue_burst4.png"),

  bark_mushroom2: require("./assets/plants/bark_mushroom2.png"),
  bark_mushroom3: require("./assets/plants/bark_mushroom3.png"),
  bark_mushroom4: require("./assets/plants/bark_mushroom4.png"),

  apple_lotus2: require("./assets/plants/apple_lotus2.png"),
  apple_lotus3: require("./assets/plants/apple_lotus3.png"),
  apple_lotus4: require("./assets/plants/apple_lotus4.png"),

  sunstruck_rose2: require("./assets/plants/sunstruck_rose2.png"),
  sunstruck_rose3: require("./assets/plants/sunstruck_rose3.png"),
  sunstruck_rose4: require("./assets/plants/sunstruck_rose4.png"),

  simpson_flower2: require("./assets/plants/simpson_flower2.png"),
  simpson_flower3: require("./assets/plants/simpson_flower3.png"),
  simpson_flower4: require("./assets/plants/simpson_flower4.png"),

  purple_cactusflower2: require("./assets/plants/purple_cactusflower2.png"),
  purple_cactusflower3: require("./assets/plants/purple_cactusflower3.png"),
  purple_cactusflower4: require("./assets/plants/purple_cactusflower4.png"),

  powder_bloom2: require("./assets/plants/powder_bloom2.png"),
  powder_bloom3: require("./assets/plants/powder_bloom3.png"),
  powder_bloom4: require("./assets/plants/powder_bloom4.png"),

  pointy_aloe2: require("./assets/plants/pointy_aloe2.png"),
  pointy_aloe3: require("./assets/plants/pointy_aloe3.png"),
  pointy_aloe4: require("./assets/plants/pointy_aloe4.png"),

  pink_lily2: require("./assets/plants/pink_lily2.png"),
  pink_lily3: require("./assets/plants/pink_lily3.png"),
  pink_lily4: require("./assets/plants/pink_lily4.png"),

  peachy_tree2: require("./assets/plants/peachy_tree2.png"),
  peachy_tree3: require("./assets/plants/peachy_tree3.png"),
  peachy_tree4: require("./assets/plants/peachy_tree4.png"),

  paper_fern2: require("./assets/plants/paper_fern2.png"),
  paper_fern3: require("./assets/plants/paper_fern3.png"),
  paper_fern4: require("./assets/plants/paper_fern4.png"),

  miniature_sakura2: require("./assets/plants/miniature_sakura2.png"),
  miniature_sakura3: require("./assets/plants/miniature_sakura3.png"),
  miniature_sakura4: require("./assets/plants/miniature_sakura4.png"),

  lantern_mushroom2: require("./assets/plants/lantern_mushroom2.png"),
  lantern_mushroom3: require("./assets/plants/lantern_mushroom3.png"),
  lantern_mushroom4: require("./assets/plants/lantern_mushroom4.png"),

  imposter_corn2: require("./assets/plants/imposter_corn2.png"),
  imposter_corn3: require("./assets/plants/imposter_corn3.png"),
  imposter_corn4: require("./assets/plants/imposter_corn4.png"),

  icefrost_rose2: require("./assets/plants/icefrost_rose2.png"),
  icefrost_rose3: require("./assets/plants/icefrost_rose3.png"),
  icefrost_rose4: require("./assets/plants/icefrost_rose4.png"),

  henny_flower2: require("./assets/plants/henny_flower2.png"),
  henny_flower3: require("./assets/plants/henny_flower3.png"),
  henny_flower4: require("./assets/plants/henny_flower4.png"),

  hedgy_lettuce2: require("./assets/plants/hedgy_lettuce2.png"),
  hedgy_lettuce3: require("./assets/plants/hedgy_lettuce3.png"),
  hedgy_lettuce4: require("./assets/plants/hedgy_lettuce4.png"),

  frost_bluebell2: require("./assets/plants/frost_bluebell2.png"),
  frost_bluebell3: require("./assets/plants/frost_bluebell3.png"),
  frost_bluebell4: require("./assets/plants/frost_bluebell4.png"),

  flame_bud2: require("./assets/plants/flame_bud2.png"),
  flame_bud3: require("./assets/plants/flame_bud3.png"),
  flame_bud4: require("./assets/plants/flame_bud4.png"),

  firefly_fern2: require("./assets/plants/firefly_fern2.png"),
  firefly_fern3: require("./assets/plants/firefly_fern3.png"),
  firefly_fern4: require("./assets/plants/firefly_fern4.png"),

  "dusk-purple_pendents2": require("./assets/plants/dusk-purple_pendents2.png"),
  "dusk-purple_pendents3": require("./assets/plants/dusk-purple_pendents3.png"),
  "dusk-purple_pendents4": require("./assets/plants/dusk-purple_pendents4.png"),

  dawn_hibiscus2: require("./assets/plants/dawn_hibiscus2.png"),
  dawn_hibiscus3: require("./assets/plants/dawn_hibiscus3.png"),
  dawn_hibiscus4: require("./assets/plants/dawn_hibiscus4.png"),

  crimson_carnation2: require("./assets/plants/crimson_carnation2.png"),
  crimson_carnation3: require("./assets/plants/crimson_carnation3.png"),
  crimson_carnation4: require("./assets/plants/crimson_carnation4.png"),

  "cotton-candy_wildflower2": require("./assets/plants/cotton-candy_wildflower2.png"),
  "cotton-candy_wildflower3": require("./assets/plants/cotton-candy_wildflower3.png"),
  "cotton-candy_wildflower4": require("./assets/plants/cotton-candy_wildflower4.png"),

  christmas_tree2: require("./assets/plants/christmas_tree2.png"),
  christmas_tree3: require("./assets/plants/christmas_tree3.png"),
  christmas_tree4: require("./assets/plants/christmas_tree4.png"),

  blue_tulip2: require("./assets/plants/blue_tulip2.png"),
  blue_tulip3: require("./assets/plants/blue_tulip3.png"),
  blue_tulip4: require("./assets/plants/blue_tulip4.png"),

  blue_pinwheel2: require("./assets/plants/blue_pinwheel2.png"),
  blue_pinwheel3: require("./assets/plants/blue_pinwheel3.png"),
  blue_pinwheel4: require("./assets/plants/blue_pinwheel4.png"),

  blood_flower2: require("./assets/plants/blood_flower2.png"),
  blood_flower3: require("./assets/plants/blood_flower3.png"),
  blood_flower4: require("./assets/plants/blood_flower4.png"),

  "yellow-spotted_mushrooms2": require("./assets/plants/yellow-spotted_mushrooms2.png"),
  "yellow-spotted_mushrooms3": require("./assets/plants/yellow-spotted_mushrooms3.png"),
  "yellow-spotted_mushrooms4": require("./assets/plants/yellow-spotted_mushrooms4.png"),

  viney_flower2: require("./assets/plants/viney_flower2.png"),
  viney_flower3: require("./assets/plants/viney_flower3.png"),
  viney_flower4: require("./assets/plants/viney_flower4.png"),

  venus_flytrap2: require("./assets/plants/venus_flytrap2.png"),
  venus_flytrap3: require("./assets/plants/venus_flytrap3.png"),
  venus_flytrap4: require("./assets/plants/venus_flytrap4.png"),

  stardust_nightshroom2: require("./assets/plants/stardust_nightshroom2.png"),
  stardust_nightshroom3: require("./assets/plants/stardust_nightshroom3.png"),
  stardust_nightshroom4: require("./assets/plants/stardust_nightshroom4.png"),

  snow_violet2: require("./assets/plants/snow_violet2.png"),
  snow_violet3: require("./assets/plants/snow_violet3.png"),
  snow_violet4: require("./assets/plants/snow_violet4.png"),

  skydrop_ghostflower2: require("./assets/plants/skydrop_ghostflower2.png"),
  skydrop_ghostflower3: require("./assets/plants/skydrop_ghostflower3.png"),
  skydrop_ghostflower4: require("./assets/plants/skydrop_ghostflower4.png"),

  quartz_wildflower2: require("./assets/plants/quartz_wildflower2.png"),
  quartz_wildflower3: require("./assets/plants/quartz_wildflower3.png"),
  quartz_wildflower4: require("./assets/plants/quartz_wildflower4.png"),

  frost_indigo2: require("./assets/plants/frost_indigo2.png"),
  frost_indigo3: require("./assets/plants/frost_indigo3.png"),
  frost_indigo4: require("./assets/plants/frost_indigo4.png"),

  "double-layered_bloom2": require("./assets/plants/double-layered_bloom2.png"),
  "double-layered_bloom3": require("./assets/plants/double-layered_bloom3.png"),
  "double-layered_bloom4": require("./assets/plants/double-layered_bloom4.png"),

  conchy_flower2: require("./assets/plants/conchy_flower2.png"),
  conchy_flower3: require("./assets/plants/conchy_flower3.png"),
  conchy_flower4: require("./assets/plants/conchy_flower4.png"),

  "blue_dames-rocket2": require("./assets/plants/blue_dames-rocket2.png"),
  "blue_dames-rocket3": require("./assets/plants/blue_dames-rocket3.png"),
  "blue_dames-rocket4": require("./assets/plants/blue_dames-rocket4.png"),

  blue_daisy2: require("./assets/plants/blue_daisy2.png"),
  blue_daisy3: require("./assets/plants/blue_daisy3.png"),
  blue_daisy4: require("./assets/plants/blue_daisy4.png"),

  amethyst_spikeplant2: require("./assets/plants/amethyst_spikeplant2.png"),
  amethyst_spikeplant3: require("./assets/plants/amethyst_spikeplant3.png"),
  amethyst_spikeplant4: require("./assets/plants/amethyst_spikeplant4.png")
};

export default class Garden extends Component {
  constructor(props) {
    super(props);
    // this.initializeGarden();
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
      plantsInitialized2: false,

      gold: -1,
      gems: -1
    };
  }

  assureRefresh = () => {
    //empty
  };

  initializeGarden = async () => {
    console.log("initializing garden...");
    await SecureStore.setItemAsync("inventory_water", "1000");
    await SecureStore.setItemAsync("inventory_bees", "5");
    await SecureStore.setItemAsync("inventory_seeds", "");
    await SecureStore.setItemAsync("inventory_gold", "1500");
    await SecureStore.setItemAsync("inventory_fertilizer", "100");
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
      status: 2,
      position: 1,
      permanent: {
        event: "none",
        rarity: "R",
        species: "stardust_nightshroom",
        date_planted: "",
        price: "550"
      },
      zero: { zero_image: "plantpot" },
      one: {
        one_image: "growing_rs",
        grow_start: "",
        grow_offset: 0,
        grow_streak_length: 2
      },
      two: {
        two_image: "stardust_nightshroom2",
        current_waters: 8,
        water_start: "",
        water_end: "2020-09-07T17:52:25.437-07:00"
      },
      three: {
        three_image: "stardust_nightshroom3",
        wilt_start: "",
        wilt_end: "2020-09-10T17:52:25.437-07:00"
      },
      four: { four_image: "stardust_nightshroom4" }
    };

    let seeds2 = {
      none: { C: 8, U: 50, R: 50 },
      christmas: { C: 0, U: 0, R: 0 },
      valentines: { C: 0, U: 0, R: 0 }
    };
    let seedsString2 = JSON.stringify(seeds2);

    await SecureStore.setItemAsync("inventory_seeds", seedsString2);

    let hardcoded_plant_str = JSON.stringify(hardcoded_plant);
    await SecureStore.setItemAsync("1_plant", hardcoded_plant_str);
    // await SecureStore.setItemAsync("2_plant", hardcoded_plant_str);

    console.log("done initializing garden");
  };

  //   componentDidMount() {
  //     this.assureRefresh();
  //   }

  UNSAFE_componentWillReceiveProps() {
    this.setState({ plantsInitialized2: false });
    this.refreshPlants(); // sets plantsInitialized to false
    this.showNotifs();
  }

  updateStuff = async plant => {
    const localTime = DateTime.local();

    const gardenLastUpdated = DateTime.fromISO(
      await SecureStore.getItemAsync("garden_last_updated")
    );
    const gardenMidnight = DateTime.fromObject({
      year: gardenLastUpdated.year,
      month: gardenLastUpdated.month,
      day: gardenLastUpdated.day,
      hour: 0,
      minute: 0,
      second: 0
      // zone: localZone,
    });
    // console.log("garden last updated: " + gardenLastUpdated);

    // let start;
    // if (plant["status"] == 2) {
    //   start = DateTime.fromISO(
    //     plant["two"]["water_start"]
    //   );
    // } else  if (plant["status"] == 3) {
    //   start = DateTime.fromISO(plant["three"]["wilt_start"]);
    // }

    // console.log("localTime is " + localTime.toISO());
    // console.log("periodStart is " + periodStart.toISO());
    const diff = localTime.diff(gardenMidnight);
    // console.log("difference is" + diff);
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
    const res = await seedUtils2.breedPlants(
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
        acquiredSeed: "ERROR\n\nCould not breed plants!\n\nNo bees consumed."
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
      acquiredSeed: resString
    });
    await this.syncInventory();
    this.hideBees();
  };

  selectBreeding = (key, position) => {
    // console.log("selectBreeding called with (" + key + ", " + position + ")");
    if (this.state.showBees == false) {
      return;
    }

    const plant = "plant" + position;
    if (this.state[plant]["status"] != 2) {
      return;
    }
    if (
      this.state.selectedParents == 0 ||
      (this.state.selectedParents == 1 && this.state.firstParent == position)
    ) {
      //   console.log("1st case");
      this.setState({ selectedParents: 1, firstParent: position });
    } else if (this.state.selectedParents == 1) {
      //   console.log("2nd case");
      this.setState({ selectedParents: 2, secondParent: position });
    } else {
      //   console.log("3rd case");
      //   console.log(this.state);
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
      selectedParents: 0
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
    // console.log(
    //   "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    // );
    if (this.state.inventorySynced == false) {
      var bees = Number.parseInt(
        await SecureStore.getItemAsync("inventory_bees")
      );
      var gold = Number.parseInt(
        await SecureStore.getItemAsync("inventory_gold")
      );
      var gems = Number.parseInt(
        await SecureStore.getItemAsync("inventory_gems")
      );
      if (gold != gold || gold < 0) {
        console.log("gold: " + gold);
        gold = 0;
        await SecureStore.setItemAsync("inventory_gold", "0");
      }
      if (gems != gems || gems < 0) {
        console.log("gems: " + gems);
        gems = 0;
        await SecureStore.setItemAsync("inventory_gems", "0");
      }
      this.setState({
        inventorySynced: true,
        inventory_bees: bees,
        gold: gold,
        gems: gems
      });
      //   console.log("bees = " + bees);
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
        plant9: plant9
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
        plant_image_9: this.determineImage(plant9)
      });

      //   this.state.plant1["status"] = 2;
      //   this.state.plant3["status"] = 2;
      //   this.state.plant4["status"] = 2;
      //   this.state.plant5["status"] = 2;
      //   this.state.plant8["status"] = 2;

      //   this.state.plant1["two"]["current_waters"] = 74;
      //   this.state.plant5["two"]["current_waters"] = 32;

      this.showNotifs();

      //   setTimeout(() => {
      //     this.setState({ plantsInitialized2: true });
      //   }, 3000);

      this.setState({ plantsInitialized2: true });
    }
  };

  showNotifs = () => {
    // console.log(this.state);
    if (
      (this.state.plant1["status"] == 2 || this.state.plant1["status"] == 3) &&
      this.state.plant1["two"]["current_waters"] < 15
    )
      this.setState({ bee1: "notif " });
    else this.setState({ bee1: "invis " });

    if (
      (this.state.plant2["status"] == 2 || this.state.plant2["status"] == 3) &&
      this.state.plant2["two"]["current_waters"] < 15
    )
      this.setState({ bee2: "notif " });
    else this.setState({ bee2: "invis " });

    if (
      (this.state.plant3["status"] == 2 || this.state.plant3["status"] == 3) &&
      this.state.plant3["two"]["current_waters"] < 15
    )
      this.setState({ bee3: "notif " });
    else this.setState({ bee3: "invis " });

    if (
      (this.state.plant4["status"] == 2 || this.state.plant4["status"] == 3) &&
      this.state.plant4["two"]["current_waters"] < 15
    )
      this.setState({ bee4: "notif " });
    else this.setState({ bee4: "invis " });

    if (
      (this.state.plant5["status"] == 2 || this.state.plant5["status"] == 3) &&
      this.state.plant5["two"]["current_waters"] < 15
    )
      this.setState({ bee5: "notif " });
    else this.setState({ bee5: "invis " });

    if (
      (this.state.plant6["status"] == 2 || this.state.plant6["status"] == 3) &&
      this.state.plant6["two"]["current_waters"] < 15
    )
      this.setState({ bee6: "notif " });
    else this.setState({ bee6: "invis " });

    if (
      (this.state.plant7["status"] == 2 || this.state.plant7["status"] == 3) &&
      this.state.plant7["two"]["current_waters"] < 15
    )
      this.setState({ bee7: "notif " });
    else this.setState({ bee7: "invis " });

    if (
      (this.state.plant8["status"] == 2 || this.state.plant8["status"] == 3) &&
      this.state.plant8["two"]["current_waters"] < 15
    )
      this.setState({ bee8: "notif " });
    else this.setState({ bee8: "invis " });

    if (
      (this.state.plant9["status"] == 2 || this.state.plant9["status"] == 3) &&
      this.state.plant9["two"]["current_waters"] < 15
    )
      this.setState({ bee9: "notif " });
    else this.setState({ bee9: "invis " });
  };

  determineImage = plant => {
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

  initializePlant = plant => {};

  refreshPlants = () => {
    this.setState({ plantsInitialized: false });
  };

  renderLoading() {
    return <Loading />;
  }

  render() {
    // console.log("rendering!!");
    this.assureRefresh();
    this.syncInventory();
    if (this.state.plantSynced == false) this.initializePlants();
    if (this.state.plantsInitialized2 == false) {
      return this.renderLoading();
    } else {
      return this.renderNormal();
    }
  }

  renderNormal() {
    // this.updateStuff();

    // console.log(this.state.plantsInitialized);

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
          justifyContent: "center"
        }}
      >
        <View
          style={{
            backgroundColor: "#334E33",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          {console.log("STATE GEMS: " + this.state.gems)}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={styles.smallButton}
              source={require("./assets/gold.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gold}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#334E33",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("GemShop")}
                >
                  <Image
                    style={styles.smallButton}
                    source={require("./assets/plus.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Image
                  style={styles.smallButton}
                  source={require("./assets/newicons/newgemplain.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gems}</Text>
          </View>
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              marginTop: margin
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
                    rarity: ""
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
                    rarity: ""
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
                    rarity: ""
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
            justifyContent: "center"
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
              marginTop: margin
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
                    rarity: ""
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
                    rarity: ""
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
                    rarity: ""
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
            justifyContent: "center"
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
              marginTop: margin
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
                    rarity: ""
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
                    rarity: ""
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
                    rarity: ""
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
            justifyContent: "center"
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
            alignItems: "center"
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
                  source={require("./assets/newicons/newhouse.png")}
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
                  source={require("./assets/largeshop34.png")}
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
                  style={styles.menuIcons3}
                  source={require("./assets/newicons/newalmanac.png")}
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
    height: screen.width / 3.5
  },
  menuIcons: {
    width: screen.width / 8.5,
    height: screen.width / 8.5
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9
    // marginLeft: screen.width / 10,
  },
  menuIcons3: {
    width: screen.width / 7.5,
    height: screen.width / 7.5
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
