import {ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '@components/Header';
import {Avatar, Badge, HStack, Pressable, Text, VStack} from 'native-base';
import ChatCard from '@components/Card/ChatCard';
import Photo from '@assets/photo.jpg';
import Photo2 from '@assets/photos.jpg';
import {navigate} from '@commons/RootNavigation';

const ChatList = () => {
  return (
    <>
      <Header title="Chatlist" />
      <ScrollView>
        <VStack p={4} space={3}>
          <TouchableOpacity onPress={() => navigate('chatroom')}>
            <HStack space={4} background="white" p={2} borderRadius="md">
              <Avatar source={Photo} />
              <VStack flex={1} justifyContent="center">
                <Text fontWeight="semibold">Faisal ST MT</Text>
                <Text fontSize={10} fontWeight="semibold">
                  Pembimbing 1
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

          <TouchableOpacity onPress={() => navigate('chatroom')}>
            <HStack space={4} background="white" p={2} borderRadius="md">
              <Avatar source={Photo} />
              <VStack flex={1} justifyContent="center">
                <Text fontWeight="semibold">Faisal ST MT</Text>
                <Text fontSize={10} fontWeight="semibold">
                  Pembimbing 1
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

          <TouchableOpacity onPress={() => navigate('chatroom')}>
            <HStack space={4} background="white" p={2} borderRadius="md">
              <Avatar source={Photo} />
              <VStack flex={1} justifyContent="center">
                <Text fontWeight="semibold">Faisal ST MT</Text>
                <Text fontSize={10} fontWeight="semibold">
                  Pembimbing 1
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
        </VStack>
      </ScrollView>
    </>
  );
};

export default ChatList;
