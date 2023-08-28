import { Text, StyleSheet } from "react-native";


const MyText = (props) => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Roboto-Medium",
    }
})

export default MyText;