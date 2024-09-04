import React from 'react'
import {View,Text,StyleSheet, Pressable, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

const CartItem = props =>{

    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.quantity} {' '}</Text> 
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>$ {props.amount}</Text>
                <Pressable onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS === 'android' ? 'md-trash':'ios-trash'}
                    size={23}
                    color="red"/>
                </Pressable>
            </View>
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    cartItem:{
        padding:10,
        backgroundColor:"white",
        flexDirection:"row",
        justifyContent:"space-between",
        marginHorizontal:20
    },
    itemData:{
        flexDirection:"row",
        alignItems:"center"
    },
    quantity:{
        fontSize:16,
        color:"#888"
    },
    title:{
        fontSize:16
    },
    amount:{
        fontSize:16
    },
    deleteButton:{
        marginLeft:16
    }
})