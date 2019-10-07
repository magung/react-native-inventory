import Logo from './Logo';
import React, { Component } from 'react';
import {ButtonGroup } from 'react-native-elements';
import {ScrollView, StyleSheet, Text, View, FlatList,Button, Image, TouchableOpacity, AsyncStorage,  BackHandler } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Footer from './Footer'

export default class HomePage extends Component {
  // constructor(props){
  //   super(props)
  //   this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  // }


  // componentDidMount = async () => {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }
  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  // }

  // handleBackButtonClick() {

  //   this.props.navigation.navigate('HomePage');
  //   return true;
  // }

  render() {
     const { navigation } = this.props;
    return(
      <React.Fragment>
      <View style={styles.container}>
        <View style={{width: 210, height: 210, backgroundColor: '#ffff', borderRadius: 160, alignItems: 'center', justifyContent: 'center', elevation: 4}}>
          <Image  style={{width:200, height: 200}}
          source={require('../images/logoinv.png')}/>
        </View>
        <Text style={styles.logoText}>Welcome to Computer Inventory</Text>
      </View>
      <Footer
      goDashboard={() => this.props.navigation.navigate('HomePage')}
      goProduct={() => this.props.navigation.navigate('GetProducts')}
      goCategory={() => this.props.navigation.navigate('GetCategories')}
      goPerson={() => this.props.navigation.navigate('Person')}
      />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'rgba(70, 181, 190, 255)',
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center',
    paddingVertical: '20%'
  },

  logoText : {
    marginVertical: 15,
    fontSize:20,
    color:'#ffffff',
    fontWeight: 'bold'
  }

});
