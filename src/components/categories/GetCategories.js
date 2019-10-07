import React, { useState, useEffect } from 'react';
import {Modal, ScrollView, StyleSheet,KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, AsyncStorage, FlatList } from 'react-native';
import Axios from 'axios';
import {ListItem, Avatar, ButtonGroup, SearchBar, Icon } from 'react-native-elements'
import {getCategories, addCategory, deleteCategory} from '../../publics/actions/Categories'
import { connect } from 'react-redux'
import Card from './Card'
import Footer from '../Footer'
import Toast from 'react-native-root-toast';
import { NavigationEvents } from 'react-navigation'
import Search from './Search'
import QueryString from './QueryString'

const GetCategories = props =>{
  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState('')
  // const [sortBy, setSortBy] = useState('')
  // const [sort, setSort] = useState('asc')
  // const [page, setPage] = useState(1)
  // const [limit, setLimit] = useState(6)
  const [id, setId] = useState('')
  const [category, setCategory] = useState('')
  const getCategory = () => {
    const query = {
      search,
      // sortBy,
      // sort,
      // page,
      // limit
    }
    props.dispatch(getCategories(query))
  }
  const [jwt, setJwt] = useState('')
  const tokenJwt = async () =>{
    const token = await AsyncStorage.getItem('token');
    setJwt(token)
  }

  // useEffect (() => {
  //   tokenJwt()
  //   getCategory()
  // }, [search, sortBy,  sort, page, limit])

  useEffect (() => {
    tokenJwt()
    getCategory()
  }, [search])


  const handleSubmit = async () =>{
    if(!id){
      alert('please enter ID category')
    }else if (!category){
      alert('please enter name category')
    }else{
      const headers = {
        'authorization':jwt
      }
      const data = { id, category }
      await props.dispatch(addCategory(data, headers))
          .then( res => {
            getCategory()
            Alert.alert('Success', 'Success Add Category',
            [
              {text: 'OK', onPress: () => {
                setModalVisible(!modalVisible)
              }},
            ],
            {cancelable: false},)
          })
          .catch(function (error) {
            Alert.alert('Failed', 'Failed Add Category',
            [
              {text: 'OK', onPress: () => {
                setModalVisible(!modalVisible)
              }},
            ],
            {cancelable: false},)
          })
    }

  }
  const toDelete = (id) => {
    Alert.alert('Warning', 'You want to deleting product ?',
    [
      {text: 'NO', onPress: () => {
        props.navigation.navigate('GetCategories')
      }},
      {text: 'OK', onPress: () => handleDelete(id)},
    ],
    {cancelable: false},)
  }

  const handleDelete = async (id) => {
    const headers = {
      'authorization': jwt
    }
    await props.dispatch(deleteCategory(id, headers))
    .then(res => {
      Alert.alert('Success', 'Success to delete',
      [
        {text: 'OK', onPress: () =>{

         }},
      ],
      {cancelable: false},)
      props.navigation.navigate('GetCategories')
      getCategory()
    })
    .catch(function (error) {
      Alert.alert('Failed', 'Failed Delete Category',
      [
        {text: 'OK', onPress: () => {
        }},
      ],
      {cancelable: false},)
    })

  }

  const { isLoading, categories, isRejected, total} = props.category
  // const numberPage = () => {
  //     let data = [{label : 'Page' , value: 'none'}];
  //     const counter =  Math.ceil(total / limit);
  //     if(parseInt(page) !== 1){
  //       if(parseInt(page) > counter){
  //         setPage(1)
  //       }
  //     }
  //     for (let i = 1; i <= counter; i++) {
  //       const item = {
  //         label : ''+i,
  //         value : ''+i
  //       }
  //       data.push(item);
  //     }
  //     return data
  //     console.log(data)
  // }
  // const pageNum = numberPage()

  return(
    <React.Fragment>
    <NavigationEvents onDidFocus={() => useEffect()}/>
    <View style={styles.searchContainer}>
      <Search search={setSearch} />
      <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{backgroundColor: '#fff', borderRadius: 25, elevation: 4, width: 45, height: 45, alignItems: 'center', justifyContent: 'center'}}>
        <Icon
          name='plus'
          type='evilicon'
          color='#007ba4'
          size={45}
          />
      </TouchableOpacity>
    </View>
    <View style={{marginTop:5}}>
    {/*<ScrollView horizontal={true}>
      <QueryString
      sortBy={setSortBy}
      sort={setSort}
      limit={setLimit}
      page={setPage}
      pagination={pageNum}/>
    </ScrollView>*/}
    </View>


    <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}>

        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Text style={styles.logoText}>Add Category</Text>
          <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Id category"
          placeholderTextColor = "#51A2DA"
          selectionColor="#fff"
          keyboardType="number-pad"
          onChangeText={(number) => setId(number)}
          onSubmitEditing={()=> this.category.focus()}
          />
          <TextInput style={styles.inputBox}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="name category"
          placeholderTextColor = "#51A2DA"
          onChangeText={(text) => setCategory(text)}
          ref={(input) => this.category = input}
          />
          <TouchableOpacity type='submit'  onPress={() => handleSubmit()} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

        <View style={{marginTop: 22}}>
          <View>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Icon
                name='ios-close-circle'
                type='ionicon'
                color='#ec5064'
                size={50}
                />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>



    <ScrollView >
    <View style={styles.cardContainer}>
    {
      isRejected ?
      <Text>Data Not Found</Text>
      :
      (!isLoading && categories.length > 0) ?
      <FlatList
        data={categories}
        keyExtractor={({id}, index) => id}
        renderItem={({ item }) =>
          <View key={item.id} style={{flexDirection: 'row', paddingHorizontal: '3%', justifyContent: 'center', alignItems: 'center' }}>
          <Card category={item} />

          <TouchableOpacity
          style={{backgroundColor: '#fff', borderRadius: 30, elevation: 4, width: 55, height: 55, marginHorizontal: 2, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => {
            props.navigation.navigate('EditCategory', {
              itemId: item.id
            })
          }
          }>
          <Icon
            iconStyle={{marginLeft: 3}}
            name='pencil'
            type='evilicon'
            color='#ffc809'
            size={50}
            />
          </TouchableOpacity>

          <TouchableOpacity
          style={{backgroundColor: '#fff', borderRadius: 30, elevation: 4, width: 55, height: 55, marginHorizontal: 2, alignItems: 'center', justifyContent: 'center'}}
          onPress={() => toDelete(item.id)}>
          <Icon
            iconStyle={{marginLeft: 3}}
            name='trash'
            type='evilicon'
            color='#ec5064'
            size={50}
            />
          </TouchableOpacity>
          </View>

      } /> :  <ActivityIndicator size="large" color="#51A2DA" />
    }
    </View>
    </ScrollView>
    <Footer
    goDashboard={() => props.navigation.navigate('HomePage')}
    goProduct={() => props.navigation.navigate('GetProducts')}
    goCategory={() => props.navigation.navigate('GetCategories')}
    goPerson={() => props.navigation.navigate('Person')}
    />
    </React.Fragment>
  )
}
const mapStateToProps = state => {
    return{
      category: state.category
    }
  }
export default connect(mapStateToProps)(GetCategories);


const styles = StyleSheet.create({
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },

  inputBox: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    fontSize:16,
    color:'#51A2DA',
    marginVertical: 10,
    paddingVertical: 13
  },

  button: {
    width:300,
    backgroundColor:'#51A2DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonAdd: {
    width:50,
    borderRadius: 100,
    paddingVertical: 13,
    marginLeft: '3%',
    marginRight: '1%',
    position: 'absolute',
    bottom: '10%',
    right: 0
  },

  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  buttonTextAdd: {
    fontSize:25,
    fontWeight:'bold',
    color:'#ffffff',
    textAlign:'center'
  },

  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'#51A2DA'
  },
  cardContainer : {
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexGrow: 2,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchContainer : {
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

});
