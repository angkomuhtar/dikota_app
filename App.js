import {NativeBaseProvider, StatusBar, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {theme} from '@commons/Theme';
import Routes from './src/navigation/Routes';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <Routes />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default App;
