import React from "react";
import { View, TouchableHighlight, StatusBar, Image, Alert, BackHandler, Platform, ActivityIndicator } from "react-native";
import { Container, Text, Content, Icon, Button, Title, Left, Right, Body, Form, Item, Input, Label, Spinner, Header } from "native-base";
import styles from "./styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Expo from 'expo';
import { Ionicons } from '@expo/vector-icons';
import CusInput from '../../components/CusInput';

const emailPng = require('../../assets/email.png');
const circlePng = require('../../assets/circle.png');
const donePng = require('../../assets/done.png');
const errorPng = require('../../assets/error.png');

class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = { loading: 0, email: "", displayButton: false, showError: false };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  changeValue = () => {

    this.setState({
      loading: 2
    })

  }
  changeValueAgain = () => {
    this.setState({
      loading: 0,
      email: ""
    })
  }

  _handlePress(event) {
    let email = this.state.email;
  }


  render() {
    if (this.state.loading == 1) {
      return (
        <AppLoading />
      );
    }
    else if (this.state.loading == 2) {
      setTimeout(() => {
        this.setState({ loading: 3 });
      }, 3000);

      return (
        <Container style={styles.container} >
          <StatusBar barStyle="light-content" backgroundColor="#E55A4F" />
          <Header style={{ backgroundColor: '#E55A4F', marginTop: Expo.Constants.statusBarHeight }}>
            <Left style={{ flex: 1 }} >
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
              </Button>
            </Left>
            <Body style={{ flex: 4, alignItems: 'center' }} >
              <Title>Forgot Password</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <Content style={styles.contentStyle}>
            <View style={styles.emailPngView}>
              <Image source={circlePng} style={styles.emailPngStyle}>
                <ActivityIndicator size={80} style={{ marginTop: 45 }} color="#E55A4F" />
              </Image>
            </View>
            <Text style={styles.HeadingText}>Sending password reset link...</Text>
          </Content>
        </Container>
      );
    }
    else if (this.state.loading == 3) {
      if (this.state.email.length > 10) {
        return (
          <Container style={styles.container} >
            <StatusBar barStyle="light-content" backgroundColor="#E55A4F" />
            <Header style={{ backgroundColor: '#E55A4F', marginTop: Expo.Constants.statusBarHeight }}>
              <Left style={{ flex: 1 }} >
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate('SignIn')}>
                  <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
                </Button>
              </Left>
              <Body style={{ flex: 4, alignItems: 'center' }} >
                <Title>Forgot Password</Title>
              </Body>
              <Right style={{ flex: 1 }} />
            </Header>
            <Content style={styles.contentStyle}>
              <View style={styles.emailPngView}>
                <Image source={donePng} style={styles.emailPngStyle} />
              </View>
              <Text style={styles.HeadingText}>Reset Link has been sent to </Text>
              <Text style={styles.HeadingText}>{this.state.email} </Text>
            </Content>
          </Container>
        );
      }
      else {
        return (
          <Container style={styles.specialContainer} >
            <StatusBar barStyle="light-content" backgroundColor="#F5f5f5" />
            <Header style={{ backgroundColor: "#FFFFFF00", elevation: 0, marginTop: Expo.Constants.statusBarHeight }}>
              <Left style={{ flex: 1 }} >
                <Button
                  transparent
                  onPress={() => this.props.navigation.navigate('SignIn')}>
                  <Ionicons name="ios-arrow-back" color="#000000" size={22} />
                </Button>
              </Left>
              <Body style={{ flex: 4, alignItems: 'center' }} />
              {/* <Body>
                <Title>Forgot Password</Title>
              </Body> */}
              <Right style={{ flex: 1 }} />
            </Header>
            <Content style={[styles.contentStyle]}>
              <View style={styles.emailPngView}>
                <Image source={errorPng} style={styles.emailPngStyle} />
              </View>
              <Text style={styles.HeadingText}>Email Address Not Found. </Text>
              <TouchableHighlight
                style={styles.buttonGeneralError}
              >
                <Text style={styles.buttonGeneralErrorText}>FOLLOW UP ACTION</Text>
              </TouchableHighlight>
              {/* <Button light style={styles.buttonGeneralError}>
                <Text style={styles.buttonGeneralErrorText}>FOLLOW UP ACTION</Text>
              </Button> */}
            </Content>
          </Container >
        );
      }
    }
    else {
      return (

        <Container style={styles.container} >
          <StatusBar barStyle="light-content" backgroundColor="#E55A4F" />
          <Header style={{ backgroundColor: '#E55A4F', marginTop: Expo.Constants.statusBarHeight }}>
            <Left style={{ flex: 1 }} >
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('SignIn')}>
                <Ionicons name="ios-arrow-back" color="#FFFFFF" size={22} />
              </Button>
            </Left>
            <Body style={{ flex: 4, alignItems: 'center' }} >
              <Title>Forgot Password</Title>
            </Body>
            <Right style={{ flex: 1 }} />
          </Header>
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 100 })}>
            <Content style={styles.contentStyle}>
              <View style={styles.emailPngView}>
                <Image source={emailPng} style={styles.emailPngStyle} />
              </View>
              <Text style={styles.HeadingText}>We will send a reset link.</Text>
              <View style={styles.formView}>
                <Form>
                  <CusInput label="Email address" hidden={false}
                    defaultColor='#FFFFFF'
                    pressedColor='#EBEBEB'
                    labelColor='#0000008a'
                    inputColor='#000000de'
                    ref={(el) => { this.email = el; }}
                    onChangeText={(email) => {
                      this.setState({ email });
                      if (!(email.match("@") && email.match(".com") && email.length > 6)) {
                        this.setState({ showError: true, displayButton: false });
                      } else {
                        this.setState({ showError: false, displayButton: true });
                      }
                    }
                    }
                    value={this.state.email} />
                  {/* <Item regular style={styles.formInputItem}>
                    <Label style={styles.InputLabelText}>Email address</Label>
                    <Input
                      // onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      ref={(el) => { this.email = el; }}
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email}
                      style={styles.inputStyle} />
                  </Item> */}
                  {this.state.showError &&
                    <View style={styles.labelTextItem}>
                      <Ionicons name="md-warning" size={14} color='#E55A50' />
                      <Label style={styles.errorLabelText}>Not a valid email address</Label>
                    </View>
                  }
                  {this.state.displayButton &&
                    <Button iconLeft light style={styles.buttonResetStyle} onPress={this.changeValue}>
                      <Ionicons name="md-send" size={22} color='white' />
                      <Text style={styles.buttonTextStyle}>Send Reset Link</Text>
                    </Button>
                  }
                </Form>
              </View>
            </Content>
          </KeyboardAwareScrollView>

        </Container >
      );
    }
  }
}
export default ForgotPasswordScreen; 