import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { TouchableOpacity, View, Text, SafeAreaView, Image, ScrollView, Dimensions, StyleSheet, TextInput } from 'react-native'
import { ArrowLeft, BagIcon, CloseIcon, MinusIcon, TickIcon, PlusIcon1 } from '../components/Svgs'



const { width, height } = Dimensions.get('window')
const QRCode = (props) => {


    const [orderQrCode, setOrderQrCode] = useState(false)
    const [qrColor, setQrColor] = useState('#54C2BB')
    const [confirmOrder, setConfirmOrder] = useState(false)
    const [scanMenu, setScanMenu] = useState(false)

    const Header = () => (
        <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 15, width: "100%", paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#818CAA' }}>
            <TouchableOpacity
                onPress={() => props.navigation.goBack()}
            >
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 20 }}>QR code</Text>
        </View>
    )

    const qrCodeColors = [
        "#54C2BB",
        "#E85D4A",
        "#F4C471",
        "#F5E5D4",
        "#F471D6",
        "#9854C2",
        "#86C669",
        "#FF3B00",
        "#000000",
        "#9D9D9D",
    ]

    const OrderQrCodeView = () => (

        <View style={{ height: height, width: width, backgroundColor: "#707070" }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Order QR code</Text>
                <TouchableOpacity
                    onPress={() => { setOrderQrCode(false) }}
                >
                    <CloseIcon />
                </TouchableOpacity>
            </View>

            <View style={{ height: "100%", width: "100%", backgroundColor: '#fff' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                    <View style={{ width: "90%", alignSelf: 'center', marginTop: 10 }}>
                        <Text style={styles.inputLabel}>Select Type</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <TouchableOpacity style={{ width: "48%", borderRadius: 16, backgroundColor: 'rgba(84,194,187,0.3)', paddingBottom: 15 }}>
                                <Image
                                    style={{ width: "100%", resizeMode: 'stretch', height: 134, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                    source={require('../assets/food1.png')}
                                />
                                <View style={{ marginTop: 15, marginHorizontal: 10, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                        <Text style={{ color: "#4A5160", fontSize: 16, fontFamily: 'PSBo' }}>QR Sticker</Text>
                                        <View style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center' }}>
                                            <TickIcon />
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: "#54C2BB", marginLeft: 10, marginTop: 5 }}>$10.00 Per Unit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: "48%", borderRadius: 16, backgroundColor: 'rgba(252,245,234,0.5)', paddingBottom: 15 }}>
                                <Image
                                    style={{ width: "100%", resizeMode: 'stretch', height: 134, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                    source={require('../assets/food1.png')}
                                />
                                <View style={{ marginTop: 15, marginHorizontal: 10, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                        <Text style={{ color: "#4A5160", fontSize: 16, fontFamily: 'PSBo' }}>QR Sticker</Text>
                                        <View style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <TickIcon />
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ fontFamily: 'PMe', fontSize: 14, color: "#54C2BB", marginLeft: 10, marginTop: 5 }}>$10.00 Per Unit</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.inputLabel}>Select Design Type</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <TouchableOpacity style={{ width: "48%", borderRadius: 16, backgroundColor: 'rgba(84,194,187,0.3)', paddingBottom: 15 }}>
                                <Image
                                    style={{ width: "100%", resizeMode: 'stretch', height: 134, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                    source={require('../assets/food1.png')}
                                />
                                <View style={{ marginTop: 15, marginHorizontal: 10, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                        <Text style={{ color: "#4A5160", fontSize: 16, fontFamily: 'PSBo' }}>Black & white</Text>
                                        <View style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center' }}>
                                            <TickIcon />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: "48%", borderRadius: 16, backgroundColor: 'rgba(252,245,234,0.5)', paddingBottom: 15 }}>
                                <Image
                                    style={{ width: "100%", resizeMode: 'stretch', height: 134, borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                                    source={require('../assets/food1.png')}
                                />
                                <View style={{ marginTop: 15, marginHorizontal: 10, }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%" }}>
                                        <Text style={{ color: "#4A5160", fontSize: 16, fontFamily: 'PSBo' }}>Coloured</Text>
                                        <View style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', borderWidth: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                                            <TickIcon />
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.inputLabel}>Disclaimer</Text>
                        <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginTop: 10 }}>It usually take 4-5 business days for the order to arrive to you given location</Text>
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginTop: 15 }}>
                            <View style={{ paddingHorizontal: 5, width: "38%", height: 52, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.5, borderColor: '#818CAA', }}>
                                <TouchableOpacity style={{ paddingHorizontal: 10, alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                                    <Text style={{ fontFamily: 'PBo', fontSize: 18, color: "#4A5160" }}>−</Text>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160" }}>01</Text>
                                <TouchableOpacity style={{ paddingHorizontal: 12, alignItems: 'center', justifyContent: 'center', height: "100%" }}>
                                    <Text style={{ fontFamily: 'PBo', fontSize: 18, color: "#4A5160" }}>＋</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirmOrder(true)
                                    setOrderQrCode(false)
                                }}
                                style={{ paddingHorizontal: 13, flexDirection: 'row', justifyContent: 'space-between', width: "60%", backgroundColor: '#F58B44', borderRadius: 8, alignItems: 'center', }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Pay Via Stipe</Text>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>$40.00</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>

        </View>
    )

    const ConfirmOrderView = () => (
        <View style={{ height: height, width: width, backgroundColor: "#707070" }}>
            <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
                <View style={{ width: "100%", backgroundColor: "#fff", marginTop: 15, borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                    <View style={{ width: "92%", alignSelf: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', width: "85%", textTransform: 'capitalize', lineHeight: 24 }}>Are you sure you want to continue with this action ?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setOrderQrCode(true)
                                    setConfirmOrder(false)
                                }}

                            >
                                <CloseIcon />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#818CAA', lineHeight: 20, width: "90%", marginTop: 15 }}>Warning: This action will decline the booking and cannot be altered. Are you sure you want to proceed?</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 10 }}>Reason</Text>
                        <TextInput
                            placeholder="Please state you reason here"
                            placeholderTextColor="#4A5160"
                            multiline={true}
                            style={{ width: "100%", minHeight: 52, maxHeight: 82, borderWidth: 0.5, borderColor: '#818CAA', borderRadius: 8, paddingHorizontal: 15, marginTop: 10, fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setScanMenu(true)
                                    setConfirmOrder(false)
                                }}
                                style={{ width: 73, height: 44, backgroundColor: '#E85D4A', borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'PSBo' }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setConfirmOrder(false)
                                    setOrderQrCode(true)
                                }}
                                style={{ width: 98, height: 44, borderColor: '#818CAA', borderWidth: 0.5, marginLeft: 15, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#818CAA', fontFamily: 'PSBo' }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: width, paddingVertical: 15, backgroundColor: 'rgba(232,93,74,0.4)', justifyContent: 'center', paddingHorizontal: 15, marginTop: 15 }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#E85D4A', textTransform: 'capitalize' }}>The Customer will receive this message.</Text>
                    </View>
                </View>
            </View>
        </View>

    )

    const ScanMenuView = () => (
        <View style={{ height: height, width: width, backgroundColor: "#707070" }}>
            <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>

                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Scan Menu</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setScanMenu(false)
                            setConfirmOrder(true)
                        }}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", backgroundColor: "#fff", }}>
                    <Image
                        style={{ width: 120, height: 120, tintColor: '#54C2BB', alignSelf: 'center', marginTop: 40 }}
                        source={require('../assets/qrCode.png')}
                    />
                    <Text style={{ fontFamily: "PSBo", fontSize: 14, color: "#4A5160", alignSelf: 'center', marginTop: 20 }}>La Maison Blanche</Text>
                    <Text style={{ fontFamily: "PRe", fontSize: 14, color: "#818CAA", alignSelf: 'center', marginTop: 15, textAlign: 'center', }}>Scan the menu to order{"\n"}via your app</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setScanMenu(false)
                            // setConfirmOrder(true)
                        }}
                        style={{ width: 88, height: 44, borderRadius: 8, backgroundColor: "#F58B44", alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

    )

    if (orderQrCode) return <OrderQrCodeView />
    else if (confirmOrder) return <ConfirmOrderView />
    else if (scanMenu) return <ScanMenuView />
    else return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={true} />
            <Header />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "92%", alignSelf: 'center', marginTop: 15, }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>Settings</Text>
                    <View style={{ width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, marginTop: 15, paddingBottom: 15 }}>
                        <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Create QR</Text>
                        </View>
                        <Image
                            style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 30, tintColor: qrColor }}
                            source={require('../assets/qrCode.png')}
                        />

                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 20, marginLeft: 15 }}>QR code color</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: "92%", alignSelf: 'center', marginLeft: -10, }}>
                            {
                                qrCodeColors.map((v, i) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() => { setQrColor(v) }}
                                            key={i}
                                            style={{ width: 32, height: 32, marginLeft: 10, marginTop: 15, backgroundColor: v, borderRadius: 16, borderWidth: 4, borderColor: v == qrColor ? "#F58B44" : "#FFFFFF", elevation: 3, shadowOffset: { width: 0.1, height: 0.1 }, shadowColor: "#4A5160", shadowRadius: 2, shadowOpacity: 0.1 }}
                                        >
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 20, marginLeft: 15 }}>Custom color</Text>
                        <View style={{ width: "92%", alignSelf: 'center', marginTop: 10, height: 52, borderRadius: 8, borderColor: "#818CAA", borderWidth: 0.5, alignItems: 'center', flexDirection: 'row' }} >
                            <View style={{ width: 20, height: 20, borderRadius: 10, marginLeft: 10, backgroundColor: "#E81212", }}></View>
                            <Text style={{ marginLeft: 10, fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>#E81212</Text>
                        </View>
                    </View>

                    <View style={{ width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, marginTop: 15, paddingBottom: 15 }}>
                        <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Download & Buy</Text>
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: "#4A5160", alignSelf: "center", marginTop: 15, textAlign: 'center', lineHeight: 28 }}>Create your{"\n"}Menu and share it</Text>
                        <TouchableOpacity style={{ width: 182, height: 44, borderRadius: 8, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 15 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'PSBo', fontSize: 14 }}>Download QR code</Text>
                        </TouchableOpacity>
                        <View style={{ width: "100%", height: 0.5, backgroundColor: '#818CAA', marginTop: 25 }}></View>
                        <View style={{ paddingHorizontal: 20, marginTop: 30, flexDirection: 'row', }}>
                            <BagIcon />
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#818CAA", lineHeight: 20, marginLeft: 10 }}>If you wish to have it printed on a stand and get it delivered to your restaurant please place an order </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { setOrderQrCode(true) }}
                            style={{ width: 136, height: 44, borderRadius: 8, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', marginTop: 15, marginLeft: 55 }}>
                            <Text style={{ color: '#FFFFFF', fontFamily: 'PSBo', fontSize: 14 }}>Oder Stands</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputLabel: {
        fontFamily: 'PSBo',
        fontSize: 14,
        color: '#818CAA',
        marginTop: 15,
        textTransform: 'uppercase'
    }
})

export default QRCode
