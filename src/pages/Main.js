import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar , TouchableOpacity , Image} from 'react-native';
import * as Animatable from 'react-native-animatable'
import {Actions} from 'react-native-router-flux';
import Bottom from '../components/Bottom'
export default class Main extends Component {

  render() {
    return(
      <React.Fragment>
      <View style={styles.container}>
        <Animatable.View animation='slideInRight' duration={1800} >
        <View style={{width: 320, height: 320, backgroundColor: '#ffff', borderRadius: 160, alignItems: 'center', justifyContent: 'center', elevation: 4}}>
        <Image  style={{width:250, height: 250}}
        source={require('../images/logoinv.png')}/>
        </View>
        </Animatable.View>
        <Animatable.View animation='slideInLeft' duration={1800} >
        <TouchableOpacity onPress={() => this.props.navigation.navigate('LoadingScreen')} style={styles.button}>
        <Text style={styles.buttonText}>Go to Inventory App</Text>
        </TouchableOpacity>
        </Animatable.View>
      </View>
      </React.Fragment>
      )
    }
  }



const styles = StyleSheet.create({
  container : {
    backgroundColor:'#F2F4F9',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  logoText : {
    marginVertical: 15,
    fontSize:35,
    color:'#51A2DA',
    fontWeight: 'bold'
  },
  button: {
    width:250,
    backgroundColor:'#ffff',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
    elevation: 4
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#51A2DA',
    textAlign:'center'
  }

});
