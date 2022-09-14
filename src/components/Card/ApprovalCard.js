import {
  Badge,
  Divider,
  HStack,
  Pressable,
  Text,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import {navigate} from '@commons/RootNavigation';

const ApprovalCard = () => {
  return (
    <View
      background="white"
      p={4}
      borderRadius="md"
      shadow="1"
      borderColor="gray.50"
      borderWidth={1}>
      <VStack space={2}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack flex={1} space={2}>
            <Text fontWeight="800" fontSize={14}>
              PR/2022/VII/C1-003
            </Text>
            <Badge background="danger.300" alignSelf="flex-start">
              <Text
                fontSize={11}
                fontWeight="800"
                textTransform="uppercase"
                color="white">
                Priority 3
              </Text>
            </Badge>
          </VStack>
          <Pressable
            onPress={() => {
              navigate('approvalDetails');
            }}>
            <Text color="primary.400">Details</Text>
          </Pressable>
        </HStack>
        <Divider />
        <HStack justifyContent="space-between">
          <VStack flex={1}>
            <Text>Requestor : Test</Text>
            <Text>Narasi : test api</Text>
            <Text>Cabang Makassar</Text>
          </VStack>
          <VStack alignItems="flex-start">
            <Text fontSize={14} fontWeight="300">
              Total
            </Text>
            <Text fontSize="2xl" fontWeight="800">
              4.000
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </View>
  );
};

export default ApprovalCard;
