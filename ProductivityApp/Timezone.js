import React, { Component } from "react";
import { Dropdown } from "react-native-material-dropdown";
import moment from "moment-timezone/builds/moment-timezone-with-data";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const dateTimeUtc = moment(new Date()).utc();
export default class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: "",
      dateTimeLocal: dateTimeUtc,
      offset: 0
    };
  }
  setSelectedValue = val => {
    this.setState({ selectedValue: val });
    const timestamp = dateTimeUtc.unix();
    const offset0 = moment.tz(this.state.selectedValue).utcOffset() * 60;
    this.setState({
      offset: offset0 / 60 / 60,
      dateTimeLocal: moment.unix(timestamp + offset0).utc()
    });
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
          onChangeText={(value, index, data) => this.setSelectedValue(value)}
        />
        <Text>UTC time: {dateTimeUtc.format("ddd, DD MMM YYYY HH:mm:ss")}</Text>
        <Text>Time Zone: {this.state.selectedValue}</Text>
        <Text>
          Local Timel:
          {this.state.dateTimeLocal.format("ddd, DD MMM YYYY HH:mm:ss")}
        </Text>
        <Text>Offset: {this.state.offset}</Text>
      </View>
    );
  }
}
