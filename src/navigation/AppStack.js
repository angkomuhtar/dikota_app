import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import DetailAppointment from '@screens/DetailAppointment';
import Chat from '@screens/Chat';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="main" component={MainTab} />
      <Stack.Screen name="detailAppointment" component={DetailAppointment} />
      <Stack.Screen name="chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default AppStack;
