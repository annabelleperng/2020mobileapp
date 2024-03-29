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

  foo = () => {
    console.log("foo");
  };

  /*
   * Checks that status of a plant (0, 1, or 2) matches the parameter status.
   *
   * Returns:
   *   - -1 if invalid parameters
   *   - 0 if the parameter status differs from current status
   *   - 1 if parameter status equals current status
   */
  checkStatus = async (position, status) => {
    // console.log("cheqing checkStatus uwu");
    if (position < 1 || position > 9) {
      console.log("Invalid position for checkStatus");
      console.log("position =" + position);
      return -1;
    } else if (
      status != "0" &&
      status != "1" &&
      status != "2" &&
      status != "3" &&
      status != "4"
    ) {
      console.log("Invalid status for checkStatus");
      return -1;
    }
    const actualStatusKey = position.toString() + "_status";
    const actualStatus = await SecureStore.getItemAsync(actualStatusKey);

    if ((actualStatus == status) == false) {
      console.log("checkstatus - false");
      console.log("actual status: " + actualStatus);
      console.log("given status: " + status);
      return 0;
    }

    console.log("checkstatus - true");
    return 1;
  };

  /* Removes the nth seed from inventory.
   * Returns
   * - string with information about seed's event type & rarity
   * - empty string if no seed at nth spot)
   */
  removeSeedFromInventoryOLD = async (positionInInventory) => {
    let allSeeds = await SecureStore.getItemAsync("inventory_seeds");
    let remaining = ""; // all remaining seeds from inventory
    let index = -1;

    // passes divider to get next element until nth element
    for (let i = 1; i <= positionInInventory; i++) {
      index = allSeeds.indexOf("%");
      if (index === -1) {
        return "";
      }
      remaining += allSeeds.substring(0, index + 1);
      allSeeds = allSeeds.substring(index + 1);
    }

    // trims rest of string, if nth element isn't last element
    index = allSeeds.indexOf("%");
    if (index !== -1) {
      remaining += allSeeds.substring(index + 1);
      allSeeds = allSeeds.substring(0, allSeeds.indexOf("%"));
    }

    // updates inventory
    await SecureStore.setItemAsync("inventory_seeds", remaining);
    return allSeeds;
  };

  /* Plants a rarity_event seed at the given position.
   * Position is just a number in the range [1, 9].
   * rarity_event is a string with information about the seed's
   * rarity and event, such as such as 2christmas or 1none.
   */
  plantSeed = async (position, rarity_event) => {
    console.log("\n\n\nplantSeed called");
    if ((await this.checkStatus(position, "0")) != 1) {
      console.log("error: trying to plant seed where it can't be planted");
      return -1;
    }

    const statusKey = position + "_status";
    await SecureStore.setItemAsync(statusKey, "1");

    const rarity = rarity_event.substring(0, 1);
    const rarityKey = position + "_rarity";
    console.log("rarity = " + rarity);
    await SecureStore.setItemAsync(rarityKey, rarity);

    const event = rarity_event.substring(1);
    const eventKey = position + "_event";
    console.log("event = " + event);
    await SecureStore.setItemAsync(eventKey, event);

    const species = this.determineSpecies(rarity, event);
    const speciesKey = position + "_species";
    console.log("species = " + species);
    await SecureStore.setItemAsync(speciesKey, species);

    //set position_date_planted to current time
    const localZone = await SecureStore.getItemAsync("timezone");
    const datePlanted = DateTime.local().toISO();
    const datePlantedKey = position + "_date_planted";
    console.log("date planted = " + datePlanted);
    await SecureStore.setItemAsync(datePlantedKey, datePlanted);

    //set position_growth_streak_length to 0
    const growthStreakLengthKey = position + "_growth_streak_length";
    await SecureStore.setItemAsync(growthStreakLengthKey, "0");

    //set position_growth_streak_start to -1, set properly in updateGrowthStreak function
    const growthStreakStartKey = position + "_growth_streak_start";
    await SecureStore.setItemAsync(growthStreakStartKey, "-1");

    //set growth_streak_offset to current regular streak length
    const growthStreakOffset = await SecureStore.getItemAsync("streak_length");
    const growthStreakOffsetKey = position + "_growth_streak_offset";
    await SecureStore.setItemAsync(growthStreakOffsetKey, growthStreakOffset);

    console.log("plantSeed finished\n\n\n");
    return 1;
  };

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

  getImageName = async (position) => {
    console.log("\n\n\ngetImageName called");

    const statusKey = position.toString() + "_status";
    const status = await SecureStore.getItemAsync(statusKey);

    if (status == "0") {
      console.log("NO PLANT HERE");
      return "invis "; //update later
    } else if (status == "1") {
      console.log("SMOL PLANT");
      return "invis "; //update later
    } else if (status == "3") {
      console.log("CRYING PLANT");
      return "invis "; //update later
    } else if (status == "4") {
      console.log("DYING PLANT");
      return "invis "; //update later
    }

    console.log("THRIVING PLANT");
    const species = await SecureStore.getItemAsync(position + "_species");
    console.log(species + " candy");
    return species + " ";
  };

  /*
   * Helper function.
   * Grows seed fully (given that seed is not yet fully grown);
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  growSeed = async (position) => {
    if ((await this.checkStatus(position, "1")) != 1) {
      console.log("error: you shouldn't be able to grow this plant.");
      return -1;
    }

    // sets status to 2 - fully grown; sets water count to 15 - fully watered
    await SecureStore.setItemAsync(position + "_status", "2");
    await SecureStore.setItemAsync(position + "_waters", "15");

    // should also set streak?

    //set position_period_start to current date
    const localZone = await SecureStore.getItemAsync("timezone");
    const periodStart = DateTime.local();
    const periodStartMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      zone: localZone,
    }); // the midnight that just passed
    const periodEndMidnight = periodStartMidnight.plus({ day: 4 });
    const periodStartKey = position + "_period_start";
    await SecureStore.setItemAsync(periodStartKey, periodStartMidnight.ISO());

    const periodEndKey = position + "_period_end";
    await SecureStore.setItemAsync(periodEndKey, periodEndMidnight.ISO());

    //set position_water_progress
    const waterProgressKey = position + "_waters";
    await SecureStore.setItemAsync(waterProgressKey, "0");

    return 1;
  };

  /*
   * Helper function.
   * Wilts plant (given that plant is fully grown and not yet
   * wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  wiltPlant = async (position) => {
    if (awaitthis.checkStatus(position, "2") != 1) {
      console.log("error: you shouldn't be able to wilt this plant.");
      return -1;
    }

    // sets status to 3 - wilted
    await SecureStore.setItemAsync(position + "_status", "3");

    // should also set streak?

    return 1;
  };

  /*
   * Helper function.
   * Kills plant without (given that plant is fully grown and
   * already wilted); does NOT check/update streaks;
   * this function would probably not be called on its own.
   * Returns -1 if unsuccessful, 1 if successful.
   */
  killPlant = async (position) => {
    if ((await this.checkStatus(position, "3")) != 1) {
      console.log("error: you shouldn't be able to kill this plant.");
      return -1;
    }

    // sets status to 4 - dead
    await SecureStore.setItemAsync(position + "_status", "4");

    return 1;
  };

  /* Fertilizes plant at position if it's not fully grown.
   * Returns:
   * -1 if plant cannot be fertilized or does not exist,
   * 0 if not enough fertilizers to fertilize plant;
   * 1 if successful
   */
  fertilizePlant = async (position) => {
    const fertilizerAmount = Number.parseInt(
      await SecureStore.getItemAsync("inventory_fertilizer")
    );
    if (fertilizerAmount === NaN) {
      console.log("BAD ERROR: this should never happen");
      console.log("fertilizer never initialized");
      return 0;
    }
    if (fertilizerAmount < 1) {
      console.log("error: not enough fertilizer");
      return 0;
    }

    if ((await this.checkStatus(position, "1")) != 1) {
      console.log("error: you shouldn't be able to fertilize this plant.");
      return -1;
    }

    await SecureStore.setItemAsync(position + "_status", "2");

    await SecureStore.setItemAsync(
      "inventory_fertilizer",
      fertilizerAmount - 1 + ""
    );

    await SecureStore.setItemAsync(position + "_waters", "13");
    //and set another value corresponding w/ streak time? todo

    return 1;
  };

  /* Returns # of waters remaining if not all waters in parameter are used;
   * returns -1 if plant can't be watered (not present or not fully grown),
   * returns -1 if not enough waters,
   * returns remainder of waters if not all parameter waters are used.
   */
  waterPlant = async (position, waters) => {
    if ((await this.checkStatus(position, "2")) != 1) {
      console.log("error: you shouldn't be able to water this plant.");
      return -1;
    }

    const plantWaters = Number.parseInt(
      await SecureStore.getItemAsync(position + "_waters")
    );

    const waterInventory = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );

    if (waterInventory == NaN || plantWaters == NaN || waters < 0) {
      console.log("something is very wrong - this shouldn't be happening");
      return -1;
    }

    if (waterInventory == NaN || waterInventory < waters) {
      // not enough waters to water plant
      // (or some weird error)
      console.log("not enough waters to water plant");
      return -1;
    }

    // gave too many waters
    if (plantWaters + waters > 15) {
      const used = 15 - plantWaters;
      await SecureStore.setItemAsync(position + "_waters", "15");
      await SecureStore.setItemAsync(
        "inventory_water",
        waterInventory - used + ""
      );
      return waters - used;
    }

    await SecureStore.setItemAsync(
      position + "_waters",
      "" + plantWaters + waters + ""
    );
    await SecureStore.setItemAsync(
      "inventory_water",
      waterInventory - waters + ""
    );

    //update position_period_start
    const periodStartKey = position + "_period_start";
    const localZone = await SecureStore.getItemAsync("timezone");
    const localTime = DateTime.local();
    const localMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      zone: localZone,
    });
    await SecureStore.setItemAsync(periodStartKey, localMidnight.ISO());

    //update position_water_progress for the 3-day 15-water requirement
    const waterProgressKey = position + "_water_progress";
    const waterProgressPrev = Number.parseInt(
      await SecureStore.getItemAsync(waterProgressKey)
    );
    const waterProgressNew = waterProgressPrev + waters;
    await SecureStore.setItemAsync(waterProgressKey, waterProgressNew);

    return 0;
  };

  //   breedPlant(position, waters) {}

  /* Updates position_growth_streak_start (GSS) and position_growth_streak_length (GSL).
   * If GSS == -1, set to current time.
   * Otherwise, sets GSS and GSL according depending on time difference between this sprint and last sprint.
   *
   * This method should be called in Timer5.js similar to updateLatestSprints.
   */
  updateGrowthStreak = async (position) => {
    if ((await this.checkStatus(position, "1")) != 1) {
      console.log("error: only growing plants have growing streaks");
      return -1;
    }

    // const startKey = position + "_growth_streak_start";
    const statusKey = position + "_status";
    const lengthKey = position + "_growth_streak_length";
    const offsetKey = position + "_growth_streak_offset";
    const offsetStr = await SecureStore.getItemAsync(offsetKey);
    var offset = Number.parseInt(offsetStr);

    var length =
      Number.parseInt(await SecureStore.getItemAsync("streak_length")) - offset;
    if (length < 0) {
      length = 0;
      offset = 0;
    }

    await SecureStore.setItemAsync(lengthKey, length);
    await SecureStore.setItemAsync(offsetKey, offset);

    if (length == 3) {
      this.growSeed(position);
    }

    const localZone = await SecureStore.getItemAsync("timezone");
    const currDate = DateTime.local();

    // const localZone = await SecureStore.getItemAsync("timezone");
    // const localTime = DateTime.local().setZone(localZone).toISO();
    // const localMidnight = DateTime.fromObject({
    //   year: localTime.year,
    //   month: localTime.month,
    //   day: localTime.day,
    //   hour: 0,
    //   minute: 0,
    //   second: 0,
    //   zone: localZone,
    // });
    // const localPrevMidnight = localMidnight.minus({ days: 1 });
    // const prevDay = Interval.fromDateTimes(localPrevMidnight, localMidnight);

    // if (await SecureStore.getItemAsync(growthStreakStartKey) == "-1") {
    //   await SecureStore.setItemAsync(growthStreakStartKey, localTime;
    // }
    // const growthStreakStart = DateTime.fromISO(
    //   await SecureStore.getItemAsync(growthStreakStartKey)
    // );

    // const streakLength = Number.parseInt(
    //   await SecureStore.getItemAsync("streak_length")
    // );

    // const latestSprintDay = DateTime.fromISO(
    //   await SecureStore.getItemAsync("latest_sprint")
    // );

    // if (prevDay.contains(latestSprintDay)) {
    //   streakLength += 1;
    // } else if (prevDay.isAfter(latestSprintDay)) {
    //   streakLength = 0;
    //   await SecureStore.setItemAsync(growthStreakStartKey, localTime.toISO());
    //   console.log("\n\n\n\n\nUpdated growth streak start to " + localTime.toISO());
    // }
    // await SecureStore.setItemAsync(growthStreakLengthKey, "" + streakLength);
    // console.log("\n\n\n\n\nUpdated growth streak length to " + streakLength);
  };

  updateWilting = async (position) => {
    if ((await this.checkStatus(position, "2")) != 1) {
      console.log("error: only grown plants can wilt");
      return -1;
    }

    const localZone = await SecureStore.getItemAsync("timezone");
    const currDate = DateTime.local();

    const periodEndKey = position + "_period_end";
    const periodEnd = DateTime.fromISO(
      await SecureStore.getItemAsync(periodEndKey)
    );

    console.log("end = " + periodEnd.toISO());
    console.log("current = " + currDate.toISO());
    console.log(
      "hardcoded end = " + (await SecureStore.getItemAsync("1_period_end"))
    );

    const waterKey = position + "_waters";
    const waters = Number.parseInt(await SecureStore.getItemAsync(waterKey));

    // if enough waters and current period ended,
    // start new period

    if (waters >= 15) {
      console.log("updateWilting: streak upheld!");
      if (currDate > periodEnd) {
        console.log("updateWilting: new streak started!");
        const newStart = periodEnd;
        const newEnd = periodEnd.plus({ day: 3 });
        const periodStartKey = position + "_period_start";

        await SecureStore.setItemAsync(periodStartKey, newStart.toISO());
        await SecureStore.setItemAsync(periodEndKey, newEnd.toISO());
        await SecureStore.setItemAsync(waterKey, "0");
        console.log("newStart = " + newStart.toISO());
        console.log("newEnd = " + newEnd.toISO());
        return 2;
      }
      return 2;
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

  elixirPlant = async (position) => {
    if ((await this.checkStatus(position, "3")) != 1) {
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
    const statusKey = position + "_status";
    await SecureStore.setItemAsync(statusKey, "2");
  };

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

  breedPlants = async (positionA, positionB) => {
    if ((await this.checkStatus(positionA, "2")) != 1) {
      console.log("error: plant A isn't grown and can't breed");
      return -1;
    }
    if ((await this.checkStatus(positionB, "2")) != 1) {
      console.log("error: plant B isn't grown and can't breed");
      return -1;
    }
    var newSeed = "%";

    var beeCheck = this.useBees(1);
    if (beeCheck == -1) {
      return -1;
    }

    const rarityAKey = positionA + "_rarity";
    const rarityBKey = positionB + "_rarity";

    let rarityA = await SecureStore.getItemAsync(rarityAKey);
    let rarityB = await SecureStore.getItemAsync(rarityBKey);

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

    const eventAKey = positionA + "_event";
    const eventBKey = positionB + "_event";
    const eventA = await SecureStore.getItemAsync(eventAKey);
    const eventB = await SecureStore.getItemAsync(eventBKey);

    const eventRand = Math.floor(Math.random() * 100) + 1;
    if (eventRand < 35) {
      event = eventA;
    } else if (eventRand < 70) {
      event = eventB;
    } else {
      event = "none";
    }

    console.log(rarity + event + "                    ");
    let seedsString = await SecureStore.getItemAsync("inventory_seeds");
    let seeds = JSON.parse(seedsString);
    console.log(seedsString);
    console.log("seeds before breeding: \n", seeds);

    seeds[event][rarity] += 1;
    console.log("seeds after breeding: \n", seeds);

    seedsString = JSON.stringify(seeds);
    await SecureStore.setItemAsync("inventory_seeds", seedsString);
    return rarity + event;
  };

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
