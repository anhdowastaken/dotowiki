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
  Button,
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
        <Button
          title="Back"
          onPress={() => this._onPressBack()}
        />
        <Text>DOTOWIKI</Text>
        <Text>{this.props.item.localized_name}</Text>
        <Image source={{uri: this.props.item.icon_url}} style={styles.item_image}/>
        <Text>Cost: {this.props.item.cost} gold</Text>
        <Text>Description: {this.props.item.description}</Text>
        <Text>Attribute: {this.props.item.attribute}</Text>
        <Text>Notes: {this.props.item.notes}</Text>
        <Text>Lore: {this.props.item.lore}</Text>
      </View>
    );
  }
}

module.exports = ItemScene;
