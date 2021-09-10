import React, { useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, ScrollView, useWindowDimensions, Switch, FlatList, StyleSheet, TextInput } from 'react-native'
import { ArrowDown, CloseIcon, DownloadIcon, EditIcon, EyeIcon, FilterIcon, InfoIcon, MenuBtmIcon, PLusIcon, PlusSmall, ShareIcon, TrashIcon, TickIcon, SpicyIcon, Square1 } from '../components/Svgs'

import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';
import PrivacyPicker from '../components/PrivacyPicker';
import { Alert } from 'react-native';



const { width, height } = Dimensions.get('window')



const MyMenu = () => {


    const [tabs, setTabs] = useState({
        one: true,
        two: false,
        three: false,
    })
    const [itemActive, setItemActive] = useState(true)
    const [addNewItemModal, setAddNewItemModal] = useState(false)
    const [itemDetailViewModal, setItemDetailViewModal] = useState(false)
    const [addNewBannerModal, setAddNewBannerModal] = useState(false)
    const [categoryFilter, setCategoryFilter] = useState(false)
    const [bannerFilter, setBannerFilter] = useState(false)
    const [addNewBannerSpecs, setAddNewBannerSpecs] = useState({
        type: true
    })
    const [addNewItemSpecs, setAddNewItemSpecs] = useState({
        spicy: false,
        hideForSP: true,
        itemType: true
    })




    const layout = useWindowDimensions();

    const keyExtractor = (item, index) => { index.toString() }

    function cameraUplaod() {
        return
        // update_dp_2(1, userData.token, "public_image")
        //     .then(data => {
        //         console.log(data)
        //     })
    }

    function gallaryUpload() {

        // var x = dropDownAlertRef;
        return
        // setLoading(true)
        // update_dp(1, userData.token, "public_image")
        //     .then(data => {
        //         setLoading(false)
        //         console.log('data2 = ')
        //         console.log(data)

        //         if (data.action == "success") {
        //             setLoading(false)
        //             setImgsUrlForUpload([...imgsUrlForUpload, data.filename]);
        //             setImgsUrlToShow([...imgsUrlToShow, data.url])
        //         }
        //         else {
        //             setLoading(false)
        //             x.alertWithType('error', 'Error', data.error);
        //         }
        //     })
        //     .catch((error) => {
        //         setLoading(false)
        //         x.alertWithType('error', 'error', "Internet Error");
        //         // setLoading(false)
        //     })
    }



    const Header = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "90%", alignSelf: 'center' }}>
            <MenuBtmIcon />
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 10 }}>My Menu</Text>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 0, alignItems: 'center' }}>
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

    const Tabs = () => (
        <View style={{ width: width, marginLeft: "-5%", paddingHorizontal: "5%", flexDirection: 'row', height: 35, borderColor: '#818CAA', borderBottomWidth: 0.5 }}>
            <TouchableOpacity
                onPress={() => {
                    setTabs({
                        ...tabs,
                        one: true,
                        two: false,
                        three: false
                    })
                }}
                style={{ height: "100%", borderBottomWidth: tabs.one ? 1 : 0, borderColor: '#F58B44' }}>
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.one ? '#4A5160' : "#818CAA", }}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setTabs({
                        ...tabs,
                        one: false,
                        two: true,
                        three: false
                    })
                }}
                style={{ height: "100%", borderBottomWidth: tabs.two ? 1 : 0, borderColor: '#F58B44', marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.two ? '#4A5160' : "#818CAA", }}>Banners</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    setTabs({
                        ...tabs,
                        one: false,
                        two: false,
                        three: true
                    })
                }}
                style={{ height: "100%", borderBottomWidth: tabs.three ? 1 : 0, borderColor: '#F58B44', marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.three ? '#4A5160' : "#818CAA", }}>Settings</Text>
            </TouchableOpacity>

        </View>
    )

    const MenuTab = () => (
        <View>

            <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                </View>
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>Alessandro</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>Cafe</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 15, top: 15 }}>
                <View style={{ width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center' }}>
                    <EyeIcon />
                </View>
                <TouchableOpacity style={{ width: 99, height: 44, marginLeft: 12, borderRadius: 9, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff', }}>Publish</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: width, paddingHorizontal: "5%", flexDirection: 'row', height: 40, borderColor: '#818CAA', borderBottomWidth: 0.5, marginTop: 10 }}>
                <TouchableOpacity
                    style={{ height: "100%", borderBottomWidth: 1, borderColor: '#F58B44' }}>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.one ? '#4A5160' : "#818CAA", }}>All Categories</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ height: "100%", borderBottomWidth: 1, borderColor: '#fff', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#818CAA", }}>Main course</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ height: "100%", borderBottomWidth: 1, borderColor: '#fff', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#818CAA", }}>Salad</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ height: "100%", borderBottomWidth: 1, borderColor: '#fff', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#818CAA", }}>Breads</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "95%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>All Categories</Text>
                <TouchableOpacity
                    onPress={() => { setCategoryFilter(true) }}
                    style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <FilterIcon />
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Filter</Text>
                    <View style={{ marginLeft: 10 }}>
                        <ArrowDown />
                    </View>
                </TouchableOpacity>
            </View>
            <MenuItemView />
            <MenuItemView />
            <MenuItemView />

        </View>
    )

    const MenuItemView = () => (
        <View style={{ width: "95%", alignSelf: 'center', paddingBottom: 0, marginTop: 15, borderWidth: 1, borderRadius: 16, borderColor: '#E3E3E3' }}>
            <View style={{ padding: 10 }}>
                <TouchableOpacity
                    onPress={() => { setItemDetailViewModal(true) }}
                    style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Image
                        source={require('../assets/burgerImg.png')}
                        style={{ width: 82, height: 82, borderRadius: 41, }}
                    />
                    <View style={{ marginLeft: 12, marginTop: 2, }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>Ham Burger</Text>
                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#54C2BB', marginTop: 3 }}>$51.00</Text>
                        <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', marginTop: 3 }}>Main Course</Text>
                    </View>
                    <View style={{ position: 'absolute', right: 5, top: 0, flexDirection: 'row' }}>
                        <TouchableOpacity style={{ padding: 5 }} >
                            <InfoIcon />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 5 }}  >
                            <EditIcon />
                        </TouchableOpacity>

                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: "100%", padding: 15, backgroundColor: 'rgba(245,138,68,0.3)', borderBottomRightRadius: 16, borderBottomLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Active</Text>
                <Switch
                    trackColor={{ false: "#F58B44", true: "#fff" }}
                    thumbColor={itemActive ? "#F58B44" : "#fff"}
                    style={{ borderWidth: itemActive ? 1 : 0, borderColor: '#F58B44' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => { setItemActive(!itemActive) }}
                    value={itemActive}
                />
            </View>
        </View>
    )

    const BannersTab = () => (
        <View>

            <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                </View>
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>Alessandro</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>Cafe</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', position: 'absolute', right: 15, top: 15 }}>
                <View style={{ width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center' }}>
                    <EyeIcon />
                </View>



                <TouchableOpacity
                    onPress={() => { setAddNewBannerModal(true) }}
                    style={{ width: 131, height: 44, marginLeft: 8, borderRadius: 9, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff', }}>Add Banner</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: "92%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>All Banners</Text>
                <TouchableOpacity
                    onPress={() => { setBannerFilter(true) }}
                    style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <FilterIcon />
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Filter</Text>
                    <View style={{ marginLeft: 10 }}>
                        <ArrowDown />
                    </View>
                </TouchableOpacity>
            </View>

            <BannerItemView />
            <BannerItemView />
            <BannerItemView />

        </View>
    )

    const BannerItemView = () => (
        <View style={{ width: "95%", alignSelf: 'center', paddingBottom: 0, marginTop: 15, borderWidth: 1, borderRadius: 16, borderColor: '#E3E3E3' }}>
            <View>
                <Image
                    source={require('../assets/bannerImg1.png')}
                    style={{ width: "100%", height: 161, borderTopRightRadius: 16, borderTopLeftRadius: 16 }}
                />
                <TouchableOpacity style={{ position: 'absolute', top: 10, right: 15, width: 44, height: 44, borderRadius: 8, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
                    <EditIcon color="#4A5160" />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20, width: "95%", alignSelf: 'center' }}>
                <View style={{ width: "50%" }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Banner Name</Text>
                    <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>Chef’s special</Text>
                </View>
                <View>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Linked to</Text>
                    <Text style={{ color: '#54C2BB', fontFamily: 'PRe', fontSize: 14, textDecorationLine: 'underline', marginTop: 5 }}>Peri - Peri chicken</Text>
                </View>
            </View>

            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: "100%", padding: 15, backgroundColor: 'rgba(245,138,68,0.3)', borderBottomRightRadius: 16, borderBottomLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Active</Text>
                <Switch
                    trackColor={{ false: "#F58B44", true: "#fff" }}
                    thumbColor={itemActive ? "#F58B44" : "#fff"}
                    style={{ borderWidth: itemActive ? 1 : 0, borderColor: '#F58B44' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => { setItemActive(!itemActive) }}
                    value={itemActive}
                />
            </View>

        </View>
    )

    const SettingsTab = () => (
        <View>
            <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                </View>
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>Alessandro</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>Cafe</Text>
                </View>
                <View style={{ flexDirection: 'row', position: 'absolute', right: 15, top: 15 }}>
                    <View style={{ width: 44, height: 44, borderRadius: 8, borderWidth: 1, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center' }}>
                        <EyeIcon />
                    </View>
                </View>
            </View>

            <View style={{ width: "95%", alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>Menu Settings</Text>
            </View>

            <View style={{ width: "95%", alignSelf: 'center', marginTop: 15 }}>
                <View style={{ width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Appearance Settings</Text>
                        <TouchableOpacity>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "95%", alignSelf: 'center', marginTop: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', textTransform: 'uppercase' }}>Primary Colour</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#E81212', }}></View>
                            <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginLeft: 8 }}>#E81212</Text>
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', textTransform: 'uppercase', marginTop: 15 }}>Secondary Colour</Text>
                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                            <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: '#5CC2EA', }}></View>
                            <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginLeft: 8 }}>#5CC2EA</Text>
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', textTransform: 'uppercase', marginTop: 15 }}>Font</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 3 }}>Poppins</Text>


                    </View>
                </View>

                <View style={{ marginTop: 15, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
                    <View style={{ width: "100%", paddingTop: 15, paddingBottom: 1, paddingHorizontal: 20, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>My Media library</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ height: 35, marginTop: 10, borderBottomWidth: 2, borderColor: '#F58B44' }}>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Your Photos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ height: 35, marginTop: 10, borderColor: '#F58B44', marginLeft: 20 }}>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#818CAA' }}>Photoshoot</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: "92%", alignSelf: 'center' }}>
                        <FlatList
                            horizontal={true}
                            style={{ marginTop: 10, marginLeft: -8 }}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={keyExtractor}
                            data={[1, 2, 3]}
                            renderItem={({ item }) => (
                                <View style={{ marginLeft: 8, width: 101, height: 101, borderRadius: 8, }}>
                                    <Image
                                        style={{}}
                                        source={require('../assets/img3.png')}
                                    />
                                    <View style={{ width: "100%", position: 'absolute', bottom: 0, height: 30, backgroundColor: 'rgba(255,255,255,0.7)', flexDirection: 'row', }}>
                                        <TouchableOpacity style={{ width: "50%", height: "100%", justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderColor: '#818CAA' }}>
                                            <TrashIcon />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: "50%", height: "100%", justifyContent: 'center', alignItems: 'center', borderColor: '#818CAA' }}>
                                            <DownloadIcon />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        />
                        <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#E3E3E3', width: 101, height: 101, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: '#FCF5EA', alignItems: 'center', justifyContent: 'center' }}>
                                <PlusSmall />
                            </View>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44', marginTop: 15 }}>Add Image</Text>
                        </View>
                    </View>
                </View>


            </View>
        </View>
    )


    const AddNewItem = () => (
        <Modal
            isVisible={addNewItemModal}
            backdropOpacity={1}
            backdropColor="#707070"
            // swipeDirection="down"
            animationOut="bounceInDown"
            // onSwipeComplete={() => { setAddNewItemModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Add New Item</Text>
                    <TouchableOpacity
                        onPress={() => { setAddNewItemModal(false) }}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                        <View style={{ width: "92%", alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Image
                                    style={{ width: 64, height: 64, borderRadius: 32, }}
                                    source={require('../assets/burgerImg.png')}
                                />
                                <TouchableOpacity style={{ width: 148, height: 44, borderRadius: 9, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Upload Image</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.inputLabel}>NAME</Text>
                            <TextInput
                                placeholder="Peri - Peri Chicken "
                                placeholderTextColor="#4A5160"
                                style={{ width: "100%", height: 52, marginTop: 10, borderRadius: 12, borderWidth: 0.5, borderColor: '#818CAA', paddingLeft: 15, color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                            />
                            <Text style={styles.inputLabel}>COST</Text>
                            <View style={{ flexDirection: 'row', marginTop: 10, height: 52, width: "100%", borderRadius: 12, borderWidth: 0.5, borderColor: '#818CAA', }}>
                                <View style={{ width: 56, height: 52, backgroundColor: '#FEDDA6', borderTopLeftRadius: 12, borderBottomLeftRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: "PRe", fontSize: 14, color: '#4A5160' }}>$</Text>
                                </View>
                                <TextInput
                                    placeholder="10.00"
                                    placeholderTextColor="#4A5160"
                                    style={{ flex: 1, height: 52, paddingLeft: 15, color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                                />
                            </View>
                            <Text style={styles.inputLabel}>Category</Text>
                            <TouchableOpacity style={{ width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 36, backgroundColor: '#FEDDA6', borderRadius: 8, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', marginLeft: 7 }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Main Course</Text>
                                    <CloseIcon />
                                </View>
                                <View style={{ height: 36, backgroundColor: '#FEDDA6', borderRadius: 8, paddingHorizontal: 8, flexDirection: 'row', alignItems: 'center', marginLeft: 7 }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Salad</Text>
                                    <CloseIcon />
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.inputLabel}>Type</Text>

                            <View style={{ width: "100%", flexDirection: 'row', borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: 'rgba(129,150,170,0.5)' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewItemSpecs({
                                            ...addNewItemSpecs,
                                            itemType: true
                                        })
                                    }}
                                    style={{ width: "50%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: addNewItemSpecs.itemType ? '#F58B44' : "#fff" }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: addNewItemSpecs.itemType ? "#fff" : "#4A5160" }}>Veg</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewItemSpecs({
                                            ...addNewItemSpecs,
                                            itemType: false
                                        })
                                    }}
                                    style={{ width: "50%", borderTopRightRadius: 8, borderBottomRightRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: !addNewItemSpecs.itemType ? '#F58B44' : "#fff" }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: !addNewItemSpecs.itemType ? "#fff" : "#4A5160" }}>Non - Veg</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={[styles.inputLabel]}>DESCRIPTION</Text>
                            <TextInput
                                multiline={true}
                                placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
                                placeholderTextColor="#4A5160"
                                style={{ width: "100%", height: 92, marginTop: 10, borderRadius: 12, borderWidth: 0.5, borderColor: '#818CAA', paddingLeft: 15, color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                            />

                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewItemSpecs({
                                            ...addNewItemSpecs,
                                            spicy: !addNewItemSpecs.spicy
                                        })
                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: addNewItemSpecs.spicy ? 0 : 0.5, backgroundColor: addNewItemSpecs.spicy ? '#54C2BB' : "#fff" }}>
                                    {addNewItemSpecs.spicy && <TickIcon />}
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Spicy</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewItemSpecs({
                                            ...addNewItemSpecs,
                                            spicy: !addNewItemSpecs.hideForSP
                                        })
                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: addNewItemSpecs.hideForSP ? 0 : 0.5, backgroundColor: addNewItemSpecs.hideForSP ? '#54C2BB' : "#fff" }}>
                                    {addNewItemSpecs.hideForSP && <TickIcon />}
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>hide for a specific period</Text>
                            </View>


                        </View>
                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => { setAddNewItemModal(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setAddNewItemModal(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Add Item</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )

    const AddNewBanner = () => (
        <Modal
            isVisible={addNewBannerModal}
            backdropOpacity={1}
            backdropColor="#707070"
            // swipeDirection="down"
            animationOut="bounceInDown"
            // onSwipeComplete={() => { setAddNewItemModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Add New Banner</Text>
                    <TouchableOpacity
                        onPress={() => { setAddNewBannerModal(false) }}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                        <View style={{ width: "92%", alignSelf: 'center' }}>
                            <Image
                                style={{ marginTop: 20, width: "100%", height: 147, borderRadius: 8, resizeMode: 'stretch' }}
                                source={require('../assets/ad.png')}
                            />
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <Image
                                    style={{ width: 64, height: 64, borderRadius: 32, }}
                                    source={require('../assets/burgerImg.png')}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Upload Picture",
                                            'How do you want to upload picture?',
                                            [
                                                { text: 'Camera', onPress: () => cameraUplaod() },

                                                { text: 'Gallery', onPress: () => gallaryUpload() },
                                            ],
                                            { cancelable: true },
                                        );
                                    }}
                                    style={{ width: 148, height: 44, borderRadius: 9, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', marginLeft: 20 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Upload Image</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.inputLabel}>Heading</Text>
                            <TextInput
                                placeholder="Try our new Protein Salad"
                                placeholderTextColor="#4A5160"
                                style={{ width: "100%", height: 52, marginTop: 10, borderRadius: 12, borderWidth: 0.5, borderColor: '#818CAA', paddingLeft: 15, color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                            />
                            <Text style={styles.inputLabel}>TAG </Text>
                            <TextInput
                                placeholder="Chef’s Specials"
                                placeholderTextColor="#4A5160"
                                style={{ width: "100%", height: 52, marginTop: 10, borderRadius: 12, borderWidth: 0.5, borderColor: '#818CAA', paddingLeft: 15, color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                            />

                            <Text style={styles.inputLabel}>Link Category</Text>
                            <TouchableOpacity style={{ marginTop: 10, width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <PrivacyPicker
                                    data={[{ title: "Main Course" }]}
                                    selected={{ title: 'Select' }}
                                    onValueChange={() => {

                                    }}
                                />
                                {/* <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Main Course</Text> */}

                            </TouchableOpacity>
                            <Text style={styles.inputLabel}>Type</Text>

                            <View style={{ width: "100%", flexDirection: 'row', borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: 'rgba(129,150,170,0.5)' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewBannerSpecs({
                                            ...addNewBannerSpecs,
                                            type: true
                                        })
                                    }}
                                    style={{ width: "50%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: addNewBannerSpecs.type ? '#F58B44' : "#fff" }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: addNewBannerSpecs.type ? "#fff" : "#4A5160" }}>All Item</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setAddNewBannerSpecs({
                                            ...addNewBannerSpecs,
                                            type: false
                                        })
                                    }}
                                    style={{ width: "50%", borderTopRightRadius: 8, borderBottomRightRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: !addNewBannerSpecs.type ? '#F58B44' : "#fff" }}>
                                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: !addNewBannerSpecs.type ? "#fff" : "#4A5160" }}>One Item</Text>
                                </TouchableOpacity>

                            </View>
                            <Text style={styles.inputLabel}>Select Item</Text>
                            <TouchableOpacity style={{ marginTop: 10, width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <PrivacyPicker
                                    data={[{ title: "Peri Peri Chicken" }]}
                                    selected={{ title: 'Select' }}
                                    onValueChange={() => {

                                    }}
                                />
                                {/* <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Main Course</Text> */}
                            </TouchableOpacity>

                        </View>
                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => { setAddNewBannerModal(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setAddNewBannerModal(false) }}
                        style={{ width: 100, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Add Banner</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )


    const ItemDetailView = () => (
        <Modal
            isVisible={itemDetailViewModal}
            backdropOpacity={1}
            backdropColor="#707070"
            // swipeDirection="down"
            animationOut="bounceInDown"
            // onSwipeComplete={() => { setAddNewItemModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>

                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>


                <View style={{ height: "100%", width: "100%", marginTop: 15, backgroundColor: '#fff' }}>

                    <TouchableOpacity
                        onPress={() => {
                            setItemDetailViewModal(false)
                        }}
                        style={{ padding: 10, alignSelf: 'flex-end' }}>
                        <CloseIcon />
                    </TouchableOpacity>
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}  >
                        <Image
                            style={{ width: 220, height: 220, borderRadius: 110, alignSelf: 'center' }}
                            source={require('../assets/burger1.png')}
                        />



                        <View style={{ width: "90%", alignSelf: 'center', height: "100%" }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginTop: 20 }}>Ham Burger</Text>
                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#818CAA', lineHeight: 21, marginTop: 5 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
                                <SpicyIcon />
                                <Text style={{ color: "#818CAA", fontSize: 14, fontFamily: 'PMe', marginLeft: 5, marginRight: 15 }}>Spicy</Text>
                                <Square1 />
                                <Text style={{ color: "#818CAA", fontSize: 14, fontFamily: 'PMe', marginLeft: 5 }}>Non - veg</Text>
                            </View>
                            <Text style={{ color: "#818CAA", fontSize: 12, fontFamily: 'PSBo', marginTop: 15, }}>Extras</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Square1 color="#54C2BB" />
                                    <Text style={{ fontFamily: "PRe", fontSize: 14, color: '#4A5160', marginLeft: 10 }}>Extra Cheese</Text>
                                </View>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#54C2BB' }}>$10.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Square1 color="#54C2BB" />
                                    <Text style={{ fontFamily: "PRe", fontSize: 14, color: '#4A5160', marginLeft: 10 }}>Extra Veggies</Text>
                                </View>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#54C2BB' }}>$10.00</Text>
                            </View>
                            <TouchableOpacity style={{ width: 110, height: 44, backgroundColor: '#4A5160', borderRadius: 8, alignItems: "center", justifyContent: 'center', marginTop: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Edit Item</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>

                </View>

                <View style={{ width: width, alignItems: 'center', paddingHorizontal: 15, backgroundColor: "#54C2BB", flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', bottom: 0, height: 51 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Active</Text>
                    <Switch
                        trackColor={{ false: "#fff", true: "#fff" }}
                        thumbColor={itemActive ? "#54C2BB" : "#fff"}
                        style={{ borderWidth: 1, borderColor: itemActive ? "#54C2BB" : '#fff' }}
                        ios_backgroundColor="#54C2BB"
                        onValueChange={() => { setItemActive(!itemActive) }}
                        value={itemActive}
                    />
                </View>
            </View>

        </Modal >
    )

    const CategoryFilterView = () => (
        <Modal
            isVisible={categoryFilter}
            backdropOpacity={1}
            backdropColor="#707070"
            // swipeDirection="down"
            animationOut="bounceInDown"
            // onSwipeComplete={() => { setAddNewItemModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>All Category</Text>
                    <TouchableOpacity
                        onPress={() => { setCategoryFilter(false) }}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                        <View style={{ width: "92%", alignSelf: 'center' }}>
                            <View style={{ width: "100%", flexDirection: 'row', }}>
                                <View style={{ width: "47%" }}>
                                    <Text style={styles.inputLabel}>Category</Text>
                                    <TouchableOpacity style={styles.filterByCategory}>
                                        <Text style={styles.filterViewTexts}>All</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.filterByCategory}>
                                        <Text style={styles.filterViewTexts}>Main Course</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.filterByCategory}>
                                        <Text style={styles.filterViewTexts}>Specials </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "40%", marginLeft: 10 }}>
                                    <Text style={styles.inputLabel}>Available</Text>
                                    <TouchableOpacity style={styles.filterAvailable}>
                                        <Text style={styles.filterViewTexts}>Everyday</Text>
                                        <ArrowDown />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.filterAvailable}>
                                        <Text style={styles.filterViewTexts}>Weekdays</Text>
                                        <ArrowDown />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.filterAvailable}>
                                        <Text style={styles.filterViewTexts}>Weekends </Text>
                                        <ArrowDown />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "15%", marginLeft: 10 }}>
                                    <Text style={[styles.inputLabel, { marginLeft: -25 }]}>Banner</Text>
                                    <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#54C2BB', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                        <TickIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 24, height: 24, borderColor: '#818CAA', borderWidth: 0.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                                        <TickIcon />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ width: 24, height: 24, borderColor: '#818CAA', borderWidth: 0.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                                        <TickIcon />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: "100%", marginTop: 20, height: 0.5, backgroundColor: '#818CAA' }}></View>
                        <Text style={[styles.inputLabel, { marginLeft: 10, marginTop: 10 }]}>Add new</Text>
                        <View style={{ width: "100%", marginTop: 10, height: 0.5, backgroundColor: '#818CAA' }}></View>
                        <View style={{ flexDirection: 'row', width: "92%", alignSelf: 'center', alignItems: 'center', marginTop: 15, justifyContent: 'space-between', }}>
                            <TouchableOpacity style={[styles.filterByCategory, { width: "48%" }]}>
                                <Text style={[styles.filterViewTexts]}>All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterAvailable, { width: "40%" }]}>
                                <Text style={[styles.filterViewTexts]}>Everyday</Text>
                                <ArrowDown />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 24, height: 24, backgroundColor: '#54C2BB', borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                <TickIcon />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', width: "92%", alignSelf: 'center', alignItems: 'center', marginTop: 0, justifyContent: 'space-between', }}>
                            <TouchableOpacity style={[styles.filterByCategory, { width: "48%" }]}>
                                <Text style={[styles.filterViewTexts]}>Main Course</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.filterAvailable, { width: "40%" }]}>
                                <Text style={[styles.filterViewTexts]}>Weekdays</Text>
                                <ArrowDown />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: 24, height: 24, borderColor: '#818CAA', borderWidth: 0.5, borderRadius: 4, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                                <TickIcon />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ width: 181, height: 44, backgroundColor: '#4A5160', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 13 }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: "#fff" }}>Add New Category</Text>
                        </TouchableOpacity>

                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => { setCategoryFilter(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setCategoryFilter(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </Modal>

    )


    const BannerFilterView = () => (
        <Modal
            isVisible={bannerFilter}
            backdropOpacity={1}
            backdropColor="#707070"
            // swipeDirection="down"
            animationOut="bounceInDown"
            // onSwipeComplete={() => { setAddNewItemModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Select Filter</Text>
                    <TouchableOpacity
                        onPress={() => { setBannerFilter(false) }}
                    >
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                        <View style={{ width: "92%", alignSelf: 'center' }}>

                            <Text style={styles.inputLabel}>COST OF ITEM</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: "#54C2BB" }}>
                                    <TickIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Less Than $5</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>$5 - $20</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>More Than $20</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>All Time</Text>
                            </View>

                            <Text style={[styles.inputLabel, { marginTop: 20 }]}>Status</Text>
                            <View style={{ marginTop: 10, width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', justifyContent: 'space-between',  alignItems: 'center' }}>
                                <PrivacyPicker  
                                    selected={{title:'Select'}}
                                    data ={[{title : "Active"},{title : "Inactive"}]}
                                    onValueChange={()=>{}}
                                />
                                {/* <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Active</Text>
                                <ArrowDown /> */}
                            </View>

                            <Text style={styles.inputLabel}>OTHER</Text>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: "#54C2BB" }}>
                                    <TickIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Spicy Than $5</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Non - Veg</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Veg</Text>
                            </View>





                        </View>
                    </ScrollView>

                </View>
                <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                    <TouchableOpacity
                        onPress={() => { setBannerFilter(false) }}
                        style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { setBannerFilter(false) }}
                        style={{ width: 100, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Apply</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </Modal>
    )


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={true} />
            <Header />
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 20 }}>
                <Tabs />
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

                {
                    tabs.one &&


                    <MenuTab />
                }
                {
                    tabs.two &&
                    <BannersTab />
                }
                {
                    tabs.three &&
                    <SettingsTab />
                }
            </ScrollView>

            {
                tabs.one &&
                <TouchableOpacity
                    onPress={() => { setAddNewItemModal(true) }}
                    style={{ position: 'absolute', bottom: 10, right: 10, }}>
                    <PLusIcon />
                </TouchableOpacity>

            }

            <AddNewItem />
            <AddNewBanner />
            <ItemDetailView />
            <CategoryFilterView />
            <BannerFilterView />
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
    },
    filterByCategory: {
        width: "100%",
        height: 52,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#818CAA',
        paddingHorizontal: 15,
        justifyContent: 'center',
        marginTop: 10

    },
    filterAvailable: {
        width: "100%",
        height: 52,
        borderWidth: 0.5,
        borderRadius: 8,
        borderColor: '#818CAA',
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    filterViewTexts: {
        color: '#4A5160',
        fontFamily: 'PRe',
        fontSize: 14
    }

})
export default MyMenu
