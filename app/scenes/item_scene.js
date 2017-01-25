/**
 * Item scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  // Button,
  Image,
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
import {
  Col,
  Row,
  Grid
} from 'react-native-easy-grid';

const styles = StyleSheet.create({

});

class ItemSubItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.body && this.props.body !== '') {
      return (
        <View>
          <CardItem header>
            <Text>{this.props.header}</Text>
          </CardItem>
          <CardItem>
            <Text>{this.props.body}</Text>
          </CardItem>
        </View>
      );
    } else {
      return (null);
    }
  }
}

class ItemCostAndRequirements extends Component {
  constructor(props) {
    super(props);

    this._onPressItem = this._onPressItem.bind(this);
  }

  _onPressItem(item) {
    this.props.navigator.push({
      scene_id: 'ItemScene',
      selected_item: item
    });
  }

  render() {
    if (this.props.components !== null && this.props.components.length > 0) {
      return (
        <View>
          <CardItem header>
            <Text>COST AND REQUIREMENTS</Text>
          </CardItem>
          <CardItem>
            <View style={{flexDirection: 'row'}}>
            {
              this.props.components.map((component, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => this._onPressItem(component)}>
                    <Image source={{uri: component.icon_url}} style={{height:45, width: 45, marginRight: 3}}/>
                  </TouchableOpacity>
                );
              })
            }
            </View>
            <Text>{this.props.cost} gold</Text>
          </CardItem>
        </View>
      );
    } else {
      return (
        <View>
          <CardItem header>
            <Text>COST</Text>
          </CardItem>
          <CardItem>
            <Text>{this.props.cost} gold</Text>
          </CardItem>
        </View>
      );
    }
  }
}

class ItemScene extends Component {
  constructor(props) {
    super(props);

    this._onPressBack = this._onPressBack.bind(this);
  }

  componentWillMount() {
    // Do something
  }

  _onPressBack() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <Container style={{backgroundColor: '#FFFFFF'}}>
        <Header>
          <Button transparent>
            <Icon
              name='ios-arrow-back'
              onPress={() => this._onPressBack()}
            />
          </Button>
          <Title>{this.props.item.localized_name}</Title>
        </Header>

        <Content>
          <Card>
            <CardItem cardBody>
              <Image style={{ resizeMode: 'contain' }} source={{uri: this.props.item.portrait_url}} />
              <Text>{this.props.item.description}</Text>
            </CardItem>

            <ItemCostAndRequirements components={this.props.item.components} cost={this.props.item.cost} navigator={this.props.navigator}></ItemCostAndRequirements>

            <ItemSubItem header={'ATTRIBUTE'} body={this.props.item.attribute}></ItemSubItem>

            <ItemSubItem header={'MANACOST'} body={this.props.item.manacost}></ItemSubItem>

            <ItemSubItem header={'COOLDOWN'} body={this.props.item.cooldown}></ItemSubItem>

            <ItemSubItem header={'NOTES'} body={this.props.item.notes}></ItemSubItem>

            <ItemSubItem header={'LORE'} body={this.props.item.lore}></ItemSubItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = ItemScene;
