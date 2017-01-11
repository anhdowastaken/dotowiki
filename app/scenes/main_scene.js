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
    padding: 3,
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
  item_list: {
    // flex: 1,
    padding: 12,
    // height: 300,
    // flexDirection: 'row',
    // alignItems: 'center',
    // flexWrap: 'wrap',
    // justifyContent: 'space-around',
    // overflow: 'hidden'
  },

  item_box: {
    // width: 59,
    height: 33,
    // backgroundColor: 'red',
    margin: 3,
    // alignItems: 'stretch',
    flexDirection: 'row',
  },

  item_image: {
    // flex: 1,
    width: 59,
    height: 33
  },

  item_text: {
    padding: 3,
  }
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
    this._onPressIcon = this._onPressIcon.bind(this);
    // Setup data source for ListView
    // Initialize with empty data
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      heroes:[],
      heroes_bio: {},
      item: [],
      isHeroSelected: true,
      isItemSelected: false,
    };
  }

  componentDidMount() {
    // // Get hero list from dota 2 web api
    // fetch(dota2_webapi_url_heroes, {method: "GET"})
    // .then((response) => response.json())
    // .then((data) => {
    //   this.setState({
    //     heroes: data.result.heroes,
    //   });
    //   for (hero of this.state.heroes) {
    //     // Remove "npc_dota_hero_" from name
    //     hero.short_name = hero.name.replace("npc_dota_hero_", "");
    //     // Add image links for each hero
    //     // 59x33px
    //     hero.small_horizontal_portrait = dota2_base_image_url_heroes + hero.short_name + "_sb.png";
    //     // 205x11px
    //     hero.large_horizontal_portrait = dota2_base_image_url_heroes + hero.short_name + "_lg.png";
    //     // 256x114px
    //     hero.full_quality_horizontal_portrait = dota2_base_image_url_heroes + hero.short_name + "_full.png";
    //     // 234x272px
    //     hero.full_quality_vertical_portrait = dota2_base_image_url_heroes + hero.short_name + "_vert.jpg";
    //     hero.icon = hero.small_horizontal_portrait;
    //   }
    //   console.log("hero list from dota 2 web api");
    //   console.log(data);

    //   this.setState({
    //     dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
    //   });
    // })
    // .catch((error) => console.log(error));

    // Get heroes from https://dotowiki.herokuapp.com/heroes
    fetch("https://dotowiki.herokuapp.com/heroes", {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        heroes: data,
      });
      console.log("heroes from https://dotowiki.herokuapp.com/heroes");
      console.log(data);

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      });
    })
    .catch((error) => console.log(error));

    // Get item list from dota 2 web api
    fetch(dota2_webapi_url_items, {method: "GET"})
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        items: data.result.items,
      });
      for (item of this.state.items) {
        item.short_name = item.name.replace("item_", "");
        item.icon_url = dota2_base_image_url_items + item.short_name + "_lg.png";
      }
      console.log("item list from dota 2 web api");
      console.log(data);
    })
    .catch((error) => console.log(error));

    // // Get bio of all heroes
    // fetch(jsfeed_heropickerdata_url, {method: "GET"})
    // .then((response) => response.json())
    // .then((data) => {
    //   console.log("bio of all heroes from http://www.dota2.com/jsfeed/heropickerdata");
    //   console.log(data);

    //   this.setState({
    //     heroes_bio: data,
    //   });
    // })
    // .catch((error) => console.log(error));
  }

  _onPressIcon(data) {
    if (this.state.isHeroSelected == true) {
      // Push Hero scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: "HeroScene",
        // heroes_bio: this.state.heroes_bio,
        selected_hero: data,
      });
    } else if (this.state.isItemSelected == true) {
      // Push Item scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: "ItemScene",
        selected_item: data,
      });
    } else {

    }
  }

  _onPressButtonHero() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      isHeroSelected: true,
      isItemSelected: false,
    });
  }

  _onPressButtonItem() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.items),
      isHeroSelected: false,
      isItemSelected: true,
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
          contentContainerStyle={styles.item_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <View style={styles.item_box}>
              <TouchableHighlight onPress={() => this._onPressIcon(rowData)}>
                <Image
                  source={{uri: rowData.icon_url}}
                  style={styles.item_image}
                />
              </TouchableHighlight>
              <TouchableHighlight onPress={() => this._onPressIcon(rowData)}>
                <Text style={styles.item_text}>{rowData.localized_name}</Text>
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
        {/*<Bottom/>*/}
      </View>
    )
  }
}

module.exports = MainScene;
