import React, { useEffect, useState, useContext, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, FlatList, Switch, TextInput } from 'react-native'
import { ArrowDown, CloseIcon, TickIcon, EditIcon, EyeIcon, FilterIcon, PersonIcon, PersonIconSmall, PlusSmall, RestMenuIcon, ResturentBtmIcon, ShareIcon, TrashIcon } from '../components/Svgs'

import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';

import { Context } from '../Context/DataContext';
import { apiRequest, doPost } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Alert } from 'react-native';
import { retrieveItem, storeItem, update_dp, update_dp_2 } from '../utils/functions';
import { urls } from '../utils/Api_urls';
import PrivacyPicker from '../components/PrivacyPicker';
import { TimePicker } from '../components/TimePicker';




const { width, height } = Dimensions.get('window');

const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}


var dropDownAlertRef;

const Resturent = () => {

    const forceUpdate = useForceUpdate()
    const { state, setLogindataGlobal } = useContext(Context);
    const userData = state.loginData
    const [loading, setLoading] = useState(false)
    const [outsideDining, setOutsideDining] = useState(true);
    const [sameEveryDay, setSameEveryDay] = useState(true);
    const [resEdit, setResEdit] = useState(false)
    const [tableActive, setTableActive] = useState(true)
    const [addTable, setAddtable] = useState(false)
    const [editOrderSetting, setEditOrderSetting] = useState(false)
    const [editOverViewImages, setEditOverViewImages] = useState(false)
    const [editHours, setEditHours] = useState(false)
    const [sameDaysArr, setSameDaysArr] = useState([]);
    const [sameDayStart, setSameDayStart] = useState('');
    const [sameDayEnd, setSameDayEnd] = useState('');
    const [editTable, setEditTable] = useState(false)
    const [editTableId, setEditTableId] = useState()

    const [imgsUrlForUpload, setImgsUrlForUpload] = useState([]);
    const [imgsUrlToShow, setImgsUrlToShow] = useState([]);

    const [addTableV, setAddTableV] = useState({
        title: '',
        table_id: '',
        location: '',
        capacity: ''
    })

    const [editTableV, setEditTableV] = useState({
        title: '',
        table_id: '',
        location: '',
        capacity: ''
    })


    const [changeOrderSetting, setChangeOrderSetting] = useState({
        floors: "",
        waiter_call: "",
        outside_dinning: ""
    })
    const [changeOverViewSetting, setChangeOverViewSetting] = useState({
        sub_title: "",
        phone: "",
        address: "",
        description: ""
    })

    const [tabs, setTabs] = useState({
        one: true,
        two: false,
        three: false,
    })



    const daysR = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday"
    ]



    function doChangeOrderSettings() {
        var x = dropDownAlertRef;
        if (!changeOrderSetting.floors && !changeOrderSetting.waiter_call && !changeOrderSetting.outside_dinning) {
            x.alertWithType("error", "Error", "Please update at least one");
            return
        }
        var floors;
        var waiter_call;
        var outside_dinning;
        if (!changeOrderSetting.floors) { floors = userData.floors }
        else { floors = changeOrderSetting.floors }


        if (!changeOrderSetting.outside_dinning) { outside_dinning = userData.outside_dinning }
        else { outside_dinning = changeOrderSetting.outside_dinning }

        if (!changeOrderSetting.waiter_call) { waiter_call = userData.waiter_call }
        else { waiter_call = changeOrderSetting.waiter_call }

        setLoading(true)
        const chngObj = {
            token: userData.token,
            floors,
            waiter_call,
            outside_dinning
        }
        apiRequest(chngObj, "update_order_details")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    setEditOrderSetting(false)
                    x.alertWithType("success", "Success", "Order Settings Updated");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
            })
    }

    function delImg(id) {
        var x = dropDownAlertRef;
        setLoading(true)
        const delImgObj = {
            token: userData.token,
            id: id
        }
        apiRequest(delImgObj, "remove_image")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    x.alertWithType("success", "Success", "Image Removed");
                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
            })
    }

    function doChangeOverViewSettings() {
        var x = dropDownAlertRef;
        if (!changeOverViewSetting.address && !changeOverViewSetting.phone && !changeOverViewSetting.description && !changeOverViewSetting.sub_title) {
            x.alertWithType("error", "Error", "Please update at least one");
            return
        }

        var address;
        var phone;
        var description;
        var sub_title;
        if (!changeOverViewSetting.address) { address = userData.address }
        else { address = changeOverViewSetting.address }

        if (!changeOverViewSetting.phone) { phone = userData.phone }
        else { phone = changeOverViewSetting.phone }

        if (!changeOverViewSetting.description) { description = userData.description }
        else { description = changeOverViewSetting.description }

        if (!changeOverViewSetting.sub_title) { sub_title = userData.sub_title }
        else { sub_title = changeOverViewSetting.sub_title }

        if (!changeOverViewSetting.description) { description = userData.description }
        else { description = changeOverViewSetting.description }

        const chngObj = {
            token: userData.token,
            address,
            phone,
            sub_title,
            description
        }
        setLoading(true)

        apiRequest(chngObj, "update_overview")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    setResEdit(false)
                    x.alertWithType("success", "Success", "Overview Updated");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
            })



    }

    function cameraUplaod() {
        update_dp_2(1, userData.token, "public_image")
            .then(data => {
                console.log(data)
            })
    }

    function gallaryUpload() {

        var x = dropDownAlertRef;
        setLoading(true)
        update_dp(1, userData.token, "public_image")
            .then(data => {
                setLoading(false)
                console.log('data2 = ')
                console.log(data)

                if (data.action == "success") {
                    setLoading(false)
                    setImgsUrlForUpload([...imgsUrlForUpload, data.filename]);
                    setImgsUrlToShow([...imgsUrlToShow, data.url])
                }
                else {
                    setLoading(false)
                    x.alertWithType('error', 'Error', data.error);
                }
            })
            .catch((error) => {
                setLoading(false)
                x.alertWithType('error', 'error', "Internet Error");
                // setLoading(false)
            })
    }

    function doUploadImgs() {

        var x = dropDownAlertRef;
        setLoading(true)
        if (!imgsUrlForUpload.length) {
            x.alertWithType("error", "Error", "Please add at least one one");
            return
        }
        const imgObj = {
            token: userData.token,
            images: imgsUrlForUpload
        }
        apiRequest(imgObj, "add_images")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    setEditOverViewImages(false)
                    x.alertWithType("success", "Success", "Images Added");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
            })
    }

    function setHoursForSameEveryDay(value, start, end) {
        setLoading(true)
        var x = dropDownAlertRef;
        var hoursObj = {}
        var temp;
        for (let key in daysR) {

            temp = daysR[key]
            if (sameDaysArr[key] == daysR[key]) {
                hoursObj[temp] = 1
                hoursObj[temp + "_start"] = sameDayStart
                hoursObj[temp + "_end"] = sameDayEnd
            }
            else {
                hoursObj[temp] = 0
            }
        }
        hoursObj["token"] = userData.token

        apiRequest(hoursObj, "update_hours")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setEditHours(false)
                    setLoading(false)
                    x.alertWithType("success", "Success", "Hours Updated");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                setEditHours(false)
                x.alertWithType("error", "Error", "Internet Error");
            })

    }

    function onClick(t) {
        if (sameDaysArr.includes(t)) {
            var foundIndex = sameDaysArr.indexOf(t);
            var all = sameDaysArr;
            all.splice(foundIndex, 1);
            setSameDaysArr(all)
        }
        else {

            var all = sameDaysArr;
            all.push(t);
            setSameDaysArr(all)

        }
        console.log(sameDaysArr)
        forceUpdate();
    }

    function doAddTable() {
        var x = dropDownAlertRef;
        if (addTableV.title.length < 3) {
            x.alertWithType("error", "Error", "Invalid table name");
            return
        }
        if (!addTableV.table_id) {
            x.alertWithType("error", "Error", "Please enter a valid table id");
            return
        }
        if (!addTableV.capacity) {
            x.alertWithType("error", "Error", "Capacity is required");
            return
        }
        if (!addTableV.location) {
            x.alertWithType("error", "Error", "Location is required");
            return
        }
        setLoading(true)
        const addTableObj = {
            token: userData.token,
            title: addTableV.title,
            table_id: addTableV.table_id,
            capacity: addTableV.capacity,
            location: addTableV.location
        }
        apiRequest(addTableObj, "add_table")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    setAddtable(false)
                    x.alertWithType("success", "Success", "Table Added");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
                setAddtable(false)
            })
    }

    function doEditTable() {

        var x = dropDownAlertRef;
        if (editTableV.title === addTableV.title &&
            editTableV.capacity === addTableV.capacity &&
            editTableV.location === addTableV.location &&
            editTableV.table_id === addTableV.table_id
        ) {
            x.alertWithType("error", "Error", "Please update at least one");
            return
        }
        else {

            if (editTableV.title.length < 3) {
                x.alertWithType("error", "Error", "Invalid table name");
                return
            }
            if (!editTableV.table_id) {
                x.alertWithType("error", "Error", "Please enter a valid table id");
                return
            }
            if (!editTableV.capacity) {
                x.alertWithType("error", "Error", "Capacity is required");
                return
            }
            if (!editTableV.location) {
                x.alertWithType("error", "Error", "Location is required");
                return
            }

            setLoading(true)
            const editTableObj = {
                token: userData.token,
                title: editTableV.title,
                table_id: editTableV.table_id,
                capacity: editTableV.capacity,
                location: editTableV.location,
                id: editTableId
            }
            apiRequest(editTableObj, "update_table")
                .then(data => {
                    if (data.action == 'success') {
                        storeItem("login_data", data.data)
                            .then((v) => {
                                setLogindataGlobal()
                            })
                        setLoading(false)
                        setEditTable(false)
                        x.alertWithType("success", "Success", "Table Updated");

                    }
                    else {
                        x.alertWithType("error", "Error", data.error);
                        setLoading(false)
                    }
                })
                .catch(error => {
                    setLoading(false)
                    x.alertWithType("error", "Error", "Internet Error");
                    setEditTable(false)
                })
        }
    }

    function doEnableDisableTable(id) {

        var x = dropDownAlertRef;

        apiRequest({ token: userData.token, id: id }, "disable_enable_table")
            .then(data => {
                if (data.action == 'success') {
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setLoading(false)
                    x.alertWithType("success", "Success", "Table Updated");

                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
            })
    }


    useEffect(() => {
        console.log(userData)
    }, [])


    const toggleSwitch = () => setSameEveryDay(previousState => !previousState);
    const keyExtractor = (item, index) => { index.toString() }

    const Header = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "90%", alignSelf: 'center' }}>
            <ResturentBtmIcon />
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 10 }}>Restaurants</Text>
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




    const EditOrderSettingView = () => (
        <View style={{ width: "100%", }}>
            <TouchableOpacity
                onPress={() => { doChangeOrderSettings() }}
                style={{ width: "100%", marginTop: 15, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160' }}>Order settings</Text>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Settings</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}>
                {/* <TouchableOpacity style={{ marginTop: 10, paddingHorizontal: 10, width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrivacyPicker
                        data={[{ title: "Cafe" }]}
                        selected={{ title: 'Select' }}
                        onValueChange={(index, title) => {
                            console.log(title)
                            setChangeOrderSetting({
                                ...changeOrderSetting,
                            })
                            // setSelectedSystem(title.id)
                          }}

                    />
                </TouchableOpacity> */}
                {/* <TouchableOpacity style={{ marginTop: 10, paddingHorizontal: 10, width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}>Cafe</Text>
                    <ArrowDown />
                </TouchableOpacity> */}


                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Floor</Text>
                <TextInput
                    placeholder={userData?.floors}
                    style={styles.addTableInput}
                    onChangeText={(v) => {
                        setChangeOrderSetting({
                            ...changeOrderSetting,
                            floors: v
                        })
                    }}

                />
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Waiter Call</Text>

                <View style={{ marginTop: 10, paddingHorizontal: 10, width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrivacyPicker
                        data={[{ title: "Yes", }, { title: "No" }]}
                        selected={{ title: changeOrderSetting.waiter_call ? changeOrderSetting.waiter_call == "1" ? "Yes" : "No" : userData?.waiter_call == "1" ? "Yes" : "No" }}
                        onValueChange={(index, title) => {
                            console.log(title)
                            if (title.title == "Yes") {
                                setChangeOrderSetting({
                                    ...changeOrderSetting,
                                    waiter_call: '1'
                                })
                            }
                            else {
                                setChangeOrderSetting({
                                    ...changeOrderSetting,
                                    waiter_call: '0'
                                })
                            }
                        }}

                    />
                </View>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Outside Dining</Text>
                <View style={{ width: "100%", flexDirection: 'row', borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: 'rgba(129,150,170,0.5)' }}>
                    <TouchableOpacity
                        onPress={() => {
                            setOutsideDining(true)
                            setChangeOrderSetting({
                                ...changeOrderSetting,
                                outside_dinning: "1"
                            })
                        }}
                        style={{ width: "50%", borderTopLeftRadius: 8, borderBottomLeftRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: outsideDining ? '#F58B44' : "#fff" }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 14, color: outsideDining ? "#fff" : "#4A5160" }}>YES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setOutsideDining(false)
                            setChangeOrderSetting({
                                ...changeOrderSetting,
                                outside_dinning: "0"
                            })
                        }}
                        style={{ width: "50%", borderTopRightRadius: 8, borderBottomRightRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: !outsideDining ? '#F58B44' : "#fff" }}>
                        <Text style={{ fontFamily: 'PRe', fontSize: 14, color: !outsideDining ? "#fff" : "#4A5160" }}>No</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setEditOrderSetting(false)
                    }}
                    style={{ width: "50%", alignSelf: 'center', marginTop: 20, borderRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E85D4A' }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: "#fff" }}>Cancel</Text>
                </TouchableOpacity>

            </View>
        </View>
    )

    const OrderSettingView = () => (
        <View>
            <TouchableOpacity
                onPress={() => { setEditOrderSetting(true) }}
                style={{ width: "100%", marginTop: 15, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Order settings</Text>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Details</Text>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 10 }}>


                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Number floors</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.floors}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Outside Dining</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.outside_dinning == "1" ? "Yes" : "No"}</Text>
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Waiter Call</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginTop: 3 }}>{userData?.waiter_call == "1" ? "Waiter Call" : "No"}</Text>
                </View>
            </View>
        </View>
    )

    const EditOverViewImagesView = () => (
        <View>
            <View style={{ width: "100%", marginTop: 20, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Images</Text>
                <TouchableOpacity
                    onPress={() => { doUploadImgs() }}
                >
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginHorizontal: 10, }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Images</Text>
                <FlatList
                    horizontal={true}
                    style={{ marginTop: 10, marginLeft: -8 }}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    data={userData.images}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 8, width: 101, height: 101, borderRadius: 8, }}>
                            <Image
                                style={{ width: 101, height: 101, borderRadius: 8 }}
                                source={{ uri: urls.IMAGEURI + item.image }}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log(item)
                                    console.log(userData.token)
                                    Alert.alert(
                                        "Remove Image",
                                        'Are you sure you want to remove this image?',

                                        [
                                            { text: 'Yes', onPress: () => delImg(item.id) },

                                            { text: 'No', onPress: () => { } },
                                        ],
                                        { cancelable: true },
                                    );
                                }}
                                style={{ width: "100%", position: 'absolute', bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                                <TrashIcon />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <View style={{ width: "100%", marginTop: 10, alignItems: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
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
                        style={{ borderWidth: 1, borderColor: '#E3E3E3', width: 101, height: 101, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}>

                        <View>
                            <View style={{ alignSelf: 'center', width: 24, height: 24, borderRadius: 12, backgroundColor: '#FCF5EA', alignItems: 'center', justifyContent: 'center' }}>
                                <PlusSmall />
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44', marginTop: 15 }}>Add Image</Text>
                    </TouchableOpacity>
                    {
                        // imgsUrlToShow
                        imgsUrlForUpload?.map((v, index) => {
                            return (
                                <Image
                                    key={index}
                                    style={{ marginLeft: 10, width: 101, height: 101, borderRadius: 8 }}
                                    source={{ uri: urls.IMAGEURI + v }}
                                />
                            )
                        })
                    }

                </View>
                <TouchableOpacity
                    onPress={() => { setEditOverViewImages(false) }}
                    style={{ width: "50%", alignSelf: 'center', marginTop: 20, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View >
    )

    const OverViewHoursView = () => (

        <View style={{ marginHorizontal: 10 }}>
            <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Opening Hours</Text>
                    <TouchableOpacity
                        onPress={() => { setEditHours(true) }}
                    >
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Details</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ width: "95%", flexWrap: 'wrap', }}>
                    {
                        daysR.map((v, i) => {
                            return (
                                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, }}>
                                    <View style={{ marginLeft: 10, width: 48, height: 48, borderRadius: 24, backgroundColor: v == "Mon" ? "#E85D4A" : '#F58B44', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#FFF', textTransform: 'uppercase' }}>{v.substr(0, 3)}</Text>
                                    </View>
                                    {userData[v] == "0" ? <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#E85D4A', marginLeft: 15, alignSelf: 'center' }}>Closed</Text>
                                        :
                                        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>{userData[v + "_start"]}</Text>
                                            <Text style={{ marginLeft: 10, fontFamily: 'PRe', fontSize: 14, color: '#818CAA', marginHorizontal: 15 }}>To</Text>
                                            <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>{userData[v + "_end"]}</Text>

                                        </View>
                                    }
                                </View>
                            )
                        })
                    }
                </View>

            </View>
        </View>
    )

    const EditOverViewHoursView = () => (
        <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Hours</Text>
                <TouchableOpacity
                    onPress={() => {
                        setHoursForSameEveryDay(1, "08:00", "10:00")
                        // setEditHours(false) 
                    }}
                >
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Hours</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "95%", alignSelf: 'center', marginTop: 10, paddingHorizontal: 10, height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}>Same Every day</Text>
                <Switch
                    trackColor={{ false: "#F58B44", true: "#fff" }}
                    thumbColor={sameEveryDay ? "#F58B44" : "#fff"}
                    style={{ borderWidth: sameEveryDay ? 1 : 0, borderColor: '#F58B44' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={sameEveryDay}
                />

            </View>
            <View style={{ flexDirection: 'row', width: "95%", flexWrap: 'wrap', }}>
                {
                    daysR.map((v, i) => {

                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    onClick(v)
                                }}
                                key={i} style={{ marginTop: 15, marginLeft: 10, width: 50, height: 50, borderRadius: 25, paddingHorizontal: 10, backgroundColor: sameDaysArr.includes(v) ? '#F58B44' : '#E85D4A', alignItems: 'center', justifyContent: 'center' }}>
                                <Text numberOfLines={1} ellipsizeMode="clip" style={{ fontFamily: 'PSBo', fontSize: 12, color: '#FFF', textTransform: 'uppercase', textAlign: 'center', }}>{v}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15, textTransform: 'uppercase' }}>Select time</Text>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, marginTop: 10, alignItems: 'center' }}>
                <View style={{ borderWidth: 0.5, width: 90, height: 52, borderRadius: 9, borderColor: '#818CAA', }}>
                    <TimePicker
                        selected={{ title: sameDayStart ? sameDayStart : 'Select' }}
                        data={[{ title: "08:00" }]}
                        onValueChange={(t) => {
                            setSameDayStart(t)
                            console.log(t)
                        }}

                    />
                </View>
                <Text style={{ marginLeft: 10, fontFamily: 'PRe', fontSize: 14, color: '#818CAA', marginHorizontal: 15 }}>To</Text>

                <View style={{ borderWidth: 0.5, width: 90, height: 52, borderRadius: 9, borderColor: '#818CAA', }}>
                    <TimePicker
                        selected={{ title: sameDayEnd ? sameDayEnd : 'Select' }}
                        data={[{ title: "08:00" }]}
                        onValueChange={(t) => {
                            setSameDayEnd(t)
                        }}

                    />
                </View>

            </View>
            <TouchableOpacity
                onPress={() => { setEditHours(false) }}
                style={{ width: "50%", alignSelf: 'center', marginTop: 20, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#fff' }}>Cancel</Text>
            </TouchableOpacity>
        </View>

    )


    const OverViewImagesView = () => (
        <View>
            <View style={{ width: "100%", marginTop: 20, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Images</Text>
                <TouchableOpacity
                    onPress={() => { setEditOverViewImages(true) }}
                >
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Images</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
                {/* <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Images</Text> */}
                <FlatList
                    horizontal={true}
                    keyExtractor={keyExtractor}
                    style={{ marginTop: 10, marginLeft: -8 }}
                    showsHorizontalScrollIndicator={false}
                    data={userData.images}
                    renderItem={({ item }) => (
                        <View style={{ marginLeft: 8, width: 101, height: 101, borderRadius: 8, }}>
                            <Image
                                style={{ width: 101, height: 101, borderRadius: 8 }}
                                source={{ uri: urls.IMAGEURI + item.image }}
                            />
                        </View>
                    )}
                />

            </View>
        </View>
    )

    const ResturentOverView = () => (
        <View>
            <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                </View>
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>{userData?.title}</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>{userData?.sub_title}</Text>
                </View>
            </View>
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 20 }}>

                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', }}>Overview</Text>
                <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>

                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Overview</Text>
                        <TouchableOpacity
                            onPress={() => { setResEdit(true) }}
                        >
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Details</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginHorizontal: 10, }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, }}>
                            <View style={{ width: "50%" }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Category</Text>
                                <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.sub_title}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Phone number</Text>
                                <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.phone}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Addresses</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.address}</Text>

                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Description</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{userData?.description}</Text>
                        <TouchableOpacity style={{ marginTop: 15, paddingHorizontal: 10, width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}>{userData?.sub_title}</Text>
                            <ArrowDown />
                        </TouchableOpacity>
                    </View>
                    {
                        editOverViewImages ? <EditOverViewImagesView />
                            : <OverViewImagesView />

                    }


                    {
                        editOrderSetting ? <EditOrderSettingView />
                            :
                            <OrderSettingView />
                    }
                </View>

                {
                    editHours ?
                        <EditOverViewHoursView />
                        : <OverViewHoursView />
                }



            </View>
        </View>


    )

    const Tabs = () => (
        <View style={{ width: "90%", marginTop: 20, alignSelf: 'center', flexDirection: 'row', height: 35, borderColor: '#818CAA' }}>
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
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.one ? '#4A5160' : "#818CAA", }}>Overview</Text>
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
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.two ? '#4A5160' : "#818CAA", }}>All Tables</Text>
            </TouchableOpacity>



        </View>
    )

    const TableView = ({ item }) => (
        <View style={{ width: "100%", paddingBottom: 0, marginTop: 15, borderWidth: 1, borderRadius: 16, borderColor: '#E3E3E3' }}>
            <View style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>01</Text>
                    </View>
                    <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>{item.title}</Text>
                        <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>{item.table_id}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setEditTable(true)
                            setEditTableV({
                                ...editTableV,
                                location: item.location,
                                table_id: item.table_id,
                                capacity: item.capacity,
                                title: item.title
                            })
                            setEditTableId(item.id)
                        }}
                        style={{ position: 'absolute', right: 15, top: 10, }}>
                        <EditIcon />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, }}>
                    <View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', textTransform: 'uppercase' }}>Capacity</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{item.capacity}</Text>
                    </View>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', textTransform: 'uppercase' }}>Location</Text>
                        <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{item.location}</Text>
                    </View>
                </View>

            </View>
            <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: "100%", padding: 15, backgroundColor: 'rgba(245,138,68,0.3)', borderBottomRightRadius: 16, borderBottomLeftRadius: 16 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>{item.status == '1' ? "Active" : "Inactive"}</Text>
                <Switch
                    trackColor={{ false: "#F58B44", true: "#fff" }}
                    thumbColor={tableActive ? "#F58B44" : "#fff"}
                    style={{ borderWidth: tableActive ? 1 : 0, borderColor: '#F58B44' }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => {
                        doEnableDisableTable(item.id)
                    }}
                    value={item.status == "1" ? true : false}
                />
            </View>
        </View>
    )

    const TableTab = () => (
        <View>
            <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                </View>
                <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                    <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>{userData?.title}</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>{userData?.sub_title}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { setAddtable(true) }}
                    style={{ width: 120, height: 44, borderRadius: 8, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 15, }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff', }}>Add Table</Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', marginTop: 15 }}>All Tables</Text>
                <FlatList
                    data={userData?.tables}
                    keyExtractor={keyExtractor}
                    renderItem={TableView}
                />
                {/* <TableView />
                <TableView />
                <TableView /> */}


            </View>
        </View>
    )










    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={true} />
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <Header />

            <Tabs />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
                {
                    tabs.one ?
                        resEdit ?
                            <View>
                                <View style={{ paddingVertical: 15, width: width, flexDirection: 'row', borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, }}>
                                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#F58B44', alignItems: 'center', justifyContent: 'center', }}>
                                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#fff' }}>AL</Text>
                                    </View>
                                    <View style={{ marginLeft: 10, alignSelf: 'center' }}>
                                        <Text style={{ fontFamily: 'PMe', fontSize: 16, color: '#4A5160' }}>{userData?.title}</Text>
                                        <Text style={{ fontFamily: 'PRe', fontSize: 16, color: '#818CAA', }}>{userData?.sub_title}</Text>
                                    </View>
                                </View>
                                <View style={{ width: "90%", alignSelf: 'center', marginTop: 20 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', }}>Overview</Text>
                                    <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>

                                        <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Overview</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    doChangeOverViewSettings()
                                                    // setResEdit(false) 
                                                }}
                                            >
                                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Settings</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ marginHorizontal: 10, }}>
                                            <View style={{ flexDirection: 'row', marginTop: 20, }}>
                                                <View style={{ width: "50%" }}>
                                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Category</Text>
                                                    <View style={{ marginTop: 10, width: 152, height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <PrivacyPicker
                                                            data={[{ title: "Cafe", }]}
                                                            selected={{ title: "Select" }}
                                                            onValueChange={(index, title) => {
                                                                setChangeOverViewSetting({
                                                                    ...changeOverViewSetting,
                                                                    sub_title: title.title
                                                                })
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                <View>
                                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Phone number</Text>

                                                    <TextInput
                                                        style={{ marginTop: 10, paddingHorizontal: 10, width: 152, height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', flexDirection: 'row', color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                                                        placeholder={userData?.phone}
                                                        placeholderTextColor="#4A5160"
                                                        onChangeText={(text) => {
                                                            setChangeOverViewSetting({
                                                                ...changeOverViewSetting,
                                                                phone: text
                                                            })
                                                        }}
                                                    />
                                                </View>
                                            </View>
                                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Addresses</Text>
                                            <TextInput
                                                style={{ marginTop: 10, paddingHorizontal: 10, color: '#4A5160', fontFamily: 'PRe', fontSize: 14, width: "100%", paddingVertical: 15, borderRadius: 8, borderWidth: 0.5, borderColor: '#F58B44', }}
                                                placeholder={userData?.address}
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setChangeOverViewSetting({
                                                        ...changeOverViewSetting,
                                                        address: text
                                                    })
                                                }}

                                            />
                                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>Description</Text>
                                            <TextInput
                                                style={{ marginTop: 10, paddingHorizontal: 10, width: "100%", paddingVertical: 15, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', flexDirection: 'row', color: '#4A5160', fontFamily: 'PRe', fontSize: 14 }}
                                                placeholder={userData?.description}
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setChangeOverViewSetting({
                                                        ...changeOverViewSetting,
                                                        description: text
                                                    })
                                                }}

                                            />
                                            <TouchableOpacity
                                                onPress={() => { setResEdit(false) }}
                                                style={{ width: "50%", alignSelf: 'center', marginTop: 20, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#fff' }}>Cancel</Text>
                                            </TouchableOpacity>
                                        </View>

                                        {/*  */}

                                    </View>


                                </View>


                                <View style={{ marginHorizontal: 10 }}>
                                    <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
                                        <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                                            <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Opening Hours</Text>
                                            <TouchableOpacity>
                                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Settings</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <Text style={{ marginLeft: 10, fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginTop: 15 }}>TYPE</Text>


                                    </View>
                                </View>
                            </View>

                            :
                            <ResturentOverView />
                        :
                        <TableTab />
                }

                <Modal
                    isVisible={addTable}
                    backdropOpacity={1}
                    backdropColor="#707070"
                    swipeDirection="down"
                    animationOut="bounceInDown"
                    onSwipeComplete={() => { setAddtable(false) }}
                    style={{ margin: 0 }}
                >
                    <View style={{ zIndex: 1 }}>
                        <DropdownAlert ref={ref => dropDownAlertRef = ref} />
                    </View>
                    {loading && <Loader />}
                    <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                        <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>

                            <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
                            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Add New Table</Text>
                                <TouchableOpacity
                                    onPress={() => { setAddtable(false) }}
                                >
                                    <CloseIcon />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>

                                <View style={{ width: "92%", alignSelf: 'center', height: 300 }}>
                                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: "47%" }}>
                                            <Text style={styles.inputLabel}>Name</Text>
                                            <TextInput
                                                style={styles.addTableInput}
                                                placeholder="Table 9"
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setAddTableV({
                                                        ...addTableV,
                                                        title: text
                                                    })
                                                }}
                                            />

                                        </View>
                                        <View style={{ width: "47%", marginLeft: 10 }}>
                                            <Text style={styles.inputLabel}>Table ID</Text>
                                            <TextInput
                                                style={styles.addTableInput}
                                                placeholder="#TB109"
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setAddTableV({
                                                        ...addTableV,
                                                        table_id: text
                                                    })
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: "47%" }}>
                                            <Text style={styles.inputLabel}>Capacity</Text>
                                            <View style={{ width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#F58B44', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <PrivacyPicker
                                                    data={[{ title: "2", }, { title: "3" }, { title: "4" }, { title: "5" }, { title: "6" }, { title: "7" }, { title: "8" }, { title: "9" }, { title: "10" }]}
                                                    selected={{ title: "Select" }}
                                                    onValueChange={(index, title) => {
                                                        setAddTableV({
                                                            ...addTableV,
                                                            capacity: title.title
                                                        })
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: "47%", marginLeft: 10 }}>
                                            <Text style={styles.inputLabel}>Location</Text>
                                            <TouchableOpacity style={{ width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <PrivacyPicker
                                                    data={[{ title: "Outside", }, { title: "Inside" }]}
                                                    selected={{ title: "Select" }}
                                                    onValueChange={(index, title) => {
                                                        setAddTableV({
                                                            ...addTableV,
                                                            location: title.title
                                                        })
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>



                            </View>
                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                                <TouchableOpacity
                                    onPress={() => { setAddtable(false) }}
                                    style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => doAddTable()}
                                    style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Add Table</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>


                <Modal
                    isVisible={editTable}
                    backdropOpacity={1}
                    backdropColor="#707070"
                    swipeDirection="down"
                    animationOut="bounceInDown"
                    onSwipeComplete={() => { setEditTable(false) }}
                    style={{ margin: 0 }}
                >
                    <View style={{ zIndex: 1 }}>
                        <DropdownAlert ref={ref => dropDownAlertRef = ref} />
                    </View>
                    {loading && <Loader />}
                    <View style={{ height: height, width: width, }}>
                        <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>

                            <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>
                            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Edit Table</Text>
                                <TouchableOpacity
                                    onPress={() => { setEditTable(false) }}
                                >
                                    <CloseIcon />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>

                                <View style={{ width: "92%", alignSelf: 'center', height: 320 }}>
                                    {/* <View style={{ width: "47%" ,flexDirection:'row'}}>
                                <Text style={[styles.inputLabel,{fontSize:18}]}>Table Id : </Text>
                                <Text style={[{color:'#4A5160',fontSize:18,fontFamily:'PBo',marginTop:15,marginLeft:5} ]} >{editTableId}</Text>
                            </View> */}
                                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: "47%" }}>
                                            <Text style={styles.inputLabel}>Name</Text>
                                            <TextInput
                                                style={styles.addTableInput}
                                                placeholder={editTableV.title}
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setEditTableV({
                                                        ...editTableV,
                                                        title: text
                                                    })
                                                }}
                                            />

                                        </View>
                                        <View style={{ width: "47%", marginLeft: 10 }}>
                                            <Text style={styles.inputLabel}>Table ID</Text>
                                            <TextInput
                                                style={styles.addTableInput}
                                                placeholder={editTableV.table_id}
                                                placeholderTextColor="#4A5160"
                                                onChangeText={(text) => {
                                                    setEditTableV({
                                                        ...editTableV,
                                                        table_id: text
                                                    })
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View style={{ width: "100%", flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View style={{ width: "47%" }}>
                                            <Text style={styles.inputLabel}>Capacity</Text>
                                            <View style={{ width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#F58B44', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <PrivacyPicker
                                                    data={[{ title: "2", }, { title: "3" }, { title: "4" }, { title: "5" }, { title: "6" }, { title: "7" }, { title: "8" }, { title: "9" }, { title: "10" }]}
                                                    selected={{ title: editTableV.capacity }} ƒ
                                                    onValueChange={(index, title) => {
                                                        setEditTableV({
                                                            ...editTableV,
                                                            capacity: title.title
                                                        })
                                                    }}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: "47%", marginLeft: 10 }}>
                                            <Text style={styles.inputLabel}>Location</Text>
                                            <TouchableOpacity style={{ width: "100%", height: 52, borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                                <PrivacyPicker
                                                    data={[{ title: "Outside", }, { title: "Inside" }]}
                                                    selected={{ title: editTableV.location }} ƒ onValueChange={(index, title) => {
                                                        setEditTableV({
                                                            ...editTableV,
                                                            location: title.title
                                                        })
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>



                            </View>
                            <View style={{ position: 'absolute', bottom: 0, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                                <TouchableOpacity
                                    onPress={() => { setEditTable(false) }}
                                    style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => doEditTable()}
                                    style={{ width: 125, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Save Changes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>

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
    },

    addTableInput: {
        width: "100%",
        height: 52,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#818CAA',
        paddingHorizontal: 15,
        justifyContent: 'center',
        fontFamily: 'PRe',
        fontSize: 14,
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



export default Resturent
