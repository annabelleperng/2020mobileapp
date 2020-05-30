import DateTime from "luxon/src/datetime.js";
import Interval from "luxon/src/interval.js";
import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  updateStreak = async () => {
    localZone = this.props.route.params.selectedValues;
    localTime = DateTime.local().setZone(localZone);
    localMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      zone: localZone,
    });
    localPrevMidnight = localMidnight.minus({ days: 1 });
    prevDay = Interval.fromDateTimes(localPrevMidnight, localMidnight);
    latestSprintDay = DateTime.fromISO(
      await SecureStore.getItemAsync("latest_sprint")
    );
    streakLength = Number.parseInt(
      await SecureStore.getItemAsync("streak_length")
    );
    if (prevDay.contains(latestSprintDay)) {
      streakLength += 1;
    } else if (prevDay.isAfter(latestSprintDay)) {
      streakLength = 0;
    }
    await SecureStore.setItemAsync("streak_length", "" + streakLength);
  };

  getWater = async () => {
    count = await SecureStore.getItemAsync("inventory_water");
    return count;
  };

  useWater = async (count) => {
    prevCount = await SecureStore.getItemAsync("inventory_water");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_water", "" + newCount);
    return newCount;
  };

  earnWater = async (mins, streak) => {
    prevCount = await SecureStore.getItemAsync("inventory_water");
    if (streak >= 3) {
      added = mins * (1 + streak / 10);
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_water", "" + newCount);
    return newCount;
  };

  getBees = async () => {
    count = await SecureStore.getItemAsync("inventory_bees");
    return count;
  };

  useBees = async (count) => {
    prevCount = await SecureStore.getItemAsync("inventory_bees");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_bees", "" + newCount);
    return newCount;
  };

  earnBees = async (mins, streak) => {
    prevCount = await SecureStore.getItemAsync("inventory_bees");
    if (streak >= 3) {
      added = (mins * (1 + streak / 10)) % 30;
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_bees", "" + newCount);
    return newCount;
  };

  getGold = async () => {
    count = await SecureStore.getItemAsync("inventory_gold");
    return count;
  };

  useGold = async (count) => {
    prevCount = await SecureStore.getItemAsync("inventory_gold");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_gold", "" + newCount);
    return newCount;
  };

  earnGold = async (mins) => {
    prevCount = await SecureStore.getItemAsync("inventory_gold");
    if (streak >= 3) {
      added = mins * (1 + streak / 10) * 5;
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_gold", "" + newCount);
    return newCount;
  };

  obtainSeed = async (rarity, event) => {
    prevStr = await SecureStore.getItemAsync("inventory_seeds");
    newStr = prevStr + "%" + rarity + event;
    await SecureStore.setItemAsync("inventory_seeds", "" + newStr);
    return newStr;
  };
}
