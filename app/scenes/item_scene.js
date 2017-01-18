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
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#FFFFFF',
  },

 top: {
    // flex: 1,
    flexDirection: 'row',
    height: 50,
  },

  top_button_back: {
    flex: 1,
  },

  top_title: {
    flex: 5,
    fontSize: 20,
    textAlign: 'center',
  },

  content: {
    flex: 1,
  },

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
      <View style={styles.container}>
        <View style={styles.top}>
          <Button
            style={styles.top_button_back}
            title="Back"
            onPress={() => this._onPressBack()}
          />
          <Text style={styles.top_title}>{this.props.item.localized_name}</Text>
        </View>

        <View style={styles.content}>
          <Image source={{uri: this.props.item.portrait_url}} style={styles.item_image}/>
          <Text>Cost: {this.props.item.cost} gold</Text>
          <Text>Description:</Text>
          <Text>{this.props.item.description}</Text>
          <Text>Attribute:</Text>
          <Text>{this.props.item.attribute}</Text>
          <Text>Notes:</Text>
          <Text>{this.props.item.notes}</Text>
          <Text>Lore:</Text>
          <Text>{this.props.item.lore}</Text>
        </View>
      </View>
    );
  }
}

module.exports = ItemScene;
