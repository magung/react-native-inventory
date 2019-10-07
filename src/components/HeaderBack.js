import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import {Header} from 'react-native-elements';
import {Actions} from 'react-native-router-flux';

export default class HeaderBack extends Component<{}> {

  goBack() {
    Actions.main()
  }
  render() {
    return(
      <Header
        leftComponent={<TouchableOpacity onPress={this.goBack}><Image  style={{width:50, height: 50}}
        source={require('../../assets/backicon2.png')}/></TouchableOpacity>}
        containerStyle={{
          backgroundColor: '#F2F4F9',
          justifyContent: 'space-around',
        }}
      />
    )
  }
}
