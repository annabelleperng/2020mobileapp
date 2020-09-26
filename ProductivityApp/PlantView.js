import React, { Component, Suspense } from "react";
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

import Loading from "./Loading";

import ProgressBarAnimated from "react-native-progress-bar-animated";

const screen = Dimensions.get("window");
import SeedUtils2 from "./SeedUtils2";
const su = new SeedUtils2();

let images1 = {
  invis: require("./assets/invis.png"),
  growing: require("./assets/growinglarge.png"),
  plantpot: require("./assets/plantpotlarge.png"),
  ferns: require("./assets/fernsbig.png"),
  tulips: require("./assets/tulipsbig.png"),
};

let images = {
  plantpot: require("./assets/plants/empty_c.png"),
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
  amethyst_spikeplant4: require("./assets/plants/amethyst_spikeplant4.png"),
};

import * as SecureStore from "expo-secure-store";
import { screensEnabled } from "react-native-screens";
import { RECORDING_OPTION_IOS_OUTPUT_FORMAT_APPLELOSSLESS } from "expo-av/build/Audio";
export default class GardenTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant_position: this.props.route.params.position,

      seed_event: this.props.route.params.event,
      seed_rarity: this.props.route.params.rarity,
      seeds_set: false,
      seed_decision: false,

      plant_status: 0,
      //   plant_waters: 0,

      showCancel: false,
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
      inventory_gems: 0,
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
      plant_price: 0,
      //
      alert_title: "",
      alert_info: "",

      growth_streak_length: 0,

      specifics_prepared: false,
      inventory_set_check: false,

      checked_wilted: false,

      gold: -1,
      gems: -1,

      confirmSell: false,
    };

    // console.log(this.props);
  }

  UNSAFE_componentWillReceiveProps() {
    this.setState({
      plant_position: this.props.route.params.position,

      seed_event: this.props.route.params.event,
      seed_rarity: this.props.route.params.rarity,
    });
  }

  checkInitialized = async () => {
    console.log("checking if initialized!");

    if (this.props.route.params.event != "" && this.state.seed_event == "") {
      this.setState({
        plant_position: this.props.route.params.position,

        seed_event: this.props.route.params.event,
        seed_rarity: this.props.route.params.rarity,
        inventory_set: false,
      });

      this.showInventoryThird();
      this.showRightSide();
    }

    // console.log(this.state);
    // const initialized = await SecureStore.getItemAsync("garden_initialized");
    // if (initialized === null) {
    //   console.log("not initialized");
    //   this.initializeGarden();
    //   await SecureStore.setItemAsync("garden_initialized", "true");
    // }
    // this.initializeGarden();
  };

  //   componentWillUnmount = () => {
  //     console.log("here - unmounted");
  //     // this.stopPlaying();
  //   };

  initializeGarden = async () => {};

  toggleCancel = () => {
    if (this.state.showCancel) {
      this.setState({ showCancel: false });
    } else {
      this.setState({ showCancel: true });
    }
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
      console.log("error: cannot use elixir on a plant that isn't wilted");
      return -1;
    }

    // gets inventory elixir count
    let inventory_elixir = Number.parseInt(
      await SecureStore.getItemAsync("inventory_elixir")
    );

    if (inventory_elixir < 1) {
      console.log("error: not enough elixir to use");
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
      console.log("error: cannot use fertilizer on a plant that isn't growing");
      return -1;
    }

    // gets inventory elixir count
    let inventory_fertilizer = Number.parseInt(
      await SecureStore.getItemAsync("inventory_fertilizer")
    );

    if (inventory_fertilizer < 1) {
      console.log("error: not enough fertilizer to use");
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
    // this.increase("progress", 100);
    this.setState({
      inventory_fertilizer: inventory_fertilizer,
      countdownSet: false,
      countdownFullySet: false,
      inventory_set: false,
    });
  };

  useShovel = async () => {
    if (this.state.plant_status != 4) {
      console.log("error: cannot use shovel on a plant that isn't dead");
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

  useGems = async () => {
    if (this.state.plant_status != 4) {
      console.log("error: can only revive dead plants");
      return -1;
    }

    let inventory_gems = Number.parseInt(
      await SecureStore.getItemAsync("inventory_gems")
    );

    if (inventory_gems < 1) {
      console.log("error: not enough gems to use");
      alert(
        "You don't have enough gems! " + "Gems can be bought from the gem shop."
      );
      return -1;
    }

    let key = this.state.plant_position + "_plant";
    let plant = JSON.parse(await SecureStore.getItemAsync(key));

    inventory_gems -= 1;

    this.setState({ plant_status: 3, inventory_gems: inventory_gems });

    Alert.alert(
      "SUCCESS!",
      "You used x1 GEM to revitalize the plant.",
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );

    plant["status"] = 3;
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
      plant_status: 3,
      inventory_water: 0,
      progress: 0,
    });

    // sets SecureStore values
    await SecureStore.setItemAsync("inventory_gems", "" + inventory_gems);
    await SecureStore.setItemAsync(key, JSON.stringify(plant));

    // updates progress bar, display number
    this.increase("progress", 100);
    this.setState({
      countdownSet: false,
      countdownFullySet: false,
      inventory_set: false,
    });
  };

  refreshAll = () => {
    this.setState({ inventory_set: false });
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

  /* Master setup function */
  getInventoryCounts = async () => {
    console.log("getInventoryCounts called");
    if (this.state.inventory_set == false) {
      console.log("(resetting inventory)");

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

      console.log("HAHAHHAHAHHAHAAAAAAHAAAAAAAAAAHAAAAAAAAAHHHHAAAAAAAAAA");
      let gold = Number.parseInt(
        await SecureStore.getItemAsync("inventory_gold")
      );
      let gems = Number.parseInt(
        await SecureStore.getItemAsync("inventory_gems")
      );
      if (gold != gold || gold < 0) {
        console.log("goldgoldgold: " + gold);
        gold = 0;
        await SecureStore.setItemAsync("inventory_gold", "0");
      }
      if (gems != gems || gems < 0) {
        gems = 0;
        await SecureStore.setItemAsync("inventory_gems", "0");
      }

      this.determineInfo(plant);

      this.setState({
        inventory_water: water,
        inventory_fertilizer: fertilizer,
        inventory_bees: bees,
        inventory_elixir: elixir,
        plant_image: image,
        plant: plant,
        plant_status: plant["status"],
        gold: Number.parseInt(await SecureStore.getItemAsync("inventory_gold")),
        gems: gems,
      });

      console.log("status is " + plant["status"]);
      await this.prepareSpecifics(plant);

      //   setTimeout(() => {
      //     this.setState({ inventory_set_check: true });
      //   }, 30000);

      this.setState({ inventory_set_check: true }); // for render to check
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
      this.setState({ plant_price: plant["permanent"]["price"] });

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
      let key = this.state.plant_position + "_plant";
      console.log("kEYYYYYYYYYYYYYYYYY = " + key);
      let growthStreak = plant["one"]["grow_streak_length"];
      this.setState({ growth_streak_length: growthStreak });
      if (growthStreak == 0) {
        this.setState({ progress: 0 });
      } else if (growthStreak == 1) {
        this.setState({ progress: 33 });
      } else if (growthStreak == 2) {
        this.setState({ progress: 66 });
      } else if (growthStreak == 3) {
        this.setState({ progress: 100 });
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

        await SecureStore.setItemAsync(key, JSON.stringify(plant));

        // updates progress bar, display number
        // this.increase("progress", 100);
        this.setState({
          countdownSet: false,
          countdownFullySet: false,
          inventory_set: false,
        });
      }
    }
    //
    //
    //
    else {
    }
    this.setState({ specifics_prepared: true });
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

    // console.log("pos_waters from CHECKWATERING OPTIONS = " + pos_waters);
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

    // console.log("DONE W/ CHECKING WATERING OPTIONS");
  };

  checkIfWilted = async () => {
    if (
      this.state.countdownFullySet == true &&
      this.state.checked_wilted == false
    ) {
      this.setState({ checked_wilted: true });
      const res = await su.updateWilting(this.state.plant);
      console.log("checkIfWilted: result from updateWilting is " + res);
      if (res == 3) {
        alert("Your plant wilted! Use elixir to revive it.");
        this.setState({
          countdownSet: false,
          countdownFullySet: false,
          inventory_set: false,
        });
      } else if (res == 4) {
        alert("Your plant died!");
        this.setState({
          inventory_set: false,
        });
      } else {
        alert("Your plant is thriving! New streak started.");
        this.setState({
          countdownSet: false,
          countdownFullySet: false,
          inventory_set: false,
        });
        //   this.getCountdownLength();
      }
    }
  };

  checkSeeds = async () => {
    if (
      this.state.seed_event == "" ||
      this.state.seed_rarity == "" ||
      this.state.seeds_set == true
    ) {
      return;
    }

    this.setState({ seeds_set: true });

    let title = "Success! Seed planted.";
    let info = "\n";

    if (this.state.seed_rarity == "R") {
      info += "Rarity: RARE\n\n";
    } else if (this.state.seed_rarity == "U") {
      info += "Rarity: UNCOMMON\n\n";
    } else {
      info += "Rarity: COMMON\n\n";
    }

    info += "Event Type: " + this.state.seed_event.toUpperCase();

    Alert.alert(
      title.toString(),
      info.toString(),
      [
        {
          text: "OK",
          onPress: () => this.setState({ seed_decision: true }),
        },
      ],
      { cancelable: false }
    );

    console.log(
      this.state.plant_positio +
        "\n\n\n" +
        this.state.seed_event +
        "\n\n\n" +
        this.state.seed_rarity
    );
    await su.plantSeed(
      this.state.plant_position,
      this.state.seed_event,
      this.state.seed_rarity
    );

    // checking if the planted seed was correctly stored:

    // let pl = await SecureStore.getItemAsync(
    //   this.state.plant_position + "_plant"
    // );
    // console.log(JSON.stringify(pl));

    this.setState({ inventory_set: false });
    await this.getInventoryCounts();
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
            // onPress={() => this.props.navigation.navigate("Shop")}
            onPress={() => this.useElixir.bind(this)}
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
          <Text
            style={[
              styles.smallWhiteText,
              { color: this.state.confirmSell ? "#ff3d61" : "#cf8165" },
            ]}
          >
            SELL
          </Text>

          <View style={{ flex: 0.1 }}></View>
          <TouchableOpacity
            onPress={this.sellThisPlant}
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
            onPress={() => this.useFertilizer()}
            activeOpacity={0.5}
            // inventory item: fertilizer
          >
            <Image
              source={require("./assets/newicons/newfertilizer.png")}
              style={styles.menuIcons2}
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
                position: this.state.plant_position,
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
                  position: this.state.plant_position,
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
              onPress={() => this.props.navigation.navigate("Home")}
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
              flex: Platform.OS == "android" ? 0.9 : 0.3,
            }}
          >
            <View>
              <Text></Text>
              {3 - this.state.growth_streak_length == 1 ? (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.whiteText}>
                    {3 - this.state.growth_streak_length} more day of sprinting
                  </Text>
                  <Text style={styles.whiteText}>until fully grown</Text>
                </View>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.whiteText}>
                    {3 - this.state.growth_streak_length} more days of sprinting
                    until grown
                  </Text>
                </View>
              )}
            </View>
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
              width={screen.width / 2}
              value={this.state.progress}
              backgroundColorOnComplete="#ff427b"
              // progress bar
            />
            <Text></Text>
            {this.state.growth_streak_length == 1 ? (
              <View>
                <Text style={styles.smallWhiteText}>1/3 DAYS OF SPRINTING</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.smallWhiteText}>
                  {this.state.growth_streak_length}/3 DAYS OF SPRINTING
                </Text>
              </View>
            )}

            <Text></Text>
          </View>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.8 }}>
            <TouchableOpacity onPress={this.useFertilizer.bind(this)}>
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
                <Text style={[styles.rectangularText, { fontSize: 18 }]}>
                  FERTILIZE
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      ); // BTS // BTS
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
            Use the shovel in your inventory to dig it up
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginLeft: screen.width / 30,
              marginRight: screen.width / 30,
            }}
          >
            Use a gem to revive it.
          </Text>
          <View style={{ marginBottom: screen.height / 20 }}></View>
          <TouchableOpacity onPress={this.useGems.bind(this)}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#111",
                justifyContent: "center",
                alignItems: "center",
              }}
              // right side for progress bar and buttons
            >
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Image
                      style={styles.smallButton}
                      source={require("./assets/newicons/newgemplain.png")}
                    />
                  </View>
                  <View style={{ flex: 1.5, alignItems: "flex-start" }}>
                    <Text
                      style={[
                        styles.rectangularText,
                        { fontSize: 18, color: "#eee" },
                      ]}
                    >
                      REVIVE
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
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

  sellThisPlant = async () => {
    if (this.state.confirmSell == false) {
      Alert.alert(
        "Sell Plant for " + this.state.plant_price + " Gold",
        "\nAre you sure you wish to sell this plant?\n\n Click Yes, " +
          "then click the sell button again to confirm.",
        [
          {
            text: "Yes",
            onPress: () => this.setState({ confirmSell: true }),
            // this.props.navigation.navigate("PlantView", {
            //   position: this.state.plant_position,
            //   event: e,
            //   rarity: r
            // })
            // this.setState({ quitConfirm: true }),
          },
          { text: "Cancel" },
        ],
        { cancelable: false }
      );
      return;
    }

    await su.sellPlant(this.state.plant);

    Alert.alert(
      "SUCCESS",
      "Plant sold! " + this.state.plant_price + " Gold obtained.",
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

  getCountdownLength = async () => {
    // console.log("getCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("error: position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const plantKey = pos + "_plant";
      let plant = JSON.parse(await SecureStore.getItemAsync(plantKey));

      const end = DateTime.fromISO(plant["two"]["water_end"]);
      //   console.log(end.toISO() + "end234321 ");

      const currDate = DateTime.local();

      //   console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      //   console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  getGrownCountdownLength = async (plant) => {
    // console.log("getGrownCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("error: position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const end = DateTime.fromISO(plant["two"]["water_end"]);
      //   console.log(end.toISO() + "end1131grown");

      const currDate = DateTime.local();

      //   console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      //   console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  getWiltedCountdownLength = async (plant) => {
    // console.log("getWiltedCountdownLength called");

    if (this.state.countdownSet != false) {
      return;
    }
    const pos = this.state.plant_position;
    const posString = pos + "";
    if (pos < 1 || pos >= 9) {
      console.log("error: position not set correctly in PlantView");
      return;
    }

    if (this.state.countdownSet == false) {
      this.setState({ countdownSet: true });

      const end = DateTime.fromISO(plant["three"]["wilt_end"]);
      //   console.log(end.toISO() + "end11111wilted");

      const currDate = DateTime.local();

      //   console.log("current time is " + currDate.toISO());
      const diff = end.diff(currDate).as("seconds");
      //   console.log("\n\n\ndiff = " + diff);

      this.setState({ totalDuration: diff, countdownFullySet: true });
    }
  };

  /*
   * Just testing conditional rendering! Ignore this.
   */
  displayJsxMessage = () => {
    // console.log("displayJsxMessage called");
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
    const info = this.state.alert_info;
    const title = this.state.alert_title;

    Alert.alert(
      title.toString().toUpperCase(),
      info.toString(),
      [
        {
          text: "OK",
          onPress: () => this.setState({ temp: 1 }),
        },
      ],
      { cancelable: false }
    );

    // console.log(this.state.temp + " = temp");
  };

  renderLoading() {
    return <Loading />;
  }

  render() {
    this.checkInitialized();
    this.getInventoryCounts();
    this.checkSeeds();
    console.log("render says status is: " + this.state.plant_status);
    if (this.state.inventory_set_check && this.state.specifics_prepared) {
      return this.renderNormal();
    } else {
      return this.renderLoading();
    }
  }
  renderNormal() {
    // console.log("props are...");
    // console.log(this.props);

    const { navigate } = this.props.navigation;

    // console.log(this.state.totalDuration);
    // console.log("POSITIONNN IS " + this.state.plant_position);

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
    this.checkSeeds();
    // this.getCountdownLength();

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            backgroundColor: "#000",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {console.log("STATE GEMS: " + this.state.gems)}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={styles.smallButton}
              source={require("./assets/newicons/newgold.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gold}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#000",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("GemShop")}
                >
                  <Image
                    style={styles.smallButton}
                    source={require("./assets/newicons/newplus.png")}
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
            flex: 2, // 2
            backgroundColor: "#222",
            alignItems: "center",
            justifyContent: "center",
          }}
          // gray horizontal divider
        >
          {/* <Image
            source={require("./assets/five-stars-wide.png")}
            style={styles.starBar}
          ></Image> */}
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
                {/* <TouchableOpacity
                //   onPress={() =>
                //     this.props.navigation.navigate("GardenTesting")
                //   }
                //   activeOpacity={0.5}
                // inventory item: water
                > */}
                <Image
                  source={require("./assets/newicons/newwater.png")}
                  style={styles.menuIcons2}
                ></Image>
                {/* </TouchableOpacity> */}
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
                <Text style={[styles.smallWhiteText, { color: "#b0d156" }]}>
                  SHOP
                </Text>
                <View style={{ flex: 0.1 }}></View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Shop")}
                  activeOpacity={0.5}
                  // inventory item: elixir
                >
                  <Image
                    source={require("./assets/largeshop34.png")}
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
            flex: 2, // 2
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
            onPress={() =>
              navigate("Garden2", {
                position: 1,
                event: "",
                rarity: "",
              })
            }
            activeOpacity={0.5}
          >
            <View style={styles.red}>
              <Text style={styles.redText}> Return to Garden </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={this.refreshAll} activeOpacity={0.5}>
            <View style={styles.red}>
              <Text style={styles.redText}> Refresh </Text>
            </View>
          </TouchableOpacity> */}
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
  leftTimesSmol: {
    color: "#ffffff",
  },
  menuIcons3: {
    width: screen.width / 9.3,
    height: screen.width / 9.3,
    // borderWidth: 1,
    // borderColor: "#854832",
  },
  starBar: {
    width: screen.width / 1.5, // 11
    height: screen.width / 15, // 11
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
    borderColor: "#57423e",
    borderRadius: screen.width / 15,
    backgroundColor: "#57423e", // 472b25
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
    alignItems: "center",
  },
  smallWhiteText: {
    color: "#ff547c",
    fontSize: 15,

    // marginLeft: screen.width / 40,
    // marginRight: screen.width / 5,
  },
});
