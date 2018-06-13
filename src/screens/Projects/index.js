import React from "react";
import { View, KeyboardAvoidingView, ScrollView, TouchableHighlight, TouchableNativeFeedback, StatusBar, Image, Alert, BackHandler, Platform, ActivityIndicator } from "react-native";
import { Container, Badge, Card, CardItem, Fab, Text, Content, Icon, Button, Title, Left, Right, Body, Form, Item, Input, Label, Spinner, Header } from "native-base";
import styles from "./styles";
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import CusInput from '../../components/CusInput';
import CusButton from '../../components/CusButton';
import CusButtonWithLogo from '../../components/CusButtonWithLogo';

const projectBoardPng = require('../../assets/projectBoard.png');
const newProjectPng = require('../../assets/newProject.png');
const circlePng = require('../../assets/circle.png');
const messagePng = require('../../assets/message.png');
const messageLightPng = require('../../assets/messageLight.png');

class ProjectsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    this.state = { loading: 0, createWithLogoBackground: '#E55A50', addWithoutLogoText: '#E55A4F', addWithoutLogoBackground: '#ffffff00', projects: [], projectName: "", counter: 1 };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    if (this.state.loading == 0) {
      BackHandler.exitApp();
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
    if (this.state.projectName != "") {
      let count = parseInt(this.state.counter)
      if (count > 1)
        count = 0;
      else
        count++;

      this.setState(prevState => ({
        projects: [...prevState.projects, { name: this.state.projectName, counter: count }],
        projectName: "",
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
            <Text style={styles.HeadingText}>Creating Project...</Text>
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
                style={{ flex: 1 }}
                onPress={() => this.setState({
                  loading: 0
                })}>
                <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
              </Button>
            </Left>
            <Body style={{ flex: 4, alignItems: 'center'}}>
              <Title>Create New Project</Title>
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
                  <CusInput label="Project name" hidden={false}
                    defaultColor='#FFFFFF'
                    pressedColor='#EBEBEB'
                    labelColor='#0000008a'
                    inputColor='#000000de'
                    ref={(el) => { this.projectName = el; }}
                    onChangeText={(projectName) => this.setState({ projectName })}
                    value={this.state.projectName} />
                </View>
              </View>
            </ScrollView>
            <Button light iconLeft onPress={this._onbuttonAddNewProject} style={[styles.buttonAddNewProject, { backgroundColor: this.state.createWithLogoBackground }]} >
              <Ionicons name="md-add" size={22} color="#FFFFFF" />
              <Text style={[styles.buttonCreateNewProjectText, { color: "#FFFFFF" }]}>CREATE NEW PROJECT</Text>
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
            <Left style={{ flex: 1 }} />
            <Body style={{ flex: 4, alignItems: 'center' }}>
              <Title>Wecora Chat</Title>
            </Body>
            <Right style={{ flex: 1 }}>
              <Button
                transparent>
                <Ionicons name="ios-more" color="#FFFFFF" size={22} />
              </Button>
            </Right>
          </Header>
          <Content style={styles.contentStyle}>
            <View style={styles.emailPngView}>
              <Image source={projectBoardPng} style={styles.emailPngStyle} />
            </View>
            <Text style={styles.HeadingText}>Client conversations happen within a Project's Boards.</Text>
            {this.state.projects.length == 0 &&
              <View>
                <Text style={[styles.HeadingText, { marginTop: 10, marginBottom: 20 }]}>It looks like you don't have any active Projects.</Text>
                {/* <Button transparent onPress={this.buttonPressedNewProject} style={[styles.buttonCreateNewProject, { backgroundColor: this.state.addWithoutLogoBackground }]} >
                  <Text style={[styles.buttonCreateNewProjectText, { color: this.state.addWithoutLogoText }]}>CREATE NEW PROJECT</Text>
                </Button> */}
                <CusButton text="CREATE NEW PROJECT" onPress={this.buttonPressedNewProject1} />
              </View>
            }
            {this.state.projects.length > 0 &&
              this.state.projects.map(project => {
                return (
                  <TouchableHighlight
                    backgroundColor='#FFFFFF'
                    onPress={() => this.props.navigation.navigate('Boards', { title: project.name })}
                    underlayColor='#EBEBEB'
                  >
                    <Card style={styles.projectListBox}>
                      <CardItem>
                        <Body style={styles.cardBody}>
                          <Text style={[styles.InputLabelText, { fontSize: 16, lineHeight: 16, padding: 5, alignSelf: 'flex-start' }]}>{project.name}</Text>
                          <View style={{ width: 38, height: 28, alignSelf: 'flex-end', marginRight: 2, marginTop: 3 }}>
                            <Image source={project.counter > 0 ? messagePng : messageLightPng} style={{ width: 22, height: 20 }}>
                            </Image>
                            {project.counter > 0 &&
                              <View style={{
                                position: "absolute",
                                width: 22,
                                height: 20, backgroundColor: '#E55A4F',
                                borderRadius: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                left: 15, top: -10
                              }}
                              >
                                <Text style={{ backgroundColor: 'transparent', color: 'white' }}>
                                  {project.counter}
                                </Text>
                              </View>
                            }
                          </View>
                          {/* <Image source={messagePng} style={{ width: 22, height: 20, alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
                        </Image>
                        <Badge style={{ backgroundColor: '#E55A4F', marginBottom: 10 }}>
                          <Text style={{ color: 'white', fontSize: 12 }}>{project.counter}</Text>
                        </Badge> */}
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
export default ProjectsScreen; 