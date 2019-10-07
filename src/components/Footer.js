import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import {Icon } from 'react-native-elements'
import Bottom from './Bottom'
export default class Footer extends Component {
  render(){

      return(
        <React.Fragment>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonHome}  onPress={this.props.goDashboard.bind(this)}>
            <Icon
              name='ios-home'
              type='ionicon'
              color='#ffffff'
              size={35}
              />
            <Text style={styles.Text}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMid} onPress={this.props.goProduct.bind(this)}>
            <Icon
              name='archive'
              type='evilicon'
              color='#ffffff'
              size={45}
              />
              <Text style={styles.Text}>Products</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMid} onPress={this.props.goCategory.bind(this)}>
            <Icon
              name='navicon'
              type='evilicon'
              color='#ffffff'
              size={45}
              />
              <Text style={styles.Text}>Categories</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonProfile} onPress={this.props.goPerson.bind(this)}>
            <Icon
              name='user'
              type='evilicon'
              color='#ffffff'
              size={45}
              />
              <Text style={styles.Text}>Profile</Text>
          </TouchableOpacity>
       </View>
       <Bottom />
       </React.Fragment>
      )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#007ba4',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    height:60,
    paddingVertical: 5
  },
  buttonHome: {
    marginLeft: 5,
    marginRight: 20,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 3
  },
  buttonMid: {
    marginLeft: 25,
    marginRight: 25,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 3
  },
  buttonProfile: {
    marginLeft: 20,
    marginRight: 5,
    flexDirection: 'column',
    alignItems: 'center',
    bottom: 3
  },
  Text : {
    fontSize: 10,
    color: '#ffffff',
    bottom: 4
  }
})
