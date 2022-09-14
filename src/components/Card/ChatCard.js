import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {goBack, navigate} from '@commons/RootNavigation';

const ChatCard = ({name, img}) => {
  return (
    <TouchableOpacity onPress={() => navigate('detailAppointment')}>
      <HStack
        alignItems="center"
        space={3}
        borderColor="primary.200"
        borderWidth="1"
        borderRadius="md">
        <Image
          source={img}
          w={20}
          h={20}
          resizeMode="cover"
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
          alt="profile"
        />
        <VStack space={1}>
          <Text fontSize={16} fontWeight={800} color="gray.600">
            {name}
          </Text>
          <HStack alignItems="center">
            <Text fontSize={10} fontWeight="extrabold" color="gray.500">
              Pembimbing 2
            </Text>
            <Text> - </Text>
            <Text fontSize={10} fontWeight={400}>
              2nd Meet
            </Text>
          </HStack>
          <Text fontSize={10} fontWeight={800} color="gray.500">
            12 Jun 11:30 - 12:00
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default ChatCard;
