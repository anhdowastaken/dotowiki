/**
 * Main scene
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  top: {
    // flex: 1,
    height: 50,
  },

  top_title: {
    fontSize: 20,
    textAlign: 'center',
  },

  content: {
    flex: 1,
    // height: 500,
  },

  content_navigation: {
    // flex: 1,
    height: 30,
    // textAlign: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  bottom: {
    // flex: 1,
    height: 50,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  // Show hero list in grid
  hero_list: {
    // flex: 1,
    // height: 300,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
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
        <Text style={styles.top_title}>
          DOTOWIKI
        </Text>
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
      heroes:[],
      heroes_bio: {},
      item: [],
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
        hero.icon = hero.small_horizontal_portrait;
      }
      console.log("hero list from dota 2 web api");
      console.log(data);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      });
    })
    .catch((error) => console.log(error));

    // Get item list from dota 2 web api
    url = dota2_webapi_url + "/GetGameItems/v1?key=" + D2_API_KEY + "&language=en";
    fetch(url, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        items: data.result.items,
      });
      for (item of this.state.items) {
        item.short_name = item.name.replace("item_", "");
        item.icon = "http://cdn.dota2.com/apps/dota2/images/items/" + item.short_name + "_lg.png";
      }
      console.log("item list from dota 2 web api");
      console.log(data);
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

  _onPressButtonHero() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
    });
  }

  _onPressButtonItem() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.items),
    });
  }

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.content_navigation}>
          <TouchableHighlight onPress={() => this._onPressButtonHero()}><Text>Hero</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => this._onPressButtonItem()}><Text>Item</Text></TouchableHighlight>
        </View>
        <ListView
          contentContainerStyle={styles.hero_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.hero_box}>
              <TouchableHighlight onPress={() => this._onPressHero(rowData)}>
                <Image
                  source={{uri: rowData.icon}}
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
        <Content navigator={this.props.navigator}/>
        <Bottom/>
      </View>
    )
  }
}

module.exports = MainScene;
