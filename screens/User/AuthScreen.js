import React,{useLayoutEffect,useReducer,useCallback,useState} from 'react'
import {ScrollView,View,KeyboardAvoidingView,StyleSheet,Button} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'

import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'
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


const AuthScreen = props =>{

    const [isSignup,setIsSignup] = useState(false)

    const dispatch = useDispatch()
    const authHandler = () =>{
        let action
        if(isSignup){
            action = authActions.signup(formState.inputValues.email,formState.inputValues.password)
        }else{
            action = authActions.login(formState.inputValues.email,formState.inputValues.password)
        }
        dispatch(action)
    }
    const inputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) =>{
        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid:inputValidity,
            input:inputIdentifier 
        })
    },[dispatchFormState])


    useLayoutEffect(()=>{
        props.navigation.setOptions({
            title:"Authentication",
        })
    },[props.navigation])

    const[formState,dispatchFormState] =  useReducer(formReducer,{
        inputValues:{
            email:"",
            password:""
        },
        inputValidities:{
            email:false,
            password:false
        },
        formIsValid:false
    })

    


    return (
        <KeyboardAvoidingView
        behavior='padding'
        keyboardVerticalOffset={50}
        style={styles.screen}
        >
        <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
            <ScrollView>
            <Input
            id="email"
            label="E-mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
            />
            <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid Password."
            onInputChange={inputChangeHandler}
            initialValue=""
            />
            <Button title={isSignup?"SignUp":'Login'} color={Colors.primary} onPress={authHandler}/>
            <Button title={`Switch to ${isSignup?"Login":'Sign Up'}`} color={Colors.accent} 
            onPress={()=>{setIsSignup(prev => !prev)}}/>
            </ScrollView>
        </Card>
        </LinearGradient>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
    },
    authContainer:{
        width:"80%",
        maxHeight:400,
        maxWidth:400,
        padding:20,
    
    },
    gradient:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})

export default AuthScreen