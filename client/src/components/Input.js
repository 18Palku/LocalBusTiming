import { View, TextInput, StyleSheet, Text, Image } from "react-native";
import { useState } from "react";
import { Dropdown } from 'react-native-element-dropdown';

const Input = (props) => {

    let [from, setFrom] = useState("");
    let [to, setTo] = useState("");
    let [isFocusFrom, setIsFocusFrom] = useState(false);
    let [isFocusTo, setIsFocusTo] = useState(false);

    const fromInputData = [
        { label: 'Nalti', value: 'Nalti' },
        { label: 'Haar', value: 'Haar' },
        { label: 'Ropa', value: 'Ropa' },
        { label: 'Bkarti', value: 'Bkarti' },
        { label: 'Masyana', value: 'Masyana' },
        { label: 'Bjoori', value: 'Bjoori' },
    ];

    let toInputData = [];
    if (props.selectedFrom == "Nalti") {
        toInputData = [
            { label: 'Haar', value: 'Haar' },
            { label: 'Ropa', value: 'Ropa' },
            { label: 'Bkarti', value: 'Bkarti' },
            { label: 'Masyana', value: 'Masyana' },
            { label: 'Bjoori', value: 'Bjoori' },
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    } else if (props.selectedFrom == "Haar") {
        toInputData = [
            { label: 'Ropa', value: 'Ropa' },
            { label: 'Bkarti', value: 'Bkarti' },
            { label: 'Masyana', value: 'Masyana' },
            { label: 'Bjoori', value: 'Bjoori' },
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    } else if (props.selectedFrom == "Ropa") {
        toInputData = [
            { label: 'Bkarti', value: 'Bkarti' },
            { label: 'Masyana', value: 'Masyana' },
            { label: 'Bjoori', value: 'Bjoori' },
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    } else if (props.selectedFrom == "Bkarti") {
        toInputData = [
            { label: 'Masyana', value: 'Masyana' },
            { label: 'Bjoori', value: 'Bjoori' },
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    } else if (props.selectedFrom == "Masyana") {
        toInputData = [
            { label: 'Bjoori', value: 'Bjoori' },
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    } else if (props.selectedFrom == "Bjoori") {
        toInputData = [
            { label: 'Hamirpur', value: 'Hamirpur' },
        ];
    }

    if (props.where == "L") {
        props.childDataFetch(from);
    } else {
        props.childDataFetch(to);
    }

    const renderLabelFrom = () => {
        if (from || isFocusFrom) {
            return (
                <Text style={[styles.label, isFocusFrom && { color: '#43AA8B' }]}>
                    From
                </Text>
            );
        }
        return null;
    };
    const renderLabelTo = () => {
        if (to || isFocusTo) {
            return (
                <Text style={[styles.label, isFocusTo && { color: '#43AA8B' }]}>
                    Select destination
                </Text>
            );
        }
        return null;
    };

    let styleView = null;
    (props.where === "L" ? styleView = styles.containerLeft : styleView = styles.containerRight);
    if (props.where === "L") {
        return (
            <View style={styleView}>
                <Image source={require("../assets/house.png")} style={styles.imageLeft} />
                {renderLabelFrom()}
                <Dropdown
                    style={[styles.dropdown, isFocusFrom && { borderColor: '#43AA8B' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={fromInputData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusFrom ? 'From' : '...'}
                    searchPlaceholder="Search..."
                    value={from}
                    onFocus={() => setIsFocusFrom(true)}
                    onBlur={() => setIsFocusFrom(false)}
                    onChange={item => {
                        setFrom(item.value);
                        setIsFocusFrom(false);
                    }}
                />
            </View>
        )
    } else {
        return (
            <View style={styleView}>
                {renderLabelTo()}
                <Dropdown
                    style={[styles.dropdown, isFocusTo && { borderColor: '#43AA8B' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={toInputData}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocusTo ? 'Destination' : '...'}
                    searchPlaceholder="Search..."
                    value={to}
                    onFocus={() => setIsFocusTo(true)}
                    onBlur={() => setIsFocusTo(false)}
                    onChange={item => {
                        setTo(item.value);
                        setIsFocusTo(false);
                    }}
                />
                <Image source={require("../assets/location.png")} style={styles.imageRight} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#28965A',
        paddingHorizontal: 10,
        marginBottom: 10,
        borderRadius: 4,
    },
    containerLeft: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 10,
        margin: 4,
        top: 10,
    },
    containerRight: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 4,
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 7,
    },
    inputText: {
        padding: 4,
        bottom: 4,
    },
    imageLeft: {
        height: 26,
        width: 26,
        padding: 4,
        bottom: 4,
        marginRight: 11,
    },
    imageRight: {
        height: 26,
        width: 26,
        padding: 4,
        bottom: 4,
        marginLeft: 10,
    },
    dropdown: {
        height: 40,
        width: "80%",
        borderColor: '#28965A',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginBottom: 7,
    },
    label: {
        position: 'absolute',
        backgroundColor: '#f2f2f2',
        left: 55,
        top: -1,
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
});

export default Input;