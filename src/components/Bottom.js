import React, { Component } from 'react';
import {StyleSheet, View } from 'react-native';

export default class Bottom extends Component {
  render(){

      return(
        <View style={styles.container}>
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#00627b',
    height:5,
    paddingVertical: 5
  },
})
