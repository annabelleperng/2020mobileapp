import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Settings, DateTime } from "luxon";

// const { DateTime } = require("luxon");
// const dateTimeUtc = moment(new Date()).utc();
var dateTimeUtc = DateTime.utc();
console.log(dateTimeUtc);
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      dateTimeLocal: dateTimeUtc,
      offset: 0
    };
  }
  setSelectedValue = async () => {
    // this.setState({ selectedValue: val });
    // var overrideZone = DateTime.fromISO(dateTimeUtc, { zone: val });
    // var timestamp = dateTimeUtc;
    Settings.defaultZoneName = this.state.selectedValue;
    await SecureStore.setItemAsync("timezone", Settings.defaultZoneName);
    // console.log(DateTime.local().zoneName);
    // await SecureStore.setItemAsync("time_offset", offset0);
    // console.log(await SecureStore.getItemAsync("time_offset"));
    // this.setState({ dateTimeLocal: time });
    // const offset0 = this.state.dateTimeLocal.offset / 60;
  };

  render() {
    let data = [
      {
        value: "Etc/GMT+12"
      },
      {
        value: "Pacific/Midway"
      },
      {
        value: "Pacific/Honolulu"
      },
      {
        value: "America/Juneau"
      },
      {
        value: "America/Dawson"
      },
      {
        value: "America/Boise"
      },
      {
        value: "America/Chihuahua"
      },
      {
        value: "America/Phoenix"
      },
      {
        value: "America/Chicago"
      },
      {
        value: "America/Regina"
      },
      {
        value: "America/Mexico_City"
      },
      {
        value: "America/Belize"
      },
      {
        value: "America/Detroit"
      },
      {
        value: "America/Indiana/Indianapolis"
      },
      {
        value: "America/Bogota"
      },
      {
        value: "America/Glace_Bay"
      },
      {
        value: "America/Caracas"
      },
      {
        value: "America/Santiago"
      },
      {
        value: "America/St_Johns"
      },
      {
        value: "America/Sao_Paulo"
      },
      {
        value: "America/Argentina/Buenos_Aires"
      },
      {
        value: "America/Godthab"
      },
      {
        value: "Etc/GMT+2"
      },
      {
        value: "Atlantic/Azores"
      },
      {
        value: "Atlantic/Cape_Verde"
      },
      {
        value: "GMT"
      },
      {
        value: "Africa/Casablanca"
      },
      {
        value: "Atlantic/Canary"
      },
      {
        value: "Europe/Belgrade"
      },
      {
        value: "Europe/Sarajevo"
      },
      {
        value: "Europe/Brussels"
      },
      {
        value: "Europe/Amsterdam"
      },
      {
        value: "Africa/Algiers"
      },
      {
        value: "Europe/Bucharest"
      },
      {
        value: "Africa/Cairo"
      },
      {
        value: "Europe/Helsinki"
      },
      {
        value: "Europe/Athens"
      },
      {
        value: "Asia/Jerusalem"
      },
      {
        value: "Africa/Harare"
      },
      {
        value: "Europe/Moscow"
      },
      {
        value: "Asia/Kuwait"
      },
      {
        value: "Africa/Nairobi"
      },
      {
        value: "Asia/Baghdad"
      },
      {
        value: "Asia/Tehran"
      },
      {
        value: "Asia/Dubai"
      },
      {
        value: "Asia/Baku"
      },
      {
        value: "Asia/Kabul"
      },
      {
        value: "Asia/Yekaterinburg"
      },
      {
        value: "Asia/Karachi"
      },
      {
        value: "Asia/Kolkata"
      },
      {
        value: "Asia/Kathmandu"
      },
      {
        value: "Asia/Dhaka"
      },
      {
        value: "Asia/Colombo"
      },
      {
        value: "Asia/Almaty"
      },
      {
        value: "Asia/Rangoon"
      },
      {
        value: "Asia/Bangkok"
      },
      {
        value: "Asia/Krasnoyarsk"
      },
      {
        value: "Asia/Shanghai"
      },
      {
        value: "Asia/Kuala_Lumpur"
      },
      {
        value: "Asia/Taipei"
      },
      {
        value: "Australia/Perth"
      },
      {
        value: "Asia/Irkutsk"
      },
      {
        value: "Asia/Seoul"
      },
      {
        value: "Asia/Tokyo"
      },
      {
        value: "Asia/Yakutsk"
      },
      {
        value: "Australia/Darwin"
      },
      {
        value: "Australia/Adelaide"
      },
      {
        value: "Australia/Sydney"
      },
      {
        value: "Australia/Brisbane"
      },
      {
        value: "Australia/Hobart"
      },
      {
        value: "Asia/Vladivostok"
      },
      {
        value: "Pacific/Guam"
      },
      {
        value: "Asia/Magadan"
      },
      {
        value: "Pacific/Fiji"
      },
      {
        value: "Pacific/Auckland"
      },
      {
        value: "Pacific/Tongatapu"
      }
    ];

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Dropdown
          label="Select your timezone bitch"
          data={data}
          onChangeText={selectedValue => this.setState({ selectedValue })}
        />
        <Button onpress={this.setSelectedValue()} title="Submit" />
        {/* <Text>UTC time: {dateTimeUtc.format("ddd, DD MMM YYYY HH:mm:ss")}</Text> */}
        <Text>
          UTC time: {dateTimeUtc.toLocaleString(DateTime.DATETIME_MED)}
        </Text>
        <Text>Time Zone: {this.state.selectedValue}\</Text>
        {/* <Text>
          Local Time:
          {this.state.dateTimeLocal.format("ddd, DD MMM YYYY HH:mm:ss")}
        </Text> */}
        <Text>
          Local Time:
          {DateTime.local().toLocaleString(DateTime.DATETIME_MED)}
        </Text>
        <Text>Offset: {DateTime.local().offset / 60}</Text>
      </View>
    );
  }
}
