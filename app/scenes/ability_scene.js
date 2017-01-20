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

  componentWillMount() {
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
          <Text style={styles.top_title}>{this.props.ability.full_name}</Text>
        </View>

        <View style={styles.content}>
          <Image source={{uri: this.props.ability.portrait_url}} style={styles.ability_image}/>
          <Text>Affects:</Text>
          <Text>{this.props.ability.affects}</Text>
          <Text>Description:</Text>
          <Text>{this.props.ability.description}</Text>
          <Text>Attribute:</Text>
          <Text>{this.props.ability.attribute}</Text>
          <Text>Notes:</Text>
          <Text>{this.props.ability.notes}</Text>
          <Text>Lore:</Text>
          <Text>{this.props.ability.lore}</Text>
        </View>
      </View>
    );
  }
}

module.exports = AbilityScene;
