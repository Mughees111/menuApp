import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, useWindowDimensions, Switch, FlatList } from 'react-native'
import { ArrowDown, CameraIcon, DownloadIcon, EditIcon, EyeIcon, FilterIcon, InfoIcon, LogoutIcon, MenuBtmIcon, MoreIcon, PLusIcon, PlusSmall, QRCodeIcon, ShareIcon, TrashIcon } from '../components/Svgs'

import { StatusBar } from 'expo-status-bar';


const More = (props) => {

    const [orderQrCode, setOrderQrCode] = useState(false);
    
    const Header = () => (
        <View style={{ alignItems: 'center', flexDirection: 'row', marginTop: 10, paddingHorizontal: 20, width: '100%', borderBottomWidth: 0.5, borderColor: '#818CAA', paddingBottom: 15, }}>
            <MoreIcon style={{ marginTop: 10 }} />
            <Text style={{ marginTop: 10, fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 10 }}>Other</Text>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 0, top: 10, alignItems: 'center' }}>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <ShareIcon />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Image
                        style={{ width: 32, height: 32, borderRadius: 16, }}
                        source={require('../assets/profileImg1.png')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )

    const OrderQrCodeView = () => (
        <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
            <View style={{ height: "100%", width: "100%", marginTop: 15, backgroundColor: '#fff' }}>

            </View>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={true} />
            <Header />
            <View style={{ width: "95%", alignSelf: 'center', marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('MoreStack', {
                        screen: 'QRCode'
                    })}
                    style={{ marginTop: 20, width: "100%", height: 64, paddingLeft: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F58B44' }}>
                    <QRCodeIcon />
                    <Text style={{ fontFamily: "PMe", fontSize: 16, color: '#FFFFFF', marginLeft: 10 }}>QR code</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('MoreStack', {
                        screen: 'BookPhotographer'
                    })}

                    style={{ marginTop: 20, width: "100%", height: 64, paddingLeft: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', }}>
                    <CameraIcon />
                    <Text style={{ fontFamily: "PMe", fontSize: 16, color: '#4A5160', marginLeft: 10 }}>Photographer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 20, width: "100%", height: 64, paddingLeft: 20, borderRadius: 12, flexDirection: 'row', alignItems: 'center', }}>
                    <LogoutIcon />
                    <Text style={{ fontFamily: "PMe", fontSize: 16, color: '#4A5160', marginLeft: 10 }}>Log out</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>

    )
}

export default More
