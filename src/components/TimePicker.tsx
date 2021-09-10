

import React, { useState } from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,

    FlatList
} from "react-native";


import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, Right, Body, Title, Content, DatePicker, Header, Left, Button, ListItem, Radio } from 'native-base';
import { ArrowDown } from './Svgs';
import Modal from 'react-native-modal';





export const TimePicker = (props: Props) => {



    interface Props {
        onValueChange: (i) => void
    }



    const [time, setTime] = useState(new Date());
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);

    const [data, setData] = React.useState(props.data);
    const [filteredData, setFilteredData] = React.useState(props.data);
    const [modal, setModal] = React.useState(false);
    const [current, setCurrnet] = React.useState(props.selected);


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
        props.onValueChange(selectedTime);
    };




    const fresh_start = () => {

        setFilteredData(props.data);
        setModal(true)

    }

    const headerPicker = () => {
        return (
            <Header style={{ backgroundColor: "#4A5160" }}>
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
                            setModal(false)
                        }}
                    >
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </Button>
                </Left>
                <Body>
                    <Title style={{ color: "#F58B44", fontSize: 20 }}>Choose</Title>
                </Body>
                <Right />
            </Header>

        )
    }



    return (

        <View style={{ width: '100%', paddingHorizontal: 10, height: "100%", justifyContent: 'center' }} >
            <TouchableOpacity
                onPress={() => {
                    fresh_start()

                }}
                style={[{

                }]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: '#737373', fontSize: 14, fontFamily: "PRe" }}>{current.title}</Text>
                    <ArrowDown />
                </View>
            </TouchableOpacity>
            <Modal
                // animationType="slide"
                // transparent={false}
                isVisible={modal}
                // onRequestClose={() => {
                //     setModal(false)
                // }}
                style={{ margin: 0 }}
            >
                <Container>
                    {headerPicker()}
                    <DateTimePicker
                        testID="dateTimePicker"
                        // timeZoneOffsetInMinutes={60}
                        // timeZoneOffsetInMinutes={12}

                        value={time}
                        mode='time'
                        // maximumDate={new Date()}
                        // is24Hour={true}

                        display="spinner"
                        onChange={onChange}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setModal(false)
                        }}
                        style={{ width: "40%", alignSelf: 'center', marginTop: 20, borderRadius: 8, height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F58B44' }}>
                        <Text style={{ fontFamily: 'PSBo', fontSize: 14, color: "#fff" }}>Done</Text>
                    </TouchableOpacity>
                </Container>
            </Modal>
        </View>


    );
};