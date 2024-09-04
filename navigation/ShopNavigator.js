import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import ProductsOverViewScreen from '../screens/Shop/ProductsOverViewScreen';
import ProductDetailScreen from '../screens/Shop/ProductDetailScreen';
import {Platform} from 'react-native'
import Colors from '../constants/Colors'
import CartScreen from '../screens/Shop/CartScreen';
import OrdersScreen from '../screens/Shop/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../screens/User/UserProductScreen';
import EditProductScreen from '../screens/User/EditProductScreen';
import AuthScreen from '../screens/User/AuthScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigator(){
    return <Drawer.Navigator
    screenOptions={{
        headerStyle:{backgroundColor:Colors.primary},
        headerTintColor:"white",
        sceneContainerStyle:{backgroundColor:"white"},
        drawerContentStyle:{backgroundColor:"white"},
        drawerInactiveTintColor:Colors.primary,
        drawerActiveTintColor:"white",
        drawerActiveBackgroundColor:Colors.primary,
    }}
    >
        <Drawer.Screen 
        name="Products" 
        component={ProductsOverViewScreen}
        options={{
            drawerIcon:({color,size}) => <Ionicons name='md-cart' color={color} size={size}/>,
            headerTitle:"All Products",
            headerTitleAlign:"center"
          }}
        />
        <Drawer.Screen 
        name="Orders" 
        component={OrdersScreen}
         options={{
            drawerIcon:({color,size}) => <Ionicons name='md-list' color={color} size={size}/>,
            headerTitle:"Your Orders",
            headerTitleAlign:"center"
          }}/>
                  <Drawer.Screen 
        name="Admin" 
        component={UserProductScreen}
         options={{
            drawerIcon:({color,size}) => <Ionicons name='md-create' color={color} size={size}/>,
            headerTitle:"Yours Products",
            headerTitleAlign:"center",
          }}/>
    </Drawer.Navigator>   
}

function ProductsNavigator(){
    return  <NavigationContainer>

    <Stack.Navigator screenOptions={{
            headerStyle:{backgroundColor:Platform.OS === 'android' ? Colors.primary :''},
            headerTintColor:Platform.OS === 'android' ? "white":"",
    }}
    >
        {false ? <Stack.Screen name="Auth Screen" component={AuthScreen}
        />:
        <>
                <Stack.Screen name="All Product" component={DrawerNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen}/>
        <Stack.Screen name='CartScreen' component={CartScreen}/>
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </>
        }

    </Stack.Navigator>
    </NavigationContainer>
}


export default ProductsNavigator