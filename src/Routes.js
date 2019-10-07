import React, { Component } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main'
import { AsyncStorage } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomePage from './components/Home';
import Person from './components/Person';
import GetProducts from './components/products/GetProducts';
import AddProduct from './components/products/AddProduct';
import GetCategories from './components/categories/GetCategories';
import EditCategory from './components/categories/EditCategory'
import DetailProduct from './components/products/DetailProduct'
import LoadingScreen from './pages/LoadingScreen'
import {createBottomTabNavigator} from 'react-navigation-tabs'

const AppStack = createStackNavigator(
  {
    HomePage:{
      screen:HomePage,
      navigationOptions:{
        header: null
      }
    },
    GetProducts: {
      screen:GetProducts,
      navigationOptions:{
        headerTitle: 'Products',
        headerStyle: {
          backgroundColor: '#007ba4',
        },
        headerTintColor: '#fff',
      },

    },
    GetCategories: {
      screen: GetCategories,
      navigationOptions: {
        headerTitle: 'Categories',
        headerStyle: {
          backgroundColor: '#007ba4',
        },
        headerTintColor: '#fff',
      }
    },
    DetailProduct:{
      screen: DetailProduct,
      navigationOptions:{
        header: null
      }
    },
    EditCategory: EditCategory,
    Person: {
      screen: Person,
      navigationOptions: {
        headerTitle: 'Profile',
        headerStyle: {
          backgroundColor: '#007ba4',
        },
        headerTintColor: '#fff',
      }
    },
    AddProduct:{
      screen: AddProduct,
      navigationOptions:{
        header: null
      }
    }
  },
);

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions:{
        header: null
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions:{
        header: null
      }
    },
  },
)

const Router = createAppContainer(createSwitchNavigator(
  {
    LoadingScreen: {
      screen:LoadingScreen,
      navigationOptions:{
        header: null
      }
    },
    Main: {
      screen: Main,
      navigationOptions:{
        header: null
      }
    },
    App : AppStack,
    Auth : AuthStack,
  },
  {
    initialRouteName : 'Main'
  }
));
export default class Routes extends Component {
  render() {
    return(
      <React.Fragment>
      <Router />
      </React.Fragment>
    )
  }
}
