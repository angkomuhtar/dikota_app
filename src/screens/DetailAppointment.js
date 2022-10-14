import React, {useEffect} from 'react';
import Header from '@components/Header';
import {
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import Ion from 'react-native-vector-icons/Ionicons';
import ConsultantCard from '@components/Card/ConsultantCard';
import {PermissionsAndroid, TouchableOpacity} from 'react-native';
import {navigate} from '@commons/RootNavigation';
import moment from 'moment';
import DocumentPicker, {types} from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import storage from '@react-native-firebase/storage';
import Loading from '@components/Modal/Loading';
import ModalAlert from '@components/Modal/ModalAlert';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const data = () => {
  let dataView = [];
  for (let index = 0; index < 7; index++) {
    dataView.push({tgl: moment().add(index, 'day').format()});
  }
  return dataView;
};

const DetailAppointment = props => {
  let {id, researchId, mentorType} = props.route.params;
  const {user, userData} = useSelector(state => state.auth);
  const [mentor, setMentor] = useState(null);
  const [mentoring, setMentoring] = useState([]);
  const [research, setResearch] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [alertModal, setAlertModal] = useState(false);

  const pickDoc = async () => {
    try {
      setLoading(true);
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf],
        copyTo: 'cachesDirectory',
      });

      let fileLoc = `Documents/${user.uid}-${moment().format('X')}.pdf`;
      const reference = storage().ref(fileLoc);
      reference.putFile(response[0].fileCopyUri).then(data => {
        if (data.state == 'success') {
          firestore().collection('Mentoring').add({
            researchId,
            file: data.metadata.fullPath,
            step: 'proposal',
            createAt: moment().format(),
          });
        }
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const sub = firestore()
      .collection('Research')
      .where('mentor', 'array-contains', id)
      .where('user', '==', user.uid)
      .onSnapshot(Result);
    return sub;
  }, []);

  const Result = Query => {
    Query.forEach(element => {
      setResearch(element);
    });
  };

  useEffect(() => {
    const sub = firestore()
      .collection('Mentoring')
      .where('researchId', '==', researchId)
      .orderBy('createAt', 'desc')
      .onSnapshot(Mentoring, ErrMentoring);
    return sub;
  }, []);

  const Mentoring = Query => {
    setMentoring(Query.docs.map(doc => doc.data()));
  };
  const ErrMentoring = e => {
    console.log(e);
  };

  useEffect(() => {
    getMentor();
    getChannel(id);
  }, [id]);

  const getMentor = async () => {
    firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(async data => {
        if (data.data()?.photo) {
          let photos = await storage()
            .ref(data.data()?.photo)
            .getDownloadURL()
            .then(data => {
              return data;
            });
          setMentor({
            ...data.data(),
            photo: photos,
          });
        } else {
          setMentor(data.data());
        }
      });
  };

  const getChannel = async id => {
    firestore()
      .collection('Channels')
      .where('user', '==', user.uid)
      .where('mentor', '==', id)
      .get()
      .then(data => {
        data.forEach(e => {
          setChannel(e);
        });
      });
  };
  const downloadFile = async fileUrl => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your File Storeage ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const extension = fileUrl.split(/[#?]/)[0].split('.').pop().trim();
        const localFile = `${RNFS.DocumentDirectoryPath}/Draft${moment().format(
          'x',
        )}.${extension}`;

        const options = {
          fromUrl: fileUrl,
          toFile: localFile,
        };
        RNFS.downloadFile(options)
          .promise.then(() => FileViewer.open(localFile))
          .then(() => {
            // success
          })
          .catch(error => {
            // error
          });
      } else {
        console.log('permission Denied');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Loading open={loading} />
      <ModalAlert
        open={alertModal}
        message="Request Berhasil Terkirim, Penguji Akan mereview untuk menetukan Jadwal"
        status="SUCCESS"
        onPressOk={() => {
          setAlertModal(false);
        }}
      />
      <Header back={true} title="Details" />
      <ScrollView p={4} flex={1}>
        <VStack space={4} pb={8}>
          <ConsultantCard
            name={mentor?.name}
            nim={mentor?.nim}
            jurusan={mentor?.jurusan}
            img={mentor?.photo ? {uri: mentor.photo} : false}
          />
          <VStack background="white" p={4} borderRadius="md">
            <HStack p={4} justifyContent="center">
              <TouchableOpacity onPress={pickDoc}>
                <HStack
                  borderStyle="dashed"
                  borderColor="gray.500"
                  borderWidth={2}
                  alignItems="center"
                  space={2}
                  p="4">
                  <Icon as={Ion} name="ios-document-attach-outline" size="xl" />
                  <Text color="gray.500" fontSize="md">
                    Upload Draft File
                  </Text>
                </HStack>
              </TouchableOpacity>
            </HStack>
            <HStack
              borderBottomColor="gray.300"
              borderBottomWidth={1}
              py="1"
              justifyContent="space-between"
              alignItems="center">
              <Text fontWeight="bold" fontSize={16} color="gray.300">
                Proposal
              </Text>
              {/* <Text fontSize={10}>12 Jun 22, 13:00 PM</Text> */}
            </HStack>
            {mentoring.map((data, key) => (
              <VStack key={key}>
                <HStack py={4} space={2} alignItems="center">
                  <VStack flex={1}>
                    <Text>Draft File</Text>
                    <Text fontSize={10}>
                      {moment(data.createAt).format('DD MMM YY, hh:mm A')}
                    </Text>
                  </VStack>
                  <TouchableOpacity
                    onPress={async () => {
                      downloadFile(
                        await storage().ref(data.file).getDownloadURL(),
                      );
                    }}>
                    <Icon as={Ion} name="md-expand-outline" size="2xl" />
                  </TouchableOpacity>
                </HStack>
                <VStack>
                  <Text fontSize="xs" color="gray.300">
                    Mentor Review :
                  </Text>
                  <View
                    mb={4}
                    mt="1"
                    p="4"
                    rounded="sm"
                    borderWidth="1"
                    borderColor="gray.200">
                    <Text fontSize="xs" color="gray.500" fontWeight="medium">
                      {mentorType == 1
                        ? data?.mentor1Review || 'No Review Yet'
                        : data?.mentor2Review || 'No Review Yet'}
                    </Text>
                  </View>
                </VStack>
                <Divider />
              </VStack>
            ))}
          </VStack>

          {!channel?.data()?.appointDate && (
            <VStack space={2}>
              <Text
                fontWeight="medium"
                fontSize="md"
                color="gray.300"
                textTransform="uppercase">
                Set Appointment
              </Text>
              <VStack p="4" background="white" borderRadius="md">
                <Text mb={4}>Date : </Text>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
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
                          <Text
                            fontSize="md"
                            fontWeight="semibold"
                            color="white">
                            {moment(tgl).format('MMM')}
                          </Text>
                          <Text
                            fontSize="4xl"
                            fontWeight="bold"
                            color="white"
                            lineHeight="md">
                            {moment(tgl).format('DD')}
                          </Text>
                          <Text
                            fontSize="md"
                            fontWeight="semibold"
                            color="white">
                            {moment(tgl).format('ddd')}
                          </Text>
                        </VStack>
                      </TouchableOpacity>
                    ))}
                  </HStack>
                </ScrollView>
              </VStack>
              <TouchableOpacity
                disabled={selectedDate == null ? true : false}
                onPress={() => {
                  console.log(userData);
                  setLoading(true);
                  firestore()
                    .collection('Request')
                    .add({
                      researchId: researchId,
                      user: user.uid,
                      mentor: id,
                      date: selectedDate,
                      status: 'waiting',
                      text: `${
                        userData.name
                      } mengajukan Jadwal Bimbingan Pada Tanggal ${moment(
                        selectedDate,
                      ).format('DD MMM YY')}`,
                    })
                    .then(() => {
                      setLoading(false);
                      setAlertModal(true);
                    });
                }}>
                <HStack
                  borderRadius="full"
                  w="full"
                  background="primary.800"
                  p={3}
                  alignItems="center"
                  justifyContent="center"
                  space={1}>
                  <Icon
                    as={Ion}
                    name="clipboard-sharp"
                    color="white"
                    size={5}
                  />
                  <Text fontWeight={800} fontSize={14} color="white">
                    Make Appointment
                  </Text>
                </HStack>
              </TouchableOpacity>
            </VStack>
          )}
        </VStack>
      </ScrollView>
      {channel?.data()?.appointDate && (
        <View p={4} pb={8}>
          <TouchableOpacity
            onPress={() => navigate('chatroom', {channelId: channel?.id})}>
            <HStack
              borderRadius="full"
              w="full"
              background="primary.800"
              p={3}
              alignItems="center"
              justifyContent="center"
              space={1}>
              <Icon
                as={Ion}
                name="chatbubble-ellipses"
                color="white"
                size={5}
              />
              <Text fontWeight={800} fontSize={14} color="white">
                Start Chat
              </Text>
            </HStack>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DetailAppointment;
