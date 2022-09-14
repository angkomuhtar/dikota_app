import {Button, Center, Image, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import Logo from '../../assets/Icon.png';
import {InputField} from '@components';
import {useForm} from 'react-hook-form';
import {navigate} from '@commons/RootNavigation';
// import {useDispatch, useSelector} from 'react-redux';
import {todoAdded} from '@redux/slices/todosSlices';
import {login} from '@redux/slices/authSlices';

const Login = () => {
  const {todos, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  console.log(auth);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const OnpressLogin = async data => {
    console.log(data);
    // navigate('SignUp');
    // dispatch(login(data));
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
          name="username"
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
          secureTextEntry={true}
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
      </Center>
    </VStack>
  );
};

export default Login;
