import React,{useState, useLayoutEffect,useEffect,useReducer, useCallback} from 'react'
import {View,StyleSheet,ScrollView,Pressable,Alert,Platform,KeyboardAvoidingView} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import IconButton from '../../components/UI/IconButton'
import { useSelector,useDispatch } from 'react-redux'
import * as productActions from '../../store/actions/product'
import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const FORM_INPUT_UPDATE = 'UPDATE'

const formReducer = (state,action) =>{
    if(action.type == FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]:action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]:action.isValid
        }
        let updatedFormIsValid =true;
        for(const key in updatedValidities){
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid:updatedFormIsValid,
            inputValues:updatedValues,
            inputValidities:updatedValidities
        }
    }
    return state;
}

const EditProductScreen = props =>{
    const dispatch = useDispatch()
    

    const prodId = props.route.params?.productId
    const editedProduct = useSelector(state=>state.products.userProducts.find(prod => prod.id ===prodId))  

    const[formState,dispatchFormState] =  useReducer(formReducer,{
        inputValues:{
            title:editedProduct?editedProduct.title:"", 
            imageUrl:editedProduct?editedProduct.imageUrl:"",
            description:editedProduct?editedProduct.description:"",
            price:""
        },
        inputValidities:{
            title:editedProduct?true:false,
            imageUrl:editedProduct?true:false,
            description:editedProduct?true:false,

        },
        formIsValid:editedProduct ? true:false
    })


    useLayoutEffect(()=>{
        const press = () =>{
   
            if(!formState.formIsValid){
            
             Alert.alert('Wrong Input','Please check the errors in the form.',[
                 {text:"Okay"}
             ])
            
             return;
         }

         if(editedProduct){
             dispatch(productActions.updateProduct(prodId,formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl))  
                    
         }else{
             dispatch(productActions.createProduct(formState.inputValues.title,formState.inputValues.description,formState.inputValues.imageUrl,+formState.inputValues.price))
             
         }
         props.navigation.goBack()
        }
        props.navigation.setOptions({
            title:"Edit Product",
            headerRight:()=>(<View>
               <IconButton icon={Platform.OS === 'android' ?'md-checkmark' :'ios-checkmark'} color={Platform.OS == 'android' ? "white": Colors.primary} size={28} onPress={press}/>
            </View>)
           })
    },[props.navigation,formState,prodId])

    const inputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) =>{

        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid:inputValidity,
            input:inputIdentifier 
        })
    },[dispatchFormState])

    return <KeyboardAvoidingView style={{flex:1}} behavior='padding' keyboardVerticalOffset={100}>
        <ScrollView> 
        <View style={styles.form}> 
        <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            keyboardType="default" 
            autoCapitalize='sentences' 
            autoCorrect
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.title:""}
            initiallyValid={!!editedProduct}
            required
          />
        <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image Url"
            keyboardType="default" 
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.imageUrl:""}
            initiallyValid={!!editedProduct}
            required
            />
    {editedProduct?null:  
            <Input
            id="price"
            label="Price"
            errorText="Please enter a valid Price"
            keyboardType="number-pad" 
            returnKeyType='next'
            onInputChange={inputChangeHandler}
            required
            min={0.1} 
            />}
            <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            keyboardType="default" 
            autoCapitalize='sentences' 
            autoCorrect
            multline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProduct ? editedProduct.description:""}
            initiallyValid={!!editedProduct}
            required/>
    </View>

    </ScrollView> 
    </KeyboardAvoidingView>
   
}

export default EditProductScreen

const styles = StyleSheet.create({
    form:{
        margin:20,
    }
})