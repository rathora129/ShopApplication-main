import React,{useLayoutEffect,useEffect,useState,useCallback} from 'react'
import {View,FlatList,Button,ActivityIndicator,StyleSheet,Text} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import IconButton from '../../components/UI/IconButton'
import * as cartActions from '../../store/actions/cart'
import * as productActions from '../../store/actions/product'
import Colors from '../../constants/Colors'

const ProductsOverViewScreen = (props) =>{

    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState()

    const products = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch()
    
    useLayoutEffect(()=>{
        props.navigation.setOptions({
        
            headerRight:()=>{
            return (<IconButton icon="md-cart" color="white" onPress={()=>props.navigation.navigate('CartScreen')}/>)
            },
            
        })
    },[props.navigation])
    const loadProducts = useCallback(async () =>{
    
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(productActions.fetchProducts())    
        } catch (error) {
            setError(error.message)
        }
        setIsLoading(false)
    },[dispatch,setIsLoading,setError])


    useEffect(()=>{
       const willFocusSub =  props.navigation.addListener('willFocus',loadProducts)
     

    },[loadProducts])

    useEffect(()=>{
        loadProducts()
    },[loadProducts,dispatch])


    const selectItemHandler = (id,title) =>{
        props.navigation.navigate('ProductDetailScreen',{productId:id,productTitle:title})
    }

    if(error){
        return <View style={styles.centered}>
            <Text>An error occured!!!</Text>
        </View>
    }

    if(isLoading){
        return(
            <View style={styles.centered}>
                <ActivityIndicator size="large" colors={Colors.primary}/>
            </View>
        )
    }

    if(!isLoading && products.length == 0){
        return (
            <View style={styles.centered}>
                <Text>No products found.Maybe start adding some!</Text>
            </View>
        )
    }

    return <FlatList 
    onRefresh={loadProducts}
    refreshing={isLoading}
    data={products}
    renderItem={itemData => <ProductItem 
        title={itemData.item.title} 
        price={itemData.item.price} 
        image={itemData.item.imageUrl} 
        onSelect={()=>selectItemHandler(itemData.item.id,itemData.item.title)}
        >
            <Button color={Colors.primary} title="View Details" onPress={()=>selectItemHandler(itemData.item.id,itemData.item.title)}/>
            <Button color={Colors.primary}title="To Cart" onPress={()=>dispatch(cartActions.addToCart(itemData.item))}/>
            </ProductItem>}

    />
}

export default ProductsOverViewScreen

const styles = StyleSheet.create({
    centered:{flex:1,justifyContent:"center",alignItems:"center"}
})