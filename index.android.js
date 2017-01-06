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
  Alert
} from 'react-native';

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

  content: {
    flex: 9,
  },

  bottom: {
    flex: 1,
  },

  // Show hero list in grid
  hero_list: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  },

  hero_box: {
    width: 59,
    height: 33,
    backgroundColor: 'red',
    margin: 3,
    alignItems: 'stretch'
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
          dotowiki
        </Text>
      </View>
    );
  }
}

class Content extends Component {
  constructor(props) {
    super(props);
    // Setup data source for ListView
    // Initialize with empty data
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentDidMount() {
    let D2_API_KEY="CF1A4219A8407493ABAD29C0614BEE53";
    let dota2_webapi_url="http://api.steampowered.com/IEconDOTA2_570";
    let url = dota2_webapi_url + "/GetHeroes/v1?key=" + D2_API_KEY + "&language=en";
    let base_image_url = "http://cdn.dota2.com/apps/dota2/images/heroes/";

    // Get heroes list from dota 2 web api
    fetch(url, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        for (hero of data.result.heroes) {
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
        console.log(data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.result.heroes)
        });
      })
      .catch((error) => console.log(error));
  }

  _onPressHero(localized_name) {
    Alert.alert("dotowiki", localized_name);
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView
          contentContainerStyle={styles.hero_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.hero_box}>
              <TouchableHighlight onPress={() => this._onPressHero(rowData.localized_name)}>
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

export default class dotowiki extends Component {
  render() {
    return (
      // NOTE: React element has to return only one element. You'll have to wrap both of your tags with another element tag.
      <View style={styles.container}>
        <Top/>
        <Content/>
        <Bottom/>
      </View>
    );
  }
}

AppRegistry.registerComponent('dotowiki', () => dotowiki);
