import {createStore,combineReducers,applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import productReducer from './store/reducers/products'
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders'
import ProductsNavigator from './navigation/ShopNavigator';
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk'

const rootReducer = combineReducers({
  products:productReducer,
  cart:cartReducer,
  orders:orderReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk))

// const fetchFonts = () =>{
//   require('./assets/fonts/')
//   return Font.loadAsync({
//     'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
//     'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
//   })
// }

export default function App() {
  return (
      <Provider store={store}>
        <ProductsNavigator/>
      </Provider>
  );
}

