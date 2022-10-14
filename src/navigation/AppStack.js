import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTab from './MainTab';
import DetailAppointment from '@screens/DetailAppointment';
import Chat from '@screens/Chat';
import ProfileEdit from '../screens/ProfileEdit';
import Research from '../screens/Research';
import Notification from '../screens/Notification';
import RequestDetail from '../screens/RequestDetail';
import MentoringDetails from '../screens/MentoringDetails';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="main">
      <Stack.Screen name="main" component={MainTab} />
      <Stack.Screen name="detailAppointment" component={DetailAppointment} />
      <Stack.Screen name="chatroom" component={Chat} />
      <Stack.Screen name="profile" component={ProfileEdit} />
      <Stack.Screen name="research" component={Research} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="requestDetail" component={RequestDetail} />
      <Stack.Screen name="mentoringDetails" component={MentoringDetails} />
    </Stack.Navigator>
  );
};

export default AppStack;
