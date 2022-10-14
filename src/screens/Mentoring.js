import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import {Avatar, HStack, Pressable, ScrollView, Text, VStack} from 'native-base';
import ChatCard from '../components/Card/ChatCard';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {navigate} from '@commons/RootNavigation';

const Mentoring = () => {
  const {user} = useSelector(state => state.auth);

  const [MentoringData, setMentoringData] = useState([]);

  useEffect(() => {
    const mentoring = firestore()
      .collection('Research')
      .where('mentor', 'array-contains', user.uid)
      .onSnapshot(GetMentoring);
    return mentoring;
  }, []);

  const GetMentoring = Query => {
    setMentoringData([]);

    Query.docs.map(async e => {
      console.log(e.data().judul);
      let data = await firestore().collection('Users').doc(e.data().user).get();
      console.log(data.data());
      setMentoringData([
        // ...MentoringData,
        {
          name: data.data().name,
          jurusan: data.data().jurusan,
          researchId: e.id,
          nim: data.data().nim,
        },
      ]);
    });
  };

  console.log(MentoringData);

  return (
    <>
      <Header title="Mentoring List" />
      <ScrollView style={{flex: 1}}>
        <VStack p={4} space={3}>
          {MentoringData.map(data => (
            <Pressable onPress={() => navigate('mentoringDetails', {data})}>
              <HStack
                p="2"
                borderColor="gray.200"
                background="white"
                borderWidth={1}
                space="4"
                rounded="md">
                <Avatar />
                <VStack>
                  <Text fontWeight="semibold" fontSize="md">
                    {data.name}
                  </Text>
                  <Text fontWeight="semibold" fontSize="xs">
                    {data.nim} - {data.jurusan}
                  </Text>
                </VStack>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </ScrollView>
    </>
  );
};

export default Mentoring;
