import React, { useState, useEffect, useContext } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { ArrowDown, CloseIcon, DashboardIcon, EyeIcon, PersonIcon, RestMenuIcon, TickIcon, ShareIcon } from '../components/Svgs'

import { StatusBar } from 'expo-status-bar';
import Modal from 'react-native-modal';

import { Context } from '../Context/DataContext';
import { apiRequest, doPost } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';

const { width, height } = Dimensions.get('window');





var dropDownAlertRef;

const Dashboard = () => {

    const { state, setLogindataGlobal } = useContext(Context);
    const [loading, setLoading] = useState(false)
    const [filters, setFilters] = useState(false)
    const [overViews, setOverViews] = useState();
    const [charts, setCharts] = useState([]);

    const [tabs, setTabs] = useState({
        one: true,
        two: false,
        three: false,
    })

    async function getData() {
        setLoading(true)
        var x = dropDownAlertRef;
        if (state.loginData.token) {
            apiRequest({ token: state.loginData.token }, 'get_dashboard')
                .then(data => {
                    if (data.action == 'success') {
                        setOverViews(data.dashboard.overview)
                        setCharts(data.dashboard.chart.data)
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
        else {
            setLogindataGlobal();
            setLoading(false)
        }
       
    }


    useEffect(() => {
        getData();
    }, [state.loginData.token])
    useEffect(() => {
        setLogindataGlobal();
    }, [state.loginData.token])



    const Header = () => (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, width: "90%", alignSelf: 'center' }}>
            <DashboardIcon />
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 10 }}>Dashboard</Text>
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
        <View style={{ flexDirection: 'row', height: 50, borderBottomWidth: 0.5, borderColor: '#818CAA' }}>
            <TouchableOpacity
                onPress={() => {
                    setTabs({
                        ...tabs,
                        one: true,
                        two: false
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
                        two: true
                    })
                }}
                style={{ height: "100%", borderBottomWidth: tabs.two ? 1 : 0, borderColor: '#F58B44', marginLeft: 15 }}>
                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: tabs.two ? '#4A5160' : "#818CAA", }}>Total booking</Text>
            </TouchableOpacity>

        </View>
    )

    const FilterView = () => (
        <Modal
            isVisible={filters}
            backdropOpacity={1}
            backdropColor="#707070"
            swipeDirection="down"
            animationOut="bounceInDown"
            onSwipeComplete={() => { setFilters(false) }}
            // onSwipeMove={() => { setAddNewItemModal(false) }}
            style={{ margin: 0 }}
        >
            <View style={{ height: height, width: width, backdropColor: "#818CAA" }}>
                <View style={{ width: 40, height: 4, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: 20 }}></View>


                <View style={{ position: 'absolute', bottom: 0, width: "100%" }}>
                    <View style={{ width: "100%", paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 20, paddingHorizontal: 15, backgroundColor: '#FCF5EA', borderTopRightRadius: 16, borderTopLeftRadius: 16, marginTop: 20 }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 16, color: '#4A5160', }}>Select Filter</Text>
                        <TouchableOpacity
                            onPress={() => { setFilters(false) }}
                        >
                            <CloseIcon />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "100%", backgroundColor: 'white', height: "100%" }}>
                        <View style={{ width: "92%", alignSelf: 'center' }}>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0, backgroundColor: "#54C2BB" }}>
                                    <TickIcon />
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Today</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Last 7 days</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>Last 30 days</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {

                                    }}
                                    style={{ width: 24, height: 24, borderRadius: 4, borderColor: '#818CAA', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, backgroundColor: '#fff' }}>
                                </TouchableOpacity>
                                <Text style={{ fontFamily: 'PRe', fontSize: 14, color: "#4A5160", marginLeft: 15 }}>All Time</Text>
                            </View>


                        </View>


                        <View style={{ marginTop: 20, flexDirection: 'row', width: width, height: 65, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 20 }}>
                            <TouchableOpacity
                                onPress={() => { setFilters(false) }}
                                style={{ width: 89, height: 44, borderRadius: 8, backgroundColor: '#E85D4A', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setFilters(false) }}
                                style={{ width: 95, height: 44, borderRadius: 8, backgroundColor: '#54C2BB', alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Apply</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ zIndex: 1 }}>
                <DropdownAlert ref={ref => dropDownAlertRef = ref} />
            </View>
            {loading && <Loader />}
            <StatusBar hidden={true} />
            <Header />
            <View style={{ width: "90%", alignSelf: 'center', marginTop: 20 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
                    <Tabs />
                    <View style={{ width: "100%", paddingTop: 15, height: 200, paddingBottom: 20, paddingLeft: 20, borderRadius: 8, backgroundColor: '#FCF5EA', marginTop: 20 }}>

                        <View style={{ width: "70%" }}>
                            <Text style={{ fontFamily: 'PMe', fontSize: 20, color: '#4A5160' }}>Create your{"\n"}Menu and share it</Text>
                            <Text style={{ color: '#818CAA', fontSize: 14, fontFamily: 'PRe', marginTop: 10 }}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, </Text>
                            <TouchableOpacity style={{ width: 140, height: 44, backgroundColor: '#F58B44', borderRadius: 8, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#fff' }}>Create Menu</Text>

                            </TouchableOpacity>
                        </View>
                        <Image
                            style={{ position: 'absolute', top: 20, right: 0, overflow: 'hidden', width: 161, height: 165 }}
                            source={require('../assets/img1.png')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160' }}>Overview</Text>
                        <TouchableOpacity
                            onPress={() => { setFilters(true) }}
                            style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#818CAA' }}>Last 30 Days</Text>
                            <ArrowDown style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>

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
                            <Text style={{ width: "60%", fontFamily: 'PMe', fontSize: 14, color: '#818CAA' }}>Total Menu</Text>
                            <EyeIcon />
                        </View>
                    </View>
                    {/* <Text style={{ fontFamily: 'PSBo', fontSize: 18, color: '#4A5160', marginTop: 15 }}>1000</Text> */}
                    <Image
                        source={require('../assets/graph.png')}
                        style={{ width: "100%", resizeMode: 'stretch', marginTop: 15 }}
                    />

                </ScrollView>
            </View>
            <FilterView />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

});


export default Dashboard
