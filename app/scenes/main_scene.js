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
  ScrollView,
  ListView,
  Image,
  Alert,
  Navigator,
  AsyncStorage,
  // ActivityIndicator,
  // Modal,
  Button,
  ViewPagerAndroid,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#FFFFFF',
  },

  top: {
    // flex: 1,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end'
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

  // bottom: {
  //   // flex: 1,
  //   height: 50,
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  // },

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

var HERO_LIST_PAGE=0;
var ITEM_LIST_PAGE=1;

// NOTE: All React components must start with a upper case letter, or contain a dot.
class MainScene extends Component {
  constructor(props) {
    super(props);
    // Setup data source for ListView
    // Initialize with empty data
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this._onPressIcon = this._onPressIcon.bind(this);
    this._onPressIconHero = this._onPressIconHero.bind(this);
    this._onPressIconItem = this._onPressIconItem.bind(this);
    this.state = {
      modalVisisble: false,
      // dataSource: ds.cloneWithRows([]),
      // dataSourceHeroes: ds.cloneWithRows(this.props.heroes),
      // dataSourceItems: ds.cloneWithRows(this.props.items),
      // heroes:[],
      // heroes_bio: {},
      // item: [],
      heroes: this.props.heroes,
      items: this.props.items,
      isHeroSelected: true,
      isItemSelected: false,
    };
  }

  componentDidMount() {
    // console.log(this.state.heroes);
    // console.log(this.state.items);
    var heroes = this.state.heroes;
    for (hero of heroes) {
      hero['visibility'] = true;
    }
    var items = this.state.items;
    for (item of items) {
      item['visibility'] = true;
    }
    this.setState({
      heroes: heroes,
      items: items
    });
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

  _onPressIconHero(data) {
    // Push Hero scene to stack of navigator with necessary data
    this.props.navigator.push({
      scene_id: "HeroScene",
      // heroes_bio: this.state.heroes_bio,
      selected_hero: data,
    });
  }

  _onPressIconItem(data) {
    // Push Item scene to stack of navigator with necessary data
    this.props.navigator.push({
      scene_id: "ItemScene",
      selected_item: data,
    });
  }

  _onPressButtonHero() {
    this._onPressButtonClearInput();
    this.viewPager.setPage(HERO_LIST_PAGE);
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      isHeroSelected: true,
      isItemSelected: false,
    });
  }

  _onPressButtonItem() {
    this._onPressButtonClearInput();
    this.viewPager.setPage(ITEM_LIST_PAGE);
    this.setState({
      // dataSource: this.state.dataSource.cloneWithRows(this.state.items),
      isHeroSelected: false,
      isItemSelected: true,
    });
  }

  _onPressNoButton() {
    // Do nothing
  }

  _onPressYesButton() {
    this.props.navigator.replace({
      scene_id: "StartingScene",
      force_update: true
    });
  }

  _onPressButtonDownload() {
    Alert.alert(
      'DOTOWIKI',
      'You want to re-download now, don\'t you?',
      [
        {text: 'No', onPress: () => this._onPressNoButton()},
        {text: 'Yes', onPress: () => this._onPressYesButton()},
      ],
      {
        cancelable: false
      }
    );

    return;

    var counter = 2;

    this.setState({
      modalVisisble: true
    });

    console.log("Downloading heroes data from https://dotowiki.herokuapp.com/dotowiki_heroes.json");
    try {
      fetch("https://dotowiki.herokuapp.com/dotowiki_heroes.json", {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Downloading heroes is done!");
        this.setState({
          heroes: data,
        });
        console.log(data);

        AsyncStorage.setItem("dotowiki_heroes.json", JSON.stringify(data));

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
        });

        counter--;
        if (counter === 0) {
          this.setState({
            modalVisisble: false
          });
        }
      })
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading heroes is failed!");
      console.log(error);
    }

    console.log("Downloading items from https://dotowiki.herokuapp.com/dotowiki_items.json");
    try {
      fetch("https://dotowiki.herokuapp.com/dotowiki_items.json", {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        Alert.alert("Downloading items is done!");
        this.setState({
          items: data,
        });
        console.log(data);

        AsyncStorage.setItem("dotowiki_items.json", JSON.stringify(data));

        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(this.state.items),
        // });
        counter--;
        if (counter === 0) {
          this.setState({
            modalVisisble: false
          });
        }
      })
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading items is failed!");
      console.log(error);
    }
  }

  _onChangeInputSearch(text) {
    // console.log(text);
    if (this.state.isHeroSelected) {
      var heroes = this.state.heroes;
      for (var hero of heroes) {
        if (hero.localized_name.toLowerCase().search(text.toLowerCase()) === (-1)) {
          hero.visibility = false;
        } else {
          hero.visibility = true;
        }
      }
      this.setState({
        heroes: heroes
      });
    } else if (this.state.isItemSelected) {
      var items = this.state.items;
      for (var item of items) {
        if (item.localized_name.toLowerCase().search(text.toLowerCase()) === (-1)) {
          item.visibility = false;
        } else {
          item.visibility = true;
        }
      }
      this.setState({
        items: items
      });
    }
  }

  _onPressButtonClearInput() {
    this.searchInput.clear();
    this._onChangeInputSearch("");
  }

  _onPageSelected(event) {
    this._onPressButtonClearInput();
    if (event.nativeEvent.position === HERO_LIST_PAGE) {
      this.setState({
        isHeroSelected: true,
        isItemSelected: false,
      });
    } else if (event.nativeEvent.position === ITEM_LIST_PAGE) {
      this.setState({
        isHeroSelected: false,
        isItemSelected: true,
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={{
            flex: 5,
            justifyContent: 'center'
          }}><Text style={{
            textAlign: 'center',
            fontSize: 20,
            padding: 3
          }}>
            DOTOWIKI
          </Text></View>
          <View style={{
            flex: 2
          }}><Button
            title="Download"
            onPress={() => this._onPressButtonDownload()}
          /></View>
        </View>
        <View style={styles.content}>
          <View style={styles.content_navigation}>
            <TouchableHighlight onPress={() => this._onPressButtonHero()}>
              <Text style={{fontSize: 18}}>Hero</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this._onPressButtonItem()}>
              <Text style={{fontSize: 18}}>Item</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: 1}}>
            <ViewPagerAndroid
              style={{flex: 1}}
              ref={(viewPager) => {this.viewPager = viewPager;}}
              onPageSelected={(event) => this._onPageSelected(event)}
            >
              <View>
                <ScrollView>
                  {
                    this.state.heroes.map((hero, index) => {
                      if (hero.visibility) {
                        return (
                          <View key={hero.short_name} style={styles.item_box}>
                            <TouchableHighlight onPress={() => this._onPressIconHero(hero)}>
                              <Image
                                source={{uri: hero.icon_url}}
                                style={styles.item_image}
                              />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this._onPressIconHero(hero)}>
                              <Text style={styles.item_text}>{hero.localized_name}</Text>
                            </TouchableHighlight>
                          </View>
                        );
                      } else {
                        return(<View key={hero.short_name}></View>);
                      }
                    })
                  }
                </ScrollView>
              </View>
              <View>
                <ScrollView>
                  {
                    this.state.items.map((item, index) => {
                      // Only render items whose cost is greater than 0 (no need recipe)
                      if (Number(item.cost) > 0 || item.cost === undefined) {
                        if (item.visibility) {
                          return (
                            <View key={item.short_name} style={styles.item_box}>
                              <TouchableHighlight onPress={() => this._onPressIconItem(item)}>
                                <Image
                                  source={{uri: item.icon_url}}
                                  style={styles.item_image}
                                />
                              </TouchableHighlight>
                              <TouchableHighlight onPress={() => this._onPressIconItem(item)}>
                                <Text style={styles.item_text}>{item.localized_name}</Text>
                              </TouchableHighlight>
                            </View>
                          );
                        } else {
                          return(<View key={item.short_name}></View>);
                        }
                      } else {
                        return(<View key={item.short_name}></View>);
                      }
                    })
                  }
                </ScrollView>
              </View>
            </ViewPagerAndroid>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              ref={(searchInput) => this.searchInput = searchInput}
              style={{flex: 10}}
              placeholder="Type to start searching..."
              onChangeText={(text) => this._onChangeInputSearch(text)}
            />
            <Button
              title="Clear"
              onPress={() => this._onPressButtonClearInput()}
            />
          </View>
        </View>
      </View>
    );
  }
}

module.exports = MainScene;
