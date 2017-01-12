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
  AsyncStorage,
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
    // Get heroes from https://dotowiki.herokuapp.com/heroes
    try {
      const data = AsyncStorage.getItem("dotowiki_heroes.json")
      .then((response) => {
        if (response) {
          data = JSON.parse(response);
          console.log(data);
          // Avoid empty data
          if (data === "") {
            Alert.alert("No heroes data! Please download again!");
            data = [];
          }
          this.setState({
            heroes: data,
          });
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
          });
        } else {
          Alert.alert("No heroes data! Please download again!");
        }
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
      Alert.alert("Incorrect heroes data! Please download again!");
      this.setState({
        heroes: [],
      });
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      });
    }

    // Get items from https://dotowiki.herokuapp.com/dotowiki_items.json
    try {
      const data = AsyncStorage.getItem("dotowiki_items.json")
      .then((response) => {
        if (response) {
          data = JSON.parse(response);
          console.log(data);
          // Avoid empty data
          if (data === "") {
            Alert.alert("No items data! Please download again!");
            data = [];
          }
          this.setState({
            items: data,
          });
          // this.setState({
          //   dataSource: this.state.dataSource.cloneWithRows(this.state.items),
          // });
        } else {
          Alert.alert("No items data! Please download again!");
        }
      });
    } catch (error) {
      // Error retrieving data
      console.log(error);
      Alert.alert("Incorrect items data! Please download again!");
      this.setState({
        items: [],
      });
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
      // });
    }
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

  _onPressButtonDownload() {
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
      })
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading items is failed!");
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.content}>
        <TouchableHighlight onPress={() => this._onPressButtonDownload()}>
          <Text style={{textAlign: "center"}}>Download data</Text>
        </TouchableHighlight>
        <View style={styles.content_navigation}>
          <TouchableHighlight onPress={() => this._onPressButtonHero()}><Text>Hero</Text></TouchableHighlight>
          <TouchableHighlight onPress={() => this._onPressButtonItem()}><Text>Item</Text></TouchableHighlight>
        </View>
        <ListView
          contentContainerStyle={styles.item_list}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => {
              // Only render heroes and items whose cost is greater than 0 (no need recipe)
              if (Number(rowData.cost) > 0 || rowData.cost === undefined) {
                return (
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
                );
              } else {
                // Render empty element
                return (<View></View>);
              }
            }
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
