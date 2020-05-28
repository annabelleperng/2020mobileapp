import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as SecureStore from "expo-secure-store";

export default class SeedUtils extends Component {
  constructor(props) {
    super(props);
  }

  foo = () => {
    console.log("foo");
  };
  /* Returns -1 if invalid parameters,
   * 0 if the parameterstatus is not the current status (i.e. parameter status
   * is growing and actual status is grown),
   * 1 if parameter stuats
   */
  checkStatus = async (position, status) => {
    console.log("cheqing checkStatus uwu");
    if (position < 1 || position > 9) {
      console.log("Invalid position for checkStatus");
      return -1;
    }
    const actualStatusKey = position.toString() + "_status";
    const actualStatus = await SecureStore.getItemAsync(actualStatusKey);

    if ((actualStatus === status) == false) {
      console.log("false");
      return 0;
    }

    console.log("true");

    return 1;
  };
  /* Returns # of waters remaining if not all waters in parameter are used */
  // waterPlant(position, waters) {
  //   statusKey = position.toString() + "_status"
  //   plantStatus = await SecureStore.getItemAsync(statusKey);
  //   if (plantStatus.equals("2")==false)
  //   {
  //       console.log("error: you shouldn't be able to water this plant!");
  //       return -1;
  //   }

  //   waterKey = position.toString() + "_waters";
  //   currentWaters = await SecureStore.getItemAsync(waterKey);
  //   newCount = Number.parseInt(currentWaters) + waters;
  //   remainder = 0;

  //   if (newCount > 15)
  //   {
  //       remainder = newCount - 15;
  //       newCount = 15
  //   }

  //   await SecureStore.setItemAsync(waterKey, '' + newCount);
  //   return remainder;
  // }

  //   fertilizePlant(position) {}

  //   breedPlant(position, waters) {}
}
