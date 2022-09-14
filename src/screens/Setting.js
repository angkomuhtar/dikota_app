import {Button, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {navigate} from '@commons/RootNavigation';
const Setting = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Button
          onPress={() => {
            navigate('Auth');
          }}>
          Log out
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Setting;
