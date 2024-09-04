import React,{useLayoutEffect,useEffect,useState} from 'react'
import {FlatList,ActivityIndicator,View} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import OrderItem from '../../components/shop/OrderItem'
import Colors from '../../constants/Colors'
import * as ordersAction from '../../store/actions/orders'

const OrdersScreen = props =>{

    const [isLoading,setIsLoading] = useState(false)
    const orders = useSelector(state=>state.orders.orders)
    const dispatch = useDispatch()

    useEffect(()=>{
        setIsLoading(true)
        dispatch(ordersAction.fetchOrders()).then(()=>setIsLoading(false))
    },[dispatch])


//     useLayoutEffect(()=>{
//         props.navigation.setOptions({
//             title:"Your Orders",
//         })
//     },[props.navigation])
    
    if(isLoading){
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color={Colors.primary}/></View>
    }

    return <FlatList
            data={orders}
            renderItem={itemData => <OrderItem 
                amount={itemData.item.totalAmount} 
                date={itemData.item.readableDate}
                item={itemData.item.items}
                />}
        />
}

export default OrdersScreen