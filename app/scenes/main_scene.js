/**
 * Main scene
 */

import React, { Component } from 'react';
import {
  // AppRegistry,
  StyleSheet,
  // Text,
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
  Text,
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

var CATEGORY_HERO = 0;
var CATEGORY_ITEM = 1;
var CATEGORY_MATCH = 2;
var CATEGORY_USER = 3;

// NOTE: All React components must start with a upper case letter, or contain a dot.
class MainScene extends Component {
  constructor(props) {
    super(props);

    this._content = null;
    this._searchInput = null;

    this._onPressItem = this._onPressItem.bind(this);
    this._onPressButtonCategory = this._onPressButtonCategory.bind(this);
    this._onChangeInputSearch = this._onChangeInputSearch.bind(this);
    this._onPressButtonClearInput = this._onPressButtonClearInput.bind(this);
    this._onPressNoButton = this._onPressNoButton.bind(this);
    this._onPressYesButton = this._onPressYesButton.bind(this);
    this._onPressButtonDownload = this._onPressButtonDownload.bind(this);
    this._onScrollContent = this._onScrollContent.bind(this);

    this.state = {
      heroes: this.props.heroes,
      heroes_y: 0,
      items: this.props.items,
      items_y: 0,
      data: null,
      categorySeletected: CATEGORY_HERO
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

  _onPressButtonCategory(category) {
    this._searchInput._root.clear();
    this._onChangeInputSearch('');

    switch (category) {
      case (CATEGORY_HERO):
        this.setState({
          data: this.state.heroes
        });
        if (this.state.categorySeletected === category) {
          this._content._root.scrollToPosition(0);
        } else {
          this._content._root.scrollToPosition(0, this.state.heroes_y);
        }
        break;
      case (CATEGORY_ITEM):
        this.setState({
          data: this.state.items
        });
        if (this.state.categorySeletected === category) {
          this._content._root.scrollToPosition(0);
        } else {
          this._content._root.scrollToPosition(0, this.state.items_y);
        }
        break;
      case (CATEGORY_MATCH):
        break;
      case (CATEGORY_USER):
        break;
      default:
        break;
    }

    this.setState({
      categorySeletected: category
    })
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
    this._searchInput._root.clear();
    this._onChangeInputSearch('');
    this._content._root.scrollToPosition(0);
  }

  _onScrollContent(event) {
    switch (this.state.categorySeletected) {
      case (CATEGORY_HERO):
        this.setState({
          heroes_y: event.nativeEvent.contentOffset.y
        });
        break;
      case (CATEGORY_ITEM):
        this.setState({
          items_y: event.nativeEvent.contentOffset.y
        });
        break;
      case (CATEGORY_MATCH):
        break;
      case (CATEGORY_USER):
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Header searchBar>
          <InputGroup>
            <Icon name='ios-close-outline' onPress={() => this._onPressButtonClearInput()}/>
            <Input
              ref={(c) => this._searchInput = c}
              placeholder="Search"
              onChangeText={(text) => this._onChangeInputSearch(text)}
            />
            <Icon name='ios-download-outline' onPress={() => this._onPressButtonDownload()}/>
          </InputGroup>
        </Header>

        <Content
          ref={(c) => this._content = c}
          onScroll={(event) => {this._onScrollContent(event);}}
        >
          <List>
          {
            this.state.data.map((item, index) => {
              if (item.visibility
                && (item.cost === undefined
                  || ((item.cost !== undefined && item.name.search('item_river_painter') === -1
                    && (item.cost > 0 || (item.cost === 0 && item.isRecipe === false)))
                    && (item.isRecipe !== undefined && item.isRecipe === false)))) {
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
            <Button active={this.state.categorySeletected === CATEGORY_HERO ? true : false} onPress={() => this._onPressButtonCategory(CATEGORY_HERO)}>
              Hero
              <Icon name='ios-person-outline'/>
            </Button>
            <Button active={this.state.categorySeletected === CATEGORY_ITEM ? true : false} onPress={() => this._onPressButtonCategory(CATEGORY_ITEM)}>
              Item
              <Icon name='ios-construct-outline'/>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

module.exports = MainScene;
