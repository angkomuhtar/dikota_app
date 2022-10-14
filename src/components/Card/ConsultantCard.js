import {
  Avatar,
  Badge,
  HStack,
  Image,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import defaultPhoto from '@assets/default.png';

const ConsultantCard = ({name, nim, jurusan, judul, img}) => {
  return (
    <HStack alignItems="center" space={4}>
      <Avatar size="xl" source={img || defaultPhoto}></Avatar>
      <VStack space={2} flex={1}>
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        {judul && (
          <View
            background="primary.100"
            borderRadius={4}
            px={2}
            py={1}
            alignSelf="flex-start">
            <Text fontWeight="semibold" fontSize="xs" color="white">
              {judul}
            </Text>
          </View>
        )}
        <HStack alignItems="center" space="1">
          <Text fontWeight="semibold" fontSize="xs">
            {nim}
          </Text>
          <Text>-</Text>
          <Text fontWeight="semibold" fontSize="xs">
            {jurusan}
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ConsultantCard;
