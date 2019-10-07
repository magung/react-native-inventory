import React, { Component } from 'react';
import Bottom from '../components/Bottom'
import { StyleSheet,ScrollView, Text, View, StatusBar, KeyboardAvoidingView , TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'
import Logo from '../components/Logo';
import Form from '../components/FormSignup';
import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {
  render() {
    return(
      <React.Fragment>
          <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" enabled>
              <Form type="Signup" goLogin={() => this.props.navigation.navigate('Login')}/>
            </KeyboardAvoidingView>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
        </View>
        </View>
        <Bottom />
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#007ba4',
    alignItems:'center',
    justifyContent :'center',
    flex:1,
    paddingTop: '10%'
  },
  signupTextCont : {
    backgroundColor:'#007ba4',
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row',
  },
  signupText: {
    color:'#ffffff',
    fontSize:16
  },
  signupButton: {
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  }
});
