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
  ListView
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
  button: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    marginRight: 5,
    marginLeft: 5,
  },
});

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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  // onPressButtonGET() {
  //   let D2_API_KEY="CF1A4219A8407493ABAD29C0614BEE53";
  //   let dota2_webapi_url="http://api.steampowered.com/IEconDOTA2_570";
  //   let url = dota2_webapi_url + "/GetHeroes/v1?key=" + D2_API_KEY;

  //   fetch(url, {method: "GET"})
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       this.setState({
  //         dataSource: this.state.dataSource.cloneWithRows(data.result.heroes)
  //       });
  //     })
  //     .catch((error) => console.log(error));
  // }

  componentDidMount() {
    let D2_API_KEY="CF1A4219A8407493ABAD29C0614BEE53";
    let dota2_webapi_url="http://api.steampowered.com/IEconDOTA2_570";
    let url = dota2_webapi_url + "/GetHeroes/v1?key=" + D2_API_KEY;

    fetch(url, {method: "GET"})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.result.heroes)
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View style={styles.content}>
        {
        // <TouchableHighlight onPress={this.onPressButtonGET.bind(this)} style={styles.button}>
        //   <Text>GET</Text>
        // </TouchableHighlight>
        }
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text>{rowData.name}</Text>}
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
      // React element has to return only one element. You'll have to wrap both of your tags with another element tag.
      <View style={styles.container}>
        <Top/>
        <Content/>
        <Bottom/>
      </View>
    );
  }
}

AppRegistry.registerComponent('dotowiki', () => dotowiki);
