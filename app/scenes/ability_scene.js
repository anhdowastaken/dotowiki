/**
 * ability scene
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

});

class AbilitySubItem extends Component {
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

class AbilityScene extends Component {
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
          <Title>{this.props.ability.full_name}</Title>
        </Header>

        <Content>
          <Card>
            <CardItem cardBody>
              <Image style={{ resizeMode: 'contain' }} source={{uri: this.props.ability.portrait_url}} />
              <Text>{this.props.ability.description}</Text>
            </CardItem>

            <AbilitySubItem header={'AFFECTS'} body={this.props.ability.affects}></AbilitySubItem>

            <AbilitySubItem header={'DAMAGE'} body={this.props.ability.damage}></AbilitySubItem>

            <AbilitySubItem header={'ATTRIBUTE'} body={this.props.ability.attribute}></AbilitySubItem>

            <AbilitySubItem header={'COOLDOWN AND MANACOST'} body={this.props.ability.cooldownAndManacost}></AbilitySubItem>

            <AbilitySubItem header={'NOTES'} body={this.props.ability.notes}></AbilitySubItem>

            <AbilitySubItem header={'LORE'} body={this.props.ability.lore}></AbilitySubItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

module.exports = AbilityScene;
