import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import {
  Avatar,
  Button,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {TouchableOpacity} from 'react-native';
import Loading from '@components/Modal/Loading';
import {goBack, navigate} from '../commons/RootNavigation';
import ModalAlert from '../components/Modal/ModalAlert';

const RequestDetail = props => {
  const {researchId, user, date} = props.route.params.data;
  const users = useSelector(state => state.auth);
  const [Research, setResearch] = useState([]);
  const [User, setUser] = useState([]);
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedHours, setselectedHours] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const data = () => {
    let dataView = [];
    for (let index = 0; index < 7; index++) {
      dataView.push({tgl: moment(date).add(index, 'day').format()});
    }
    return dataView;
  };

  useEffect(() => {
    const Research = firestore()
      .collection('Research')
      .doc(researchId)
      .onSnapshot(GetResearch);
    return Research;
  }, [researchId]);

  const GetResearch = Query => {
    setResearch(Query.data());
  };

  useEffect(() => {
    const Research = firestore()
      .collection('Users')
      .doc(user)
      .onSnapshot(GetUser);
    return Research;
  }, [user]);

  const GetUser = Query => {
    setUser(Query.data());
  };

  const Accept = () => {
    setLoading(true);
    console.log(users.user.uid, researchId);
    firestore()
      .collection('Channels')
      .where('researhId', '==', researchId)
      .where('mentor', '==', users.user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.docs.map(data => {
          console.log(data.id);
          firestore()
            .collection('Channels')
            .doc(data.id)
            .update({
              appointDate: `${selectedDate} ${selectedHours}`,
            })
            .then(() => {
              console.log('Update');
              setLoading(false);
              setAlert(true);
            });
        });
      });
  };
  // console.log(userId);
  return (
    <>
      <Header title="Request Details" back={true} />
      <Loading open={loading} />
      <ModalAlert
        onPressOk={() => navigate('chat')}
        status="Success"
        message="Waktu Mentoring Berhasil di Set, Buka Chatlist untuk menlanjutkan percakapan"
        open={alert}
      />
      <ScrollView flex={1}>
        <VStack p={4} space={3}>
          <VStack p="4" rounded="md" background="white" space={2}>
            <Text fontSize="sm" fontWeight="semibold">
              Requestor
            </Text>
            <HStack space={3} alignItems="center">
              <Avatar />
              <VStack>
                <Text fontWeight="bold">{User?.name}</Text>
                <Text fontSize="xs" fontWeight="bold">
                  {User?.nim} ({User.jurusan})
                </Text>
              </VStack>
            </HStack>
          </VStack>

          <VStack p="4" rounded="md" background="white" space={2}>
            <Text fontSize="sm" fontWeight="semibold">
              Penelitian
            </Text>
            <HStack space={3} alignItems="center">
              <VStack>
                <Text fontWeight="bold">{Research?.judul}</Text>
              </VStack>
            </HStack>
          </VStack>

          <Text fontSize="lg" fontWeight="semibold">
            Waktu Konsultasi
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <HStack space={4}>
              {data().map(({tgl}) => (
                <TouchableOpacity
                  disabled={
                    ['Sun', 'Sat'].includes(moment(tgl).format('ddd'))
                      ? true
                      : false
                  }
                  onPress={() => {
                    setSelectedDate(moment(tgl).format('YYYY-MM-DD'));
                  }}>
                  <VStack
                    key={moment(tgl).format('YYMMDD')}
                    py={4}
                    px={6}
                    background={
                      moment(tgl).format('YYYY-MM-DD') == selectedDate
                        ? 'primary.800'
                        : moment(tgl).format('ddd') == 'Sat' ||
                          moment(tgl).format('ddd') == 'Sun'
                        ? 'gray.100'
                        : 'primary.200'
                    }
                    borderRadius="md"
                    alignItems="center">
                    <Text fontSize="md" fontWeight="semibold" color="white">
                      {moment(tgl).format('MMM')}
                    </Text>
                    <Text
                      fontSize="4xl"
                      fontWeight="bold"
                      color="white"
                      lineHeight="md">
                      {moment(tgl).format('DD')}
                    </Text>
                    <Text fontSize="md" fontWeight="semibold" color="white">
                      {moment(tgl).format('ddd')}
                    </Text>
                  </VStack>
                </TouchableOpacity>
              ))}
            </HStack>
          </ScrollView>
          <HStack py="4" flexWrap="wrap">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(data => {
              let d = moment('08:00', 'HH:mm')
                .add(data, 'hour')
                .format('HH:mm');
              return (
                <TouchableOpacity
                  onPress={() => setselectedHours(d)}
                  style={{marginBottom: 30, width: '22%', marginLeft: 8}}>
                  <VStack
                    px="4"
                    py="2"
                    rounded="full"
                    alignItems="center"
                    background={
                      selectedHours == d ? 'primary.800' : 'primary.200'
                    }
                    borderRadius="full">
                    <Text fontSize="md" fontWeight="medium" color="white">
                      {d}
                    </Text>
                  </VStack>
                </TouchableOpacity>
              );
            })}
          </HStack>
        </VStack>
      </ScrollView>
      <HStack p={4} space={4}>
        <Pressable
          onPress={Accept}
          flex={1}
          isDisabled={selectedHours == '' ? true : false}>
          {({isPressed}) => (
            <View
              flex={1}
              background={
                isPressed
                  ? 'blue.400'
                  : selectedHours == ''
                  ? 'blue.200'
                  : 'blue.500'
              }
              rounded="md"
              alignItems="center"
              justifyContent="center">
              <Text fontWeight="bold" color="white">
                Accept
              </Text>
            </View>
          )}
        </Pressable>
        <Button flex={1} colorScheme="danger">
          Reject
        </Button>
      </HStack>
    </>
  );
};

export default RequestDetail;
