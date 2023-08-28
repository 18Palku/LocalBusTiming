import { Text, View, StyleSheet, StatusBar } from "react-native";
import MyText from "../utils/MyText";

const Status = () => {
    return (
        <View>
            <StatusBar backgroundColor="#43AA8B" barStyle="dark-content" />
            <View style={styles.heading}>
                <Text style={styles.headingText}>
                    Local Bt
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        backgroundColor: "#43AA8B",
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 15,
    },
    headingText: {
        fontSize: 30,
        color: "white",
        top: 4,
        fontFamily: "Borel-Regular",
    },
})

export default Status;