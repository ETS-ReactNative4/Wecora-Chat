import React from "react";
import { View, StatusBar, Image, Alert, BackHandler, BackAndroid, Platform } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Container, Text, Content, Icon, Button, Form, Item, Label, Spinner } from "native-base";
import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';

import CusInput from '../../components/CusInput'

const logoWithTitle = require('../../assets/logoWithTitle.png');

class SignInScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: 0, email: "" };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListsener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    BackAndroid.exitApp()
    return true;
  }

  ShowAlertDialog = () => {
    Alert.alert('Login Error', 'Email or password was incorrect', [{ text: 'Ok', onPress: () => console.log('') }])
  }

  changeValue = () => {

    this.setState({
      loading: 2
    })
  }

  onFocus = () => {
    this.setState({
      backgroundColor: 'green'
    })
  }

  onBlur = () => {
    this.setState({
      backgroundColor: '#ededed'
    })
  }

  _handlePress(event) {
    let email = this.state.email;
  }

  moveToPasswordResetScreen = () => {
    this.props.navigation.navigate('ForgetPassword');
  }

  render() {
    if (this.state.loading == 1) {
      return (
        <AppLoading />
      );
    }
    else if (this.state.loading == 2) {
      setTimeout(() => {
        if (this.state.email != "") {
          this.props.navigation.navigate('Projects');
          this.setState({ loading: 0 });
        } else {
          this.ShowAlertDialog();
          this.setState({ loading: 0 });
        }
      }, 2000);

      return (
        <Container style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Content>
            <View style={styles.logoView}>
              <Image source={logoWithTitle} style={styles.logo} />
            </View>
            <Spinner color='white' style={styles.spinner} />
          </Content>
        </Container>
      );
    }
    else {
      return (

        <Container style={styles.container}>
          <StatusBar barStyle="light-content" />
          <KeyboardAwareScrollView
            enableOnAndroid
            enableAutomaticScroll
            keyboardOpeningTime={0}
            extraHeight={Platform.select({ android: 100 })}
          >
            <Content>
              <View style={styles.logoView}>
                <Image source={logoWithTitle} style={styles.logo} />
              </View>
              <Form style={styles.formView}>
                <View style={{ flex: 1 }}>
                  <View style={{ height: 60 }}>
                    <CusInput label="Email" hidden={false}
                      ref={(el) => { this.email = el; }}
                      onChangeText={(email) => this.setState({ email })}
                      value={this.state.email} />
                  </View>
                  <View style={{ height: 60 }}>
                    <CusInput label="Password" hidden={true} />
                  </View>
                </View>
                <Button iconLeft light style={styles.buttonLoginStyle} onPress={this.changeValue}>
                  <Ionicons name="md-key" size={22} />
                  <Text>Login</Text>
                </Button>
                <Button transparent style={styles.buttonForgotPasswordStyle}
                  onPress={this.moveToPasswordResetScreen}>
                  <Text style={styles.ForgotPasswordText}>I Forgot My Password</Text>
                </Button>
              </Form>
            </Content>
          </KeyboardAwareScrollView>
        </Container >
      );
    }
  }
}
export default SignInScreen; 