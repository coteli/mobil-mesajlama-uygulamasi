import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Giris from "../src/screens/giris";
import Anasayfa from "../src/screens/anasayfa";
import Sohbet from "../src/screens/sohbet";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Giris" component={Giris} />
        <Stack.Screen name="Anasayfa" component={Anasayfa} />
        <Stack.Screen name="Sohbet" component={Sohbet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
