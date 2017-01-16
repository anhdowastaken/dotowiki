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
    // padding: 8,
    // height: 80,
  }
});

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
    var counter = 2;
    var heroes = [];
    var items = [];

    // Show downloading activity indicator
    this.setState({
      downloadAnimating: true,
    });

    console.log("Downloading heroes data from https://dotowiki.herokuapp.com/dotowiki_heroes.json");
    try {
      fetch("https://dotowiki.herokuapp.com/dotowiki_heroes.json", {method: "GET"})
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
      .catch((error) => console.log(error));
    } catch (error) {
      Alert.alert("Downloading items is failed!");
      console.log(error);
    }
  }

  componentDidMount() {
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
              this.props.navigator.replace({
                scene_id: "MainScene",
                heroes: heroes,
                items: items
              });
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
              this.props.navigator.replace({
                scene_id: "MainScene",
                heroes: heroes,
                items: items
              });
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
