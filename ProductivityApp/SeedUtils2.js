import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";

let none = [
  ["daisy", "aster", "sunflower", "tulip", "lily", "marigold"],
  ["dahlia", "lilac", "daffodil", "amaryllis", "orchid", "snapdragon"],
  ["chrysanthemum", "morning glory", "hibiscus", "hydrangea", "hyacinth"]
];

let fernsTulips = [
  ["tulips", "tulips", "tulips"],
  ["tulips"],
  ["tulips", "ferns"]
];

let noneLength = 17;

export default class SeedUtils extends Component {
  constructor(props) {
    super(props);
  }

  /*
   * Plants a rarity, event seed.
   * plant is parsed JSON object from SecureStore which contains
   * information about a plant at a specific position.
   * ***EDITED to take position instead of previous plant.
   *   ex. rarity: "C"
   *   ex. event: "none"
   */
  plantSeed = async (position, rarity, event) => {
    // console.log("plantSeed called");

    let newPlant = {
      status: 1,
      position: position,
      permanent: {
        event: event,
        rarity: rarity,
        species: "",
        date_planted: ""
      },
      zero: { zero_image: "plantpot" },
      one: {
        one_image: "growing",
        grow_start: "",
        grow_offset: 0,
        grow_streak_length: 0
      },
      two: { two_image: "", current_waters: 0, water_start: "", water_end: "" },
      three: { three_image: "", wilt_start: "", wilt_end: "" },
      four: { four_image: "" }
    };

    const species = this.determineSpecies(rarity, event);
    newPlant["permanent"]["species"] = species;

    const datePlanted = DateTime.local().toISO();
    newPlant["permanent"]["date_planted"] = datePlanted;

    newPlant["one"]["grow_streak_length"] = 0;
    newPlant["one"]["grow_start"] = DateTime.local().toISO();
    newPlant["one"]["grow_offset"] = await SecureStore.getItemAsync(
      "streak_length"
    );

    await SecureStore.setItemAsync(
      position + "_plant",
      JSON.stringify(newPlant)
    );
    // console.log(position + "_plant");
    var testtest = JSON.parse(
      await SecureStore.getItemAsync(position + "_plant")
    );
    // console.log(testtest.toString());

    // console.log("plantSeed finished\n\n\n");
    return newPlant;
  };

  /*
   * Rolls for species when a seed is planted.
   * Calls helper functions for each event type; default is "none".
   */
  determineSpecies = (rarity, event) => {
    // console.log(rarity);
    if (event === "christmas") {
      //   console.log("it was christmas");
      return this.determineSpecies_christmas(rarity);
    } else if (event === "valentines") {
      //   console.log("it was valentines");
      return this.determineSpecies_valentines(rarity);
    } else {
      //   console.log("it was not an event");
      return this.determineSpecies_none(rarity);
    }
  };

  determineSpecies_none = rarity => {
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

  determineSpecies_christmas = rarity => {
    return "ferns";
    // return "pointsettia"; //placeholder
  };

  determineSpecies_valentines = rarity => {
    return "rose"; //placeholder
  };

  /*
   * Helper function.
   * Grows seed fully (given that seed is not yet fully grown);
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  growSeed = async plant => {
    if (plant["status"] != 1) {
      console.log("error: you shouldn't be able to grow this plant.");
      return -1;
    }

    plant["status"] = 2;
    plant["two"]["current_waters"] = 0;

    const periodStart = DateTime.local();
    const periodStartMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      zone: localZone
    }); // the midnight that just passed
    const periodEndMidnight = periodStartMidnight.plus({ day: 4 });

    plant["two"]["water_start"] = periodStartMidnight.ISO();
    plant["two"]["water_end"] = periodEndMidnight.ISO();

    return 1;
  };

  /*
   * Helper function.
   * Wilts plant (given that plant is fully grown and not yet
   * wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  wiltPlant = async plant => {
    if (plant["status"] != 2) {
      console.log("error: you shouldn't be able to wilt this plant.");
      return -1;
    }

    // sets status to 3 - wilted
    plant["status"] = 3;

    return 1;
  };

  /*
   * Helper function.
   * Kills plant without (given that plant is fully grown and
   * already wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  killPlant = async plant => {
    if (plant["status"] != 3) {
      console.log("error: you shouldn't be able to kill this plant.");
      return -1;
    }

    plant["status"] = 4;

    return 1;
  };

  /* Fertilizes plant at position if it's not fully grown.
   * Returns:
   * -1 if plant cannot be fertilized or does not exist,
   * 0 if not enough fertilizers to fertilize plant;
   * 1 if successful
   */
  fertilizePlant = async plant => {
    let fertilizerAmount = Number.parseInt(
      await SecureStore.getItemAsync("inventory_fertilizer")
    );
    if (fertilizerAmount == NaN) {
      console.log("ERROR! fertilizer never initialized");
      return -1;
    }
    if (fertilizerAmount < 1) {
      console.log("error: not enough fertilizer");
      return 0;
    }

    if (plant["status"] != 1) {
      console.log("error: you shouldn't be able to fertilize this plant.");
      return -1;
    }

    plant["status"] = 2;
    plant["two"]["current_waters"] = 0;

    fertilizerAmount -= 1;
    await SecureStore.setItemAsync(
      "inventory_fertilizer",
      fertilizerAmount + ""
    );

    return 1;
  };

  updateGrowthStreak = async plant => {
    if (plant["status"] != 1) {
      console.log("error: only growing plants have growing streaks");
      return -1;
    }

    var offset = plant["one"]["grow_offset"];

    var length =
      Number.parseInt(await SecureStore.getItemAsync("streak_length")) - offset;
    if (length < 0) {
      length = 0;
      offset = 0;
    }

    plant["one"]["growth_streak_length"] = length;
    plant["one"]["grow_offset"] = offset;

    if (length == 3) {
      this.growSeed(position);
    }
  };

  updateWilting = async plant => {
    if (plant["status"] != 2) {
      console.log("error: only grown plants can wilt");
      return -1;
    }

    const currDate = DateTime.local();
    const periodEnd = DateTime.fromISO(plant["three"]["wilt_end"]);

    const waters = Number.parseInt(plant["two"]["current_waters"]);

    // if enough waters and current period ended,
    // start new period

    if (waters >= 15) {
      console.log("updateWilting: streak upheld!");
      if (currDate > periodEnd) {
        console.log("updateWilting: new streak started!");
        const newStart = periodEnd;
        const newEnd = periodEnd.plus({ day: 3 });

        plant["two"]["water_start"] = newStart.toISO();
        plant["two"]["water_end"] = newEnd.toISO();
        plant["two"]["current_waters"] = "0";
      }
    }

    // if current period hasn't ended, do nothing

    if (currDate < periodEnd) {
      console.log("updateWilting: streak still in progress");
      return 2;
    }

    // if period ended and plant was not fully watered,
    // wilt plant (kill after 3 days without elixir)

    const diff = currDate.diff(periodEnd).as("hours");
    if (diff < 73) {
      this.wiltPlant(position);
      return 3;
    } else {
      this.killPlant(position);
      return 4;
    }
  };

  /* Takes in wilted plant parsed using JSON.parse from SecureStore.
   * Uses up 1 elixir and restores status to grown.
   */
  elixirPlant = async plant => {
    if (plant["status"] != 3) {
      console.log("error: only wilted plants use elixir");
      return -1;
    }

    var elixir = Number.parseInt(
      await SecureStore.getItemAsync("inventory_elixir")
    );
    if (elixir == 0) {
      return -1;
    }
    elixir -= 1;
    await SecureStore.setItemAsync("inventory_elixir", "" + elixir);
    plant["status"] = 2;
  };

  useBees = async count => {
    const prevCount = await SecureStore.getItemAsync("inventory_bees");
    if (count > prevCount) {
      console.log("error: not enough bees");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_bees", "" + newCount);
    return newCount;
  };

  /* Takes in 2 plants to be breeded
   * that have been parsed using JSON.parse from SecureStore.
   * Takes in seeds, also parsed using JSON.parse from SecureStore,
   * and adds a new seed to seeds.
   */
  breedPlants = async (plantA, plantB, seeds) => {
    if (plantA["status"] != 2) {
      console.log("error: plant A isn't grown and can't breed");
      return -1;
    }
    if (plantB["status"] != 2) {
      console.log("error: plant B isn't grown and can't breed");
      return -1;
    }

    var beeCheck = this.useBees(1);
    if (beeCheck == -1) {
      return -1;
    }

    let rarityA = plantA["permanent"]["rarity"];
    let rarityB = plantB["permanent"]["rarity"];

    console.log("RARITYA AND B ARE " + rarityA + "    " + rarityB);
    if (rarityA == "R") {
      rarityA = 3;
    } else if (rarityA == "U") {
      rarityA = 2;
    } else {
      rarityA = 1;
    }

    if (rarityB == "R") {
      rarityB = 3;
    } else if (rarityB == "U") {
      rarityB = 2;
    } else {
      rarityB = 1;
    }

    const sumRarity = rarityA + rarityB;

    var uncommonChance = 0;
    var rareChance = 0;

    if (sumRarity == 2) {
      uncommonChance = 50;
      rareChance = 95;
    } else if (sumRarity == 3) {
      uncommonChance = 40;
      rareChance = 85;
    } else if (sumRarity == 4) {
      uncommonChance = 30;
      rareChance = 75;
    } else if (sumRarity == 5) {
      uncommonChance = 20;
      rareChance = 60;
    } else {
      uncommonChance = 5;
      rareChance = 35;
    }

    const rarityRand = Math.floor(Math.random() * 100) + 1;
    var rarity = "";
    if (rarityRand < uncommonChance) {
      rarity = "C";
    } else if (rarityRand < rareChance) {
      rarity = "U";
    } else {
      rarity = "R";
    }

    var event = "";

    const eventA = plantA["permanent"]["event"];
    const eventB = plantB["permanent"]["event"];

    const eventRand = Math.floor(Math.random() * 100) + 1;
    if (eventRand < 35) {
      event = eventA;
    } else if (eventRand < 70) {
      event = eventB;
    } else {
      event = "none";
    }

    console.log(rarity + event + "                    ");

    console.log("seeds before breeding: \n", seeds);
    seeds["event"]["rarity"] += 1;
    console.log("seeds after breeding: \n", seeds);
  };

  initializeAllSeeds = async () => {
    let seeds = {
      none: { C: 2, U: 0, R: 0 },
      christmas: { C: 0, U: 127, R: 0 },
      valentines: { C: 0, U: 0, R: 7 }
    };

    // console.log(seeds);

    let seedsString = JSON.stringify(seeds);

    await SecureStore.setItemAsync("inventory_seeds", seedsString);
  };

  getAllSeeds = async () => {
    let seedsString = await SecureStore.getItemAsync("inventory_seeds");

    // console.log(seedsString);

    let seeds = JSON.parse(seedsString);

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

  createPlant = async position => {
    let plant = {
      status: 0,
      position: position,
      permanent: { event: "", rarity: "", species: "", date_planted: "" },
      zero: { zero_image: "plantpot" },
      one: {
        one_image: "growing",
        grow_start: "",
        grow_offset: 0,
        grow_streak_length: 0
      },
      two: { two_image: "", current_waters: 0, water_start: "", water_end: "" },
      three: { three_image: "", wilt_start: "", wilt_end: "" },
      four: { four_image: "" }
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
