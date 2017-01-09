/**
 * dotowiki
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

var MainScene = require("./scenes/main_scene.js");
var HeroScene = require("./scenes/hero_scene.js");

export default class dotowiki extends Component {
  navigatorRenderScene(route, navigator) {
    _navigator = navigator;

    switch (route.scene_id) {
      case "MainScene":
        return (<MainScene navigator={navigator}/>);
      case "HeroScene":
        return (<HeroScene navigator={navigator}
          heroes_bio={route.heroes_bio}
          hero={route.selected_hero}/>
        );
      default:
        return (<View><Text>There are somethings wrong...</Text></View>);
    }
  }

  render() {
    return (
      // NOTE: React element has to return only one element. You'll have to wrap both of your tags with another element tag.
      <Navigator
        initialRoute={{ scene_id: "MainScene" }}
        renderScene={ this.navigatorRenderScene }
      />
    );
  }
}

AppRegistry.registerComponent('dotowiki', () => dotowiki);
