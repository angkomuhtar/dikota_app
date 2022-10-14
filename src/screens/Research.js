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
import Logo from '@assets/Icon.png';
import {InputField} from '@components';
import {useForm} from 'react-hook-form';
import Header from '@components/Header';
import firestore from '@react-native-firebase/firestore';
import {goBack} from '@commons/RootNavigation';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const Research = () => {
  const [loading, setLoading] = useState(false);
  const [mentor, setMentor] = useState('');
  const [mentor2, setMentor2] = useState('');
  const [dosen, setDosen] = useState([]);
  const {user} = useSelector(state => state.auth);

  const Getdosen = async () => {
    const dataDosen = [];
    firestore()
      .collection('Users')
      // Filter results
      .where('type', '==', 'Dosen')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(data => {
          //   setDosen([...dosen, {id: data.id, name: data.data().name}]);
          dataDosen.push({
            name: data.data().name,
            id: data.id,
            jurusan: data.data().jurusan,
          });
        });
      })
      .finally(() => {
        setDosen(dataDosen);
      });
  };

  useEffect(() => {
    Getdosen();
  }, []);

  const {
    control,
    handleSubmit,
    formState: {errors},
    getValues,
  } = useForm();

  const OnSave = async data => {
    setLoading(true);
    let ment1 = await firestore().collection('Users').doc(mentor).get();
    console.log(ment1.data());
    firestore()
      .collection('Research')
      .add({
        judul: data.judul,
        user: user.uid,
        mentor: [mentor, mentor2],
        mentor1: firestore().doc(`Users/${mentor}`),
        mentor2: firestore().doc(`Users/${mentor2}`),
      })
      .then(async data => {
        // console.log('DATA >>>>', data.id);
        await firestore().collection('Channels').add({
          user: user.uid,
          mentor: mentor,
          researhId: data.id,
        });
        await firestore().collection('Channels').add({
          user: user.uid,
          mentor: mentor2,
          researhId: data.id,
        });
        setLoading(false);
        goBack();
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
      <Header back={true} title="RESEARCH" />
      <VStack flex={1} justifyContent="center" p={4}>
        <Center>
          <InputField
            multiline={true}
            name="judul"
            label="Judul Penelitian"
            control={control}
            placeholder="Judul Penelitian"
            iconName="card"
            rules={{
              required: 'required',
              pattern: {
                value: /^[a-zA-Z ,.]*$/i,
                message: 'Only Alphabet (space, comma, dot)',
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
              Pembimbing 1
            </Text>
            <Select
              w="full"
              p="4"
              borderColor="error.400"
              selectedValue={mentor}
              accessibilityLabel="Choose Type"
              placeholder="Pilih Pembimbing 1"
              _selectedItem={{
                bg: 'primary.100',
              }}
              mt={1}
              onValueChange={itemValue => setMentor(itemValue)}>
              {dosen.map(data => (
                <Select.Item key={data.id} label={data.name} value={data.id} />
              ))}
            </Select>
          </VStack>
          <VStack w="full" mb={6}>
            <Text
              fontFamily="mulish"
              color="gray.300"
              fontWeight="800"
              fontSize={12}
              textTransform="uppercase">
              Pembimbing 2
            </Text>
            <Select
              w="full"
              p="4"
              borderColor="error.400"
              selectedValue={mentor2}
              accessibilityLabel="Choose Type"
              placeholder="Pilih Pembimbing 2"
              _selectedItem={{
                bg: 'primary.100',
              }}
              mt={1}
              onValueChange={itemValue => setMentor2(itemValue)}>
              {dosen.map(data => (
                <Select.Item key={data.id} label={data.name} value={data.id} />
              ))}
            </Select>
          </VStack>
          <Button
            isDisabled={
              mentor == '' || mentor2 == '' || mentor == mentor2 ? true : false
            }
            onPress={handleSubmit(OnSave)}
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
              SIMPAN
            </Text>
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  );
};

export default Research;
