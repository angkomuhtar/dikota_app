import {View, Text} from 'react-native';
import React from 'react';
import {HStack, Skeleton} from 'native-base';

const ChatCardLoading = () => {
  return (
    <HStack
      rounded="md"
      borderColor="gray.100"
      borderWidth={1}
      alignItems="center">
      <Skeleton h="20" w="20" />
      <Skeleton.Text flex={1} mx="4" />
    </HStack>
  );
};

export default ChatCardLoading;
