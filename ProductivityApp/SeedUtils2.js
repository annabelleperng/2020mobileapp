import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";

let none = [
  ["daisy", "aster", "sunflower", "tulip", "lily", "marigold"],
  ["dahlia", "lilac", "daffodil", "amaryllis", "orchid", "snapdragon"],
  ["chrysanthemum", "morning glory", "hibiscus", "hydrangea", "hyacinth"],
];

let fernsTulips = [
  ["tulips", "tulips", "tulips"],
  ["tulips"],
  ["tulips", "ferns"],
];

let noneLength = 17;

export default class SeedUtils extends Component {
  constructor(props) {
    super(props);
  }

  /* Plants a rarity_event seed at the given position.
   * Position is just a number in the range [1, 9].
   * rarity_event is a string with information about the seed's
   * rarity and event, such as such as 2christmas or 1none.
   */
  plantSeed = async (plant, rarity, event) => {};

  /* Rolls for species when a seed is planted. Stores in SecureStore as
   * a string.
   * Calls helper functions for each event type; default is "none".
   */
  determineSpecies = (rarity, event) => {
    console.log(rarity);
    if (event === "christmas") {
      console.log("it was christmas");
      return this.determineSpecies_christmas(rarity);
    } else if (event === "valentines") {
      console.log("it was valentines");
      return this.determineSpecies_valentines(rarity);
    } else {
      console.log("it was not an event");
      return this.determineSpecies_none(rarity);
    }
  };

  determineSpecies_none = (rarity) => {
    if (rarity == "1") {
      const rand = Math.floor(Math.random() * fernsTulips[0].length);
      return fernsTulips[0][rand];
    }
    if (rarity == "2") {
      const rand = Math.floor(Math.random() * none[1].length);
      return none[1][rand];
    }
    const rand = Math.floor(Math.random() * none[2].length);
    return none[2][rand];
  };

  determineSpecies_christmas = (rarity) => {
    return "ferns";
    // return "pointsettia"; //placeholder
  };

  determineSpecies_valentines = (rarity) => {
    return "rose"; //placeholder
  };

  /*
   * Helper function.
   * Grows seed fully (given that seed is not yet fully grown);
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  growSeed = async (plant) => {};

  /*
   * Helper function.
   * Wilts plant (given that plant is fully grown and not yet
   * wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  wiltPlant = async (plant) => {};

  /*
   * Helper function.
   * Kills plant without (given that plant is fully grown and
   * already wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  killPlant = async (plant) => {};

  /* Fertilizes plant at position if it's not fully grown.
   * Returns:
   * -1 if plant cannot be fertilized or does not exist,
   * 0 if not enough fertilizers to fertilize plant;
   * 1 if successful
   */
  fertilizePlant = async (plant) => {};

  /* Returns # of waters remaining if not all waters in parameter are used;
   * returns -1 if plant can't be watered (not present or not fully grown),
   * returns -1 if not enough waters,
   * returns remainder of waters if not all parameter waters are used.
   */
  waterPlant = async (plant, waters) => {};

  /* Updates position_growth_streak_start (GSS) and position_growth_streak_length (GSL).
   * If GSS == -1, set to current time.
   * Otherwise, sets GSS and GSL according depending on time difference between this sprint and last sprint.
   *
   * This method should be called in Timer5.js similar to updateLatestSprints.
   */
  updateGrowthStreak = async (plant) => {};

  updateWilting = async (plant) => {};

  elixirPlant = async (plant) => {};

  useBees = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_bees");
    if (count > prevCount) {
      console.log("error: not enough bees");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_bees", "" + newCount);
    return newCount;
  };

  breedPlants = async (plantA, plantB) => {};

  initializeAllSeeds = async () => {
    let seeds = {
      none: { C: 2, U: 0, R: 0 },
      christmas: { C: 0, U: 0, R: 0 },
      valentines: { C: 0, U: 0, R: 0 },
    };

    console.log(seeds);

    let seedsString = JSON.stringify(seeds);

    console.log(seedsString);

    await SecureStore.setItemAsync("inventory_seeds", seedsString);
  };

  getAllSeeds = async () => {
    let seedsString = await SecureStore.getItemAsync("inventory_seeds");

    console.log(seedsString);

    let seeds = JSON.parse(seedsString);
    t;

    console.log(seeds);

    return seeds;
  };

  /* Increases inventory count of seed for given eventName
   * and given rarity.
   * If you are using this function, make sure that
   * seeds has been parsed from SecureStore "inventory_seeds"
   * using JSON.parse
   * Example call: increaseBy(seeds, "none", "R", 5)
   */
  increaseBy = (seeds, eventName, rarity, increment) => {
    seeds[eventName][rarity] += increment;
    return seeds;
  };

  /* Decreases inventory count of seed for given eventName
   * and given rarity.
   * If you are using this function, make sure that
   * seeds has been parsed from SecureStore "inventory_seeds"
   * using JSON.parse
   */
  decreaseBy = (seeds, eventName, rarity, decrement) => {
    seeds[eventName][rarity] -= decrement;
    return seeds;
  };

  createPlant = async (position) => {
    let plant = {
      status: 0,
      position: position,
      permanent: { event: "", rarity: "", species: "" },
      zero: { zero_image: "" },
      one: { one_image: "", grow_start: 0, grow_end: 0, grow_streak_length: 0 },
      two: { two_image: "", current_waters: 0, water_start: "", water_end: "" },
      three: { three_image: "", wilt_start: "", wilt_end: "" },
      four: { four_image: "" },
    };

    let strPlant = JSON.stringify(plant);

    let key = position + "_plant";

    await SecureStore.setItemAsync(key, strPlant);
  };

  createPlants = async () => {
    await this.createPlant(1);
    await this.createPlant(2);
    await this.createPlant(3);
    await this.createPlant(4);
    await this.createPlant(5);
    await this.createPlant(6);
    await this.createPlant(7);
    await this.createPlant(8);
    await this.createPlant(9);
  };
}
