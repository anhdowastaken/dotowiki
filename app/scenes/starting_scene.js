/**
 * Item scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  BackAndroid,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },

  title: {
    textAlign: 'center',
    fontSize: 40,
  },

  activityIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// var heroes_json_url = 'https://dotowiki.herokuapp.com/dotowiki_heroes.json';
// var items_json_url = 'https://dotowiki.herokuapp.com/dotowiki_items.json';
// var last_update_json_url = 'https://dotowiki.herokuapp.com/last_update.json';
var heroes_json_url = 'https://dotowiki-service.herokuapp.com/heroes';
var items_json_url = 'https://dotowiki-service.herokuapp.com/items';
var last_update_json_url = 'https://dotowiki-service.herokuapp.com/last_update';
// var heroes_json_url = 'http://192.168.100.7:5000/dotowiki_heroes.json';
// var items_json_url = 'http://192.168.100.7:5000/dotowiki_items.json';
// var last_update_json_url = 'http://192.168.100.7:5000/last_update.json';

class StartingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadAnimating: true,
    };
    this._onPressNoButton = this._onPressNoButton.bind(this);
    this._onPressYesButton = this._onPressYesButton.bind(this);
  }

  _onPressNoButton() {
    // TODO: Only work with Android
    BackAndroid.exitApp();
  }

  _onPressYesButton() {
    this.downloadDataFromDotowikiServer();
  }

  downloadDataFromDotowikiServer() {
    var counter = 3;
    var lastUpdate = 0;
    var heroes = [];
    var items = [];

    // Show downloading activity indicator
    this.setState({
      downloadAnimating: true,
    });

    console.log("Downloading data from " + last_update_json_url);
    try {
      fetch(last_update_json_url, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        lastUpdate = data[0].last_update;

        AsyncStorage.setItem("dotowiki_last_update", JSON.stringify(lastUpdate));
        counter--;
        if (counter === 0) {
          this.setState({
            downloadAnimating: false
          });
          this.props.navigator.replace({
            scene_id: "MainScene",
            heroes: heroes,
            items: items
          });
        }
      })
      .catch((error) => {
        Alert.alert(
          'DOTOWIKI',
          'There are some problems with your connection. Please try again!',
          [
            {text: 'OK', onPress: () => {
              // TODO: Only work with Android
              BackAndroid.exitApp();
            }}
          ],
          {
            cancelable: false
          }
        );
        console.log(error);
      });
    } catch (error) {
      // Alert.alert("Downloading is failed!");
      console.log(error);
    }

    console.log("Downloading heroes data from " + heroes_json_url);
    try {
      fetch(heroes_json_url, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        // Alert.alert("Downloading heroes is done!");
        // this.setState({
        //   heroes: data,
        // });
        console.log(data);
        heroes = data;

        AsyncStorage.setItem("dotowiki_heroes.json", JSON.stringify(heroes));
        counter--;
        if (counter === 0) {
          // Alert.alert("Move to MainScene!");
          this.setState({
            downloadAnimating: false
          });
          this.props.navigator.replace({
            scene_id: "MainScene",
            heroes: heroes,
            items: items
          });
        }

        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(this.state.heroes),
        // });
      })
      .catch((error) => {
        Alert.alert(
          'DOTOWIKI',
          'There are some problems with your connection. Please try again!',
          [
            {text: 'OK', onPress: () => {
              // TODO: Only work with Android
              BackAndroid.exitApp();
            }}
          ],
          {
            cancelable: false
          }
        );
        console.log(error);
      });
    } catch (error) {
      // Alert.alert("Downloading heroes is failed!");
      console.log(error);
    }

    console.log("Downloading items from " + items_json_url);
    try {
      fetch(items_json_url, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        // Alert.alert("Downloading items is done!");
        // this.setState({
        //   items: data,
        // });
        console.log(data);
        items = data;

        AsyncStorage.setItem("dotowiki_items.json", JSON.stringify(items));
        counter--;
        if (counter === 0) {
          // Alert.alert("Move to MainScene!");
          this.setState({
            downloadAnimating: false
          });
          this.props.navigator.replace({
            scene_id: "MainScene",
            heroes: heroes,
            items: items
          });
        }

        // this.setState({
        //   dataSource: this.state.dataSource.cloneWithRows(this.state.items),
        // });
      })
      .catch((error) => {
        Alert.alert(
          'DOTOWIKI',
          'There are some problems with your connection. Please try again!',
          [
            {text: 'OK', onPress: () => {
              // TODO: Only work with Android
              BackAndroid.exitApp();
            }}
          ],
          {
            cancelable: false
          }
        );
        console.log(error);
      });
    } catch (error) {
      // Alert.alert("Downloading items is failed!");
      console.log(error);
    }
  }

  componentWillMount() {
    // console.log(this.props.force_update);
    if (this.props.force_update) {
      this.downloadDataFromDotowikiServer();
    } else {
      var didDataExisted = true;
      var counter = 2;
      var heroes = [];
      var items = [];

      // Check data existing or not
      try {
        AsyncStorage.getItem("dotowiki_heroes.json")
        .then((response) => {
          if (response === null) {
            console.log("Heroes data is null");
            didDataExisted = false;
          } else {
            var data = JSON.parse(response);
            heroes = data;
            if (data === [] || data === "") {
              console.log("Heroes data is empty");
              didDataExisted = false;
            }
          }

          counter--;
          if (counter === 0) {
            if (didDataExisted === true) {
              // Check last update
              try {
                AsyncStorage.getItem("dotowiki_last_update")
                .then((response) => {
                  var needUpdate = false;
                  if (response === null || Number.isNaN(response)) {

                  } else {
                    var lastUpdate = Number(response);

                    try {
                      fetch(last_update_json_url, {method: "GET"})
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data[0].last_update);
                        if (Number.isNaN(data[0].last_update)) {

                        } else if (lastUpdate < Number(data[0].last_update)) {
                          needUpdate = true;
                        } else {

                        }

                        if (needUpdate) {
                          Alert.alert(
                            'DOTOWIKI',
                            'There are new updates! Do you want to download now?',
                            [
                              {text: 'No', onPress: () => {
                                this.props.navigator.replace({
                                  scene_id: "MainScene",
                                  heroes: heroes,
                                  items: items
                                });
                              }},
                              {text: 'Yes', onPress: () => this._onPressYesButton()},
                            ],
                            {
                              cancelable: false
                            }
                          );
                        } else {
                          this.props.navigator.replace({
                            scene_id: "MainScene",
                            heroes: heroes,
                            items: items
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        this.props.navigator.replace({
                          scene_id: "MainScene",
                          heroes: heroes,
                          items: items
                        });
                      });
                    } catch (error) {
                      // Alert.alert("Downloading is failed!");
                      console.log(error);
                      this.props.navigator.replace({
                        scene_id: "MainScene",
                        heroes: heroes,
                        items: items
                      });
                    }
                  }
                });
              } catch (error) {
                // Error retrieving data
                console.log(error);
              }
            } else {
              Alert.alert(
                'DOTOWIKI',
                'There is no data! Do you want to download now?',
                [
                  {text: 'No', onPress: () => this._onPressNoButton()},
                  {text: 'Yes', onPress: () => this._onPressYesButton()},
                ],
                {
                  cancelable: false
                }
              );
            }
          }
        });
      } catch (error) {
        // Error retrieving data
        console.log("There is error when get data of heroes");
        didDataExisted = false;
      }

      // Get items from https://dotowiki.herokuapp.com/dotowiki_items.json
      try {
        AsyncStorage.getItem("dotowiki_items.json")
        .then((response) => {
          if (response === null) {
            console.log("Items data is null");
            didDataExisted = false;
          } else {
            var data = JSON.parse(response);
            items = data;
            if (data === [] || data === "") {
              console.log("Items data is empty");
              didDataExisted = false;
            }
          }

          counter--;
          if (counter === 0) {
            if (didDataExisted === true) {
              // Check last update
              try {
                AsyncStorage.getItem("dotowiki_last_update")
                .then((response) => {
                  var needUpdate = false;
                  if (response === null || Number.isNaN(response)) {

                  } else {
                    var lastUpdate = Number(response);

                    try {
                      fetch(last_update_json_url, {method: "GET"})
                      .then((response) => response.json())
                      .then((data) => {
                        console.log(data[0].last_update);
                        if (Number.isNaN(data[0].last_update)) {

                        } else if (lastUpdate < Number(data[0].last_update)) {
                          needUpdate = true;
                        } else {

                        }

                        if (needUpdate) {
                          Alert.alert(
                            'DOTOWIKI',
                            'There are new updates! Do you want to download now?',
                            [
                              {text: 'No', onPress: () => {
                                this.props.navigator.replace({
                                  scene_id: "MainScene",
                                  heroes: heroes,
                                  items: items
                                });
                              }},
                              {text: 'Yes', onPress: () => this._onPressYesButton()},
                            ],
                            {
                              cancelable: false
                            }
                          );
                        } else {
                          this.props.navigator.replace({
                            scene_id: "MainScene",
                            heroes: heroes,
                            items: items
                          });
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                        this.props.navigator.replace({
                          scene_id: "MainScene",
                          heroes: heroes,
                          items: items
                        });
                      });
                    } catch (error) {
                      // Alert.alert("Downloading is failed!");
                      console.log(error);
                      this.props.navigator.replace({
                        scene_id: "MainScene",
                        heroes: heroes,
                        items: items
                      });
                    }
                  }
                });
              } catch (error) {
                // Error retrieving data
                console.log(error);
              }
            } else {
              this.setState({
                downloadAnimating: false
              });
              Alert.alert(
                'DOTOWIKI',
                'There is no data! Do you want to download now?',
                [
                  {text: 'No', onPress: () => this._onPressNoButton()},
                  {text: 'Yes', onPress: () => this._onPressYesButton()},
                ],
                {
                  cancelable: false
                }
              );
            }
          }
        });
      } catch (error) {
        // Error retrieving data
        console.log("There is error when get data of items");
        didDataExisted = false;
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}>DOTOWIKI</Text>
        <ActivityIndicator
          animating={this.state.downloadAnimating}
          style={styles.activityIndicator}
          size="small"
        />
      </View>
    );
  }
}

module.exports = StartingScene;
