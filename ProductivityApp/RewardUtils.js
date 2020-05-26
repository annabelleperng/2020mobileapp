import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  getWater() {
    count = await SecureStore.getItemAsync("inventory_water");
    return count;
  }

  useWater(count) {
    prevCount = await SecureStore.getItemAsync("inventory_water");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_water", '' + newCount);
    return newCount;
  }

  earnWater(mins, streak) {
    prevCount = await SecureStore.getItemAsync("inventory_water");
    if (streak >= 3) {
        added = mins * (1 + streak / 10)
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_water", '' + newCount);
    return newCount;
  }

  getBees() {
    count = await SecureStore.getItemAsync("inventory_bees");
    return count;
  }

  useBees(count) {
    prevCount = await SecureStore.getItemAsync("inventory_bees");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_bees", '' + newCount);
    return newCount;
  }

  earnBees(mins, streak) {
    prevCount = await SecureStore.getItemAsync("inventory_bees");
    if (streak >= 3) {
        added = (mins * (1 + streak / 10)) % 30
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_bees", '' + newCount);
    return newCount;
  }

  getGold() {
    count = await SecureStore.getItemAsync("inventory_gold");
    return count;
  }

  useGold(count) {
    prevCount = await SecureStore.getItemAsync("inventory_gold");
    newCount = Number.parseInt(prevCount) - count;
    await SecureStore.setItemAsync("inventory_gold", '' + newCount);
    return newCount;
  }

  earnGold(mins) {
    prevCount = await SecureStore.getItemAsync("inventory_gold");
    if (streak >= 3) {
        added = (mins * (1 + streak / 10)) * 5
    }
    newCount = Number.parseInt(prevCount) + added;
    await SecureStore.setItemAsync("inventory_gold", '' + newCount);
    return newCount;
  }

  obtainSeed(rarity, event) {
    prevStr = await SecureStore.getItemAsync("inventory_seeds");
    newStr = prevStr + "%" + rarity + event;
    await SecureStore.setItemAsync("inventory_seeds", '' + newStr);
    return newStr;
  }  
}