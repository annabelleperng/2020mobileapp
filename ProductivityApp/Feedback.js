import React, { Component } from 'react';
import {    
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  Image,
} from 'react-native';

const screen = Dimensions.get("window");


export default class Feedback extends Component {
  constructor(props) {
   super(props)
  
   this.state = {states: [0, 0] };
  } 

  getVal(val){
    return val;
  }

  render() {    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          How happy did you feel during this focus session?
        </Text>
        <Slider
          style={{ width: screen.width * 0.8}}
          step={1}
          minimumValue={0}
          maximumValue={100}
          happ={this.state.states[0]}
          onValueChange={val => this.setState({ states: [val, this.state.states[1]] })}
          onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.states[0]} {"\n\n"}
        </Text>
        <Text style={styles.welcome}>
          
          How productive did you feel during this focus session?
        </Text>
        <Slider
          style={{ width: screen.width * 0.8}}
          step={1}
          minimumValue={0}
          maximumValue={100}
          prod={this.state.states[1]}
          onValueChange={val => this.setState({ states: [this.state.states[0], val] })}
          onSlidingComplete={ val => this.getVal(val)}
        />
        <Text style={styles.welcome}>
          {this.state.states[1]}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#46DC46',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#CA3DD4',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#CA3DD4',
    marginBottom: 5,
  },
  image: {
    width: screen.width,
    height: screen.height,
  },
});