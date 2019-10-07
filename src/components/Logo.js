import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import * as Animatable from 'react-native-animatable'
export default class Logo extends Component<{}> {

  render(){
    return(
      <View style={styles.container}>
      <View style={{width: 160, height: 160, backgroundColor: '#ffff', borderRadius: 160, alignItems: 'center', justifyContent: 'center', elevation: 4}}>
        <Animatable.View animation='slideInRight' duration={1800} >
        <Image  style={{width:150, height: 150}}
        source={require('../images/logoinv.png')}/>
        </Animatable.View>
      </View>
        <Animatable.View animation='slideInLeft' duration={1800} >
        <Text style={styles.logoText}>Welcome to Computer Inventory</Text>
        </Animatable.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:20,
    color:'#ffffff'
  }

});
