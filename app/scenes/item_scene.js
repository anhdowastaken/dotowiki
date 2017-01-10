/**
 * Item scene
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
  item_image: {
    width: 85,
    height: 64,
  },
});

class ItemScene extends Component {
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
        <Text>{this.props.item.localized_name}</Text>
        <Image source={{uri: this.props.item.icon_url}} style={styles.item_image}/>
        <Text>Cost: {this.props.item.cost} gold</Text>
      </View>
    );
  }
}

module.exports = ItemScene;
