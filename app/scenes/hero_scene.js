/**
 * Hero scene
 */

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
    width: 117, // Origin 234
    height: 136, // Origin 272
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
    return (
      <View>
        <TouchableHighlight onPress={() => this._onPressBack()}>
          <Text>Back</Text>
        </TouchableHighlight>
        <Text>DOTOWIKI</Text>
        <Text>{this.props.hero.localized_name} ({this.props.hero.team})</Text>
        <Image source={{uri: this.props.hero.full_quality_vertical_portrait}} style={styles.hero_image}/>
        <ScrollView>
          <Text>Type: {this.props.hero.attributePrimary}</Text>
          <Text>Role: {this.props.hero.role}</Text>
          <Text>Damage: {this.props.hero.attackDamageMin}-{this.props.hero.attackDamageMax}</Text>
          <Text>Range: {this.props.hero.attackRange}</Text>
          <Text>Strenth: {this.props.hero.attributeBaseStrength} (+{this.props.hero.attributeStrengthGain})</Text>
          <Text>Agility: {this.props.hero.attributeBaseAgility} (+{this.props.hero.attributeAgilityGain})</Text>
          <Text>Intelligence: {this.props.hero.attributeBaseIntelligence} (+{this.props.hero.attributeIntelligenceGain})</Text>
          <Text>Move speed: {this.props.hero.movementSpeed}</Text>
          <Text>Vision (Day/Night): {this.props.hero.visionDaytimeRange}/{this.props.hero.visionNighttimeRange}</Text>
          <Text>Abilities:</Text>
          {
            this.props.hero.abilities.map((ability, index) => {
              return (
                <Text key={ability.id}>{ability.full_name}</Text>
              );
            })
          }
          <ScrollView><Text>{this.props.hero.lore}</Text></ScrollView>
        </ScrollView>
      </View>
    );
  }
}

module.exports = HeroScene;
