import React from "react";
import { View, KeyboardAvoidingView, TouchableHighlight, ScrollView, TouchableNativeFeedback, StatusBar, Image, Alert, BackHandler, Platform, ActivityIndicator } from "react-native";
import { Container, Badge, Card, CardItem, Fab, Text, Content, Icon, Button, Title, Left, Right, Body, Form, Item, Input, Label, Spinner, Header } from "native-base";
import styles from "./styles";
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import CusInput from '../../components/CusInput';
import CusButton from '../../components/CusButton';
import CusButtonWithLogo from '../../components/CusButtonWithLogo';

const boardPng = require('../../assets/board.png');
const boardImagePng = require('../../assets/boardImage.png');
const newProjectPng = require('../../assets/newProject.png');
const circlePng = require('../../assets/circle.png');
const messagePng = require('../../assets/message.png');
const messageLightPng = require('../../assets/messageLight.png');

class BoardsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = { loading: 0, createWithLogoBackground: '#E55A50', addWithoutLogoText: '#E55A4F', addWithoutLogoBackground: '#ffffff00', boards: [], projectName: this.props.navigation.state.params.title, boardName: "", counter: 1 };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if (this.state.loading == 0) {
      this.props.navigation.goBack(null);
    }
    else {
      this.setState({
        loading: 0
      })
    }
    return true;
  }

  buttonPressedNewProject1 = () => {
    this.setState({
      loading: 2
    })
  }

  _onbuttonAddNewProject = () => {
    if (this.state.boardName != "") {
      let count = parseInt(this.state.counter)
      if (count > 1)
        count = 0;
      else
        count++;

      this.setState(prevState => ({
        boards: [...prevState.boards, { name: this.state.boardName, counter: count }],
        boardName: "",
        counter: count,
        loading: 3
      }))

    }
  }

  render() {
    if (this.state.loading == 1) {
      return (
        <AppLoading />
      );
    }
    else if (this.state.loading == 3) {
      setTimeout(() => {
        this.setState({ loading: 0 });
      }, 3000);

      return (
        <Container style={styles.container} >
          <StatusBar barStyle="light-content" />
          <Content style={[styles.contentStyle, { paddingTop: 56 }]}>
            <View style={styles.emailPngView}>
              <Image source={circlePng} style={styles.emailPngStyle}>
                <ActivityIndicator size={80} style={{ marginTop: 45 }} color="#E55A4F" />
              </Image>
            </View>
            <Text style={styles.HeadingText}>Creating Board...</Text>
          </Content>
        </Container>
      );
    }
    else if (this.state.loading == 2) {
      return (
        <View style={styles.container} >
          <StatusBar barStyle="light-content" backgroundColor="#E55A4F" />
          <Header style={{ backgroundColor: '#E55A4F', marginTop: Expo.Constants.statusBarHeight }}>
            <Left style={{ flex: 1 }} >
              <Button
                transparent
                onPress={() => this.setState({
                  loading: 0
                })}>
                <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
              </Button>
            </Left>
            <Body style={{ flex: 4, alignItems: 'center'}}>
              <Title>Create New Board</Title>
            </Body>
            <Right style={{ flex: 1 }}/>
          </Header>

          <KeyboardAvoidingView behavior="padding" style={styles.form}>
            <ScrollView style={{ flex: 1 }}>
              <View style={styles.emailPngView}>
                <Image source={newProjectPng} style={styles.emailPngStyle} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ height: 60 }}>
                  <CusInput label="Board name" hidden={false}
                    defaultColor='#FFFFFF'
                    pressedColor='#EBEBEB'
                    labelColor='#0000008a'
                    inputColor='#000000de'
                    ref={(el) => { this.boardName = el; }}
                    onChangeText={(boardName) => this.setState({ boardName })}
                    value={this.state.boardName} />
                </View>
              </View>
            </ScrollView>
            <Button light iconLeft onPress={this._onbuttonAddNewProject} style={[styles.buttonAddNewProject, { backgroundColor: this.state.createWithLogoBackground }]} >
              <Ionicons name="md-add" size={22} color="#FFFFFF" />
              <Text style={[styles.buttonCreateNewProjectText, { color: "#FFFFFF" }]}>CREATE NEW BOARD</Text>
            </Button>
            {/* <CusButtonWithLogo text="CREATE NEW PROJECT" onPress={this._onbuttonAddNewProject} /> */}
          </KeyboardAvoidingView>
        </View >
      );
    }
    else {
      return (
        <Container style={styles.container} >
          <StatusBar barStyle="light-content" backgroundColor="#E55A4F" />
          <Header style={{ backgroundColor: '#E55A4F', marginTop: Expo.Constants.statusBarHeight }}>
            <Left style={{ flex: 1 }} >
              <Button
                transparent
                onPress={() => this.props.navigation.goBack(null)}>
                <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
              </Button>
            </Left>
            <Body style={{ flex: 4, alignItems: 'center' }}>
              <Title>{this.state.projectName}</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <Content style={styles.contentStyle}>
            <View style={{ marginTop: 5 }} />
            {this.state.boards.length == 0 &&
              <View>
                <View style={styles.emailPngView}>
                  <Image source={boardPng} style={styles.emailPngStyle} />
                </View>
                <Text style={styles.HeadingText}>It looks like there aren't any Boards in this Project.</Text>
                {/* <Button transparent onPress={this.buttonPressedNewProject} style={[styles.buttonCreateNewProject, { backgroundColor: this.state.addWithoutLogoBackground }]} >
                  <Text style={[styles.buttonCreateNewProjectText, { color: this.state.addWithoutLogoText }]}>CREATE NEW PROJECT</Text>
                </Button> */}
                <CusButton text="CREATE NEW BOARD" onPress={this.buttonPressedNewProject1} />
              </View>
            }
            {this.state.boards.length > 0 &&
              this.state.boards.map(board => {
                return (
                  <TouchableHighlight
                    backgroundColor='#FFFFFF'
                    onPress={() => { }}
                    underlayColor='#EBEBEB'
                  >
                    <Card style={styles.projectListBox}>
                      <CardItem>
                        <Body style={styles.cardBody}>
                          <Image style={{ width: 64, height: 64, marginLeft: -17, flex: 1, alignSelf: 'flex-start' }} source={boardImagePng} />
                          <Text style={[styles.InputLabelText, { fontSize: 16, flex: 4, marginLeft: 10, alignSelf: 'center' }]}>{board.name}</Text>
                          <View style={{ width: 38, height: 28, flex: 1, alignSelf: 'flex-end',  marginBottom: 10 }}>
                            <Image source={board.counter > 0 ? messagePng : messageLightPng} style={{ width: 22, height: 20 }}>
                            </Image>
                            {board.counter > 0 &&
                              <View style={{
                                position: "absolute",
                                width: 22,
                                height: 20, backgroundColor: '#E55A4F',
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                left: 15, top: -12
                              }}
                              >
                                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>
                                  {board.counter}
                                </Text>
                              </View>
                            }
                          </View>
                        </Body>
                      </CardItem>
                    </Card>
                  </TouchableHighlight>
                );
              })
            }
          </Content>
          <Fab
            style={{ backgroundColor: '#E55A4F' }}
            direction="up"
            position="bottomRight"
            onPress={this.buttonPressedNewProject1}>
            <Icon
              name="md-add"
            />
          </Fab>
        </Container >
      );
    }
  }
}
export default BoardsScreen; 