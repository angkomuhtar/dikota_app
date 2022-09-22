import {Avatar, Button, HStack, Text, View, VStack} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {navigate} from '@commons/RootNavigation';
import auth from '@react-native-firebase/auth';

const Setting = () => {
  const logOut = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 8}}>
      <VStack p={4} flex={1}>
        <HStack>
          <Avatar size="2xl" />
          <VStack>
            <Text>Mushawiruddin</Text>
          </VStack>
        </HStack>
      </VStack>
      <View px={4}>
        <Button
          onPress={() => {
            logOut();
          }}>
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
