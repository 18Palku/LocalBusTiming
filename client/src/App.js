import React from 'react';
import { StyleSheet, View } from 'react-native';
import Status from './components/Status.js'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./screens/Home.js";
import Details from "./screens/Details.js";

const Stack = createNativeStackNavigator();

function App() {

  return (
    < NavigationContainer >
      <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false, animation: "slide_from_right", animationDuration: 1 }}>
        <Stack.Screen
          name='Home'
          component={Home}
        />
        <Stack.Screen
          name='Details'
          component={Details}
        />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({

});

export default App;