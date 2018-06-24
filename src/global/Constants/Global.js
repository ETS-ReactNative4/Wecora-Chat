// @flow

import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Constants from '../Constants';
import TabBar from '../TabBar';

const startTabBasedApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        ...Constants.Screens.FIRST_TAB
      },
      {
        ...Constants.Screens.SECOND_TAB
      }
    ],
    ...Platform.select({
      ios: {
        tabsStyle: TabBar.Main,
      },
      android: {
        appStyle: TabBar.Main,
      },
    }),
    drawer: {
      left: {
        screen: Constants.Screens.DRAWER.screen
      },
      disableOpenGesture: false
    },
  });
}

const startSingleScreenApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
       ...Constants.Screens.SPLASH_SCREEN,
    },
    appStyle: {
      orientation: 'portrait',
    }
  });
}

const openLoginModalIn = (navigator: { showModal: Function }, withCancelButton: boolean = true, ) => {
  navigator.showModal({
    ...Constants.Screens.LOGIN_SCREEN,
    passProps: { withCancelButton },
    overrideBackPress: true, // [Android] if you want to prevent closing a modal by pressing back button in Android
  });
}

const openAddModal = (navigator: { showModal: Function }, withCancelButton: boolean = true, title: String = '', props ) => {
  navigator.showModal({
    ...Constants.Screens.ADD_SCREEN,
    title: title,
    passProps: { ...props, withCancelButton },
    overrideBackPress: true, // [Android] if you want to prevent closing a modal by pressing back button in Android
  });
}

const openSearchModal = (navigator: { showModal: Function }, withCancelButton: boolean = true, title: String = '', props ) => {
  navigator.showModal({
    ...Constants.Screens.SEARCH_SCREEN,
    title: title,
    passProps: { ...props, withCancelButton },
    overrideBackPress: true,
  });
}

const state = {
  DONE: 'done',
  ERROR: 'error',
  LOADING: 'loading',
  START: 'start'
}

const itemType = {
  PROJECT: 'project',
  LABEL: 'label',
  QUERY: 'query',
  BOARD: 'board',
  USER: 'user'
}

export default {
  startSingleScreenApp,
  startTabBasedApp,
  openAddModal,
  openLoginModalIn,
  openSearchModal,
  state,
  itemType
}
