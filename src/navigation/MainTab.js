import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HStack, Icon, View, Text} from 'native-base';
import Ion from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import Setting from '@screens/Setting';
import History from '@screens/History';
import Chat from '@screens/ChatList';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: props => {
          const {focused, size} = props;
          let iconName;
          let label;

          if (route.name === 'home') {
            iconName = focused ? 'home' : 'home-outline';
            label = 'Home';
          } else if (route.name === 'history') {
            iconName = focused ? 'today' : 'today-outline';
            label = 'Mentor';
          } else if (route.name === 'setting') {
            iconName = focused ? 'cog' : 'cog-outline';
            label = 'Setting';
          } else if (route.name === 'chat') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
            label = 'Setting';
          }

          // You can return any component that you like here!
          return (
            <HStack
              justifyContent="center"
              alignItems="center"
              background="primary.300"
              py={1}
              px={2}
              borderRadius={4}>
              <Icon
                as={Ion}
                name={iconName}
                size={size}
                color={focused ? '#2F80ED' : 'primary.600'}
              />
              {focused && (
                <Text
                  fontFamily="mulish"
                  ml={2}
                  fontSize={8}
                  fontWeight="black"
                  color="#2F80ED"
                  textTransform="uppercase">
                  {label}
                </Text>
              )}
            </HStack>
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          borderTopWidth: 1,
          borderTopColor: '#E4E7EB',
        },
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="history" component={History} />
      <Tab.Screen name="chat" component={Chat} />
      <Tab.Screen name="setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default MainTab;
