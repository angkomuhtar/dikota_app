import {Button, Center, HStack, Image, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import Logo from '../../assets/Icon.png';
import {InputField} from '@components';
import {useForm} from 'react-hook-form';
import {navigate, push} from '@commons/RootNavigation';
import auth from '@react-native-firebase/auth';

const Login = props => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const OnpressLogin = async data => {
    console.log('login Press');
    const {email, password} = data;
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log('User signed in!', data.uid);
        navigate('App');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      });
  };

  return (
    <VStack flex={1} justifyContent="center" p={4}>
      <Center>
        <Image
          source={Logo}
          resizeMode="contain"
          alt="Logo"
          h="2/6"
          mb={12}
          background=""
        />
        <InputField
          name="email"
          control={control}
          placeholder="Username"
          iconName="at"
          rules={{
            required: 'Tidak Boleh Kosong',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'invalid email address',
            },
          }}
        />
        <InputField
          secureType={true}
          textSecure={true}
          name="password"
          control={control}
          placeholder="Password"
          iconName="lock-closed"
          rules={{
            required: 'Tidak Boleh Kosong',
          }}
        />
        <Button
          onPress={handleSubmit(OnpressLogin)}
          w="full"
          background="primary.50"
          mt={4}
          py="3">
          <Text
            fontFamily="body"
            fontSize="lg"
            fontWeight="semibold"
            letterSpacing="2xl"
            color="white">
            LOGIN
          </Text>
        </Button>
        <HStack alignItems="center" mt={2}>
          <Text fontWeight="bold">dont have an account.?</Text>
          <Button
            onPress={() => {
              props.navigation.push('SignUp');
            }}
            variant="unstyled"
            colorScheme="darkBlue">
            Create Account
          </Button>
        </HStack>
      </Center>
    </VStack>
  );
};

export default Login;
