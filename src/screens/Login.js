import { StatusBar } from 'expo-status-bar'
import React, { useState, useContext } from 'react'
import { Image, SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { EyeOff } from '../components/Svgs';
import { apiRequest, doPost } from "../utils/apiCalls";
import Loader from '../utils/Loader';
import { storeItem,retrieveItem,validateEmail } from "../utils/functions";
import { Context } from '../Context/DataContext';
import { urls } from '../utils/Api_urls';
import { changeLoggedIn } from '../../Common';



var dropDownAlertRef;
const Login = (props) => {


    const [email, setEmail] = useState('cafe@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [showHide, setShowHide] = useState(true)
    const [loading, setLoading] = useState(false);
    const { setLogindataGlobal } = useContext(Context);


    const { height } = Dimensions.get('screen')



    async function login() {

        if(!validateEmail(email))
        {
            dropDownAlertRef.alertWithType("error","Error","Please provide a valid email");
            return
        }
        if(password.length<8)
        {
            dropDownAlertRef.alertWithType("error","Error","Please provide a valid password");
            return
        }


        var x = dropDownAlertRef;
        setLoading(true)
        const dbData = { email: email, password: password }
       

        console.log(" I request @ "+urls.API+"login");
        console.log(dbData);
        const {isError,data} = await doPost(dbData,"login");
        console.log(data);
        if(isError)
        {
            setLoading(false)
            dropDownAlertRef.alertWithType("error",urls.error_title,urls.error);
        }
        else{
            if (data.action == "success") {
                storeItem("login_data",data.data).then((v)=>{
                    setTimeout(()=>{
                        setLoading(false)
                        changeLoggedIn.changeNow(1)
                    },500)
                })
                
            }
            else{
                setLoading(false)
                dropDownAlertRef.alertWithType("error","Error",data.error); 
            }
        }

    }


    return (
        <View style={{backgroundColor: 'white',flex:1}}>
       
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <StatusBar hidden={false} />
            <SafeAreaView style={{ paddingTop:100 }}>
            <View style={{  paddingHorizontal: "10%", width: "100%", marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 26, color: '#F58B44', marginHorizontal: 10 }}>Sign In</Text>
                </View>
                <View style={[styles.textInputView, { marginTop: 20 }]}>

                    <TextInput
                        placeholder="Email"
                        autoCapitalize={"none"}
                        // value="cafe@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            color: '#818CAA',
                            fontFamily: 'PMe',
                            fontSize: 16,
                        }}
                    />
                </View>
                <View style={[styles.textInputView]}>
                    <TextInput
                        placeholder="Password"
                        // value="12345678"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={showHide}
                        style={{
                            color: '#818CAA',
                            fontFamily: 'PMe',
                            fontSize: 16,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setShowHide(!showHide)
                        }}
                        style={{ position: 'absolute', right: 0, padding: 15 }}>
                        <EyeOff />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ alignSelf: 'flex-end', padding: 10 }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 12, color: '#F58B44', textDecorationLine: 'underline', }}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => login()}
                    style={{ width: "50%", height: 50, borderRadius: 8, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 20 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 15, fontFamily: 'PSBo' }}>Login</Text>
                </TouchableOpacity>
               
            </View>



            </SafeAreaView>
            </View>
    )
}

const styles = StyleSheet.create({
    textInputView: {
        width: "100%",
        backgroundColor: '#F3F3F3',
        borderRadius: 9,
        paddingLeft: 15,
        marginTop: 10,
        paddingVertical:10
    },

})

export default Login
