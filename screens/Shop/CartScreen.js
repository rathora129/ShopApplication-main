import React, { useState } from 'react'
import {View,Text,FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native'
import Colors from '../../constants/Colors'
import { useSelector,useDispatch } from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/orders'
import Card from '../../components/UI/Card'

const CartScreen = props =>{

    const [isLoading,setIsLoading] = useState(false)


    const cartTotalAmount = useSelector(state => state?.cart.totalAmount)
    const cartItems = useSelector(state =>{
        const transformedCartItems =[]
        for(const key in state?.cart?.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum
            })
        }
        return transformedCartItems.sort((a,b)=>a.productId>b.productId ? 1 : -1)
    })

    const dispatch = useDispatch()

    const sendOrderHandler =async ()=>{
        setIsLoading(true)
        await dispatch(orderActions.addOrder(cartItems,cartTotalAmount))
        setIsLoading(false)
    } 

    return (
        
        <View style={styles.screen}>

            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                Total: <Text style={styles.amount}>${cartTotalAmount.toFixed(2)}</Text>
                </Text>
                {isLoading
                 ? 
                <ActivityIndicator size="small" color={Colors.primary}/>:
                <Button 
                onPress={sendOrderHandler}
                color={Colors.accent} 
                title='Order Now' 
                disabled={cartItems.length===0}/> 
                }
                </Card>
            <FlatList
            data={cartItems}
            renderItem={itemData => 
            <CartItem 
            quantity={itemData.item.quantity} 
            title={itemData.item.productTitle} 
            amount={itemData.item.sum} 
            onRemove={()=>dispatch(cartActions.removeFromCart(itemData.item.productId))}/>}
            />
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    screen:{
        margin:20
    },
    summary:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20,
        padding:10,


    },
    summaryText:{
        fontSize:18
    },
    amount:{
        color:Colors.primary
    }
})