import {Button, Center, Image, ScrollView, Text, VStack} from 'native-base';
import React, {useEffect} from 'react';
import Logo from '../../assets/Icon.png';
import {InputField} from '@components';
import {useForm} from 'react-hook-form';
import Fire from '@commons/Fire';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const OnpressLogin = async data => {
    console.log(data);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} justifyContent="center" p={4}>
        <Center>
          <Image
            source={Logo}
            resizeMode="contain"
            alt="Logo"
            h={32}
            // h="1/6"
            // w="full"
            // mb={12}
            background=""
          />
          <Text fontSize="2xl" fontWeight="semibold">
            Sign Up
          </Text>
          <InputField
            name="nim"
            control={control}
            placeholder="NIM"
            iconName="card"
            rules={{
              required: 'Tidak Boleh Kosong',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            }}
          />

          <InputField
            name="name"
            control={control}
            placeholder="Name"
            iconName="card"
            rules={{
              required: 'Tidak Boleh Kosong',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            }}
          />
          <InputField
            name="email"
            control={control}
            placeholder="Email"
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
            name="email"
            control={control}
            placeholder="Email"
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
    </ScrollView>
  );
};

export default SignUp;
