// @flow

import Images from './Images';

export default {
  LOGIN_SCREEN: {
    screen : 'app.LoginScreen',
    title  : 'Login',
  },
  ADD_SCREEN: {
    screen : 'app.addScreen',
    title  : 'Create New',
  },
  SEARCH_SCREEN: {
    screen : 'app.searchScreen',
    title  : 'Search',
  },
  SIGNIN_SCREEN: {
    screen : 'app.SignInScreen'
  },
  PUSHED_SCREEN: {
    screen : 'app.PushedScreen',
    title  : 'Wecora Chat',
  },
  BOARDS_SCREEN: {
    screen : 'app.BoardsScreen',
    backButtonTitle: ''
  },
  ITEM_DETAIL: {
    screen : 'app.ItemDetail',
    backButtonTitle: ''
  },
  CHATS_SCREEN: {
    screen : 'app.ChatsScreen',
    backButtonTitle: ''
  },
  ITEMS_SCREEN: {
    screen : 'app.ItemsScreen',
    backButtonTitle: ''
  },
  FILTER_SCREEN: {
    screen : 'app.FilterScreen',
    backButtonTitle: ''
  },
  FILTER_ITEMS_SCREEN: {
    screen : 'app.FilterItemsScreen',
    backButtonTitle: ''
  },
  DRAWER: {
    screen : 'app.DrawerScreen',
  },
  SPLASH_SCREEN: {
    screen : 'app.SplashScreen',
  },
  FIRST_TAB: {
    screen       : 'app.FirstTabScreen',
    title        : 'First Tab',
    label        : 'First Tab',
    icon         : Images.TAB_1,
    selectedIcon : Images.TAB_1_selected,
  },
  SECOND_TAB: {
    screen       : 'app.SecondTabScreen',
    title        : 'Second Tab',
    label        : 'Second Tab',
    icon         : Images.TAB_1,
    selectedIcon : Images.TAB_1_selected,
  },
}
