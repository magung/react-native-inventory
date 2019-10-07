import React, { useState, useEffect } from 'react';
import {Modal,SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, Text, View, Image, TouchableOpacity, ActivityIndicator, TouchableHighlight, Alert, TextInput, Picker, AsyncStorage, FlatList } from 'react-native';
import {ListItem, Avatar, ButtonGroup, SearchBar, Icon } from 'react-native-elements'
import { NavigationEvents } from 'react-navigation'
import {getProducts, addProduct} from '../../publics/actions/Products'
import { connect } from 'react-redux'
import Card from './Card'
import Footer from '../Footer'
import Search from './Search'
import QueryString from './QueryString'

const GetProducts = (props) => {

  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sort, setSort] = useState('asc')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  // const [totals, setTotals] = useState(0)
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
  useEffect (() => {
    getProduct()
  }, [search, sortBy, sort, limit, page])

    const { isLoading, products, isRejected, total} = props.product

    const numberPage = () => {
        let data = [{label : 'Page' , value: 'none'}];
        const counter =  Math.ceil(total / limit);
        if(parseInt(page) !== 1){
          if(parseInt(page) > counter){
            setPage(1)
          }
        }
        for (let i = 1; i <= counter; i++) {
          const item = {
            label : ''+i,
            value : ''+i
          }
          data.push(item);
        }
        return data
    }
    const pageNum = numberPage()
    return(
      <React.Fragment>
      <NavigationEvents onDidFocus={() => getProduct()}/>
      <View style={styles.searchContainer}>
        <Search search={setSearch} />
        <TouchableOpacity onPress={() => props.navigation.navigate('AddProduct')} style={{backgroundColor: '#fff', borderRadius: 25, elevation: 4, width: 45, height: 45, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            name='plus'
            type='evilicon'
            color='#007ba4'
            size={40}
            />
        </TouchableOpacity>
      </View>
      <View>
      <ScrollView horizontal={true}>
        <QueryString
        sortBy={setSortBy}
        sort={setSort}
        limit={setLimit}
        page={setPage}
        pagination={pageNum}/>
      </ScrollView>
      </View>
        <View style={styles.cardContainer}>

        {
          isRejected ?
          <Text>Data Not Found</Text> :
          (!isLoading && products.length > 0 ) ?
              <FlatList
                columnWrapperStyle={{justifyContent:'center', alignItems:'center'}}
                horizontal={false}
                numColumns={2}
                data={products}
                keyExtractor={({id}, index) => id}
                renderItem={({ item }) =>

                <TouchableOpacity
                  key={item.id}
                  style={styles.card}
                  onPress={() => {
                    props.navigation.navigate('DetailProduct', {
                      itemId: item.id
                    })
                  }}
                >
                  <Card product={item} />
                  </TouchableOpacity>
                }
              />
         : <ActivityIndicator size="large" color="#51A2DA" />
       }
      </View>

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
      product: state.product,
      category: state.category,
    }
  }

export default connect(mapStateToProps)(GetProducts);


const styles = StyleSheet.create({

  card: {
    marginTop: '2%',
    backgroundColor: '#fff',
    borderColor:'#fff',
    marginBottom: '2%',
    marginLeft:'2%',
    marginRight: '2%',
    width: '45%',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent:'center',
    alignItems: 'center',
    elevation: 4,
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
    marginRight: '1%',
    position: 'absolute',
    bottom: '10%',
    right: 0,

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
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
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
