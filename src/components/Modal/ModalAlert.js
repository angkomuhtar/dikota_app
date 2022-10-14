import React from 'react';
import {
  Button,
  Center,
  HStack,
  Icon,
  Image,
  Modal,
  Text,
  VStack,
} from 'native-base';
import Logo from '@assets/Icon.png';
import ion from 'react-native-vector-icons/Ionicons';

const ModalAlert = ({open, message, status, onPressOk}) => {
  return (
    <Modal isOpen={open}>
      <Center background="white" w="4/5" p="8" borderRadius="md">
        <VStack position="relative" justifyItems="center" alignItems="center">
          <Icon
            as={ion}
            name="checkmark-done-circle"
            size={24}
            color="primary.200"
          />
        </VStack>
        <Text fontWeight="bold" fontSize="md" color="blue.500">
          {status}
        </Text>
        <Text
          fontWeight="semibold"
          fontSize="xs"
          mt={2}
          textAlign="center"
          textTransform="capitalize"
          color="blue.500">
          {message}
        </Text>
        <HStack mt={5}>
          <Button onPress={onPressOk} flex={1}>
            Oke
          </Button>
        </HStack>
      </Center>
    </Modal>
  );
};

export default ModalAlert;
