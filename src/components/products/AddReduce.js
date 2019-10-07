import React, { useState } from 'react'
import {Icon } from 'react-native-elements'
import {Modal,SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage} from 'react-native';
const AddReduce = props => {
  const quantity = props.qty
  return(
    <React.Fragment>
    <View style={{flexDirection: 'row', paddingVertical: '2%'}}>
    <TouchableOpacity onPress={() => props.toAdd()} style={styles.buttonAdd}>
      <Icon
        name='ios-add-circle-outline'
        type='ionicon'
        color='#000'
        size={25}
        />
    </TouchableOpacity>
    <View>
    <Text style={{fontSize: 20}}>{quantity}</Text>
    </View>
    <TouchableOpacity onPress={() => props.toReduce()} style={styles.buttonAdd}>
      <Icon
        name='ios-remove-circle-outline'
        type='ionicon'
        color='#000'
        size={25}
        />
    </TouchableOpacity>
    </View>
    </React.Fragment>
  )
}
export default AddReduce

const styles = StyleSheet.create({

  buttonAdd: {
    width:50,
    borderRadius: 100,
  }

})
