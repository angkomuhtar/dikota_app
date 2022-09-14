import {SafeAreaView} from 'react-native';
import React from 'react';
import {Text, View} from 'native-base';
import ConsultantCard from '../components/Card/ConsultantCard';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View p={4}>
        <ConsultantCard name="Khairuddin Shaleh" />
      </View>
    </SafeAreaView>
  );
};

export default Home;
