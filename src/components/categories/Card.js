import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View } from 'react-native';
import {Icon} from 'react-native-elements'
export default class Card extends Component {
  render(){

    const { category } = this.props.category
    return(
        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardText}>{category}</Text>
        </TouchableOpacity>

    )
  }
}

const styles = StyleSheet.create({

  card: {
    marginTop: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginLeft:'2%',
    marginRight: '2%',
    width: '60%',
    borderRadius: 20,
    elevation: 3,
    flexDirection: 'row',
    paddingVertical: '3%',
    paddingHorizontal: '3%'
  },
  cardText: {
    padding: '1%',
    fontSize: 20,
    marginLeft: 10
  }
})
