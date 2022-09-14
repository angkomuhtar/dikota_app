import React from 'react';
import {Modal, Spinner, Text, VStack} from 'native-base';

const Loading = ({open}) => {
  return (
    <Modal isOpen={open}>
      <VStack space={2}>
        <Spinner color="white" size="xl" />
        <Text fontSize="lg" fontWeight={700} color="gray.100">
          Loading
        </Text>
      </VStack>
    </Modal>
  );
};

export default Loading;
