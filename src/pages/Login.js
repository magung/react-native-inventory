import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar , TouchableOpacity, Image , AsyncStorage, BackHandler} from 'react-native';
import Bottom from '../components/Bottom'
import Logo from '../components/Logo'
import Form from '../components/FormLogin';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      jwt:''
    }
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }


  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token')
    this.setState({jwt:token})
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Main');
    return true;
  }

  render() {
    return(
      <React.Fragment>

      <View style={styles.container}>
        <Logo />
        <Form type="Login"  goHome={() => this.props.navigation.navigate('App')}/>
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Dont have an account yet?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}><Text style={styles.signupButton}> Signup</Text></TouchableOpacity>
        </View>
      </View>
      <Bottom />
      </React.Fragment>
      )
    }
  }



const styles = StyleSheet.create({
  container : {
    backgroundColor:'rgba(70, 181, 190, 255)',
    flex: 1,
    alignItems:'center',
    justifyContent :'center',
    height:700
  },

  signupTextCont : {
    flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'
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
