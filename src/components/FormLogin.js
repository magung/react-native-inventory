import React, { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import Axios from 'axios';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import {Icon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux';
import {login} from '../publics/actions/Users';
import * as Animatable from 'react-native-animatable'

const Login = props => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const handleSubmit = async () => {
    if(!email){
      alert('Please enter your email')
    } else if(!password){
      alert('Please password your password')
    } else {
      const data = {
        email,
        password
      }
      await props.dispatch(login(data))
          .then(async res => {
                setLoggedIn(true)
                Alert.alert('Success', 'Success to login',
                [
                  {text: 'OK', onPress: () => props.goHome()},
                ],
                {cancelable: false},)
                await AsyncStorage.setItem('token', res.action.payload.data.token);
          })
          .catch(function (error) {
              Alert.alert('Failed Login', 'Email or Password is wrong!',
              [
                {text: 'OK'},
              ],
              {cancelable: false},)
          })
    }
  }

  const {isLoading} = props.user
  return(
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Animatable.View animation='slideInRight' duration={1000} >
      <View style={styles.Box}>
      <View style={{marginLeft: 10,marginVertical: 13}}>
        <Icon
          name='ios-mail'
          type='ionicon'
          color='#ffffff'
          size={25}
          />
      </View>
      <TextInput
        style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Email"
        placeholderTextColor = "#ffffff"
        selectionColor="#fff"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={()=> this.password.focus()}
      />
      </View>
      </Animatable.View>
      <Animatable.View animation='slideInLeft' duration={1000} >
      <View style={styles.Box}>
        <View style={{marginLeft: 10,marginVertical: 13}}>
          <Icon
            name='ios-lock'
            type='ionicon'
            color='#ffffff'
            size={25}
            />
        </View>
      <TextInput style={styles.inputBox}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Password"
      secureTextEntry={true}
      placeholderTextColor = "#ffffff"
      onChangeText={(text) => setPassword(text)}
      ref={(input) => this.password = input}
      />
      </View>
      </Animatable.View>
      <Animatable.View animation='slideInRight' duration={1000} >
      <TouchableOpacity type='submit'  onPress={handleSubmit} style={styles.button}>
        {
          !isLoading ? <Text style={styles.buttonText}>{props.type}</Text> :   <ActivityIndicator size="small" color='rgba(70, 181, 190, 255)' />
        }
      </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  )

}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Login)


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  Box : {
    width:300,
    backgroundColor:'rgba(70, 181, 190, 255)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor:'#ffffff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  inputBox: {
    width:250,
    backgroundColor:'rgba(70, 181, 190, 255)',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#ffffff',
    paddingVertical: 13,
  },

  button: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'rgba(70, 181, 190, 255)',
    textAlign:'center'
  }

});
