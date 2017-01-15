/**
 * ability scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  // ScrollView,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  ability_image: {
    width: 85,
    height: 64,
  },
});

class AbilityScene extends Component {
  constructor(props) {
    super(props);

    this._onPressBack = this._onPressBack.bind(this);
  }

  componentDidMount() {
    // Do something
  }

  _onPressBack() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View>
        <TouchableHighlight onPress={() => this._onPressBack()}>
          <Text>Back</Text>
        </TouchableHighlight>
        <Text>DOTOWIKI</Text>
        <Text>{this.props.ability.full_name}</Text>
        <Text>Affects: {this.props.ability.affects}</Text>
        <Text>Description: {this.props.ability.description}</Text>
        <Text>Attribute: {this.props.ability.attribute}</Text>
        <Text>Notes: {this.props.ability.notes}</Text>
        <Text>Lore: {this.props.ability.lore}</Text>
      </View>
    );
  }
}

module.exports = AbilityScene;
