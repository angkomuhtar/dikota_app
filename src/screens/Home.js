import {SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Avatar, HStack, Pressable, Skeleton, Text, VStack} from 'native-base';
import ConsultantCard from '../components/Card/ConsultantCard';
import {useSelector} from 'react-redux';
import {navigate} from '@commons/RootNavigation';
import firestore from '@react-native-firebase/firestore';
import Header from '@components/Header';

const Home = () => {
  const {user, userData} = useSelector(state => state.auth);
  const [research, setResearch] = useState(null);
  const [mentor1, setMentor1] = useState(null);
  const [mentor2, setMentor2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const Unsub = firestore()
      .collection('Research')
      .where('user', '==', user.uid)
      .onSnapshot(onResult);
    return Unsub;
  }, []);

  const onResult = async Snapshot => {
    // console.log(Snapshot.docs);
    if (Snapshot.size == 1) {
      Snapshot.docs.map(async data => {
        setResearch(data?.data());
        setMentor1(await data?.data().mentor1.get());
        setMentor2(await data?.data().mentor2.get());
        setLoading(false);
      });
    } else {
      setMentor1(null);
      setMentor2(null);
      setResearch(null);
      setLoading(false);
    }

    // Snapshot.docs.map()
  };
  // console.log('hasil', QuerySnapshot.map);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Home" notif={true} />
      <VStack p={4} space={4}>
        <ConsultantCard
          img={{uri: 'https://i.pravatar.cc/300'}}
          name={userData?.name}
          nim={userData?.nim}
          jurusan={userData?.jurusan}
        />
        {userData.type == 'Mahasiswa' && (
          <VStack space={2}>
            <Text fontSize="md" fontWeight="semibold">
              Penelitian
            </Text>
            {loading ? (
              <VStack bg="white" p="4" borderRadius="md">
                <Skeleton.Text />
                <HStack my={4} space={4}>
                  <Skeleton rounded="full" size="16" />
                  <Skeleton.Text startColor="gray.100" flex={1} />
                </HStack>
                <HStack my={4} space={4}>
                  <Skeleton rounded="full" size="16" />
                  <Skeleton.Text startColor="gray.100" flex={1} />
                </HStack>
              </VStack>
            ) : research ? (
              <VStack bg="white" p="4" borderRadius="md">
                <Text
                  fontSize={18}
                  fontWeight="semibold"
                  textTransform="capitalize">
                  {research.judul}
                </Text>
                <VStack
                  py={4}
                  borderBottomWidth="1"
                  borderBottomColor="gray.200">
                  <Text mb={2} fontWeight="bold" fontSize="xs">
                    Pembimbing 1
                  </Text>
                  <HStack space={4} alignItems="center">
                    <Avatar
                      size="16"
                      source={{uri: 'https://i.pravatar.cc/300'}}
                    />
                    <VStack>
                      <Text fontSize="md" fontWeight="semibold">
                        {mentor1?.data().name}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {mentor1?.data().nim} - {mentor1?.data().jurusan}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
                <VStack py={4}>
                  <Text mb={2} fontWeight="bold" fontSize="xs">
                    Pembimbing 2
                  </Text>
                  <HStack space={4} alignItems="center">
                    <Avatar
                      size="16"
                      source={{uri: 'https://i.pravatar.cc/300'}}
                    />
                    <VStack>
                      <Text fontSize="md" fontWeight="semibold">
                        {mentor2?.data().name}
                      </Text>
                      <Text fontSize="sm" fontWeight="semibold">
                        {mentor2?.data().nim} - {mentor2?.data().jurusan}
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>
            ) : (
              <Pressable
                onPress={() => {
                  navigate('research');
                }}>
                {({isPressed}) => (
                  <HStack
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.95 : 1,
                        },
                      ],
                    }}
                    p={4}
                    background="white"
                    borderRadius="md"
                    justifyContent="center">
                    <Text>Set Your Research</Text>
                  </HStack>
                )}
              </Pressable>
            )}
          </VStack>
        )}
      </VStack>
    </SafeAreaView>
  );
};

export default Home;
