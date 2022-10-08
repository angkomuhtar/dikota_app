import React from 'react';
import {Center, Image, Modal, Spinner, Text, VStack} from 'native-base';
import Logo from '@assets/Icon.png';

const Loading = ({open}) => {
  return (
    <Modal isOpen={open}>
      <Center background="white" opacity="80" w="3/5" p="8" borderRadius="md">
        <VStack position="relative" justifyItems="center" alignItems="center">
          <Image source={Logo} resizeMode="contain" alt="Logo" h={24} />
          <Spinner size="lg" color="blue.500" position="absolute" py="8" />
        </VStack>
        <Text fontWeight="bold" fontSize="xs" color="blue.500">
          Loading
        </Text>
      </Center>
    </Modal>
  );
};

export default Loading;
