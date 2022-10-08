import {Avatar, Button, HStack, Text, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Setting = () => {
  const {user} = useSelector(state => state.auth);
  const [dataUser, setDataUser] = useState(null);
  const logOut = async () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  useEffect(() => {
    const Unsub = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(onResult);
    return Unsub;
  }, []);

  const onResult = QuerySnapshot => {
    console.log(QuerySnapshot);
  };

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 8}}>
      <VStack p={4} flex={1}>
        <HStack alignContent="center" alignItems="center" space={4}>
          <Avatar size="xl" />
          <VStack>
            <Text>{dataUser?.name || 'NOT SET'}</Text>
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
