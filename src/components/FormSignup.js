import React, { useState } from 'react';
import Toast from 'react-native-root-toast';
import {Actions} from 'react-native-router-flux';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert , ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import {register} from '../publics/actions/Users';
import * as Animatable from 'react-native-animatable'
import {Icon} from 'react-native-elements'

const Signup = props => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async () => {
    if(!name){
      alert('Please enter your name')
    }else if(!username){
      alert('Please enter your username')
    }else if(!email){
      alert('Please enter your email')
    }else if(!password){
      alert('Please enter your password')
    }else {
      const data = {name, username, email, password}
      await props.dispatch(register(data))
      .then( async res => {
        Alert.alert('Success', 'Success to signup',
        [
          {text: 'OK', onPress: () => props.goLogin()},
        ],
        {cancelable: false},)
      })
      .catch(function (error) {
          console.log(error)
          console.log('Failed Register')
          Toast.show('Failed Register', {
            duration: Toast.durations.LONG,
            position: 0,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,})
      })
    }
  }

  const {isLoading} = props.user
  return(
    <View style={styles.container} behavior="padding" enabled>
      <Icon
        name='user'
        type='evilicon'
        color='#ffffff'
        size={130}
      />
      <Text style={{fontSize: 20, color: '#ffffff', fontWeight: 'bold'}}>CREATE ACCOUNT</Text>
      <View style={{height: 2, backgroundColor: '#ffffff', width: 130, marginVertical: 30}}></View>
        <Animatable.View animation='slideInLeft' duration={1000} >
          <View style={styles.Box}>
            <View style={{marginLeft: 10,marginVertical: 13}}>
              <Icon
                name='ios-person'
                type='ionicon'
                color='#ffffff'
                size={25}
                />
            </View>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Name"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText={text => setName(text)}
              onSubmitEditing={()=> this.username.focus()}
            />
          </View>
        </Animatable.View>
        <Animatable.View animation='slideInRight' duration={1200} >
          <View style={styles.Box}>
            <View style={{marginLeft: 10,marginVertical: 13}}>
              <Icon
                name='ios-person'
                type='ionicon'
                color='#ffffff'
                size={25}
                />
            </View>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Username"
              placeholderTextColor = "#ffffff"
              selectionColor="#fff"
              onChangeText={text => setUsername(text)}
              onSubmitEditing={()=> this.email.focus()}
              ref={(input) => this.username = input}
            />
          </View>
        </Animatable.View>
        <Animatable.View animation='slideInLeft' duration={1400} >
          <View style={styles.Box}>
            <View style={{marginLeft: 10,marginVertical: 13}}>
              <Icon
                name='ios-mail'
                type='ionicon'
                color='#ffffff'
                size={25}
                />
            </View>
          <TextInput style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Email"
            placeholderTextColor = "#ffffff"
            selectionColor="#fff"
            keyboardType="email-address"
            onChangeText={text => setEmail(text)}
            onSubmitEditing={()=> this.password.focus()}
            ref={(input) => this.email = input}
          />
          </View>
        </Animatable.View>
        <Animatable.View animation='slideInRight' duration={1600} >
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
              onChangeText={text => setPassword(text)}
              ref={(input) => this.password = input}
            />
          </View>
        </Animatable.View>
        <Animatable.View animation='slideInLeft' duration={1800} >
          <TouchableOpacity style={styles.button} onPress={handleSubmit} >
          {
            !isLoading ? <Text style={styles.buttonText}>{props.type}</Text> : <ActivityIndicator size="small" color='#007ba4' />
          }
          </TouchableOpacity>
        </Animatable.View>
    </View>
  )
}
const mapStateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Signup)


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  Box : {
    width:300,
    backgroundColor:'#007ba4',
    borderRadius: 25,
    borderWidth: 1,
    borderColor:'#ffffff',
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  inputBox: {
    width:250,
    backgroundColor:'#007ba4',
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
    color:'#007ba4',
    textAlign:'center'
  }

});
