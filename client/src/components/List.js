import { View, StyleSheet, ScrollView, Text, ActivityIndicator, TouchableOpacity, Image, Vibration } from "react-native";
import ListItem from "./ListItem";
import { useState } from "react";
import { BusesFromNalti, BusesFromHaar, BusesFromBjoori, BusesFromBkarti, BusesFromMasyana, BusesFromRopa } from "../assets/data";

const List = (props) => {

  let [on, setOn] = useState(false);
  let [list, setList] = useState(null);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let busData = null;
  if (props.from == "Nalti") {
    busData = BusesFromNalti;
  } else if (props.from == "Haar") {
    busData = BusesFromHaar;
  } else if (props.from == "Ropa") {
    busData = BusesFromRopa;
  } else if (props.from == "Bkarti") {
    busData = BusesFromBkarti;
  } else if (props.from == "Masyana") {
    busData = BusesFromMasyana;
  } else if (props.from == "Bjoori") {
    busData = BusesFromBjoori;
  }

  const convertFourDigitToTime = (time) => {
    let curr = "" + time;
    (curr.length == 3) ? curr = "0" + time : curr = "" + time;
    let hrs = parseInt(curr[0] + curr[1]);
    let mins = curr[curr.length - 2] + curr[curr.length - 1];
    let ampm;
    if (hrs >= 12) ampm = "PM";
    else ampm = "AM";
    (hrs > 12) ? hrs = hrs - 12 : null;
    let res;
    if (hrs < 10) {
      res = "0" + hrs + ":" + mins + " " + ampm;
    } else {
      res = hrs + ":" + mins + " " + ampm;
    }
    return res;
  }

  const search = () => {
    setOn(true);
    let rand = generateRandomNumber(1000, 3000);
    setTimeout(() => {
      Vibration.vibrate(10);
      let srch = [];
      if (props.to.length && props.time) {
        let mins = props.time.getMinutes();
        if (("" + props.time.getMinutes()).length == 1) mins = "0" + props.time.getMinutes();
        let idx = parseInt("" + props.time.getHours() + mins);
        for (let i = idx; i <= (idx + 100); i++) {//100 is equal to 1 Hour
          if (busData[i]) {
            let curr = [];
            curr[0] = busData[i];
            curr[1] = i;
            srch.push(curr);
          }
        }
      }
      setList(srch);
      setOn(false);
    }, rand);
  }

  return (
    <View>
      <TouchableOpacity onPress={search} style={styles.btn}>
        <Image style={styles.srhLogo} source={require("../assets/loupe.png")} />
        <Text style={styles.btnText}>Find Buses</Text>
      </TouchableOpacity>
      <View style={styles.listContainer}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
          {
            (props.to.length) ?
              ((on) ?
                <ActivityIndicator style={styles.loader} size={50} color="white" />
                : (list) ?
                  (list.length) ?
                    list.map((ele) => {
                      return (
                        <ListItem name={ele[0]} time={convertFourDigitToTime(ele[1])} to={props.to} key={ele[1]} nav={props.nav} from={props.from} remind={props.remind} />
                      )
                    }) : <View style={styles.errorCnt}><Text style={styles.errorTxt}>Sorry, No Buses available for the selected time</Text></View>
                  : null
              )
              : <View style={styles.errorCnt}><Text style={styles.errorTxt}>Please select From, Destination and Bus timing</Text></View>
          }
        </ScrollView>
      </View >
    </View >
  )
}

const styles = StyleSheet.create({
  errorCnt: {
    height: 340,
    top: 135,
  },
  loader: {
    height: 340,
  },
  errorTxt: {
    height: 400,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    color: "#c22121"
  },
  scroll: {
    width: "auto",
    height: "auto",
    paddingVertical: 10,
  },
  listContainer: {
    height: 370,
    width: "auto",
    backgroundColor: "#358970",
    marginHorizontal: 30,
    borderRadius: 10,
    elevation: 20,
    borderWidth: 5,
    borderColor: "#0E4749",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#4BC19D",
    height: 50,
    width: "auto",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    marginHorizontal: 30,
    flexDirection: "row",
    elevation: 15,
  },
  btnText: {
    color: "white",
    fontSize: 28,
  },
  srhLogo: {
    height: 35,
    width: 35,
    right: 20,
  }
})

export default List;