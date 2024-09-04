import React,{ useLayoutEffect} from 'react'
import {FlatList, StyleSheet,Button,Pressable,Alert,View} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import ProductItem from '../../components/shop/ProductItem'
import Colors from '../../constants/Colors'
import * as productActions from '../../store/actions/product'
import { Ionicons } from '@expo/vector-icons';


const UserProductScreen = props =>{
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()
    
    useLayoutEffect(()=>{
        props.navigation.setOptions({
         headerRight:()=><View style={{marginRight:10}}>
            <Pressable onPress={()=>props.navigation.navigate("EditProduct")}>
            <Ionicons name='md-create' color="white" size={28}/>
         </Pressable>
         </View>
        })
    },[props.navigation])

    const editProductHandler = (id) =>{
      props.navigation.navigate('EditProduct',{productId:id})
    }
    const deleteHandler = (id) =>{
      Alert.alert("Are You Sure?","Do you really want to delete this item?",[
         {text:"No",style:"default"},
         {text:"Yes",style:"destructive",onPress:()=>dispatch(productActions.deleteProduct(id))}]
      )
    }

    return (<FlatList
         data={userProducts}
         renderItem={itemData => 
         <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={()=>{editProductHandler(itemData.item.id)}}
         >
            <Button color={Colors.primary} title="Edit" onPress={()=>{editProductHandler(itemData.item.id)}}/>
            <Button color={Colors.primary}title="Delete" onPress={()=>{
             deleteHandler(itemData.item.id)
            }}/>
  
            </ProductItem>}
         />)
}

export default UserProductScreen

const styles = StyleSheet.create({})