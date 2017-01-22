/**
 * Item scene
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  // Text,
  TouchableHighlight,
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
  container: {
    flex: 1,
    padding: 3,
    backgroundColor: '#FFFFFF',
  },

 top: {
    // flex: 1,
    flexDirection: 'row',
    height: 50,
  },

  top_button_back: {
    flex: 1,
  },

  top_title: {
    flex: 5,
    fontSize: 20,
    textAlign: 'center',
  },

  content: {
    flex: 1,
  },

  item_image: {
    width: 85,
    height: 64,
  },
});

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
              <Text>{this.props.item.cost} gold</Text>
            </CardItem>

            <CardItem header>
              <Text>ATTRIBUTE</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.item.attribute}</Text>
            </CardItem>

            <CardItem header>
              <Text>MANACOST</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.item.manacost}</Text>
            </CardItem>

            <CardItem header>
              <Text>COOLDOWN</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.item.cooldown}</Text>
            </CardItem>

            <CardItem header>
              <Text>NOTES</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.item.notes}</Text>
            </CardItem>

            <CardItem header>
              <Text>LORE</Text>
            </CardItem>
            <CardItem>
              <Text>{this.props.item.lore}</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = ItemScene;
