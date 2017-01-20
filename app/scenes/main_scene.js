/**
 * Main scene
 */

import React, { Component } from 'react';
import {
  // AppRegistry,
  StyleSheet,
  Text,
  // TextInput,
  TouchableHighlight,
  View,
  ScrollView,
  // ListView,
  Image,
  Alert,
  Navigator,
  AsyncStorage,
  // ActivityIndicator,
  // Modal,
  // Button,
  ViewPagerAndroid,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
  InputGroup,
  Input,
  // Text,
  Card,
  CardItem,
  Tabs,
  List,
  ListItem,
  Thumbnail,
  H1,
  H2,
  H3
} from 'native-base';

const styles = StyleSheet.create({

});

var HERO_LIST_PAGE=0;
var ITEM_LIST_PAGE=1;

// NOTE: All React components must start with a upper case letter, or contain a dot.
class MainScene extends Component {
  constructor(props) {
    super(props);

    this.searchInput = null;

    this._onPressItem = this._onPressItem.bind(this);
    this._onPressButtonHero = this._onPressButtonHero.bind(this);
    this._onPressButtonItem = this._onPressButtonItem.bind(this);
    this._onChangeInputSearch = this._onChangeInputSearch.bind(this);
    this._onPressButtonClearInput = this._onPressButtonClearInput.bind(this);
    this._onPressNoButton = this._onPressNoButton.bind(this);
    this._onPressYesButton = this._onPressYesButton.bind(this);
    this._onPressButtonDownload = this._onPressButtonDownload.bind(this);

    this.state = {
      heroes: this.props.heroes,
      items: this.props.items,
      data: null,
      isHeroSelected: true,
      isItemSelected: false,
    };
  }

  componentWillMount() {
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
      items: items,
      data: heroes
    });
  }

  // Callback function when press any item of list
  _onPressItem(data) {
    if (this.state.isHeroSelected) {
      // Push Hero scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: 'HeroScene',
        selected_hero: data,
      });
    } else if (this.state.isItemSelected) {
      // Push Item scene to stack of navigator with necessary data
      this.props.navigator.push({
        scene_id: 'ItemScene',
        selected_item: data,
      });
    }
  }

  _onPressButtonHero() {
    this._onPressButtonClearInput();
    this.setState({
      data: this.state.heroes,
      isHeroSelected: true,
      isItemSelected: false,
    });
  }

  _onPressButtonItem() {
    this._onPressButtonClearInput();
    this.setState({
      data: this.state.items,
      isHeroSelected: false,
      isItemSelected: true,
    });
  }

  _onPressNoButton() {
    // Do nothing
  }

  _onPressYesButton() {
    this.props.navigator.replace({
      scene_id: 'StartingScene',
      force_update: true
    });
  }

  _onPressButtonDownload() {
    Alert.alert(
      'DOTOWIKI',
      'You want to re-download data now, don\'t you?',
      [
        {text: 'No', onPress: () => this._onPressNoButton()},
        {text: 'Yes', onPress: () => this._onPressYesButton()},
      ],
      {
        cancelable: false
      }
    );
  }

  _onChangeInputSearch(text) {
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
    this.searchInput._root.clear();
    this._onChangeInputSearch('');
  }

  render() {
    return (
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Header searchBar>
          <InputGroup>
            <Icon name='ios-close-outline' onPress={() => this._onPressButtonClearInput()}/>
            <Input
              ref={(c) => this.searchInput = c}
              placeholder="Search"
              onChangeText={(text) => this._onChangeInputSearch(text)}
            />
            <Icon name='ios-download-outline' onPress={() => this._onPressButtonDownload()}/>
          </InputGroup>
        </Header>

        <Content>
          <List>
          {
            this.state.data.map((item, index) => {
              if (item.visibility) {
                return (
                  <ListItem key={item.short_name} onPress={() => this._onPressItem(item)}>
                    <Thumbnail source={{uri: item.icon_url}} size={35}/>
                    <Text>{item.localized_name}</Text>
                  </ListItem>
                );
              } else {
                return(null);
              }
            })
          }
          </List>
        </Content>

        <Footer>
          <FooterTab>
            <Button active={this.state.isHeroSelected} onPress={() => this._onPressButtonHero()}>
              Hero
            </Button>
            <Button active={this.state.isItemSelected} onPress={() => this._onPressButtonItem()}>
              Item
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

module.exports = MainScene;
