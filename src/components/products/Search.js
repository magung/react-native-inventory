import React, {useState, useRef} from 'react'
import {View, Text, TextInput, Picker} from 'react-native'
import {Icon} from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import _ from 'lodash';

const QueryString = props =>{
  const [search, setSearch] = useState('')
  const delayedSearch = useRef(_.debounce(value => props.search(value), 1000)).current
  return(
    <View style={{height: 50, width: 300, justifyContent: 'center', paddingHorizontal: 5}}>
      <Animatable.View animation='slideInRight' duration={500} style={{height: 40, backgroundColor: 'white', flexDirection: 'row', padding:5,paddingLeft: 15, alignItems:'center', elevation:4, borderRadius:100}}>
        <Icon name={'ios-search'} type='ionicon' color='#007ba4' size={20}/>
        <TextInput
          placeholder='Search ... '
          placeholderTextColor={'#007ba4'}
          style={{fontSize: 20, marginLeft: 15, flex: 1, color: '#007ba4'}}
          value={search}
          onChangeText={value => {
            setSearch(value)
            delayedSearch(value)
          }}
        />
      </Animatable.View>
    </View>
  )

}
export default QueryString
