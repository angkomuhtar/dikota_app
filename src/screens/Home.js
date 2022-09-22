import {SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {Alert, Button, Text, View} from 'native-base';
import ConsultantCard from '../components/Card/ConsultantCard';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const {user, userData} = useSelector(state => state.auth);

  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View p={4}>
        <ConsultantCard name={userData?.name} />
      </View>
      <Button onPress={() => {}}>Buat Data</Button>
    </SafeAreaView>
  );
};

export default Home;
