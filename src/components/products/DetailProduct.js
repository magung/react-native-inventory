import React, { useState, useEffect, Fragment } from 'react'
import Footer from '../Footer'
import {getProductById, updateProduct, deleteProduct, addQty, reduceQty} from '../../publics/actions/Products'
import {getCategories} from '../../publics/actions/Categories'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import {Modal, BackHandler, ScrollView, StyleSheet, KeyboardAvoidingView, ImageBackground, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage } from 'react-native';
import {ListItem, Avatar, ButtonGroup, SearchBar, Icon } from 'react-native-elements'
import AddReduce from './AddReduce'

const DetailProduct = props => {
  const [modalVisible, setModalVisible] = useState(false)
  const [formEdit, setFormEdit] = useState({
    name: '',
    description: '',
    image: '',
    quantity: '',
  })
  const [id_category, setCategory] = useState('')
  const [itemId, setItemId] = useState('')
  const getProduct = () => {
    const itemId = props.navigation.getParam('itemId');
    props.dispatch(getProductById(itemId))
  }
  const [jwt, setJwt] = useState('')
  const tokenJwt = async () =>{
    const token = await AsyncStorage.getItem('token');
    setJwt(token)
  }

  useEffect (() => {
    const queryCategory = {
          search: '',
          sortBy: 'category',
          sort: 'asc',
          page: 1,
          limit: 1000,
        }
    const itemId = props.navigation.getParam('itemId');
    tokenJwt()
    setItemId(itemId)
    props.dispatch(getCategories(queryCategory))
    getProduct()
  }, [])

  const handleChange = (name, value) => {
    let newFormData = {...formEdit}
    newFormData[name] = value
    setFormEdit(newFormData)

  }
  const handleSubmit = async () =>{
    const data = {
      name: formEdit.name,
      description: formEdit.description,
      image: formEdit.image,
      category: Number(id_category),
      quantity: parseInt(formEdit.quantity),
    }
    const headers = {
      'authorization': jwt
    }
    await props.dispatch(updateProduct(itemId, data, headers))
        .then( res => {
          getProduct()
          Alert.alert('Success', 'Success to Edit product',
          [
            {text: 'OK', onPress: () => {
              setModalVisible(!modalVisible)
              props.navigation.navigate('DetailProducts')
            }},
          ],
          {cancelable: false},)

        })
        .catch(function (error) {
            console.log(error)
            Alert.alert('Failed', 'Failed to Edit product',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},)

        })
  }
  const toDelete = () => {
    Alert.alert('Warning', 'You want to deleting product ?',
    [
      {text: 'NO', onPress: () => {
        props.navigation.navigate('DetailProducts')
      }},
      {text: 'OK', onPress: () => handleDelete()},
    ],
    {cancelable: false},)
  }

  const handleDelete = () => {
    const headers = {
      'authorization': jwt
    }
    props.dispatch(deleteProduct(itemId, headers))
    Alert.alert('Success', 'Success to deleting product',
    [
      {text: 'OK', onPress: () => {
        props.navigation.navigate('GetProducts')
      }},
    ],
    {cancelable: false},)

  }

  const toAdd = () => {
    Alert.alert('Reduce Quantity Product', 'You want to reduce quantity of product ?',
    [
      {text: 'No', onPress: () =>  props.navigation.navigate('DetailProduct')},
      {text: 'Yes', onPress: () => handleAdd()},
    ],
    {cancelable: false},)
  }

  const handleAdd = () => {
     const itemId = props.navigation.getParam('itemId');
     props.dispatch(addQty(itemId))
      getProduct()
      Alert.alert('Success', 'Success to add quantity of product',
      [
        {text: 'OK', onPress: () =>  props.navigation.navigate('DetailProduct')}
      ],
      {cancelable: false})

  }

  const toReduce = () => {
    Alert.alert('Add Quantity Product', 'You want to add quantity of product ?',
    [
      {text: 'No', onPress: () =>  props.navigation.navigate('DetailProduct')},
      {text: 'Yes', onPress: () => handleReduce()},
    ],
    {cancelable: false})
  }
  const handleReduce = () => {
    const itemId = props.navigation.getParam('itemId');
    props.dispatch(reduceQty(itemId))
    getProduct()
      Alert.alert('Success', 'Success to reduce quantity of product',
      [
        {text: 'OK', onPress: () => props.navigation.navigate('DetailProduct')}
      ],
      {cancelable: false})
  }

    const { navigation } = props;
    const { isLoading } = props.product
    const { id_product, name, description, image, quantity, category} = props.product.products
    const {categories} = props.category

    return(
      <Fragment>
      <ScrollView>
      {/*<NavigationEvents onDidFocus={() => getProduct()}/>*/}

      {
          !isLoading ? (
            <View style={{marginBottom: 150}}>
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <View style={styles.card}>
              <ImageBackground source={require('../../images/defaultImage.png')} style={styles.cardImage2}>
              <Image
                source={{uri: image}}
                style={styles.cardImage}
              />
              </ImageBackground>
                <Text style={{fontSize:20, marginHorizontal: 10, fontWeight: 'bold'}}>{name}</Text>
              </View>
            </View>
            <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
              <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Category</Text>
                <Text style={{fontSize: 16}}>{category}</Text>
              </View>
            </View>
            <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
              <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold'}}>Stock </Text>
                <AddReduce toAdd={() => toAdd()} toReduce={() => toReduce()} qty={quantity}/>
              </View>
            </View>
            <View style={{width:'100%', padding: 10,borderRadius:10, marginBottom: 0, backgroundColor: '#ffff'}}>
              <View style={{elevation: 4, padding: 10, backgroundColor: '#ffff'}}>
                <Text  style={{fontWeight: 'bold', fontSize: 20}}>Description</Text>
                <Text>{description}</Text>
              </View>
            </View>
            </View>
        ): <ActivityIndicator style={{marginTop: 30}} size="large" color="#51A2DA" />
      }
      </ScrollView>
      <View style={{bottom: 0, right: 0, position: 'absolute'}}>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.buttonAdd}>
          <Icon
            name='pencil'
            type='evilicon'
            color='#51A2DA'
            size={40}
            />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toDelete()} style={styles.buttonAdd}>
          <Icon
            name='trash'
            type='evilicon'
            color='#ec5064'
            size={40}
            />
        </TouchableOpacity>
      </View>
      <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Warning','Modal has been closed.',
            [
              {text: 'OK', onPress: () => setModalVisible(!modalVisible)},
            ],
            {cancelable: false})
          }}>

          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
            <Text style={styles.logoText}>Add Product</Text>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Name product"
              defaultValue={name}
              placeholderTextColor = "#51A2DA"
              selectionColor="#fff"
              onChangeText={(text) => handleChange( 'name', text )}
              onSubmitEditing={()=> this.description.focus()}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Description"
              defaultValue={description}
              placeholderTextColor = "#51A2DA"
              onChangeText={(text) => handleChange( 'description', text )}
              onSubmitEditing={()=> this.image.focus()}
              ref={(input) => this.description = input}
            />
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Image url"
              defaultValue={''+image}
              placeholderTextColor = "#51A2DA"
              onChangeText={(text) => handleChange( 'image', text )}
              ref={(input) => this.image = input}
            />
            <View style={styles.border}>
            <Picker
              selectedValue={id_category}
              style={{fontSize:16, color:'#51A2DA', width:280,}}
              onValueChange={(itemValue, itemIndex) =>
                setCategory(itemValue)
              }>

              {
                (!isLoading && categories.length > 0) ?  categories.map((data) => {
                  return <Picker.Item label={data.category} value={data.id} key={data.id} />
                }) : <Picker.Item label='Select category' />
              }
            </Picker>
            </View>
            <TextInput style={styles.inputBox}
              underlineColorAndroid='rgba(0,0,0,0)'
              placeholder="Quantity"
              defaultValue={''+quantity}
              placeholderTextColor = "#51A2DA"
              keyboardType="number-pad"
              onChangeText={(number) => handleChange( 'quantity', number )}
              ref={(input) => this.quantity = input}
            />
            <TouchableOpacity type='submit'  onPress={() =>handleSubmit()} style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
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
                  color='#51A2DA'
                  size={50}
                  />
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

      </Fragment>
    )
}
const mapStateToProps = state => {
    return{
      product: state.product,
      category: state.category
    }
  }
export default connect(mapStateToProps)(DetailProduct);

const styles = StyleSheet.create({

  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginBottom: 10,
    marginLeft:'2%',
    marginRight: '2%',
    width: '80%',
    padding: '2%',
    justifyContent:'center',
    alignItems: 'center',
  },
  logoText : {
    marginVertical: 15,
    fontSize:18,
    color:'#51A2DA'
  },
  cardImage : {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },

  cardImage2 : {
    width: 200,
    height: 200,
    resizeMode: 'cover'
  },
  cardText: {
    padding: '1%',
    fontSize: 10
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
  border:{
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#51A2DA',
    paddingHorizontal:16,
    color:'#51A2DA',
    marginVertical: 10,
  },
  buttonAdd: {
    width:50,
    height: 50,
    borderRadius: 25,
    marginLeft: '3%',
    marginRight: '3%',
    backgroundColor: '#ffff',
    elevation: 5,
    justifyContent: 'center',
    margin: 10
  },
  button: {
    width:300,
    backgroundColor:'#51A2DA',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
})
