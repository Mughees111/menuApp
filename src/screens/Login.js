import { StatusBar } from 'expo-status-bar'
import React, { useState, useContext } from 'react'
import { Image, SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import DropdownAlert from 'react-native-dropdownalert';
import { EyeOff } from '../components/Svgs';
import { apiRequest, doPost } from "../utils/apiCalls";
import Loader from '../utils/Loader';
import { storeItem } from "../utils/functions";
import { Context } from '../Context/DataContext';



var dropDownAlertRef;
const Login = (props) => {


    const [email, setEmail] = useState('cafe@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [showHide, setShowHide] = useState(true)
    const [loading, setLoading] = useState(false);
    const { setLogindataGlobal } = useContext(Context);


    const { height } = Dimensions.get('screen')



    async function login() {


        var x = dropDownAlertRef;
        setLoading(true)
        const loginData = { email: email, password: password }
        apiRequest(loginData, "login")
            .then(data => {
                if (data.action == 'success') {
                    setLoading(false)
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                            props.navigation.navigate('BottomTabNavigator');
                        })
                }
                else {
                    setLoading(false)
                    x.alertWithType("error", "Error", data.error);
                }
            })
            .catch(error => {
                x.alertWithType("error", "Error", "Internet");
            })

    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <StatusBar hidden={true} />
            <View style={{ paddingHorizontal: "10%", width: "100%", marginTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PBo', fontSize: 26, color: '#F58B44', marginHorizontal: 10 }}>Sign In</Text>
                </View>
                <View style={[styles.textInputView, { marginTop: 20 }]}>

                    <TextInput
                        placeholder="Email"
                        // value="cafe@gmail.com"
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
                        style={{ position: 'absolute', right: 0, padding: 20 }}>
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
                {/* <TouchableOpacity
                    onPress={() => props.navigation.navigate('SignUp')}
                    style={{ padding: 10, marginTop: 10 }} >
                    <Text style={{ color: '#6D6D6D', fontSize: 16, fontFamily: 'LR', alignSelf: 'center', }}>Don't have an account?
                        <Text style={{ textDecorationLine: 'underline' }}> Sign Up</Text>
                    </Text>
                </TouchableOpacity> */}
            </View>



        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textInputView: {
        width: "100%",
        height: 54,
        backgroundColor: '#F3F3F3',
        borderRadius: 9,
        paddingLeft: 15,
        paddingTop: 10,
        marginTop: 10,
    },

})

export default Login
