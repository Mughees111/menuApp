import React, { useEffect, useState, useContext, useCallback } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView, FlatList, TextInput, Platform } from 'react-native'
import { ArrowDown, CalenderIcon, CloseIcon, TickIcon, EyeIcon, FilterIcon, PersonIcon, PersonIconSmall, RestMenuIcon, ResturentBtmIcon, ScheduleIcon, ShareIcon } from '../components/Svgs'
import Modal from 'react-native-modal';
import { StatusBar } from 'expo-status-bar';
import { Calendar } from 'react-native-calendars';

import { Context } from '../Context/DataContext';
import { apiRequest, doPost } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Alert } from 'react-native';
import { retrieveItem, storeItem } from '../utils/functions';
import { useFocusEffect } from '@react-navigation/core';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get('window');


var dropDownAlertRef;

const filterByTimeArr = [
    { showTime: "Morning", sendTime: "10:00" },
    { showTime: "Afternoon", sendTime: "2:30" },
    { showTime: "Evening", sendTime: "6:00" }
]
const filterByGuestArr = [
    "2",
    "4",
    "5"
]
const useForceUpdate = () => {
    const [, updateState] = React.useState();
    return useCallback(() => updateState({}), []);
}
var x = new Date();

var firstTime = true
const Reservation = () => {
    const forceUpdate = useForceUpdate()
    const { state, setLogindataGlobal } = useContext(Context);
    const [editSettings, setEditSettings] = useState(false)

    const [filters, setFilters] = useState(false)
    const currentDateObj = new Date();
    const [currentDate, setCurrentDate] = useState()

    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    const [selectedDate, setSelectedDate] = useState('')
    const [startDateView, setStartDateView] = useState(false);


    const [bookingsLimitModal, setBookingsLimitModal] = useState(false);
    const [timeModal, setTimetModal] = useState(false);
    const [bookingsLimitIndex,setBookingsLimitIndex]  = useState(0)

    const [step, setStep] = useState(1)

    const [loading, setLoading] = useState(false);
    const [liveBookings, setLiveBookings] = useState([])
    const [bookings, setBookings] = useState([])
    const [deletes, setDeletes] = useState([])
    const [new_slots, setnew_slots] = useState([])
    const [overViews, setOverViews] = useState()
    const [sharing, setSharing] = useState(false)
    const [tabs, setTabs] = useState({
        one: true,
        two: false,
        three: false,
    })

    const [filterByTimeAndGuest, setFilterByTimeAndGuest] = useState(false);
    const [filterByTime, setFilterByTime] = useState('')
    const [filterByGuest, setFilterByGuest] = useState('');
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('');
    const [filterByDateFromOrTo, setFilterByDateFromOrTo] = useState(null)
    const [filterByDateModal, setFilterByDateModal] = useState(false)


    const [user, setUser] = React.useState({})
    useFocusEffect(React.useCallback(() => {
        retrieveItem("login_data").then((data) => {
            setUser(data);
        })
    }, []))

    useEffect(()=>{
        if(user && user?.token!=undefined && firstTime)
        {
            firstTime=false;
            setDate();
            getLiveBooking();
            getOverView();
        }
    },[user])

    const keyExtractor = (item, index) => { index.toString() }


    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    function setDate() {
        var month = currentDateObj.getMonth() + 1
        var date = currentDateObj.getDate();
        if (month != '11' || month != '12') {
            if (date < 10) {
                date = "0" + date;
            }
            month = "0" + month;
            setCurrentDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
            setSelectedDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
        }
        else {
            if (date < 10) {
                date = "0" + date;
            }
            setCurrentDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
            setSelectedDate(currentDateObj.getFullYear() + '-' + month + '-' + date)
        }
    }

    function getOverView() {
        setLoading(true)
        var x = dropDownAlertRef;
        if (user?.token) {
            const bookingObj = { token: user?.token }
            apiRequest(bookingObj, "filter_bookings")
                .then(data => {
                    if (data.action == 'success') {
                        setBookings(data.overview.bookings)
                        setOverViews(data.overview.overview)
                        setLoading(false)
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
    }



    function getLiveBooking() {
        setLoading(true)
        var x = dropDownAlertRef;
        if (user?.token) {
            const bookingObj = { token: user?.token }
            apiRequest(bookingObj, "live_booking")
                .then(data => {
                    if (data.action == 'success') {
                        setLiveBookings(data.bookings)
                        setLoading(false)
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
    }

    function declinedBooking(id) {
        var x = dropDownAlertRef
        setLoading(true)
        const decObj = { token: user?.token, id: id }
        apiRequest(decObj, "decline_booking")
            .then(data => {
                setLoading(false)

                if (data.action == 'success') {
                    console.log('data = ')
                    console.log(data)
                    setBookings(data.bookings)
                    x.alertWithType("success", "success", "Booking Declined Successfully");
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

    function stop_or_start_sharing() {

        var x = dropDownAlertRef;
        setLoading(true)
        apiRequest({ token: user?.token, }, 'stop_or_start_sharing')
            .then(data => {
                if (data.action == 'success') {
                    setSharing(true)
                    console.log(data)
                    x.alertWithType("success", "Success", "Sharing Updated");
                    storeItem("login_data", data.data)
                        .then((v) => {
                            setLogindataGlobal()
                        })
                    setSharing(false)
                    setLoading(false)
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

    function doFilterByTime_Guest() {

        var x = dropDownAlertRef;
        console.log(filterByTime)
        console.log(filterByGuest)
        setLoading(true)
        if (!filterByTime && !filterByGuest) {
            x.alertWithType("error", "Error", "Please select at least one filter");
            setLoading(false)
            return
        }
        const filterObj = {
            token: user?.token,
            time: filterByTime,
            guests: filterByGuest
        }
        apiRequest(filterObj, 'filter_bookings')
            .then(data => {
                if (data.action == 'success') {
                    setBookings(data.overview.bookings)
                    setOverViews(data.overview.overview)
                    setLoading(false)
                    setFilterByTimeAndGuest(false)
                }
                else {
                    x.alertWithType("error", "Error", data.error);
                    setLoading(false)
                    setFilterByTimeAndGuest(false)
                }

            })
            .catch(error => {
                setLoading(false)
                x.alertWithType("error", "Error", "Internet Error");
                setFilterByTimeAndGuest(false)

            })

    }

    function doFilterByDate() {
        var x = dropDownAlertRef;
        if (!startDate) {
            x.alertWithType("error", "Error", "Please select From Date");
            return
        }
        if (!endDate) {
            x.alertWithType("error", "Error", "Please select To Date");
            return
        }
        const filterObj = {
            token : user?.token,
            to_date : formatDate(endDate),
            from_date : formatDate(startDate)
        }
        apiRequest(filterObj, 'filter_bookings')
        .then(data => {
            if (data.action == 'success') {
                setBookings(data.overview.bookings)
                setOverViews(data.overview.overview)
                setLoading(false)
            }
            else {
                x.alertWithType("error", "Error", data.error);
                setLoading(false)
                setFilterByTimeAndGuest(false)
            }

        })
        .catch(error => {
            setLoading(false)
            x.alertWithType("error", "Error", "Internet Error");
            setFilterByTimeAndGuest(false)

        })
        setLoading(true)
    }

    function updateSettings() {
        var x = dropDownAlertRef;
        if (user.slot_settings.length==0) {
            x.alertWithType("error", "Error", "Please add at least 1 slot ");
            return
        }

        setEditSettings(false);
        setLoading(true);
        
        const filterObj = {
            token : user?.token,
            deletes,
            old_slots:user?.slot_settings
        }
        apiRequest(filterObj, 'update_slots')
        .then(data => {
            if (data.action == 'success') {
                storeItem("login_data",data.data).then(()=>{
                    setUser(data.data);
                    setEditSettings(false);
                    setLoading(false)
                })
                
                
            }
            else {
                x.alertWithType("error", "Error", data.error);
                setLoading(false)
                setFilterByTimeAndGuest(false)
            }

        })
        .catch(error => {
            setLoading(false)
            x.alertWithType("error", "Error", "Internet Error");

        })
    }

   

    const Header = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "90%", alignSelf: 'center' }}>
            <RestMenuIcon />
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 10 }}>Reservation</Text>
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
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.one ? '#4A5160' : "#818CAA", }}>Live Booking</Text>
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
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.two ? '#4A5160' : "#818CAA", }}>Overview</Text>
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

    const renderLiveBooking = ({ item, index }) => (
        <TouchableOpacity style={{ width: "90%", alignSelf: 'center', padding: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 16, marginTop: 15 }}>
            <View

                style={{ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4C471' }}
            >
                <Image
                    source={require('../assets/img2.png')}
                />
            </View>

            <View style={{ marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160' }}>{item.friendly_time}</Text>
                <Text style={{ color: '#818CAA', fontFamily: 'PRe', fontSize: 16, }}>{item?.name}</Text>
            </View>
            <View style={{ position: 'absolute', right: 12, }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#54C2BB' }}>{item?.guests} Guests</Text>
                <Text style={{ color: '#818CAA', fontFamily: 'PRe', fontSize: 14, textAlign: 'right' }}>
                    {item?.day}
                    {/* Day */}
                </Text>
            </View>

        </TouchableOpacity>
    )

    const BookingView = ({ item,index }) => (
        <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>
            <View style={{ width: "100%", paddingTop: 15, paddingBottom: 20, paddingHorizontal: 10, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, }}>

                <View style={{ flexDirection: 'row', }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Name</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5 }}>{item?.name}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Booking on</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5 }}>{item?.booking_on}</Text>
                    </View>
                </View>
                {
                    !item?.less &&
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', }}>No. Of Guest</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PersonIconSmall />
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5, marginLeft: 5 }}>X0{item?.guests}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Phone number</Text>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5 }}>{item?.phone}</Text>
                        </View>
                    </View>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                    <TouchableOpacity
                    onPress={()=>{
                        var all = bookings
                        all[index].less = !all[index].less
                        setBookings(all)
                        forceUpdate()
                    }}
                    style={{ width: "48%", height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#F58B44' }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>View {item?.less ? "more" :"less"}</Text>
                    </TouchableOpacity>
                    {

                        item?.declined == "NO" &&
                        <TouchableOpacity
                            onPress={() => declinedBooking(item.id)}
                            style={{ width: "48%", height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#E85D4A' }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Decline</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <View style={{ paddingHorizontal: 10 }}>
                <View style={{ flexDirection: 'row', marginTop: 30, }}>
                    <View style={{ width: "50%" }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', }}>Booking Date</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5, }}>{item?.booking_date_slash} | {item?.booking_time_slash}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Booking ID</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#4A5160', marginTop: 5 }}>#{item?.id}</Text>
                    </View>
                </View>
                {/* <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#818CAA', marginTop: 10 }}>Message</Text>
                <View style={{ width: "100%", padding: 10, borderWidth: 0.5, borderColor: '#818CAA', marginTop: 8, borderRadius: 8 }}>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160' }}>Thank you for booking here is your table number</Text>
                </View>
                <TouchableOpacity style={{ width: "48%", height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#F58B44', marginTop: 15 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Send Message</Text>
                </TouchableOpacity> */}
            </View>
        </View >
    )

    const OverviewTab = () => (
        <View>
            <View style={{ height: 45, width: "100%", flexDirection: 'row', borderBottomWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        setStep(1)
                        // setFilterByDateFromOrTo(true)
                        setFilterByDateModal(true)
                    }}
                    style={{ width: "43%", flexDirection: 'row', borderRightWidth: 0.5, borderColor: '#818CAA', height: "100%", alignItems: 'center', paddingRight: 8 }}>
                    <CalenderIcon style={{ marginLeft: 5 }} />
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginLeft: 2 }}>From</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginLeft: 5 }}>{formatDate(startDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setStep(2)

                        setFilterByDateModal(true)
                    }}
                    style={{ width: "38%", flexDirection: 'row', borderRightWidth: 0.5, borderColor: '#818CAA', height: "100%", alignItems: 'center', paddingRight: 8 }}>
                    <CalenderIcon style={{ marginLeft: 5 }} />
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA', marginLeft: 2 }}>To</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginLeft: 5 }}>{formatDate(endDate)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => doFilterByDate()}
                    style={{ paddingLeft: 15, height: "100%", alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#F58B44', fontFamily: 'PSBo', fontSize: 14, }}>Apply</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: "90%", alignSelf: 'center' }}>

                <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', marginTop: 15 }}>Overview</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "100%", marginTop: 10 }}>
                    <View style={{ width: "48%", height: 111, borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 16, padding: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160' }}>{overViews?.bookings}</Text>
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ width: "60%", fontFamily: 'PMe', fontSize: 14, color: '#818CAA' }}>Total no of Bookings</Text>
                            <RestMenuIcon />
                        </View>
                    </View>

                    <View style={{ width: "48%", height: 111, borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 16, padding: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160' }}>{overViews?.guests}</Text>
                        <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                            <Text style={{ width: "60%", fontFamily: 'PMe', fontSize: 14, color: '#818CAA' }}>Total no of Guests</Text>
                            <PersonIcon />
                        </View>
                    </View>
                </View>
                <View style={{ width: "48%", height: 111, borderWidth: 1, borderColor: '#E3E3E3', borderRadius: 16, padding: 15, marginTop: 15 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160' }}>{overViews?.view}</Text>
                    <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between', marginTop: 10 }}>
                        <Text style={{ width: "60%", fontFamily: 'PMe', fontSize: 14, color: '#818CAA' }}>Total{"\n"}menu</Text>
                        <EyeIcon />
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>All Bookings</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setFilterByTimeAndGuest(true)
                            // setFilters(true)
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                        <FilterIcon />
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Filter</Text>
                        <View style={{ marginLeft: 10 }}>
                            <ArrowDown />
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    !bookings.length && <Text style={{ marginTop: 20, fontFamily: 'PSBo', fontSize: 16, alignSelf: 'center', color: '#818CAA' }}>No Bookings</Text>
                }
                <FlatList
                    data={bookings}
                    keyExtractor={keyExtractor}
                    renderItem={BookingView}
                />

            </View>
            
        </View>

    )

    const SettingsTab = () => (
        <View style={{ width: "92%", alignSelf: 'center', marginTop: 20 }}>
            <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', }}>Settings</Text>
            <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Reservation Settings</Text>
                    <TouchableOpacity
                        onPress={() => { setEditSettings(true) }}
                    >
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#F58B44' }}>Edit Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15,paddingTop:20 }}>
                    <View style={{ flexDirection: 'row', marginTop: 0 }}>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Reservation Times</Text>
                        </View>
                        <View style={{ width: "50%" }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>No of guest</Text>
                        </View>
                    </View>
                        {
                            user?.slot_settings?.map((v,i)=>{
                                return (
                                    <View style={{ flexDirection: 'row', marginTop: 0}}>

                                        <View style={{ width: "50%" }}>
                                            <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{v?.slot}</Text>
                                           
                                        </View>
                                        <View>
                                            <Text style={{ color: '#4A5160', fontFamily: 'PRe', fontSize: 14, marginTop: 5 }}>{v?.bookings}</Text>
                                           
                                        </View>
                                    </View>
                                )
                            })
                        }
                    
                    <TouchableOpacity
                        onPress={() => stop_or_start_sharing()}
                        style={{ width: "48%", height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#E85D4A', marginTop: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>{state.loginData.is_sharing == '1' ? "Stop Sharing" : "Start Sharing"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
        </View>
    )

    const EditSettingsView = () => (
        <View style={{ width: "92%", alignSelf: 'center', marginTop: 20 }}>
            <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', }}>Settings</Text>
            <View style={{ marginTop: 20, width: "100%", borderColor: '#E3E3E3', borderRadius: 16, borderWidth: 1, paddingBottom: 15 }}>

                <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Reservation Settings</Text>
                    <TouchableOpacity
                        onPress={() => { updateSettings() }}
                    >
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#54C2BB' }}>Save Settings</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15, }}>
                        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
                            <View style={{ width: "48%" }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Reservation Times</Text>
                            </View>
                            <View style={{ width: "48%" }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>No of guest</Text>
                            </View>
                        </View>
                        <View style={{width:"100%",flexWrap:"wrap"}}>
                            {
                                user?.slot_settings?.map((v,i)=>{
                                    return (
                                        <View style={{ flexDirection: 'row', marginTop: 0, justifyContent: 'space-between' }}>
                                            <View style={{ width: "48%" }}>
                                                <View style={{  width: "100%",  flexDirection:"row", borderWidth: 0.5, borderRadius: 8, height: 52, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, marginTop: 10 }}>
                                                    <ScheduleIcon />
                                                    <TouchableOpacity
                                                    style={{ marginLeft: 5, width: "55%", }}
                                                    onPress={()=>{
                                                        setBookingsLimitIndex(i)
                                                        var ry = parseInt(user.slot_settings[bookingsLimitIndex].slot_core_h)
                                                        var ryy = parseInt(user.slot_settings[bookingsLimitIndex].slot_core_m)
                                                        x.setHours(ry,ryy);
                                                        setTimeout(()=>{
                                                            setTimetModal(true)
                                                        },100)
                                                    }}
                                                    >
                                                        
                                                        <TextInput
                                                            
                                                            editable={false}
                                                            placeholder={v?.slot}
                                                            placeholderTextColor="#4A5160"
                                                            style={{ marginLeft: 5, paddingLeft: 5, fontFamily: 'PRe', fontSize: 14, color: '#4A5160', height: "100%", alignItems: 'center', }}
                                                        />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={()=>{
                                                        if(user?.slot_settings?.length==1) return
                                                        var all = deletes
                                                        all.push(v?.id)
                                                        var all2 = user
                                                        all2?.slot_settings?.splice(i,1)
                                                        setDeletes(all)
                                                        setUser(all2)
                                                        forceUpdate()
                                                    }}>
                                                        <CloseIcon />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                            <View style={{ width: "48%" }}>

                                                <TouchableOpacity
                                                onPress={()=>{
                                                    setBookingsLimitIndex(i)
                                                    setBookingsLimitModal(true)
                                                }}
                                                style={{ flexDirection: 'row', width: "100%", borderWidth: 0.5, borderRadius: 8, height: 52, borderColor: '#818CAA', alignItems: 'center', paddingHorizontal: 10, marginTop: 10, justifyContent: 'space-between' }}>
                                                    <Text style={{ marginLeft: 5, fontFamily: 'PRe', fontSize: 14, color: '#4A5160', }}>{v?.bookings}</Text>
                                                    <View>
                                                        <ArrowDown />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                           

                      
                    <TouchableOpacity 
                    onPress={()=>{
                        var nn = {
                            id:-1,
                            slot:"12:30 pm",
                            bookings:250
                        }

                        var all = user
                        user.slot_settings.push(nn)
                        setnew_slots(all)
                        forceUpdate()
                    }}
                    style={{ width: "48%", height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 8, backgroundColor: '#F58B44', marginTop: 15 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Add More</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {SelectBookingNumber()}
            {
              timeModal?
            
            <View style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              width: "100%"
            }}>


              

              <View style={{ width: "100%" }}>
                {Platform.OS=="ios" && 
                <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:"#fff",paddingVertical:5,paddingHorizontal:20}}>
                  <Text onPress={()=>{
                  }} style={{color:"grey"}}></Text>
                  <Text onPress={()=>{
                    setTimetModal(false);

                  }} style={{color:"blue"}}>Confirm</Text>
                </View>
                }
                <DateTimePicker
                  testID="dateTimePicker"
                  style={{backgroundColor:"#fff"}}
                  value={x}
                  mode={"time"}
                  
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? "spinner" : "default"}
                  onChange={(d,date) => {
                    setTimetModal(false)
                    if(d.type=="set")
                    {
                        var all = user
                        all.slot_settings[bookingsLimitIndex].slot = formatTime(date)
                        setUser(all)
                        forceUpdate()
                    }
                      

                    // this.setState({ date_time_show2:Platform.OS!="android" , dateTimeTemp:date, f_time:this.formatTime(date)});
                   
                    
                  }}
                />
              </View>
            </View>:null}
        </View>
    )
    function formatTime(date)
    {
        var date = new Date(date);

        
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();

        if(hours<10) hours ="0"+ hours;
        if(minutes<10) minutes ="0"+ minutes;
        if(seconds<10) seconds ="0"+ seconds;

        var am = " am";
        if(hours>12)
        {
            hours = hours-12;
            am = " pm";
        }


        return hours+":"+minutes + am;
    }

    const getMinDate=()=>{
        if(step==1) return null;
        else return startDate;
    }

    const FilterByDatView = () => (
        <Modal
            isVisible={filterByDateModal}
            backdropOpacity={1}
            backdropColor="#707070"
            swipeDirection="down"
            animationOut="bounceInDown"
            onSwipeComplete={() => { setFilterByDateModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>


                <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Select Filter</Text>
                        <TouchableOpacity
                            onPress={() => { setFilterByDateModal(false) }}
                        >
                            <CloseIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>

                        <Calendar
                            style={{ width: "96%", alignSelf: 'center', }}
                            onDayPress={(day) => {
                                // setSelectedDate(day.dateString)
                                // if the filterByDateFromOrTo == true it indicates that user select from date else user select to date
                                // if (filterByDateFromOrTo) {
                                //     setFromDate(day.dateString)
                                // }
                                // else if (!filterByDateFromOrTo) setToDate(day.dateString)
                                var d = new Date(day.dateString)
                                if(step==1)
                                {
                                    setStartDate(d)
                                }
                                else{
                                    setEndDate(d)
                                }
                                
                                setFilterByDateModal(false)
                            }}
                            current={step==1?startDate:endDate}
                            minDate={getMinDate()}
                            enableSwipeMonths={true}
                            markingType={'custom'}
                            // disableArrowLeft={true}
                            theme={{
                                selectedDayBackgroundColor: 'red',
                                arrowColor: '#001833',
                                todayTextColor: '#0A0A16',
                                dayTextColor: '#4A5160',
                                textDisabledColor: '#E3E3E3',
                                monthTextColor: '#818CAA',
                                textDayFontSize: 10, // dates 1 ,2,3,4
                                textMonthFontSize: 12,
                                textMonthFontFamily: 'PSBo',
                                textSectionTitleColor: '#818CAA',
                                textDayHeaderFontSize: 12,
                                textDayHeaderFontFamily: "PSBo"

                            }}
                            markedDates={{
                                [ step==1? formatDate( startDate ) : formatDate(endDate)]: {
                                    customStyles: {
                                        container: {
                                            backgroundColor: '#F58B44',
                                            height: 40,
                                            width: 40,
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            borderRadius: 20,
                                            shadowColor: "#000000",
                                            shadowOffset: {
                                                width: 0.1,
                                                height: 0.1,
                                            },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 0.4,
                                            elevation: 2,
                                        },
                                        text: {
                                            color: '#FFFFFF',
                                            fontFamily: 'PRe',
                                            fontSize: 14
                                        }
                                    }
                                }



                            }}
                        />


                        <View style={{ marginTop: 20, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                            <TouchableOpacity
                                onPress={() => { setFilterByDateModal(false) }}
                                style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setFilterByDateModal(false),doFilterByDate() }}
                                style={{ width: 95, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Apply</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )


    const FilterbyTime_GuesView = () => (
        <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
            <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>

            <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Select Filter</Text>
                <TouchableOpacity
                    onPress={() => { setFilterByTimeAndGuest(false) }}
                >
                    <CloseIcon />
                </TouchableOpacity>
            </View>
            <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }} >
                    <View style={{ width: "92%", alignSelf: 'center' }}>
                        <Text style={styles.inputLabel}>TIME</Text>
                        {
                            filterByTimeArr.map((v, index) => {
                                return (
                                    <View key={index} style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFilterByTime(v.sendTime)
                                            }}
                                            style={filterByTime == v.sendTime ? styles.selectedFilter : styles.unSelectedFilter}>
                                            {filterByTime == v.sendTime && <TickIcon />}
                                        </TouchableOpacity>
                                        <Text style={styles.filterText}>{v.showTime}</Text>
                                    </View>
                                )
                            })
                        }
                        <Text style={[styles.inputLabel, { marginTop: 20 }]}>No. Of guest</Text>

                        {
                            filterByGuestArr.map((v,i) => {
                                return (
                                    <View key={i} style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setFilterByGuest(v)
                                            }}
                                            style={filterByGuest == v ? styles.selectedFilter : styles.unSelectedFilter}>
                                            {filterByGuest == v && <TickIcon />}
                                        </TouchableOpacity>
                                        <Text style={styles.filterText}>{v}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </ScrollView>

            </View>
            <View style={{ position: 'absolute', bottom: 120, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                <TouchableOpacity
                    onPress={() => { setFilterByTimeAndGuest(false) }}
                    style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => doFilterByTime_Guest()// setFilterByTimeAndGuest(false) 
                    }
                    style={{ width: 100, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Apply</Text>
                </TouchableOpacity>

            </View>
        </View >


    )

    const SelectBookingNumber = () => (
        <Modal
            isVisible={bookingsLimitModal}
            backdropOpacity={1}
            backdropColor="#707070"
            swipeDirection="down"
            animationOut="bounceInDown"
            onSwipeComplete={() => { setBookingsLimitModal(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>


                <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Select Filter</Text>
                        <TouchableOpacity
                            onPress={() => { setBookingsLimitModal(false) }}
                        >
                            <CloseIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>

                        
                            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                            <View style={{ width: "92%", alignSelf: 'center' }}>
                                <Text style={styles.inputLabel}>Limit</Text>
                                {
                                    [10,20,30,40,50,100,200,400,1000].map((v, index) => {
                                        return (
                                            <View key={index} style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // setFilterByTime(v.sendTime)

                                                        var all = user
                                                        all.slot_settings[bookingsLimitIndex].bookings = v;
                                                        setUser(all)
                                                        forceUpdate()
                                                        setBookingsLimitModal(false)
                                                    }}
                                                    style={[user?.slot_settings?.[bookingsLimitIndex].bookings == v ? styles.selectedFilter : styles.unSelectedFilter]}>
                                                    {user?.slot_settings?.[bookingsLimitIndex].bookings == v && <TickIcon />}
                                                </TouchableOpacity>
                                                <Text style={styles.filterText}>{v}</Text>
                                            </View>
                                        )
                                    })
                                }
                                
                            </View>
                        </ScrollView>

                        <View style={{ marginTop: 20, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                            <TouchableOpacity
                                onPress={() => { setBookingsLimitModal(false) }}
                                style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setBookingsLimitModal(false),doFilterByDate() }}
                                style={{ width: 95, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Apply</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>

        </Modal>


    )


    if (filterByTimeAndGuest) {
        return (
            <View>
                <View style={{ zIndex: 1 }}>
                    <DropdownAlert ref={ref => dropDownAlertRef = ref} />
                </View>
                {loading && <Loader />}
                <FilterbyTime_GuesView />
            </View>
        )
    }

    else return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}

            <Header />
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 20 }}>
                <Tabs />
            </View>

            {
                tabs.one &&
                <View>
                    <Text style={{ marginLeft: "5%", fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', marginTop: 15, marginBottom: 10, }}>Live Booking</Text>
                    <FlatList
                        data={liveBookings}
                        keyExtractor={keyExtractor}
                        renderItem={renderLiveBooking}
                        contentContainerStyle={{ paddingBottom: 350 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

            }
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
                {
                    tabs.two &&
                    <OverviewTab />
                }
                {
                    tabs.three ?
                        editSettings ?
                            <EditSettingsView />
                            :
                            <SettingsTab />
                        : null
                }

            </ScrollView>
            <FilterByDatView />

        </View>
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
    filterText: {
        fontFamily: 'PRe',
        fontSize: 14,
        color: "#4A5160",
        marginLeft: 15
    },
    unSelectedFilter: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderColor: '#818CAA',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        backgroundColor: '#fff'
    },
    selectedFilter: {
        width: 24,
        height: 24,
        borderRadius: 4,
        borderColor: '#818CAA',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        backgroundColor: "#54C2BB"
    }
});


export default Reservation
