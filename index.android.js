/**
 * dotowiki starting screen
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  ListView,
  Image,
  Alert,
  Navigator,
} from 'react-native';

var HeroScene = require("./heroscene.android.js");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  top: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
  },

  navigation: {
    flex: 1,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  content: {
    flex: 7,
  },

  bottom: {
    flex: 1,
  },

  // Show hero list in grid
  hero_list: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    // overflow: 'hidden'
  },

  hero_box: {
    width: 59,
    height: 33,
    backgroundColor: 'red',
    margin: 3,
    // alignItems: 'stretch',
  },

  hero_image: {
    // flex: 1,
    width: 59,
    height: 33
  },
});

// NOTE: All React components must start with a upper case letter, or contain a dot.
class Top extends Component {
  render() {
    return (
      <View style={styles.top}>
        <Text style={styles.title}>
          DOTOWIKI
        </Text>
      </View>
    );
  }
}

class Navigation extends Component {
  render() {
    return (
      <View style={styles.navigation}>
        <TouchableHighlight><Text>Hero</Text></TouchableHighlight>
        <TouchableHighlight><Text>Item</Text></TouchableHighlight>
      </View>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props);
    this._onPressHero = this._onPressHero.bind(this);
    // Setup data source for ListView
    // Initialize with empty data
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      heroes: {},
      heroes_bio: {},
    };
  }

  componentDidMount() {
    let D2_API_KEY="CF1A4219A8407493ABAD29C0614BEE53";
    let dota2_webapi_url="http://api.steampowered.com/IEconDOTA2_570";
    let url = dota2_webapi_url + "/GetHeroes/v1?key=" + D2_API_KEY + "&language=en";
    let base_image_url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    // Get hero list from dota 2 web api
    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        heroes: data.result.heroes,
      });
      for (hero of this.state.heroes) {
        // Remove "npc_dota_hero_" from name
        hero.short_name = hero.name.replace("npc_dota_hero_", "");
        // Add image links for each hero
        // 59x33px
        hero.small_horizontal_portrait = base_image_url + hero.short_name + "_sb.png";
        // 205x11px
        hero.large_horizontal_portrait = base_image_url + hero.short_name + "_lg.png";
        // 256x114px
        hero.full_quality_horizontal_portrait = base_image_url + hero.short_name + "_full.png";
        // 234x272px
        hero.full_quality_vertical_portrait = base_image_url + hero.short_name + "_vert.jpg";
      }
      console.log("hero list from dota 2 web api");
      console.log(data);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      });
    })
    .catch((error) => console.log(error));

    // Get bio of all heroes
    url = "http://www.dota2.com/jsfeed/heropickerdata";
    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      console.log("bio of all heroes from http://www.dota2.com/jsfeed/heropickerdata");
      console.log(data);

      this.setState({
        heroes_bio: data,
      });
    })
    .catch((error) => console.log(error));
  }

  _onPressHero(hero) {
    // Push HeroScene to stack of navigator with necessary data
    this.props.navigator.push({
      scene_id: "HeroScene",
      heroes_bio: this.state.heroes_bio,
      selected_hero: hero,
    });
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView
          contentContainerStyle={styles.hero_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.hero_box}>
              <TouchableHighlight onPress={() => this._onPressHero(rowData)}>
                <Image
                  source={{uri: rowData.small_horizontal_portrait}}
                  style={styles.hero_image}
                />
              </TouchableHighlight>
            </View>
          }
        />
      </View>
    );
  }
}

class Bottom extends Component {
  render() {
    return (
      <View style={styles.bottom}>
        <TextInput
          placeholder="Input everything you want to search!"
        />
      </View>
    );
  }
}

class MainScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Top/>
        <Navigation/>
        <Content navigator={this.props.navigator}/>
        <Bottom/>
      </View>
    )
  }
}

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
