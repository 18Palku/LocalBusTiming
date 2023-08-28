import { View, Text, StyleSheet, Vibration, TouchableOpacity } from "react-native"
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
const TimePicker = (props) => {

    const [date, setDate] = useState(new Date(1598051700000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    props.childTimeFetch(date);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showTimepicker = () => {
        Vibration.vibrate(10);
        showMode('time');
    };

    return (
        <View>
            <View style={styles.box}>
                <TouchableOpacity onPress={showTimepicker} style={styles.timeBtn}>
                    <Text style={styles.textSm}>Bus Timing</Text>
                </TouchableOpacity>
                <View style={styles.timeContainer}>
                    <Text style={styles.textMd}>{date.toLocaleTimeString()}</Text>
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    timeBtn: {
        backgroundColor: "#43AA8B",
        height: 50,
        width: 100,
        borderRadius: 10,
        margin: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        marginRight: 30,
        padding: 5
    },
    timeContainer: {
        height: 50,
        width: 150,
        backgroundColor: "#358970",
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#0E4749",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    textSm: {
        color: "white",
        fontSize: 16,
    },
    textMd: {
        color: "white",
        fontSize: 20,
    }
})

export default TimePicker;