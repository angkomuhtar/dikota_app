import {Avatar, Button, HStack, Text, View, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import ConsultantCard from '../components/Card/ConsultantCard';

const Setting = () => {
  const {user, userData} = useSelector(state => state.auth);
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
        <ConsultantCard
          img={{uri: 'https://i.pravatar.cc/300'}}
          name={userData?.name}
          nim={userData?.nim}
          jurusan={userData?.jurusan}
        />
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
