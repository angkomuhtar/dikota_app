import React from 'react';
import Header from '@components/Header';
import {
  Avatar,
  Badge,
  Button,
  Divider,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import Ion from 'react-native-vector-icons/Ionicons';
import ConsultantCard from '@components/Card/ConsultantCard';
import {TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import {navigate} from '@commons/RootNavigation';
import moment from 'moment';
import PDFFile from '@assets/test.pdf';

const data = () => {
  let dataView = [];
  for (let index = 0; index < 7; index++) {
    dataView.push(
      <VStack
        py={4}
        px={6}
        background={
          moment().add(index, 'day').format('ddd') == 'Sat' ||
          moment().add(index, 'day').format('ddd') == 'Sun'
            ? 'primary.300'
            : 'primary.100'
        }
        borderRadius="md"
        alignItems="center">
        <Text fontSize="md" fontWeight="semibold" color="white">
          {moment().add(index, 'day').format('MMM')}
        </Text>
        <Text fontSize="4xl" fontWeight="bold" color="white" lineHeight="md">
          {moment().add(index, 'day').format('DD')}
        </Text>
        <Text fontSize="md" fontWeight="semibold" color="white">
          {moment().add(index, 'day').format('ddd')}
        </Text>
      </VStack>,
    );
  }
  return dataView;
};

const DetailAppointment = () => {
  return (
    <>
      <Header back={true} title="Details" />
      <ScrollView p={4} flex={1}>
        <VStack space={4} pb={8}>
          <ConsultantCard name="Faisal, S.T. M.T." />

          <VStack background="white" p={4} borderRadius="md">
            <HStack
              borderBottomColor="gray.300"
              borderBottomWidth={1}
              py="1"
              justifyContent="space-between"
              alignItems="center">
              <Text fontWeight="bold" fontSize={16} color="gray.300">
                Proposal
              </Text>
              <Text fontSize={10}>12 Jun 22, 13:00 PM</Text>
            </HStack>
            <VStack>
              <HStack py={4} space={2} alignItems="center">
                <Pdf
                  page={1}
                  source={PDFFile}
                  style={{height: 80, width: 60}}
                />
                <VStack flex={1}>
                  <Text>Draft File</Text>
                  <Text fontSize={10}>12 Jun 22, 12:25 PM</Text>
                </VStack>
                <TouchableOpacity>
                  <Icon as={Ion} name="download-outline" size="2xl" />
                </TouchableOpacity>
              </HStack>
              <Divider />
              <HStack py={4} space={2} alignItems="center">
                <Pdf
                  page={1}
                  source={PDFFile}
                  style={{height: 80, width: 60}}
                />
                <VStack flex={1}>
                  <Text>Mentor Revision</Text>
                  <Text fontSize={10}>12 Jun 22, 12:25 PM</Text>
                </VStack>
                <TouchableOpacity>
                  <Icon as={Ion} name="download-outline" size="2xl" />
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>

          <VStack background="white" p={4} borderRadius="md">
            <HStack
              borderBottomColor="gray.300"
              borderBottomWidth={1}
              py="1"
              justifyContent="space-between"
              alignItems="center">
              <Text fontWeight="bold" fontSize={16} color="gray.300">
                Proposal
              </Text>
              <Text fontSize={10}>12 Jun 22, 13:00 PM</Text>
            </HStack>
            <VStack>
              <HStack py={4} space={2} alignItems="center">
                <Pdf
                  page={1}
                  source={PDFFile}
                  style={{height: 80, width: 60}}
                />
                <VStack flex={1}>
                  <Text>Draft File</Text>
                  <Text fontSize={10}>12 Jun 22, 12:25 PM</Text>
                </VStack>
                <TouchableOpacity>
                  <Icon as={Ion} name="download-outline" size="2xl" />
                </TouchableOpacity>
              </HStack>
              <Divider />
              <HStack py={4} space={2} alignItems="center">
                <Pdf
                  page={1}
                  source={PDFFile}
                  style={{height: 80, width: 60}}
                />
                <VStack flex={1}>
                  <Text>Mentor Revision</Text>
                  <Text fontSize={10}>12 Jun 22, 12:25 PM</Text>
                </VStack>
                <TouchableOpacity>
                  <Icon as={Ion} name="download-outline" size="2xl" />
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>

          <VStack space={2}>
            <Text
              fontWeight="medium"
              fontSize="md"
              color="gray.300"
              textTransform="uppercase">
              Set Appointment
            </Text>
            <ScrollView
              background="white"
              borderRadius="md"
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <HStack space={4} m={4}>
                {data()}
              </HStack>
            </ScrollView>
          </VStack>
        </VStack>
      </ScrollView>
      <View p={4} pb={8}>
        <TouchableOpacity onPress={() => navigate('chat')}>
          <HStack
            borderRadius="full"
            w="full"
            background="primary.800"
            p={3}
            alignItems="center"
            justifyContent="center"
            space={1}>
            <Icon as={Ion} name="chatbubble-ellipses" color="white" size={5} />
            <Text fontWeight={800} fontSize={14} color="white">
              Start Chat
            </Text>
          </HStack>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DetailAppointment;
