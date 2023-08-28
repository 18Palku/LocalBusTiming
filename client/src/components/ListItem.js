import { View, StyleSheet, Text, TouchableHighlight, Image, Vibration } from "react-native";

const ListItem = (props) => {

    const showDetails = () => {
        Vibration.vibrate(10);
        console.log("hit ", props.nav);
        props.nav.navigate("Details", { name: props.name, time: props.time, to: props.to, from: props.from, reminders: props.remind });
    }
    return (
        <TouchableHighlight style={styles.highlight} onPress={showDetails} underlayColor="black">
            <View style={styles.item}>
                <Text style={styles.name}>{props.name}</Text>
                <View style={styles.listItemRight}>
                    <Text style={styles.time}>{props.time}</Text>
                    <Image style={styles.nxt} source={require("../assets/next.png")} />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    listItemRight: {
        display: "flex",
        flexDirection: "row",
        marginRight: 8,
    },
    nxt: {
        height: 20,
        width: 20,
        top: 2.5,
    },
    highlight: {
        height: "auto",
        width: "auto",
        borderRadius: 10,
        marginBottom: 8,
    },
    item: {
        height: 50,
        width: "auto",
        backgroundColor: "white",
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#99D6C4",
        elevation: 2,
    },
    name: {
        fontSize: 16.5,
        marginLeft: 10,
        color: "#303030",
    },
    time: {
        fontSize: 18,
        flexDirection: "row",
        marginRight: 7,
        color: "#303030",
    },
})

export default ListItem;