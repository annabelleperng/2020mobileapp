import DateTime from "luxon/src/datetime.js";
import Duration from "luxon/src/duration.js";
import Interval from "luxon/src/interval.js";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from "react-native";
import SeedUtils from "./SeedUtils";
import RewardUtils from "./RewardUtils";

import * as SecureStore from "expo-secure-store";
import { throwIfAudioIsDisabled } from "expo-av/build/Audio/AudioAvailability";

const screen = Dimensions.get("window");
const seedUtils = new SeedUtils();
const rewardUtils = new RewardUtils();

let eventPics = {
  welcomeCommon: require("./assets/newicons/newwelcomec.png"),
  welcomeUncommon: require("./assets/newicons/newwelcomeu.png"),
  welcomeRare: require("./assets/newicons/newwelcomer.png"),
};

export default class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gems: -1,
      gold: -1,
      canBuyRarePlant: false,
      canBuyElixir: false,
      isUpdated: false,
      showCancel: false,
      showBees: false,
      status1: 2,
      status2: 2,
      status3: 2,
      bee1: "invis ",
      bee2: "invis ",
      bee3: "invis ",
      firstParent: 0,
      secondParent: 0,
      selectedParents: 0,

      initialized: false,
      eventName: "",
      eventCountdown: -1,
      rolled: 0,
      itemPrices: ["100", "100", "100", "300", "150", "150", "200", "600"],
      price8: "???",
      price9: "???",
      price10: "???",
      bought0: 0,
      bought1: 0,
      bought2: 0,
      bought3: 0,
      bought4: 0,
      bought5: 0,
      bought6: 0,
      bought7: 0,
      bought8: 0,
      bought9: 0,
      bought10: 0,
      rarity8: "",
      rarity9: "",
      rarity10: "",
      eventPic8: null,
      eventPic9: null,
      eventPic10: null,
    };
  }

  initialize = async () => {
    // await SecureStore.setItemAsync("inventory_gems", "0");
    console.log("\n \n \n initializing shop");
    let goldAmt = await SecureStore.getItemAsync("inventory_gold");
    this.setState({ gold: goldAmt });
    let gemAmt = await SecureStore.getItemAsync("inventory_gems");
    console.log("GEEEEEMS: " + gemAmt);
    if (goldAmt != goldAmt || goldAmt < 0) {
      goldAmt = 0;
      await SecureStore.setItemAsync("inventory_gold", 0 + "");
    }
    if (gemAmt != gemAmt || gemAmt < 0) {
      gemAmt = 0;
      await SecureStore.setItemAsync("inventory_gems", 0 + "");
    }
    console.log("gems: " + gemAmt);

    const localZone = await SecureStore.getItemAsync("timezone");
    // const localTime = DateTime.local().setZone(localZone);
    const localTime = DateTime.local();
    const localMidnight = DateTime.fromObject({
      year: localTime.year,
      month: localTime.month,
      day: localTime.day,
      hour: 0,
      minute: 0,
      second: 0,
      // zone: localZone
    });
    console.log("local midnight: " + localMidnight.toISO());

    const localPrevMidnight = localMidnight.minus({ days: 1 });
    console.log("local prev midnight: " + localPrevMidnight.toISO());
    const prevDay = Interval.fromDateTimes(localPrevMidnight, localMidnight);
    // const localPrev = localPrevMidnight.minus({ hours: 5 });
    // await SecureStore.setItemAsync("shop_refreshed", localPrev.toISO());
    const lastRefreshed = DateTime.fromISO(
      await SecureStore.getItemAsync("shop_refreshed")
    );
    console.log("lastRefreshed " + lastRefreshed.toISO());

    var eventName = await SecureStore.getItemAsync("event_name");
    var eventCountdown = await SecureStore.getItemAsync("event_countdown");

    if ((await SecureStore.getItemAsync("event_name")) != null) {
      this.setState({
        eventName: await SecureStore.getItemAsync("event_name"),
        eventCountdown: Number.parseInt(
          await SecureStore.getItemAsync("event_countdown")
        ),
      });
    }

    if ((eventName = "")) {
      if (this.state.eventCountdown > 0) {
        await SecureStore.setItemAsync("event_name", "" + this.state.eventName);
        eventName = this.state.eventName;
        await SecureStore.setItemAsync(
          "event_countdown",
          "" + this.state.eventCountdown
        );
        eventCountdown = "" + this.state.eventCountdown;
      }
    }

    console.log(
      "prevDay before lastRefreshed? " + prevDay.isBefore(lastRefreshed)
    );
    if (
      lastRefreshed == null ||
      lastRefreshed == "" ||
      prevDay.isBefore(lastRefreshed)
    ) {
      console.log("REFRESHED TODAY!");
      // await SecureStore.setItemAsync("rolled_today", "0"); //for testing purposes
      // this.eventChance(); //for testing purposes
      let r = await SecureStore.getItemAsync("rolled_today");
      console.log("TELL ME R, BITCH: " + r);
      this.setState({
        eventPic8: await SecureStore.getItemAsync("eventPic8"),
        eventPic9: await SecureStore.getItemAsync("eventPic9"),
        eventPic10: await SecureStore.getItemAsync("eventPic10"),
        rolled: r,
        price8: await SecureStore.getItemAsync("price8"),
        price9: await SecureStore.getItemAsync("price9"),
        price10: await SecureStore.getItemAsync("price10"),
        bought0: await SecureStore.getItemAsync("bought0"),
        bought1: await SecureStore.getItemAsync("bought1"),
        bought2: await SecureStore.getItemAsync("bought2"),
        bought3: await SecureStore.getItemAsync("bought3"),
        bought4: await SecureStore.getItemAsync("bought4"),
        bought5: await SecureStore.getItemAsync("bought5"),
        bought6: await SecureStore.getItemAsync("bought6"),
        bought7: await SecureStore.getItemAsync("bought7"),
        bought8: await SecureStore.getItemAsync("bought8"),
        bought9: await SecureStore.getItemAsync("bought9"),
        bought10: await SecureStore.getItemAsync("bought10"),
        rarity8: await SecureStore.getItemAsync("rarity8"),
        rarity9: await SecureStore.getItemAsync("rarity9"),
        rarity10: await SecureStore.getItemAsync("rarity10"),
      });
      console.log("INITIALIZATION ROLL VALUE: " + this.state.rolled);
    }
    // console.log(await SecureStore.getItemAsync("event_name"));

    // console.log(
    //   "prevDay contains lastRefreshed? " + prevDay.contains(lastRefreshed)
    // );
    // console.log(
    //   "prevDay after lastRefreshed? " + prevDay.isAfter(lastRefreshed)
    // );

    if (prevDay.contains(lastRefreshed) || prevDay.isAfter(lastRefreshed)) {
      console.log("FIRST TIME IN SHOP TODAY!");
      //initialize
      await SecureStore.setItemAsync("rolled_today", "" + this.state.rolled);
      await SecureStore.setItemAsync("bought0", "" + this.state.bought0);
      await SecureStore.setItemAsync("bought1", "" + this.state.bought1);
      await SecureStore.setItemAsync("bought2", "" + this.state.bought2);
      await SecureStore.setItemAsync("bought3", "" + this.state.bought3);
      await SecureStore.setItemAsync("bought4", "" + this.state.bought4);
      await SecureStore.setItemAsync("bought5", "" + this.state.bought5);
      await SecureStore.setItemAsync("bought6", "" + this.state.bought6);
      await SecureStore.setItemAsync("bought7", "" + this.state.bought7);

      this.eventChance();

      let diff = lastRefreshed.diffNow().days;
      console.log("DIFF BIFF: " + diff);
      if (Number.parseInt(eventCountdown) > 0) {
        console.log("hereiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaam");
        eventCountdown = Number.parseInt(eventCountdown) - diff;
        eventCountdown = eventCountdown + "";
      }

      if (Number.parseInt(eventCountdown) <= 0) {
        console.log("WHY THE FUCK ARE YOU HERE YO");
        await SecureStore.setItemAsync("rolled_today", this.state.rolled);
        await SecureStore.setItemAsync("event_countdown", "0");
        await SecureStore.setItemAsync("event_name", "");
        await SecureStore.setItemAsync("bought8", "" + this.state.bought8);
        await SecureStore.setItemAsync("bought9", "" + this.state.bought9);
        await SecureStore.setItemAsync("bought10", "" + this.state.bought10);
        await SecureStore.setItemAsync("rarity8", "");
        await SecureStore.setItemAsync("rarity9", "");
        await SecureStore.setItemAsync("rarity10", "");
        this.setState({ eventCountdown: -1, eventName: "" });
      } else {
        console.log("IM IN HERE BRO");
        await SecureStore.setItemAsync("event_countdown", "" + eventCountdown);
        this.setState({ eventName: eventName });
        await SecureStore.setItemAsync("price8", "" + this.state.price8);
        await SecureStore.setItemAsync("price9", "" + this.state.price9);
        await SecureStore.setItemAsync("price10", "" + this.state.price10);
        await SecureStore.setItemAsync("rarity8", "" + this.state.rarity8);
        await SecureStore.setItemAsync("rarity9", "" + this.state.rarity9);
        await SecureStore.setItemAsync("rarity10", "" + this.state.rarity10);
      }
    }

    console.log("set shop_refreshed to: " + localTime.toISO());

    await SecureStore.setItemAsync("shop_refreshed", localTime.toISO());

    console.log(
      "INITIALIZATION ROLL VALUE END OF INITIALIZATION: " + this.state.rolled
    );
  };

  // setGems = async () => {
  //   await SecureStore.setItemAsync("inventory_gems", "0");
  //   this.setState({ gems: 0 });
  //   console.log("CURRENT GEMS: " + this.state.gems);
  // };

  eventChance = async () => {
    console.log("doing eventChance!!!!!!!!!!!");
    var i;
    for (i = 8; i <= 10; i++) {
      let rarityRand = Math.floor(Math.random() * 100) + 1;
      let rarityKey = "rarity" + i;
      let priceKey = "price" + i;
      let picKey = "eventPic" + i;
      if (rarityRand > 75) {
        this.setState({
          [rarityKey]: "rare",
          [priceKey]: "300",
          [picKey]: "welcomeRare",
        });
        await SecureStore.setItemAsync(priceKey, "300");
      } else if (rarityRand > 50) {
        this.setState({
          [rarityKey]: "uncommon",
          [priceKey]: "225",
          [picKey]: "welcomeUncommon",
        });
        await SecureStore.setItemAsync(priceKey, "225");
      } else {
        this.setState({
          [rarityKey]: "common",
          [priceKey]: "150",
          [picKey]: "welcomeCommon",
        });
        await SecureStore.setItemAsync(priceKey, "150");
      }
    }

    // let rarityRand8 = Math.floor(Math.random() * 100) + 1;
    // let rarityKey8 = "rarity" + i;
    // let priceKey8 = "price" + i;
    // if (rarityRand8 > 75) {
    //   this.setState({ [rarityKey8]: "rare", [priceKey8]: "300" });
    // } else if (rarityRand8 > 50) {
    //   this.setState({ [rarityKey8]: "uncommon", [priceKey8]: "225" });
    // } else {
    //   this.setState({ [rarityKey8]: "common", [priceKey8]: "150" });
    // }

    // let rarityRand9 = Math.floor(Math.random() * 100) + 1;
    // let rarityKey9 = "rarity" + i;
    // let priceKey9 = "price" + i;
    // if (rarityRand9 > 75) {
    //   this.setState({ [rarityKey9]: "rare", [priceKey9]: "300" });
    // } else if (rarityRand > 50) {
    //   this.setState({ [rarityKey9]: "uncommon", [priceKey9]: "225" });
    // } else {
    //   this.setState({ [rarityKey9]: "common", [priceKey9]: "150" });
    // }

    // let rarityRand10 = Math.floor(Math.random() * 100) + 1;
    // let rarityKey10 = "rarity" + i;
    // let priceKey10 = "price" + i;
    // if (rarityRand10 > 75) {
    //   this.setState({ [rarityKey10]: "rare", [priceKey10]: "300" });
    // } else if (rarityRand > 50) {
    //   this.setState({ [rarityKey10]: "uncommon", [priceKey10]: "225" });
    // } else {
    //   this.setState({ [rarityKey10]: "common", [priceKey10]: "150" });
    // }
  };

  buy = async (pos) => {
    console.log("buying");
    var boughtVar = "bought" + pos;
    console.log("boughtVar: " + this.state[boughtVar]);
    if (this.state[boughtVar] == 1) {
      console.log("error: this item has been bought today already");
      return -1;
    }

    // rewardUtils.earnGold(50, 1);
    var gold = rewardUtils.getGold();
    console.log("gold: " + (await SecureStore.getItemAsync("inventory_gold")));
    console.log("price: " + this.state.itemPrices[pos]);
    if (gold < Number.parseInt(this.state.itemPrices[pos])) {
      console.log("error: not enough gold to buy item " + pos);
      return -1;
    }

    console.log(
      "before: " + (await SecureStore.getItemAsync("inventory_seeds"))
    );

    if (pos >= 0 && pos <= 2) {
      await rewardUtils.obtainSeed("none", "C");
      // alert(
      //   "Congratulations!\nA new common seed has been added to your inventory."
      // );
      Alert.alert(
        "Transaction Successful",
        "Congratulations!\nA new common seed has been added to your inventory.",
        [
          {
            text: "OKAY",
          },
        ],
        { cancelable: false }
      );
    } else if (pos == 3) {
      await rewardUtils.obtainFertilizer(1);
      alert(
        "Congratulations!\nOne bag of fertilizer has been added to your inventory."
      );
    } else if (pos == 4 || pos == 5) {
      await rewardUtils.obtainSeed("none", "U");
      alert(
        "Congratulations!\nA new uncommon seed has been added to your inventory."
      );
    } else if (pos == 6) {
      await rewardUtils.obtainSeed("none", "R");
      alert(
        "Congratulations!\nA new rare seed has been added to your inventory."
      );
    } else if (pos == 7) {
      await rewardUtils.obtainElixir(1);
      // alert(
      //   "Congratulations!\nOne elixir potion has been added to your inventory."
      // );
      Alert.alert(
        "Transaction Successful",
        "Congratulations!\nOne elixir potion has been added to your inventory.",
        [
          {
            text: "OKAY",
          },
        ],
        { cancelable: false }
      );
    } else if (pos == 8 || pos == 9) {
      await rewardUtils.obtainSeed(
        this.state.eventName,
        this.state.rarity8.substring(0, 1).toUpperCase()
      );
      alert(
        "Congratulations!\nA new " +
          this.state.rarity8 +
          this.state.eventName +
          " seed has been added to your inventory."
      );
    } else if (pos == 10) {
      if (this.state.rarity10 == "uncommon") {
        await rewardUtils.obtainSeed(
          this.state.eventName,
          this.state.rarity9.substring(0, 1).toUpperCase()
        );
        alert(
          "Congratulations!\nA new " +
            this.state.rarity9 +
            this.state.eventName +
            " seed has been added to your inventory."
        );
      } else if (this.state.rarity10 == "rare") {
        await rewardUtils.obtainSeed(
          this.state.eventName,
          this.state.rarity10.substring(0, 1).toUpperCase()
        );
        alert(
          "Congratulations!\nA new " +
            this.state.rarity10 +
            this.state.eventName +
            " seed has been added to your inventory."
        );
      }
    }

    await SecureStore.setItemAsync("bought" + pos, "1");

    console.log("PRICEEEEE: " + this.state.itemPrices[pos]);
    await rewardUtils.useGold(Number.parseInt(this.state.itemPrices[pos]));

    console.log("boughtVar before setting: " + this.state[boughtVar]);
    this.setState({ [boughtVar]: 1 });

    console.log(
      "after: " + (await SecureStore.getItemAsync("inventory_seeds")) + "\n\n"
    );

    let goldAmt = await SecureStore.getItemAsync("inventory_gold");
    this.setState({ gold: goldAmt });
    console.log("gold after buying: " + this.state.gold);

    this.setState({ initialized: false });
  };

  roll = async () => {
    this.setState({ rolled: "1" });
    await SecureStore.setItemAsync("rolled_today", "1");
  };

  render() {
    // this.updateStuff();
    if (!this.state.initialized) {
      console.log("ROLLED OR NAH, BEFORE: " + this.state.rolled);
      this.initialize();
      // this.eventChance();
      this.setState({ initialized: true });
      console.log("ROLLED OR NAH, AFTER: " + this.state.rolled);
      console.log("STATE EVENT NAMEEEEE: " + this.state.eventName);
    }
    if (this.state.gold < 0) {
      this.setState({ gold: 0 });
    }
    if (this.state.gems < 0) {
      this.setState({ gems: 0 });
    }
    console.log("STATEEVENTNAMEEEEE: " + this.state.eventName);

    const gold = rewardUtils.getGold();

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center",
        }}
      >
        {/* <View
          style={{
            flex: 0.7,
            backgroundColor: "#333333",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {console.log("gold: " + this.state.gold)}
          <Text style={{ color: "#ffffff" }}>
            {" "}
            gold: {this.state.gold} gems: {this.state.gems}{" "}
          </Text>
        </View> */}
        <View
          style={{
            backgroundColor: "#334E33",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {console.log("STATE GEMS: " + this.state.gems)}
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={styles.smallButton}
              source={require("./assets/gold.png")}
            />
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gold}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                backgroundColor: "#334E33",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View style={{ flex: 2, alignItems: "flex-end" }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("GemShop")}
                >
                  <Image
                    style={styles.smallButton}
                    source={require("./assets/plus.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Image
                  style={styles.smallButton}
                  source={require("./assets/newicons/newgemplain.png")}
                />
              </View>
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Text style={styles.leftTimesSmol}>{this.state.gems}</Text>
          </View>
        </View>
        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Common</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Common</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Common</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Fertilizer</Text>
              <Text style={styles.itemName2}></Text>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought0 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newcommonseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(0)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newcommonseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought1 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newcommonseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(1)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newcommonseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought2 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newcommonseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(2)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newcommonseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought3 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newfertilizer.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(3)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newfertilizer.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought0 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[0]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[0]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[0]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[0]}</Text>
                </View>
              )}

              {/* {gold < Number.parseInt(this.state.itemPrices[0]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[0]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[0]}</Text>
                </View>
              )} */}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought1 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[1]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[1]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[1]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[1]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought2 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[2]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[2]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[2]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[2]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought3 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[3]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[3]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[3]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[3]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>

        <View
          style={{ flex: 4, backgroundColor: "#57423e", alignItems: "center" }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Uncommon</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Uncommon</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Rare</Text>
              <Text style={styles.itemName2}>Seed</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text style={styles.itemName1}>Elixir</Text>
              <Text style={styles.itemName2}></Text>
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 0,
              //   marginLeft: screen.width / 14,
            }}
          >
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought4 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newuncommonseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(4)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newuncommonseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought5 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newuncommonseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(5)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newuncommonseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought6 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newrareseed.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(6)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newrareseed.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {this.state.bought7 == 1 ? (
                <Image
                  style={styles.items}
                  source={require("./assets/newicons/newelixir.png")}
                />
              ) : (
                <TouchableOpacity onPress={() => this.buy(7)}>
                  <Image
                    style={styles.items}
                    source={require("./assets/newicons/newelixir.png")}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{ flex: 0.2 }}></View>
          </View>
        </View>

        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought4 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[4]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[4]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[4]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[4]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought5 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[5]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[5]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[5]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[5]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought6 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[6]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[6]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[6]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[6]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.bought7 == 1 ? (
                <View>
                  <Text style={styles.bought}>{this.state.itemPrices[7]}</Text>
                </View>
              ) : this.state.gold <
                Number.parseInt(this.state.itemPrices[7]) ? (
                <View>
                  <Text style={styles.poor}>{this.state.itemPrices[7]}</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.prices}>{this.state.itemPrices[7]}</Text>
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>

        {console.log("HAVE WE ROLLED YET MOTHERFUCKER? " + this.state.rolled)}
        {this.state.rolled == "0" ? (
          <View
            style={{
              flex: 5,
              backgroundColor: "#57423e",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => this.roll()}
              style={[styles.button, { alignItems: "center" }]}
            >
              <Text style={styles.event}>Roll for today's event seeds!</Text>
              <Image
                style={[styles.items, { marginTop: screen.height / 50 }]}
                source={require("./assets/dice.png")}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={{
              flex: 5,
              backgroundColor: "#57423e",
              alignItems: "center",
            }}
          >
            {this.state.eventName != "" && this.state.eventName != null ? (
              <View style={{ textAlign: "center" }}>
                <Text style={styles.event}>
                  {this.state.eventCountdown +
                    " days left of the " +
                    this.state.eventName.substring(0, 1).toUpperCase() +
                    this.state.eventName.substring(1) +
                    " event!"}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            {this.state.eventName != "" && this.state.eventName != null ? (
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  alignItems: "center",
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.itemName1}>
                    {this.state.rarity8.substring(0, 1).toUpperCase() +
                      this.state.rarity8.substring(1)}
                  </Text>
                  <Text style={styles.itemName2}> Seed </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.itemName1}>
                    {this.state.rarity9.substring(0, 1).toUpperCase() +
                      this.state.rarity9.substring(1)}
                  </Text>
                  <Text style={styles.itemName2}> Seed </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.itemName1}>
                    {this.state.rarity10.substring(0, 1).toUpperCase() +
                      this.state.rarity10.substring(1)}
                  </Text>
                  <Text style={styles.itemName2}> Seed </Text>
                </View>
                <View style={{ flex: 0.2 }}></View>
              </View>
            ) : (
              <View></View>
            )}

            {this.state.eventName != "" ? (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 0,
                  //   marginLeft: screen.width / 14,
                }}
              >
                <View style={{ flex: 0.2 }}></View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought8 == 1 ? (
                    <Image
                      style={styles.items}
                      source={eventPics[this.state.eventPic8]}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => this.buy(8)}>
                      <Image
                        style={styles.items}
                        source={eventPics[this.state.eventPic8]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought9 == 1 ? (
                    <Image
                      style={styles.items}
                      source={eventPics[this.state.eventPic9]}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => this.buy(9)}>
                      <Image
                        style={styles.items}
                        source={eventPics[this.state.eventPic9]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  {this.state.bought10 == 1 ? (
                    <Image
                      style={styles.items}
                      source={eventPics[this.state.eventPic10]}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => this.buy(10)}>
                      <Image
                        style={styles.items}
                        source={eventPics[this.state.eventPic10]}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View style={{ flex: 0.2 }}></View>
              </View>
            ) : (
              <View>
                <Text style={styles.comingSoon}>Event coming soon!</Text>
              </View>
            )}
          </View>
        )}

        <View
          style={{
            flex: 1.1,
            backgroundColor: "#472b25",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View style={{ flex: 0.2 }}></View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.rolled == "0" ? (
                <View>
                  <Text style={styles.prices}>???</Text>
                </View>
              ) : (
                <View>
                  {this.state.gold < Number.parseInt(this.state.price8) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price8}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price8}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.rolled == "0" ? (
                <View>
                  <Text style={styles.prices}>???</Text>
                </View>
              ) : (
                <View>
                  {this.state.gold < Number.parseInt(this.state.price9) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price9}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price9}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[styles.smallButton]}
                source={require("./assets/gold.png")}
              />
              {this.state.rolled == "0" ? (
                <View>
                  <Text style={styles.prices}>???</Text>
                </View>
              ) : (
                <View>
                  {this.state.gold < Number.parseInt(this.state.price10) ? (
                    <View>
                      <Text style={styles.poor}>{this.state.price10}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.prices}>{this.state.price10}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={{ flex: 0.2 }}></View>
        </View>

        <View style={{ flex: 1.3, backgroundColor: "#57423e" }}></View>
        {/* <View
          style={{
            flex: 0.7,
            backgroundColor: "#333333",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {console.log("gold: " + this.state.gold)}
          <Text style={{ color: "#ffffff" }}> gold: {this.state.gold}</Text>
        </View> */}
        <View style={{ flex: 3, backgroundColor: "#0e0e0e" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: (screen.height * 3) / 22 - screen.width / 5,
              //   marginLeft: screen.width / 14,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Home")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons}
                source={require("./assets/newicons/newhouse.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Garden2")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/largebee.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("GemShop")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/newicons/newgem.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Almanac")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/newicons/newalmanac.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginTop: 0,
    marginBottom: screen.height / 80,
    width: screen.width / 7,
    height: screen.width / 7,
  },
  menuIcons: {
    width: screen.width / 9,
    height: screen.width / 9,
  },
  menuIcons2: {
    width: screen.width / 9,
    height: screen.width / 9,
    marginLeft: screen.width / 10,
  },
  pinkButton: {
    borderWidth: 2,
    borderColor: "#ff576d",
    width: screen.width / 25,
    height: screen.width / 25,
    borderRadius: screen.width / 25,
    alignItems: "center",
    justifyContent: "center",
  },
  smallButton: {
    width: screen.height / 28,
    height: screen.height / 28,
  },
  roll: {
    width: "80%",
    height: "15%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 7,
    marginTop: 10,
  },
  comingSoon: {
    color: "#74D130",
    fontSize: 40,
    marginTop: screen.height / 16,
  },
  event: {
    color: "#74D130",
    fontSize: 20,
    marginTop: screen.height / 45,
  },
  prices: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  poor: {
    color: "#F5493D",
    fontSize: 16,
  },
  bought: {
    color: "#B9C4C4",
    fontSize: 16,
  },
  itemName1: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: screen.height / 50,
    textAlign: "center",
  },
  itemName2: {
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: screen.height / 70,
    textAlign: "center",
  },
});
