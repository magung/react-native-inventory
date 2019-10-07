// import React, {useState, useEffect} from 'react'
// import {View, Text, TextInput, Picker, StyleSheet} from 'react-native'
// import {Icon} from 'react-native-elements'
// const QueryString = props =>{
//   const [sortBy, setSortBy] = useState('')
//   const [sort, setSort] = useState('asc')
//   const [limit, setLimit] = useState(6)
//   const [page, setPage] = useState(1)
//
//
//   return(
//     <View style={{height: 50, justifyContent: 'center', paddingHorizontal: 8, marginTop:5, flexDirection: 'row'}}>
//       <View style={styles.container}>
//         <Picker
//           selectedValue={sortBy}
//           itemStyle={{fontSize:11, marginBottom: 0}}
//           style={{ color:'#51A2DA', width:150}}
//           onValueChange={(itemValue, itemIndex) =>{
//               setSortBy(itemValue)
//               props.sortBy(sortBy)
//           }}>
//           <Picker.Item label='Sort By' value='name' />
//           <Picker.Item label='Id' value='id' />
//           <Picker.Item label='Name' value='name' />
//         </Picker>
//       </View>
//       <View style={styles.container}>
//         <Picker
//           selectedValue={sort}
//           itemStyle={{fontSize:12}}
//           style={{ color:'#51A2DA', width:150,}}
//           onValueChange={(itemValue, itemIndex) =>{
//               setSort(itemValue)
//               props.sort(sort)
//           }}>
//           <Picker.Item label='Ascending' value='asc' />
//           <Picker.Item label='Descending' value='desc' />
//         </Picker>
//       </View>
//       <View style={styles.container}>
//         <Picker
//           selectedValue={limit}
//           itemStyle={{fontSize:12}}
//           style={{ color:'#51A2DA', width:150,}}
//           onValueChange={(itemValue, itemIndex) =>{
//               setLimit(itemValue)
//               props.limit(limit)
//           }}>
//           <Picker.Item label='Limit' value='6' />
//           <Picker.Item label='2' value='2' />
//           <Picker.Item label='4' value='4' />
//           <Picker.Item label='6' value='6' />
//           <Picker.Item label='8' value='8' />
//           <Picker.Item label='10' value='10' />
//           <Picker.Item label='12' value='12' />
//         </Picker>
//       </View>
//       <View style={styles.container}>
//         <Picker
//           selectedValue={page}
//           itemStyle={{fontSize:12}}
//           style={{ color:'#51A2DA', width:150,}}
//           onValueChange={(itemValue, itemIndex) =>{
//               setPage(itemValue)
//               props.page(page)
//           }}>
//           { props.pagination.length > 0 ?
//             props.pagination.map(num =>{
//               return <Picker.Item label={num.label} value={num.value} key={parseInt(num.value)}/>
//             }) : null
//           }
//         </Picker>
//       </View>
//     </View>
//   )
//
// }
//
//
// export default QueryString
//
// const styles = StyleSheet.create({
//
//   container : {
//      elevation:4, borderRadius:100,width: 150, height: 40, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, marginHorizontal: 2
//   }
// })
