import {combineReducers} from 'redux'

import user from './Users'
import product from './Products'
import category from './Categories'

const appReducer = combineReducers({
  user,
  product,
  category
})

// const rootReducer = (state, action) => {
//   if (action.type === 'USER_LOGOUT') {
//     state = undefined
//   }
//   return appReducer(state, action)
// }

export default appReducer
