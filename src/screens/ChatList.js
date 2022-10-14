import {ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import {Avatar, Badge, HStack, Pressable, Text, VStack} from 'native-base';
import ChatCard from '@components/Card/ChatCard';
import Photo from '@assets/photo.jpg';
import Photo2 from '@assets/photos.jpg';
import {navigate} from '@commons/RootNavigation';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const ChatList = () => {
  const [messages, setMessages] = useState([]);
  const {user, userData} = useSelector(state => state.auth);

  useEffect(() => {
    const Unsub = firestore()
      .collection('Channels')
      .where('mentor', '==', user.uid)
      .onSnapshot(onResult);
    return Unsub;
  }, []);

  const onResult = Snapshot => {
    setMessages([]);
    setTimeout(() => {
      if (Snapshot.size > 0) {
        Snapshot.docs.map(doc => {
          // console.log('data', doc.data());
          firestore()
            .collection('Users')
            .doc(doc.data().user)
            .get()
            .then(data => {
              setMessages([...messages, {id: doc.id, user: data.data()}]);
            });
        });
      }
    }, 500);
  };

  return (
    <>
      <Header title="Chatlist" />
      <ScrollView style={{flex: 1}}>
        <VStack p={4} space={3}>
          {messages.map((data, id) => (
            <TouchableOpacity
              key={id}
              onPress={() => navigate('chatroom', {channelId: data.id})}>
              <HStack space={4} background="white" p={2} borderRadius="md">
                <Avatar source={Photo} />
                <VStack flex={1} justifyContent="center">
                  <Text fontWeight="semibold">{data.user?.name}</Text>
                  <Text fontSize={10} fontWeight="semibold">
                    {data.user?.nim} - {data.user?.jurusan}
                  </Text>
                </VStack>
                <VStack justifyContent="space-between">
                  <Text fontSize={10}>Yesterday</Text>
                  <Badge
                    colorScheme="danger"
                    borderRadius="full"
                    alignSelf="flex-end">
                    <Text fontSize={8} fontWeight="bold">
                      12
                    </Text>
                  </Badge>
                </VStack>
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>
    </>
  );
};

export default ChatList;
