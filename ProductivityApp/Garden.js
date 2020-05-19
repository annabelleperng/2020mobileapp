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
} from "react-native";

const screen = Dimensions.get("window");

export default class Garden extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCancel: false,
    };
  }

  toggleCancel = () => {
    console.log(" ");
    // this.state.showCancel = !this.state.showCancel;
    // var showC = !this.state.showCancel;
    // console.log(this.state.showCancel);
    // console.log("aeafa " + !this.state.showCancel);
    if (this.state.showCancel) {
      this.setState({ showCancel: false });
    } else {
      this.setState({ showCancel: true });
    }
  };

  _renderCancel = () => {
    if (this.state.showCancel) {
      return (
        <TouchableHighlight onPress={this.toggleCancel()}>
          <View>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  };

  render() {
    const margin = (screen.height * 4) / 22 - screen.width / 3.5;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#57423e",
          justifyContent: "center",
        }}
      >
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <TouchableOpacity onPress={this.toggleCancel}>
              <Image
                style={styles.plants}
                source={require("./assets/fernsbig.png")}
              />
            </TouchableOpacity>
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: screen.height / 22 - screen.height / 25,
              marginLeft: screen.width / 11,
            }}
          >
            <TouchableOpacity>
              {/* {this.state.showCancel ? (
                <Text> Hello Friends </Text>
              ) : (
                <Text>Fat bitch</Text>
              )} */}
              {/* <Text>hewo {this.state.showCancel}</Text> */}
              <Image
                style={[
                  styles.smallButton,
                  this.state.showCancel ? styles.hidden : {},
                ]}
                source={require("./assets/puta.png")}
              />
              <Image
                style={[
                  styles.smallButton,
                  this.state.showCancel ? {} : styles.hidden,
                ]}
                source={require("./assets/sad_jeno.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.smallButton}
                source={require("./assets/tempdollar.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.smallButton}
                source={require("./assets/tempdollar.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.smallButton}
                source={require("./assets/tempdollar.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 4, backgroundColor: "#57423e" }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: margin,
              marginLeft: screen.width / 14,
            }}
          >
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/tulipsbig.png")}
            />
            <Image
              style={styles.plants}
              source={require("./assets/fernsbig.png")}
            />
          </View>
        </View>
        <View style={{ flex: 1.1, backgroundColor: "#472b25" }}></View>
        <View style={{ flex: 2, backgroundColor: "#57423e" }}></View>
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
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Details")}
              activeOpacity={0.5}
            >
              <Image
                style={styles.menuIcons2}
                source={require("./assets/shoplogo.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  plants: {
    width: screen.width / 3.5,
    height: screen.width / 3.5,
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
  hidden: {
    width: 0,
    height: 0,
  },
});
