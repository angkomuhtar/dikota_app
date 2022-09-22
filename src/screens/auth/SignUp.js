import React, {useState} from 'react';
import {
  Button,
  Center,
  Image,
  Modal,
  ScrollView,
  Select,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import Logo from '../../assets/Icon.png';
import {InputField} from '@components';
import {useForm} from 'react-hook-form';
import Header from '@components/Header';
// import {auth} from '@commons/Firebase';
// import {createUserWithEmailAndPassword} from 'firebase/auth';
// import Ion from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [type, settype] = useState('Mahasiswa');
  const [jurusan, setJurusan] = useState('Teknik Informatika');
  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const OnpressLogin = async data => {
    // console.log(data);
    setLoading(true);
    const {email, password, name, nim} = data;
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        // console.log('User account created & signed in!', data.user.uid);
        firestore().collection('Users').doc(data.user.uid).set({
          name: name,
          nim: nim,
          type: type,
          jurusan: jurusan,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
        setLoading(false);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Modal isOpen={loading}>
        <Center background="white" opacity="80" w="3/5" p="8" borderRadius="md">
          <VStack position="relative" justifyItems="center" alignItems="center">
            <Image source={Logo} resizeMode="contain" alt="Logo" h={24} />
            <Spinner size="lg" color="blue.500" position="absolute" py="8" />
          </VStack>
          <Text fontWeight="bold" fontSize="xs" color="blue.500">
            Loading
          </Text>
        </Center>
      </Modal>
      <Header back={true} title="SIGN UP" />
      <VStack flex={1} justifyContent="center" p={4}>
        <Center>
          <Image
            source={Logo}
            resizeMode="contain"
            alt="Logo"
            h={32}
            background=""
          />
          <InputField
            name="name"
            label="Nama Lengkap"
            control={control}
            placeholder="Nama Lengkap"
            iconName="card"
            rules={{
              required: 'required',
              pattern: {
                value: /^[a-zA-Z ]*$/i,
                message: 'Only Alphabet & Space',
              },
            }}
          />
          <InputField
            name="nim"
            label="Nomor Induk"
            control={control}
            placeholder="Nomor Induk"
            iconName="card"
            rules={{
              required: 'required',
              pattern: {
                value: /^[0-9.\-]*$/i,
                message: "Number Only, '-.'",
              },
            }}
          />
          <VStack w="full" mb={6}>
            <Text
              fontFamily="mulish"
              color="gray.300"
              fontWeight="800"
              fontSize={12}
              textTransform="uppercase">
              Type
            </Text>
            <Select
              w="full"
              p="4"
              borderColor="error.400"
              selectedValue={type}
              accessibilityLabel="Choose Type"
              placeholder="Choose Type"
              _selectedItem={{
                bg: 'primary.100',
              }}
              mt={1}
              onValueChange={itemValue => settype(itemValue)}>
              <Select.Item label="MAHASISWA" value="Mahasiswa" />
              <Select.Item label="DOSEN" value="Dosen" />
            </Select>
          </VStack>

          <VStack w="full" mb={6}>
            <Text
              fontFamily="mulish"
              color="gray.300"
              fontWeight="800"
              fontSize={12}
              textTransform="uppercase">
              Jurusan / Prody
            </Text>
            <Select
              w="full"
              p="4"
              borderColor="error.400"
              selectedValue={jurusan}
              accessibilityLabel="Choose Type"
              placeholder="Choose Type"
              _selectedItem={{
                bg: 'primary.100',
              }}
              mt={1}
              onValueChange={itemValue => setJurusan(itemValue)}>
              <Select.Item
                label="TEKNIK INFORMATIKA"
                value="Teknik Informatika"
              />
              <Select.Item label="SISTEM INFORMASI" value="Sistem Informasi" />
            </Select>
          </VStack>
          <InputField
            name="email"
            control={control}
            placeholder="Email"
            iconName="at"
            rules={{
              required: 'required',
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
              required: 'required',
              minLength: {value: 8, message: 'Min 8 char'},
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
              SIGN UP
            </Text>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default SignUp;
