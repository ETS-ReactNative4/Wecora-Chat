import React from "react";
import { View, StatusBar, Image } from "react-native";
import * as Theme from '../../constants/theme';
import { Container, Text, Content } from "native-base";
import styles from "./styles";
import { Font, AppLoading } from "expo";
import { Ionicons } from '@expo/vector-icons';
const logo = require('../../assets/logoPlain.png');



class SplashScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')

    });

    console.disableYellowBox = true;
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
    
    this.setState({ loading: false });

    setTimeout(() => {
      this.props.navigation.navigate('SignIn');
    }, 3000);
  }


  render() {
    if (this.state.loading) {
      return (
        <AppLoading />
      );
    }
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Content>
          <View style={styles.logoView}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.versionView}>
            <Text style={styles.versionText}>Wecora v1.0.0</Text>
          </View>
        </Content>
      </Container>
    );
  }
}
export default SplashScreen; 