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
  SafeAreaView,
  ScrollView
} from "react-native";
import Constants from "expo-constants";

const screen = Dimensions.get("window");

export default class Help extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={{ flex: 1, backgroundColor: "#42f5d7" }}>
            <View
              style={{
                flex: 0.1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 36 }}>Welcome to [ app name ]</Text>
              <Text style={styles.body}>
                Get productive to build your garden!
              </Text>
            </View>
            <View style={{ flex: 0.2 }}>
              <Text></Text>
            </View>
            <View style={{ flex: 0.7, marginLeft: 20, marginRight: 20 }}>
              <Text style={styles.body}>
                Start navigating from the home page
              </Text>
              <Image
                source={require("./assets/home.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Start a sprint by inputting how much time you plan on working.
              </Text>
              <Image
                source={require("./assets/start_sprint.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Earn rewards for being productive during your sprints.
              </Text>
              <Image
                source={require("./assets/earn_rewards.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Keep track of your plants in the garden
              </Text>
              <Image
                source={require("./assets/garden.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Click on an empty pot to start growing. Press the 'seeds'
                button!
              </Text>
              <Image
                source={require("./assets/empty_pot.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Pick a seed from your inventory to plant
              </Text>
              <Image
                source={require("./assets/seeds_inventory.png")}
                style={styles.image}
              />
              <Image
                source={require("./assets/planted_seed.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Click on any pot with a plant from the garden to see your
                plant's progress
              </Text>
              <Image
                source={require("./assets/growing_plant.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                Use water to help your plants grow. Fertilizer can be used to
                speed up growth{" "}
              </Text>
              <Text style={styles.body}>
                If you don't water your plants for 3 days your plants will wilt!
              </Text>
              <Image
                source={require("./assets/until_wilted.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                You can use exilir to restore wilted plants. You buy elixir,
                fertilizer and other seeds from the shop
              </Text>
              <Image
                source={require("./assets/shop.png")}
                style={styles.image}
              />
              <Text style={styles.body}>
                When you have two fully grown plants you can breed them! Click
                the bee at the bottom, then click the bees under the two plants
                you want to breed.
              </Text>
              <Image
                source={require("./assets/before_breed.png")}
                style={styles.image}
              />
              <Image
                source={require("./assets/after_breed.png")}
                style={styles.image}
              />
            </View>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => navigate("Home")}>
                <View
                  style={[
                    styles.pinkButton2,
                    {
                      height:
                        Platform.OS == "android"
                          ? screen.width / 12
                          : screen.width / 10
                    }
                  ]}
                >
                  <Text style={styles.smallWhiteText}>Back to home</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  smallWhiteText: {
    color: "#ebbd34",
    fontSize: 15,
    marginTop: 5
  },
  pinkButton2: {
    borderWidth: 2,
    borderColor: "#979797", //"#ff576d",
    width: screen.width / 2.7,
    height: screen.width / 12,
    borderRadius: screen.width / 2,
    alignItems: "center",
    // backgroundColor: "#fca",
    // color: "#fff",
    // fontSize: 30,
    justifyContent: "center",
    marginLeft: screen.width / 15
  },
  image: {
    width: undefined,
    resizeMode: "stretch"
  },
  container: {
    flex: 1
    // marginTop: Constants.statusBarHeight
  },
  scrollView: {
    backgroundColor: "pink"
    // marginHorizontal: 20
  },
  body: {
    fontSize: 20
  }
});
