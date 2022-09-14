import {Avatar, Badge, HStack, Text, VStack} from 'native-base';
import React from 'react';

const ConsultantCard = ({name}) => {
  return (
    <HStack alignItems="center" space={4}>
      <Avatar size="xl"></Avatar>
      <VStack space={2}>
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Badge colorScheme="primary" alignSelf="flex-start">
          <Text fontWeight="semibold" fontSize="xs" color="white">
            Pembimbing 1
          </Text>
        </Badge>
        <HStack alignItems="center" space="1">
          <Text fontWeight="semibold" fontSize="xs">
            083937473833
          </Text>
          <Text>-</Text>
          <Text fontWeight="semibold" fontSize="xs">
            Teknik Informatika
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ConsultantCard;
