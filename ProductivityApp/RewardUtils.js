import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import * as SecureStore from "expo-secure-store";
import React from "react";
import SeedUtils from "./SeedUtils";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

const utils = new SeedUtils();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  updateStreak = async () => {
    // const localZone = await SecureStore.getItemAsync("timezone");
    // const localTime = DateTime.local().setZone(localZone);
    const localTime = DateTime.local();
    const localMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      // zone: localZone,
    });
    const localPrevMidnight = localMidnight.minus({ days: 1 });

    //TESTING
    const prevDay = Interval.fromDateTimes(localPrevMidnight, localMidnight);

    let latestSprintDay = await SecureStore.getItemAsync("latest_sprint");
    if (latestSprintDay == null || latestSprintDay == "") {
      await SecureStore.setItemAsync("latest_sprint", localTime.toISO());
      await SecureStore.setItemAsync("temp_sprint", localTime.toISO());
      await SecureStore.setItemAsync("streak_length", "1");
      await SecureStore.setItemAsync("longest_streak", "1");
    } else {
      latestSprintDay = DateTime.fromISO(
        await SecureStore.getItemAsync("latest_sprint")
      );

      console.log("latestSprintDay: " + latestSprintDay.toISO());
      let streakLength = Number.parseInt(
        await SecureStore.getItemAsync("streak_length")
      );
      if (prevDay.contains(latestSprintDay)) {
        console.log("STREAK BOOSTED");
        streakLength += 1;
      } else if (prevDay.isAfter(latestSprintDay)) {
        console.log("STREAK RESET");
        streakLength = 0;
      }
      await SecureStore.setItemAsync("streak_length", "" + streakLength);
      console.log("\n\n\n\n\nUpdated streak to " + streakLength);
      let longestStreak = Number.parseInt(
        await SecureStore.getItemAsync("longest_streak")
      );
      if (longestStreak !== longestStreak || longestStreak < streakLength) {
        longestStreak = streakLength;
      }
      await SecureStore.setItemAsync("longest_streak", "" + longestStreak);
      var i;
      for (i = 1; i <= 9; i++) {
        utils.updateGrowthStreak(i);
      }
    }

    // await SecureStore.setItemAsync("last_updated", localMidnight.toISO());
  };

  getWater = async () => {
    const count = Number.parseInt(
      await SecureStore.getItemAsync("inventory_water")
    );
    return count;
  };

  useWater = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_water");
    if (count > Number.parseInt(prevCount)) {
      console.log("error: not enough water");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_water", "" + newCount);
    return newCount;
  };

  earnWater = async (mins, streak) => {
    console.log("EARNWATER");
    const prevCount = await SecureStore.getItemAsync("inventory_water");
    var added = mins;
    if (streak >= 10) {
      added = Math.floor(mins * 2.0);
    } else if (streak >= 3) {
      added = Math.floor(mins * (1 + streak / 10));
    }
    const newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_water", "" + newCount);
    return added;
  };

  getBees = async () => {
    const count = Number.parseInt(
      await SecureStore.getItemAsync("inventory_bees")
    );
    return count;
  };

  earnBees = async (mins, streak) => {
    console.log("EARNBEES");
    const prevCount = await SecureStore.getItemAsync("inventory_bees");
    var added = Math.floor(mins, 30);
    if (streak >= 10) {
      added = Math.floor(mins * 2.0);
    } else if (streak >= 3) {
      added = Math.floor(mins * (1 + streak / 10), 30);
    }
    var progress = 30 - (mins % 30);
    await SecureStore.setItemAsync("bee_in_progress", "" + progress);
    const newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_bees", "" + newCount);
    return added;
  };

  getGold = async () => {
    const count = Number.parseInt(
      await SecureStore.getItemAsync("inventory_gold")
    );
    return count;
  };

  useGold = async (count) => {
    console.log("param: " + count);
    const prevCount = await SecureStore.getItemAsync("inventory_gold");
    console.log("how much do i FUCKING HAVE: " + prevCount);
    if (count > Number.parseInt(prevCount)) {
      console.log("error: not enough gold");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_gold", "" + newCount);
    console.log(
      "GOLDDDDDDDD: " + (await SecureStore.getItemAsync("inventory_gold"))
    );
    return newCount;
  };

  earnGold = async (mins, streak) => {
    console.log("EARNGOLD");
    const prevCount = await SecureStore.getItemAsync("inventory_gold");
    var added = mins * 5;
    if (streak >= 10) {
      added = Math.floor(mins * 2.0);
    } else if (streak >= 3) {
      added = Math.floor(mins * (1 + streak / 10) * 5);
    }
    const newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_gold", "" + newCount);
    return added;
  };

  getGem = async () => {
    const count = Number.parseInt(
      await SecureStore.getItemAsync("inventory_gems")
    );
    return count;
  };

  useGems = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_gems");
    if (count > Number.parseInt(prevCount)) {
      console.log("error: not enough gems");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_gems", "" + newCount);
    return newCount;
  };

  obtainFertilizer = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_fertilizer");
    const newCount = Number.parseInt(prevCount) + count;
    await SecureStore.setItemAsync("inventory_fertilizer", "" + newCount);
    return newCount;
  };

  obtainElixir = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_elixir");
    const newCount = Number.parseInt(prevCount) + count;
    await SecureStore.setItemAsync("inventory_elixir", "" + newCount);
    return newCount;
  };

  obtainSeed = async (event, rarity) => {
    console.log("OBTAINSEED");
    let seedsStr = await SecureStore.getItemAsync("inventory_seeds");
    let seeds = JSON.parse(seedsStr);
    seeds[event][rarity] += 1;
    seedsStr = JSON.stringify(seeds);
    await SecureStore.setItemAsync("inventory_seeds", seedsStr);
    // var seedTypeIndex = prevStr.indexOf(event + rarity);
    // console.log("seedTypeIndex: " + seedTypeIndex);
    // var newStr = "";
    // if (seedTypeIndex == -1) {
    //   newStr = prevStr + "%1" + event + rarity;
    //   console.log("IN HERE 1");
    // } else {
    //   var prevStrFirst = prevStr.substring(0, seedTypeIndex);
    //   var prevStrLast = prevStr.substring(seedTypeIndex);
    //   var percentIndex = prevStrFirst.lastIndexOf("%");
    //   var count = Number.parseInt(prevStrFirst.substring(percentIndex + 1)) + 1;
    //   newStr = prevStr.substring(0, percentIndex + 1) + count + prevStrLast;
    //   console.log("IN HERE OTRO");
    // }
    // console.log("newStr: " + newStr);
    // await SecureStore.setItemAsync("inventory_seeds", "" + newStr);
    // console.log(
    //   "what after SHOULD be: " +
    //     (await SecureStore.getItemAsync("inventory_seeds"))
    // );
    // return newStr;
  };
}
