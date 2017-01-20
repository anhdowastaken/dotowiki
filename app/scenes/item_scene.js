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
          <Grid>
            <Row>
              <Col style={{
                width: 90,
                alignItems: 'center'
              }}>
                <Image
                  source={{uri: this.props.item.portrait_url}}
                  style={{
                    width: 85,
                    height: 64
                }}/>
              </Col>
              <Col style={{height: 100}}>
                <Text>{this.props.item.description}</Text>
              </Col>
            </Row>
            <Row style={{flexDirection: 'row'}}>
              <View>
                <View>
                  <Text>Cost: {this.props.item.cost} gold</Text>
                </View>
                <View>
                  <Text>Attribute:</Text>
                  <Text>{this.props.item.attribute}</Text>
                </View>
                <View>
                  <Text>Manacost:</Text>
                  <Text>{this.props.item.manacost}</Text>
                </View>
                <View>
                  <Text>Cooldown:</Text>
                  <Text>{this.props.item.cooldown}</Text>
                </View>
                <View>
                  <Text>Notes:</Text>
                  <Text>{this.props.item.notes}</Text>
                </View>
                <View>
                  <Text>Lore:</Text>
                  <Text>{this.props.item.lore}</Text>
                </View>
              </View>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

module.exports = ItemScene;
