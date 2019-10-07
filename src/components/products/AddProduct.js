import React, {useEffect, useState} from 'react'
import {Modal,SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage} from 'react-native';
import {ListItem, Avatar, ButtonGroup, SearchBar, Icon } from 'react-native-elements'
import {getProducts, addProduct} from '../../publics/actions/Products'
import {getCategories} from '../../publics/actions/Categories'
import {connect} from 'react-redux'

const AddPoduct = (props) => {
  const [formAdd, setFormAdd] = useState({
    name: '',
    description: '',
    image: '',
    quantity: 0,
  })
  const [queryCategory, setQueryCategory] = useState({
    search: '',
    sortBy: 'category',
    sort: 'asc',
    page: 1,
    limit: 100,
  })
  const [jwt, setJwt] = useState('')
  const [category, setCategory] = useState('')
  const tokenJwt = async () =>{
    const token = await AsyncStorage.getItem('token');
    setJwt(token)
  }

  useEffect (() => {
    tokenJwt()
    props.dispatch(getCategories(queryCategory))
  }, [])
  const getProduct = async () => {
    const query = {
      search,
      sortBy,
      sort,
      page,
      limit
    }
    await props.dispatch(getProducts(query))
  }
  const handleChange = (name, value) => {
    let newFormData = {...formAdd}
    newFormData[name] = value
    setFormAdd(newFormData)
  }
  const handleSubmit = async () =>{
    const data = {
      name: formAdd.name,
      description: formAdd.description,
      image: formAdd.image,
      category: category,
      quantity: formAdd.quantity,
    }
    const headers = {
      'authorization': jwt
    }
    await props.dispatch(addProduct(data, headers))
      .then( res => {
        getProduct()
        Alert.alert('Success', 'Success to add product',
        [
          {text: 'OK', onPress: () => props.navigation.navigate('GetProducts')},
        ],
        {cancelable: false},)
      })
      .catch(function (error) {
          console.log(error)
          Alert.alert('Failed', 'Failed to add product',
          [
            {text: 'OK', onPress: () => props.navigation.navigate('AddProducts')},
          ],
          {cancelable: false},)

      })
  }
    const {categories} = props.category
  return(
    <React.Fragment>
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <Text style={styles.logoText}>Add Product</Text>
      <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Name product"
        placeholderTextColor = "#51A2DA"
        selectionColor="#fff"
        onChangeText={(text) => handleChange( 'name', text )}
        onSubmitEditing={()=> this.description.focus()}
      />
      <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Description"
        placeholderTextColor = "#51A2DA"
        onChangeText={(text) => handleChange( 'description', text )}
        onSubmitEditing={()=> this.image.focus()}
        ref={(input) => this.description = input}
      />
      <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Image url"
        placeholderTextColor = "#51A2DA"
        onChangeText={(text) => handleChange( 'image', text )}
        onSubmitEditing={()=> this.category.focus()}
        ref={(input) => this.image = input}
      />
      <View style={styles.border}>
      <Picker
        selectedValue={category}
        style={{fontSize:16, color:'#51A2DA', width:280,}}
        onValueChange={(itemValue, itemIndex) =>
          setCategory(itemValue)
        }>
        <Picker.Item label='Select category' />
        {
          categories.map((data) => {
            return <Picker.Item label={data.category} value={data.id} key={data.id} />
          })
        }
      </Picker>
      </View>
      <TextInput style={styles.inputBox}
      underlineColorAndroid='rgba(0,0,0,0)'
      placeholder="Quantity"
      placeholderTextColor = "#51A2DA"
      keyboardType="number-pad"
      onChangeText={(number) => handleChange( 'quantity', number )}
      ref={(input) => this.quantity = input}
      />
      <TouchableOpacity type='submit'  onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    <View style={{marginTop: 22}}>
      <View>
        <TouchableHighlight
          onPress={() => {
            props.navigation.navigate('GetProducts');
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
    </React.Fragment>
  )
}
const mapStateToProps = state => {
    return{
      product: state.product,
      category: state.category
    }
  }

export default connect(mapStateToProps)(AddPoduct);



const styles = StyleSheet.create({

  card: {
    marginTop: '2%',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginBottom: '2%',
    marginLeft:'2%',
    marginRight: '2%',
    width: '45%',
    borderWidth: 1,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 3
    },
    justifyContent:'center',
    alignItems: 'center',
    elevation: 1
  },
  container : {
    flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'
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
    marginRight: '3%',
    position: 'absolute',
    bottom: 50,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  searchContainer : {
    paddingTop: 5,
  },

});
