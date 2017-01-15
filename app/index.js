/**
 * dotowiki
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
} from 'react-native';

D2_API_KEY="CF1A4219A8407493ABAD29C0614BEE53";
dota2_webapi_url="http://api.steampowered.com/IEconDOTA2_570";
dota2_webapi_url_heroes = dota2_webapi_url + "/GetHeroes/v1?key=" + D2_API_KEY + "&language=en";
dota2_webapi_url_items = dota2_webapi_url + "/GetGameItems/v1?key=" + D2_API_KEY + "&language=en";
dota2_base_image_url = "http://cdn.dota2.com/apps/dota2/images";
dota2_base_image_url_heroes = dota2_base_image_url + "/heroes/";
dota2_base_image_url_items = dota2_base_image_url + "/items/";

jsfeed_heropickerdata_url = "http://www.dota2.com/jsfeed/heropickerdata";
jsfeed_abilitydata_url = "http://www.dota2.com/jsfeed/abilitydata";
jsfeed_itemdata_url = "http://www.dota2.com/jsfeed/itemdata";
jsfeed_heropediadata_url = "http://www.dota2.com/jsfeed/heropediadata";

dotabuff_heroes_url = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_heroes.json";
dotabuff_abilities_url = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/npc_abilities.json";
dotabuff_items_url = "https://raw.githubusercontent.com/dotabuff/d2vpkr/master/dota/scripts/npc/items.json";

var StartingScene = require("./scenes/starting_scene.js");
var MainScene = require("./scenes/main_scene.js");
var HeroScene = require("./scenes/hero_scene.js");
var ItemScene = require("./scenes/item_scene.js");
var AbilityScene = require("./scenes/ability_scene.js");
var _navigator;

export default class dotowiki extends Component {
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;

    switch (route.scene_id) {
      case "StartingScene":
        return (<StartingScene navigator={navigator}/>);
      case "MainScene":
        return (<MainScene navigator={navigator}
          heroes={route.heroes}
          items={route.items}
          />);
      case "HeroScene":
        return (<HeroScene navigator={navigator}
          hero={route.selected_hero}/>
        );
      case "ItemScene":
        return (<ItemScene navigator={navigator}
          item={route.selected_item}/>
        );
      case "AbilityScene":
        return (<AbilityScene navigator={navigator}
          ability={route.selected_ability}/>
        );
      default:
        return (<View><Text>There are somethings wrong...</Text></View>);
    }
  }

  render() {
    return (
      // NOTE: React element has to return only one element. You'll have to wrap both of your tags with another element tag.
      <Navigator
        initialRoute={{ scene_id: "StartingScene" }}
        renderScene={ this.navigatorRenderScene }
      />
    );
  }
}

// Handle "Back" button of Android
BackAndroid.addEventListener('hardwareBackPress', () => {
  // Exit when we're in main scene
  if (_navigator.getCurrentRoutes().length === 1) {
     return false;
  }
  // Pop current scene out of stack
  _navigator.pop();
  return true;
});

AppRegistry.registerComponent('dotowiki', () => dotowiki);
