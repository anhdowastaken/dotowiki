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
  Button
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
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

  content_hero_image_and_stat: {
    flex: 2,
    flexDirection: 'row',
  },

  content_hero_image: {
    padding: 3,
    width: 117, // Origin 234
    height: 136, // Origin 272
  },

  content_hero_stat: {
    padding: 3,
  },

  content_hero_abilities_and_lore: {
    flex: 3,
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

  _onPressAbility(ability) {
    this.props.navigator.push({
      scene_id: "AbilityScene",
      selected_ability: ability
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Button
            style={styles.top_button_back}
            title="Back"
            onPress={() => this._onPressBack()}
          />
          <Text style={styles.top_title}>{this.props.hero.localized_name} ({this.props.hero.team})</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.content_hero_image_and_stat}>
            <Image source={{uri: this.props.hero.full_quality_vertical_portrait}} style={styles.content_hero_image}/>
            <View style={styles.content_hero_stat}>
              <Text>Type: {this.props.hero.attributePrimary}</Text>
              <Text>Role: {this.props.hero.role}</Text>
              <Text>Damage: {this.props.hero.attackDamageMin}-{this.props.hero.attackDamageMax}</Text>
              <Text>Range: {this.props.hero.attackRange}</Text>
              <Text>Strenth: {this.props.hero.attributeBaseStrength} (+{this.props.hero.attributeStrengthGain})</Text>
              <Text>Agility: {this.props.hero.attributeBaseAgility} (+{this.props.hero.attributeAgilityGain})</Text>
              <Text>Intelligence: {this.props.hero.attributeBaseIntelligence} (+{this.props.hero.attributeIntelligenceGain})</Text>
              <Text>Move speed: {this.props.hero.movementSpeed}</Text>
              <Text>Vision (Day/Night): {this.props.hero.visionDaytimeRange}/{this.props.hero.visionNighttimeRange}</Text>
            </View>
          </View>
          <View style={styles.content_hero_abilities_and_lore}>
            <ScrollView>
              <Text>Abilities:</Text>
              {
                this.props.hero.abilities.map((ability, index) => {
                  if (ability.name.toLowerCase().search("special_bonus_") === (-1)) {
                    return (
                      <TouchableHighlight key={ability.id} onPress={() => this._onPressAbility(ability)}>
                        <Text>{ability.full_name}</Text>
                      </TouchableHighlight>
                    );
                  } else {
                    return (
                      <Text key={ability.id}>{ability.full_name}</Text>
                    );
                  }
                })
              }
              <Text>Lore:</Text>
              <Text>{this.props.hero.lore}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = HeroScene;
