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
    const localZone = await SecureStore.getItemAsync("timezone");
    const localTime = DateTime.local().setZone(localZone);
    const localMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      zone: localZone,
    });
    const localPrevMidnight = localMidnight.minus({ days: 1 });
    const prevDay = Interval.fromDateTimes(localPrevMidnight, localMidnight);
    const latestSprintDay = DateTime.fromISO(
      await SecureStore.getItemAsync("latest_sprint")
    );
    const streakLength = Number.parseInt(
      await SecureStore.getItemAsync("streak_length")
    );
    if (prevDay.contains(latestSprintDay)) {
      streakLength += 1;
    } else if (prevDay.isAfter(latestSprintDay)) {
      streakLength = 0;
    }
    await SecureStore.setItemAsync("streak_length", "" + streakLength);
    console.log("\n\n\n\n\nUpdated streak to " + streakLength);

    for (i = 1; i <= 9; i++) {
      utils.updateGrowthStreak(i);
    }

    await SecureStore.setItemAsync("last_updated", localMidnight.ISO());
  };

  getWater = async () => {
    const count = await SecureStore.getItemAsync("inventory_water");
    return count;
  };

  useWater = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_water");
    if (count > prevCount) {
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
    const count = await SecureStore.getItemAsync("inventory_bees");
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
    const count = await SecureStore.getItemAsync("inventory_gold");
    return count;
  };

  useGold = async (count) => {
    const prevCount = await SecureStore.getItemAsync("inventory_gold");
    if (count > prevCount) {
      console.log("error: not enough gold");
      return -1;
    }
    const newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_gold", "" + newCount);
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

  obtainSeed = async (rarity, event) => {
    console.log("OBTAINSEED");
    const prevStr = await SecureStore.getItemAsync("inventory_seeds");
    const newStr = prevStr + "%" + rarity + event;
    await SecureStore.setItemAsync("inventory_seeds", "" + newStr);
    return newStr;
  };
}
