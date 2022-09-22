import React, {useEffect, useState, createContext, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '@screens/Splash';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import {navigationRef} from '@commons/RootNavigation';
import auth from '@react-native-firebase/auth';
// import {setData, setUserDetail} from '@redux/slices/userSlices';
import {login, setDataUser} from '@redux/slices/authSlices';
import {useDispatch, useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();
const Routes = () => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    // di;
    dispatch(login(user));
    dispatch(setDataUser(user?.uid));

    console.log('log FROM ROUTES', user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   console.log('test');
  //   dispatch(setDataUser(user?.uid));
  // }, [user]);

  if (initializing) return <Splash />;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthStack} />
        ) : (
          <Stack.Screen name="App" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
