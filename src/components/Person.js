import Logo from './Logo';
import React, { Component } from 'react';
import {ButtonGroup } from 'react-native-elements';
import {ScrollView, StyleSheet, Text, View, FlatList,Button, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Footer from './Footer'
import {getProfile} from '../publics/actions/Users'
import { connect } from 'react-redux'
class Person extends Component {
  state = {
    username: ''
  }
  removeItem = async () => {
     await AsyncStorage.removeItem('token')
     this.props.navigation.navigate('Login',{
       onGoBack: () =>  this.props.navigation.navigate('Main')
     })
  }
  componentDidMount = async() => {
    const token = await AsyncStorage.getItem('token');
    const headers = {
      'authorization': token
    }

    await this.props.dispatch(getProfile(headers))
    .then(res => {
      console.log(res)
      this.setState({
      username : res.value.data.data.username
      })
    })

      }
  render() {
    return(
      <React.Fragment>
      <View style={styles.container}>
        <Image  style={{width:250, height: 250, bottom:'30%'}}
        source={{uri : 'https://pngimage.net/wp-content/uploads/2018/05/button-profile-png-8.png'}}/>
        <Text style={styles.logoText}>Hello {this.state.username}</Text>

      <TouchableOpacity onPress={this.removeItem} style={styles.button} >
      <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      </View>
      <Footer
      goDashboard={() => this.props.navigation.navigate('HomePage')}
      goProduct={() => this.props.navigation.navigate('GetProducts')}
      goCategory={() => this.props.navigation.navigate('GetCategories')}
      goPerson={() => this.props.navigation.navigate('Person')}
      />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
    return{
        user: state.user
    }
}
export default connect(mapStateToProps)(Person)
const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:20,
    color:'#51A2DA'
  },
  button: {
    width:160,
    backgroundColor:'#ec5064',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }

});
