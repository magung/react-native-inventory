const initState = {
    products:[],
    total:[],
    // page:undefined,
    errMessage:'',
    message:'',
    isLoading:false,
    isRejected:false,
    isFulfilled:false,
    isRedirected:false
  }
  const product = (state = initState, action)=>{
    switch(action.type){
      case 'GET_PRODUCTS_PENDING':
      case 'ADD_PRODUCT_PENDING':
      case 'GET_PRODUCT_BY_ID_PENDING':
      case 'UPDATE_PRODUCT_PENDING':
      case 'DELETE_PRODUCT_PENDING':
      case 'ADD_QTY_PRODUCT_PENDING':
      case 'REDUCE_QTY_PRODUCT_PENDING':
        return{
          ...state,
          //total:0,
          isLoading:true,
          isRejected:false,
          isFulfilled:false,
          isRedirected: false
        }
      case 'GET_PRODUCTS_REJECTED':
      case 'ADD_PRODUCT_REJECTED':
      case 'GET_PRODUCT_BY_ID_REJECTED':
      case 'UPDATE_PRODUCT_REJECTED':
      case 'ADD_QTY_PRODUCT_REJECTED':
      case 'REDUCE_QTY_PRODUCT_REJECTED':
        return{
          ...state,
          isLoading:false,
          isRejected:true,
          errMessage:action.payload.response ? action.payload.response.data.message : action.payload.message
        }
        case 'GET_PRODUCT_BY_ID_FULFILLED':
          return{
            ...state,
            products:action.payload.data.data[0],
            isLoading:false,
            isFulfilled:true,
          }
      case 'GET_PRODUCTS_FULFILLED':
        return{
          ...state,
          products:action.payload.data.data,
          total: action.payload.data.total,
          isLoading:false,
          isFulfilled:true,
        }
      case 'ADD_PRODUCT_FULFILLED':
          state.products.unshift(action.payload.data.data)
          return{
              ...state,
              isLoading:false,
              isFulfilled:true
          }

        case 'ADD_QTY_PRODUCT_FULFILLED':
        case 'REDUCE_QTY_PRODUCT_FULFILLED':
            const newProductData = action.payload.data.data[0]
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                products: state.products.map((product) => {
                    return product.id_product === newProductData.id_product ? newProductData : product
                })
            }
        case 'DELETE_PRODUCT_REJECTED':
            return{
              ...state,
              isLoading:false,
              isRejected:true,
              errMessage:action.payload.response.data.message
            }
        case 'DELETE_PRODUCT_FULFILLED':
            return{
                ...state,
                isLoading:false,
                isFulfilled:true,
                products: state.products.filter((product) => {
                    return product.id_product !== action.payload.data.data.id_product
                })
                }
        case 'SEND_Query':
          return {
            ...state,
            query: action.payload
          }
        case 'UPDATE_PRODUCT_FULFILLED':
          return{
            ...state,
            isLoading: false,
            isFulfilled: true,
            isRedirected:true
          }
      default:
        return state
    }
  }
  export default product
