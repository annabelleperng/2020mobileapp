import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";
import React from "react";
import SeedUtils from "./SeedUtils2";

// const utils = new SeedUtils2();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  createAlmanac = async () => {
    let almanac = {
      count: 0,
      none: {
        common: {
          yellow_pinwheel: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          wild_redquill: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          white_frostflower: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          white_cupcake: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          undersea_pineapple: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          titled_rose: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          sunset_shrooms: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          summer_cactus: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          stocky_corn: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          startrail_dandelion: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          snowcrested_fern: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          sharp_succulent: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          scarlet_spiderlily: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          robin_tulip: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          powderball_flower: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          monarch_grass: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          mario_mushrooms: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          lemon_daisy: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          "forget-me-not_wildflower": {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          flowery_bush: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          flowering_cactus: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          flamingo_tulip: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          fishy_seaweed: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          "first-frost_bluebell": {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          ducky_reeds: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          dotted_cactus: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          common_carrots: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          cherry_grass: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          calla_lily: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          californian_chaparral: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          butterfly_iris: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          bushy_butterfly: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          "blue-dotted_bush": {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          blue_cerealcup: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          blue_burst: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          bark_mushroom: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          apple_lotus: {
            first_obtained: 420,
            count: 696969
          }
        },

        uncommon: {
          sunstruck_rose: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          simpson_flower: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          purple_cactusflower: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          powder_bloom: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          pointy_aloe: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          pink_lily: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          peachy_tree: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          paper_fern: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          miniature_sakura: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          lantern_mushroom: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          imposter_corn: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          icefrost_rose: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          henny_flower: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          hedgy_lettuce: {
            first_obtained: "November 3rd, 2013",
            count: 1
          },
          frost_bluebell: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          flame_bud: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          firefly_fern: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          "dusk-purple_pendents": {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          dawn_hibiscus: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          crimson_carnation: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          "cotton-candy_wildflower": {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          christmas_tree: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          blue_tulip: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          blue_pinwheel: {
            first_obtained: "November 3rd, 2013",
            count: 0
          },
          blood_flower: {
            first_obtained: "November 3rd, 2013",
            count: 1
          }
        },

        rare: {
          "yellow-spotted_mushrooms": {
            first_obtained: "November 9, 2013",
            count: 0
          },
          viney_flower: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          venus_flytrap: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          stardust_nightshroom: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          snow_violet: {
            first_obtained: "November 9, 2013",
            count: 1
          },
          skydrop_ghostflower: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          quartz_wildflower: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          frost_indigo: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          "double-layered_bloom": {
            first_obtained: "November 9, 2013",
            count: 0
          },
          conchy_flower: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          "blue_dames-rocket": {
            first_obtained: "November 9, 2013",
            count: 0
          },
          blue_daisy: {
            first_obtained: "November 9, 2013",
            count: 0
          },
          amethyst_spikeplant: {
            first_obtained: "November 9, 2013",
            count: 1
          }
        }
      },
      new_player: {}
    };

    let strAlmanac = JSON.stringify(almanac);

    await SecureStore.setItemAsync("almanac", strAlmanac);

    return almanac;
  };
  updateAlmanac = async (event, rarity, species) => {};
}
