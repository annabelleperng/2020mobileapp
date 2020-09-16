import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";
import React from "react";
import SeedUtils from "./SeedUtils";

const utils = new SeedUtils();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  createAlmanac = async () => {
    let almanac = {
      count: 0,
      none: {
        common: {
          daisy: {
            first_obtained: "",
            count: 0,
          },
          aster: {
            first_obtained: "",
            count: 0,
          },
          sunflower: {
            first_obtained: "",
            count: 0,
          },
          tulip: {
            first_obtained: "",
            count: 0,
          },
          lily: {
            first_obtained: "",
            count: 0,
          },
          marigold: {
            first_obtained: "",
            count: 0,
          },
        },
        uncommon: [
          "dahlia",
          "lilac",
          "daffodil",
          "amaryllis",
          "orchid",
          "snapdragon",
        ],
        rare: [
          "chrysanthemum",
          "morning glory",
          "hibiscus",
          "hydrangea",
          "hyacinth",
        ],
      },
      new_player: {},
    };

    let strAlmanac = JSON.stringify(almanac);

    await SecureStore.setItemAsync("almanac", strAlmanac);
  };
  updateAlmanac = async (event, rarity, species) => {};
}
