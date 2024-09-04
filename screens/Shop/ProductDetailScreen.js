import React, { useLayoutEffect } from 'react'
import {ScrollView,Text,View,Image,Button,StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import {useSelector,useDispatch} from 'react-redux'
import * as cartActions from '../../store/actions/cart'

const ProductDetailScreen = props =>{
    const productId = props.route.params.productId
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))
    const dispatch = useDispatch()
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            title:selectedProduct.title
        })
    },[props.navigation,productId])

    
return <ScrollView>
        <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
        <View style={styles.actions}>
        <Button color={Colors.primary} title='Add to Cart' onPress={()=>dispatch(cartActions.addToCart(selectedProduct))}/>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
</ScrollView>
}

export default ProductDetailScreen

const styles = StyleSheet.create({
    image:{
        width:"100%",
        height:300
    },
    price:{
        fontSize:20,
        color:"#888",
        textAlign:"center",
        marginVertical:20
    },
    description:{
        textAlign:"center",
        fontSize:14,
        marginHorizontal:20
    },
    actions:{
        marginVertical:20,
        alignItems:"center"
    }
})