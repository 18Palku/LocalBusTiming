import { View, Text, StyleSheet, Image, Switch, Vibration } from "react-native";
import { useEffect, useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Status from "../components/Status";

const data = [
    { label: '2 mins before bus arrives', value: '2' },
    { label: '5 mins before bus arrives', value: '5' },
    { label: '10 mins before bus arrives', value: '10' },
    { label: '15 mins before bus arrives', value: '15' },
    { label: '20 mins before bus arrives', value: '20' },
    { label: '30 mins before bus arrives', value: '30' },
    { label: '45 mins before bus arrives', value: '45' },
    { label: '1 Hour before bus arrives', value: '60' },
];

const Details = ({ route }) => {
    const { name, time, to, from, reminders } = route.params;
    const [isEnabled, setIsEnabled] = useState(false);
    const [value, setValue] = useState('10');
    const [isFocus, setIsFocus] = useState(false);
    const [timerVal, setTimerVal] = useState(0);

    const formatChangerAndDifferenceCalculator = (time, mins) => {
        let currHrs = new Date().getHours();
        let currMin = new Date().getMinutes();
        let currTime, busTime;
        let totalDiff = 0;
        let hrs = time[0] + time[1];
        let min = time[3] + time[4];
        let ampm = time[6] + time[7];
        hrs = parseInt(hrs);
        min = parseInt(min);
        if (ampm == "PM" && hrs < 12) hrs = hrs + 12;
        if (ampm == "AM" && hrs == 12) hrs = hrs - 12;
        mins = parseInt(mins);
        busTime = ((hrs * 60) + min) - mins;
        currTime = (currHrs * 60) + currMin;
        totalDiff = busTime - currTime;
        if (totalDiff < 0) totalDiff += 1440;
        return totalDiff;
    }

    useEffect(() => {
        for (let ele of reminders) {
            if (ele.name == name && ele.time == time && ele.from == from && ele.to == to) {
                console.log(reminders);
                setIsEnabled(true);
                setValue(ele.value);
                setTimerVal(formatChangerAndDifferenceCalculator(ele.time, ele.value));
            }
        }
    }, []);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: '#43AA8B' }]}>
                    Set Alarm
                </Text>
            );
        }
        return null;
    };

    const timeToIdx = (time) => {
        let hrs = parseInt(time[0] + time[1]);
        let mins = time[3] + time[4];
        let ampm = time[6] + time[7];
        if (ampm == "PM") hrs += 12
        let dltIdx = parseInt("" + hrs + mins);
        return dltIdx;
    }

    const toggleSwitch = (time, value) => {
        setTimerVal(formatChangerAndDifferenceCalculator(time, value));
        Vibration.vibrate(50);
        setIsEnabled(previousState => !previousState);
        if (isEnabled) {
            console.log("ran");
            reminders.push({ name, time, from, to, value });
        } else {
            let idx = timeToIdx(time);
            reminders.splice(idx, 1);
        }
    }

    console.log("reminders:-> ", reminders);

    return (
        <View>
            <Status />
            <View style={styles.cont}>
                <Text style={styles.date}>Today</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.time}>{time}</Text>
                <View style={styles.map}>
                    <View style={styles.fromContainer}>
                        <Text style={styles.from}>{from}</Text>
                    </View>
                    <Image style={styles.bus} source={require("../assets/bus.png")} />
                    <View style={styles.contTo}>
                        <Text style={styles.to}>{to}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {renderLabel()}
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: '#43AA8B' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select time duration' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                    />
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: '#767577', true: '#43AA8B' }}
                        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => toggleSwitch(time, value)}
                        value={isEnabled}
                    />
                </View>
                {isEnabled ? <CountdownCircleTimer
                    isPlaying
                    duration={timerVal * 60}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[((timerVal * 60) / 1.33), ((timerVal * 60) / 2), ((timerVal * 60) / 4), 1]}
                >
                    {({ remainingTime }) =>
                        <View style={styles.cntTime}>
                            <Text style={styles.secText}>Remaining</Text>
                            <Text style={styles.priText}>{(Math.ceil(remainingTime / 60) > 60) ? Math.round(remainingTime / 3600) : (Math.ceil(remainingTime / 60) > 60)}</Text>
                            {(Math.ceil(remainingTime / 60) > 60) ? <Text style={styles.secText}>Hours</Text> : <Text style={styles.secText}>Mins</Text>}
                        </View>}
                </CountdownCircleTimer> : <Text style={styles.txt}>Alarm not set</Text>}
                <View style={styles.footer}>
                    <Text style={styles.footerPri}>Thank You</Text>
                    <Text style={styles.footerSec}>A&P Pvt. Ltd. All Rights Reserved(2023)</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        color: "red",
        fontSize: 15,
    },
    footer: {
        height: 100,
        width: 400,
        backgroundColor: "#43AA8B",
        marginTop: 25,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 600,
    },
    footerPri: {
        fontSize: 20,
        color: "white",
        bottom: 5,
    },
    footerSec: {
        color: "white",
        bottom: 5,
    },
    priText: {
        fontSize: 40,
    },
    secText: {
        fontSize: 20,
    },
    cntTime: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    fromContainer: {
        height: 40,
        width: "auto",
        backgroundColor: "#43AA8B",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
    },
    contTo: {
        height: 40,
        width: "auto",
        backgroundColor: "#43AA8B",
        padding: 4,
        alignSelf: "flex-end",
        borderRadius: 10,
    },
    time: {
        fontSize: 22,
        marginBottom: 30,
        color: "#303030",
    },
    from: {
        fontSize: 20,
        color: "white"
    },
    to: {
        fontSize: 20,
        color: "white",
    },
    map: {
        display: "flex",
        flexDirection: "row",
    },
    cont: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 40,
        color: "#303030",
    },
    date: {
        color: "grey",
        fontSize: 20,
        marginTop: 10,
    },
    bus: {
        height: 150,
        width: 150,
        marginRight: 20,
        left: 13,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        width: "auto",
        display: "flex",
        flexDirection: "row",
        marginTop: 15,
        marginBottom: 15,
    },
    dropdown: {
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    switch: {
        marginLeft: 6,
    }
})

export default Details;