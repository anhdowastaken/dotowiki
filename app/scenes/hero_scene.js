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

  content_hero_abilities: {
    flexDirection: 'row'
  }
});

class HeroScene extends Component {
  constructor(props) {
    super(props);

    this._onPressBack = this._onPressBack.bind(this);
    this.state = {
      hero: this.props.hero
    };
  }

  componentDidMount() {
    var hero = this.state.hero;

    // Based on primary attribute, calculate stats at level 1
    if (hero.attributePrimary === 'STRENGTH') {
      // If strength is a hero's primary attribute, every point in strength increases his or her attack damage by 1.
      hero.attackDamageMin = hero.attackDamageMin + hero.attributeBaseStrength;
      hero.attackDamageMax = hero.attackDamageMax + hero.attributeBaseStrength;
    } else if (hero.attributePrimary === 'AGILITY') {
      // If agility is a hero's primary attribute, every point in agility increases his or her attack damage by 1
      hero.attackDamageMin = hero.attackDamageMin + hero.attributeBaseAgility;
      hero.attackDamageMax = hero.attackDamageMax + hero.attributeBaseAgility;
    } else if (hero.attributePrimary === 'INTELLECT') {
      // If intelligence is a hero's primary attribute, every point in intelligence increases his or her attack damage by 1.
      hero.attackDamageMin = hero.attackDamageMin + hero.attributeBaseIntelligence;
      hero.attackDamageMax = hero.attackDamageMax + hero.attributeBaseIntelligence;
    }
    // Every point in strength increases maximum health by 20.
    hero.statusHealth = hero.statusHealth + hero.attributeBaseStrength * 20;
    // Every point in strength increases health regeneration by 0.03 HP per second.
    hero.statusHealthRegen = hero.statusHealthRegen + hero.attributeBaseStrength * 0.03;
    // Every point in agility increases a hero's armor by 1/7.
    hero.armorPhysical = hero.armorPhysical + hero.attributeBaseAgility / 7;
    // Every point in agility increases a hero's attack speed by 1.
    // TODO: Add this stat
    // Every point in intelligence increases a hero's maximum Mana by 12.
    hero.statusMana = hero.statusMana + hero.attributeBaseIntelligence * 12;
    // Every point in intelligence increases a hero's mana regeneration by 0.04 mana per second.
    hero.statusManaRegen = hero.statusManaRegen + hero.attributeBaseIntelligence * 0.04;
    // Every point in intelligence increases a hero's spell damage by 0.0625%.
    hero.magicalResistance = hero.magicalResistance + hero.attributeBaseIntelligence * 0.00625;

    this.setState({
      hero: hero
    });
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
    var theLastIndexOfNormalAbility = 0;

    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Button
            style={styles.top_button_back}
            title="Back"
            onPress={() => this._onPressBack()}
          />
          <Text style={styles.top_title}>{this.state.hero.localized_name} ({this.state.hero.team})</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.content_hero_image_and_stat}>
            <Image source={{uri: this.state.hero.full_quality_vertical_portrait}} style={styles.content_hero_image}/>
            <View style={styles.content_hero_stat}>
              <Text>Type: {this.state.hero.attributePrimary}</Text>
              <Text>Role: {this.state.hero.role}</Text>
              <Text>Health: {this.state.hero.statusHealth} (+{this.state.hero.statusHealthRegen.toFixed(3)}/s)</Text>
              <Text>Mana: {this.state.hero.statusMana} (+{this.state.hero.statusManaRegen.toFixed(3)}/s)</Text>
              <Text>Armor Physical: {this.state.hero.armorPhysical.toFixed(3)}</Text>
              <Text>Magical Resistance: {this.state.hero.magicalResistance.toFixed(3)}</Text>
              <Text>Damage: {this.state.hero.attackDamageMin}-{this.state.hero.attackDamageMax}</Text>
              <Text>Range: {this.state.hero.attackRange}</Text>
              <Text>Strenth: {this.state.hero.attributeBaseStrength} (+{this.state.hero.attributeStrengthGain})</Text>
              <Text>Agility: {this.state.hero.attributeBaseAgility} (+{this.state.hero.attributeAgilityGain})</Text>
              <Text>Intelligence: {this.state.hero.attributeBaseIntelligence} (+{this.state.hero.attributeIntelligenceGain})</Text>
              <Text>Move speed: {this.state.hero.movementSpeed}</Text>
              <Text>Vision (Day/Night): {this.state.hero.visionDaytimeRange}/{this.state.hero.visionNighttimeRange}</Text>
            </View>
          </View>
          <View style={styles.content_hero_abilities_and_lore}>
            <ScrollView>
              <Text>Abilities:</Text>
              {
                this.state.hero.abilities.map((ability, index) => {
                  if (ability.name.toLowerCase().search("special_bonus_") === (-1)) {
                    theLastIndexOfNormalAbility = index;
                    if (ability.full_name) {
                      return (
                        <View style={styles.content_hero_abilities} key={ability.id}>
                          <TouchableHighlight onPress={() => this._onPressAbility(ability)}>
                            <Image
                              source={{uri: ability.icon_url}}
                              style={{
                                height: 45,
                                width: 45
                              }}
                            />
                          </TouchableHighlight>
                          <TouchableHighlight onPress={() => this._onPressAbility(ability)}>
                            <Text>{ability.full_name}</Text>
                          </TouchableHighlight>
                        </View>
                      );
                    } else {
                      return null;
                    }
                  }
                })
              }
              <Text>Talent tree:</Text>
              {
                this.state.hero.abilities.map((ability, index) => {
                  if (ability.name.toLowerCase().search("special_bonus_") !== (-1)) {
                    var indexOfAbilityInTalentTree = index - theLastIndexOfNormalAbility;
                    switch (indexOfAbilityInTalentTree) {
                      case (1):
                      case (3):
                      case (5):
                      case (7):
                        return (
                          <View  key={this.state.hero.abilities[index].id + "_" + this.state.hero.abilities[index + 1].id}>
                            <Text>
                              Level {10 + 2.5 * (indexOfAbilityInTalentTree - 1)}: {this.state.hero.abilities[index].full_name} OR {this.state.hero.abilities[index + 1].full_name}
                            </Text>
                          </View>
                        );
                      default:
                        return null;
                    }
                  }
                })
              }
              <Text>Lore:</Text>
              <Text>{this.state.hero.lore}</Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = HeroScene;
