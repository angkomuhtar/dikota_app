import {NativeBaseProvider, StatusBar, Text, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {theme} from '@commons/Theme';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import store from '@redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <NativeBaseProvider theme={theme}>
          <StatusBar barStyle="light-content" />
          <Routes />
        </NativeBaseProvider>
      </SafeAreaView>
    </Provider>
  );
};

export default App;
