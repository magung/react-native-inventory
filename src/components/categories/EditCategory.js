import React, {useState, useEffect} from 'react'
import {KeyboardAvoidingView, Text, View, TextInput, StyleSheet, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import {Icon} from 'react-native-elements'
import {getCategoryById, updateCategory, getCategories} from '../../publics/actions/Categories'
import { connect } from 'react-redux'
const EditCategory = props => {
  const [formCategory, setFormCategory] = useState({
    id: '',
    category: ''
  })
  const [jwt, setJwt] = useState('')
  const [itemId, setItemId] = useState('')

  const tokenJwt = async () => {
    const token = await AsyncStorage.getItem('token');
    setJwt(token)
  }

  const getCategoryId = async () => {
    const itemId = props.navigation.getParam('itemId')
    setItemId(itemId)
    await props.dispatch(getCategoryById(itemId))
  }

  useEffect(() => {
    tokenJwt()
    getCategoryId()
  }, [])

  const handleChangeEdit = (name, value) => {
    let newFormData = {...formCategory}
    newFormData[name] = value
    setFormCategory(newFormData)
  }

  const handleSubmit = () =>{
      const headers = {
        'authorization': jwt
      }
       props.dispatch(updateCategory(itemId, formCategory, headers))
        .then( res => {
          Alert.alert('Success', 'Success Edit Category',
          [
            {text: 'OK', onPress: () => props.navigation.navigate('GetCategories')},
          ],
          {cancelable: false},)
        })
        .catch(error => {
          Alert.alert('Failed', 'Failed to edit Category',
          [
            {text: 'OK', onPress: () => props.navigation.navigate('GetCategories')},
          ],
          {cancelable: false},)
        })
    }

    const {id, category} = props.category.categories
    return(
      <React.Fragment>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Text style={styles.logoText}>Edit Category</Text>
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Id category"
        defaultValue={''+id}
        placeholderTextColor = "#51A2DA"
        selectionColor="#fff"
        onChangeText={(number) => handleChangeEdit( 'id', number )}
        onSubmitEditing={()=> this.category.focus()}
        />
        <TextInput style={styles.inputBox}
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="name category"
        defaultValue={category}
        placeholderTextColor = "#51A2DA"
        onChangeText={(text) => handleChangeEdit( 'category', text )}
        ref={(input) => this.category = input}
        />
        <TouchableOpacity type='submit'  onPress={() => handleSubmit()} style={styles.button}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <View style={{marginTop: 22}}>
        <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('GetCategories')
            }}>
            <Icon
              name='ios-close-circle'
              type='ionicon'
              color='#ec5064'
              size={50}
              />
          </TouchableOpacity>
        </View>
      </View>
      </React.Fragment>
    )
}
const mapStateToProps = state => {
    return{
      category: state.category
    }
  }

export default connect(mapStateToProps)(EditCategory);

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
    marginRight: '3%',
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
    marginTop: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
  },

});
