import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Text, View, ImageBackground } from 'react-native';

const Card = props => {
  const [image, setImage] =  useState(props.product.image)

    const { id_product, name, quantity } = props.product
    return(
        <React.Fragment>
          <ImageBackground source={require('../../images/defaultImage.png')} style={styles.cardImage}>
            <Image style={styles.cardImage} source={{uri : ''+image}}/>
          </ImageBackground>
            <Text style={styles.cardText}>{name.length > 20 ? name.substr(0,30)+'...' : name}</Text>
            <Text style={styles.Text}> stock : {quantity}</Text>
        </React.Fragment>

    )

}
export default Card
const styles = StyleSheet.create({

  cardImage : {
    width: 150,
    height:150,
    resizeMode: 'cover'
  },
  cardText: {
    padding: '1%',
    fontSize: 14,
    fontWeight: 'bold'
  },
  Text: {
    paddingTop: '1%',
    paddingBottom: '3%',
    fontSize: 10,
    color: '#d2d3d5'
  }
})
