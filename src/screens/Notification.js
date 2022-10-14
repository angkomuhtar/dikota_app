import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import {HStack, Icon, ScrollView, Text, View, VStack} from 'native-base';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import {navigate} from '../commons/RootNavigation';

const Notification = () => {
  const {user} = useSelector(state => state.auth);
  const [Notif, setNotif] = useState([]);

  useEffect(() => {
    const Notif = firestore()
      .collection('Request')
      .where('mentor', '==', user.uid)
      .onSnapshot(GetNotif);
    return Notif;
  }, []);

  const GetNotif = Query => {
    if (Query.size > 0) {
      setNotif(
        Query.docs.map(SnapShot => ({
          id: SnapShot.id,
          researchId: SnapShot.data().researchId,
          text: SnapShot.data().text,
          date: SnapShot.data().date,
          user: SnapShot.data().user,
        })),
      );
    }
  };

  // console.log(Notif);
  return (
    <>
      <Header title="Request" back={true} />
      <ScrollView flex={1}>
        <VStack p={4} space={3}>
          {Notif.length > 0 ? (
            Notif.map(data => (
              <TouchableOpacity
                key={data.id}
                onPress={() => {
                  navigate('requestDetail', {data});
                }}>
                <HStack
                  bg="white"
                  p="4"
                  rounded="md"
                  space={4}
                  alignItems="center">
                  <Icon as={MCI} name="calendar-clock" size="2xl" />
                  <VStack flex={1}>
                    <Text fontWeight="bold" fontSize="sm">
                      Mentoring request
                    </Text>
                    <Text
                      fontWeight="hairline"
                      fontSize="xs"
                      textTransform="capitalize">
                      {data.text}
                    </Text>
                  </VStack>
                  <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="capitalize">
                    today
                  </Text>
                </HStack>
              </TouchableOpacity>
            ))
          ) : (
            <HStack p={4} justifyContent="center" alignItems="center">
              <Text fontWeight="medium" fontSize="md">
                No Data Found
              </Text>
            </HStack>
          )}
        </VStack>
      </ScrollView>
    </>
  );
};

export default Notification;
