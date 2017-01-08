import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  hero_image: {
    width: 256,
    height: 144,
  },
});

class HeroScene extends Component {
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
        <Text>{this.props.hero.localized_name}</Text>
        <Image source={{uri: this.props.hero.full_quality_horizontal_portrait}} style={styles.hero_image}/>
        <ScrollView><Text>{this.props.heroes_bio[this.props.hero.short_name].bio}</Text></ScrollView>
      </View>
    );
  }
}

module.exports = HeroScene;
