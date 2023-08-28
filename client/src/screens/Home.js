import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import Input from '../components/Input';
import TimePicker from '../components/TimePicker';
import List from '../components/List';
import { useEffect, useState } from "react";
import Status from "../components/Status";

let reminders = [];

const Home = ({ navigation }) => {
  let [to, setTo] = useState("");
  let [from, setFrom] = useState("");
  let [time, setTime] = useState(new Date(1598051700000));

  const childToFetch = (data) => {
    useEffect(() => {
      setTo(data);
    }, [data]);
  }

  const childFromFetch = (data) => {
    useEffect(() => {
      setFrom(data);
    }, [data]);
  }

  const childTimeFetch = (data) => {
    useEffect(() => {
      setTime(data);
    }, [data])
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View>
        <Status />
        <Input from="From" where="L" childDataFetch={childFromFetch} selectedFrom={null} />
        <Input from="To" where="R" childDataFetch={childToFetch} selectedFrom={from} />
        <TimePicker childTimeFetch={childTimeFetch} />
        <List to={to} nav={navigation} time={time} from={from} remind={reminders} />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Home;