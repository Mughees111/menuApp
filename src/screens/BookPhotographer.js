import React, { useState, useEffect, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { ArrowDown, ArrowLeft } from '../components/Svgs'
import { Calendar } from 'react-native-calendars';

import { Context } from '../Context/DataContext';
import { apiRequest, doPost } from '../utils/apiCalls';
import Loader from '../utils/Loader';
import DropdownAlert from 'react-native-dropdownalert';
import { Alert } from 'react-native';
import { retrieveItem, storeItem, update_dp, update_dp_2 } from '../utils/functions';
import { urls } from '../utils/Api_urls';
import PrivacyPicker from '../components/PrivacyPicker';
import { TimePicker } from '../components/TimePicker';

import Modal from "react-native-modal";
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { Container, Right, Body, Title, Content, DatePicker, Header as Header2, Left, Button, ListItem, Radio } from 'native-base';


const BookPhotographer = (props) => {



    const currentDateObj = new Date();
    const [currentDate, setCurrentDate] = useState()
    const [selectedDate, setSelectedDate] = useState('')
    const [startDateView, setStartDateView] = useState(false);

    const [selectTimeModal, setSelectTimeModal] = useState(false)

    const [bookPhotographerV, setBookPhotographerV] = useState({
        name: '',
        phone: '',
        address: '',
        date: '',
        time: '',
        qty: ''
    })
    const [time, setTime] = useState()


    const Header = () => (
        <View style={{ marginTop: 10, flexDirection: 'row', paddingLeft: 15, width: "100%", paddingBottom: 15, borderBottomWidth: 0.5, borderColor: '#818CAA' }}>
            <TouchableOpacity
                onPress={() => props.navigation.goBack()}
            >
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={{ fontFamily: 'PSBo', fontSize: 20, color: '#4A5160', marginLeft: 20 }}>Book Photographer</Text>
        </View>
    )


    useEffect(() => {

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

    }, [])

    function bundleCount() {
        var tor = []
        for (let i = 1; i <= 20; i++) tor.push({
            title: i
        })
        return tor
    }


    const SelectTime = () => (
        <Modal
            isVisible={selectTimeModal}
            style={{ margin: 0 }}
        >
            <View style={{ width: "100%", height: "100%", backgroundColor:'white' }}>
                <HeaderPicker/>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={currentDateObj}
                    mode='time'
                    display="spinner"
                    onChange={onChange}
                    style={{marginTop:20}}
                />
                <TouchableOpacity
                    onPress={() => {
                        setSelectTimeModal(false)
                    }}
                    style={{ width: "40%", alignSelf: 'center', marginTop: 20, borderRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F58B44' }}>
                    <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: "#fff" }}>Done</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )


    const onChange = (event, selectedDate) => {
        var minutes = selectedDate.getMinutes();
        var hours = selectedDate.getHours();
        var temp = 12;
        for (let i = 0; i <= 12; i++) {
            if (hours == temp) {
                if (i == 0) {
                    hours = 12
                }
                else hours = i;
            }
            temp++
        }
        if (hours.toString().length == 1) {
            hours = "0" + hours;
        }
        if (minutes.toString().length == 1) {
            minutes = "0" + minutes;
        }

        const selectedTime = hours + ":" + minutes;
        setBookPhotographerV({
            ...bookPhotographerV,
            time: selectedTime
        })
    }

    const HeaderPicker = () => {
        return (
          <Header2 style={{ backgroundColor: "#4A5160" }}>
            <Left>
              <Button
                style={{
                  shadowOffset: null,
                  shadowColor: null,
                  shadowRadius: null,
                  shadowOpacity: null,
                  marginLeft: 3,
                }}
                transparent
                onPress={() => {
                  setSelectTimeModal(false)
                }}
              >
                <Text style={{ color: '#fff' }}>Close</Text>
              </Button>
            </Left>
            <Body>
              <Title style={{color:"#F58B44",fontSize:20}}>Choose</Title>
            </Body>
            <Right />
          </Header2>
        )
      }
  
      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar hidden={false} />
            <Header />
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
                <View style={{ width: "92%", alignSelf: 'center', marginTop: 10 }}>
                    <Text style={styles.inputLabel}>Restaurant name</Text>
                    <TextInput
                        placeholder="Brown Sugar"
                        placeholderTextColor="#4A5160"
                        style={styles.textInput}
                    />
                    <Text style={styles.inputLabel}>Phone Number</Text>
                    <TextInput
                        placeholder="(361)261-9931"
                        placeholderTextColor="#4A5160"
                        style={styles.textInput}
                    />
                    <Text style={styles.inputLabel}>Address</Text>
                    <TextInput
                        multiline={true}
                        placeholder="409, Gali Number 2, near Axis Bank and Gandhi Villa, Raja Park, Jaipur, Rajasthan 302004"
                        placeholderTextColor="#4A5160"
                        style={styles.textInput}
                    />

                    <Calendar
                        style={{ width: "96%", alignSelf: 'center', }}
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString)

                        }}
                        current={currentDate}
                        minDate={currentDate}
                        enableSwipeMonths={true}
                        markingType={'custom'}
                        disableArrowLeft={true}

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
                            [selectedDate]: {
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
                            },



                        }}
                    />

                    <Text style={styles.inputLabel}>Select time</Text>
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                    <TouchableOpacity
                        onPress={() => {
                            setSelectTimeModal(true)
                        }}
                        style={{ marginTop: 10, width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                        <Text style={{ color: "#818caa", fontFamily: 'PMe', fontSize: 16 }}>{bookPhotographerV.time ? bookPhotographerV.time : "Selec Time"}</Text>
                        <ArrowDown />
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={{ paddingHorizontal: 18, height: 47, backgroundColor: '#fff', borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', marginLeft: 10, alignItems: 'center', justifyContent: "center", marginTop: 10 }}>
                            <Text style={{ color: "#818CAA", fontFamily: 'PMe', fontSize: 16 }}>6:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 18, height: 47, backgroundColor: '#fff', borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', marginLeft: 10, alignItems: 'center', justifyContent: "center", marginTop: 10 }}>
                            <Text style={{ color: "#818CAA", fontFamily: 'PMe', fontSize: 16 }}>8:00 PM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ paddingHorizontal: 18, height: 47, backgroundColor: '#fff', borderRadius: 8, borderWidth: 0.5, borderColor: '#818CAA', alignItems: 'center', justifyContent: "center", marginTop: 10 }}>
                            <Text style={{ color: "#818CAA", fontFamily: 'PMe', fontSize: 16 }}>10:00 PM</Text>
                        </TouchableOpacity> */}
                    {/* </View> */}

                    <Text style={styles.inputLabel}>Select bundle</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginTop: 5 }}>A bundle is a set of photographs</Text>
                    <TouchableOpacity style={{ marginTop: 10, width: "100%", height: 52, borderRadius: 12, borderWidth: 0.5, borderColor: '#4A5160', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                        <PrivacyPicker
                            data={bundleCount()}
                            selected={{ title: 'Select' }}
                            onValueChange={(title) => {
                                setBookPhotographerV({
                                    ...bookPhotographerV,
                                    qty: title
                                })
                            }}

                        />
                    </TouchableOpacity>
                    <Text style={styles.inputLabel}>Disclaimer</Text>
                    <Text style={{ fontFamily: 'PRe', fontSize: 14, color: '#4A5160', marginTop: 5 }}>It usually take 4-5 business days for the order to arrive to you given location</Text>
                    <TouchableOpacity style={{ marginTop: 20, width: "100%", height: 52, borderRadius: 8, backgroundColor: '#F58B44', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#FFFFFF' }}>Pay Via Stipe</Text>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: '#FFFFFF' }}>$40.00</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
            <SelectTime />
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
    textInput: {
        width: "100%",
        paddingVertical: 10,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#818CAA',
        color: '#4A5160',
        fontFamily: 'PRe',
        fontSize: 14,
        marginTop: 8,
        paddingHorizontal: 10
    }
})

export default BookPhotographer
