import React, {useEffect} from 'react';
import Header from '@components/Header';
import {
  Avatar,
  Badge,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View,
  VStack,
} from 'native-base';
import Ion from 'react-native-vector-icons/Ionicons';
import ConsultantCard from '@components/Card/ConsultantCard';
import {PermissionsAndroid, TouchableOpacity} from 'react-native';
import Pdf from 'react-native-pdf';
import {navigate} from '@commons/RootNavigation';
import moment from 'moment';
import DocumentPicker, {types} from 'react-native-document-picker';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import storage from '@react-native-firebase/storage';
import Loading from '@components/Modal/Loading';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

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

const DetailAppointment = props => {
  let {id, researchId, mentorType} = props.route.params;
  const {user} = useSelector(state => state.auth);
  const [mentor, setMentor] = useState(null);
  const [mentoring, setMentoring] = useState([]);
  const [research, setResearch] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);

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
        console.log(data.metadata.fullPath);
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

  useEffect(() => {
    const sub = firestore()
      .collection('Mentoring')
      .where('researchId', '==', researchId)
      .orderBy('createAt', 'desc')
      .onSnapshot(Mentoring, ErrMentoring);
    return sub;
  }, []);

  const Mentoring = Query => {
    console.log(Query);
    setMentoring(Query.docs.map(doc => doc.data()));
  };
  const ErrMentoring = e => {
    console.log(e);
  };

  useEffect(() => {
    getMentor();
    getChannel(id);
    getUrl();
  }, [id]);

  const Result = Query => {
    Query.forEach(element => {
      setResearch(element);
    });
  };

  const getMentor = async () => {
    firestore()
      .collection('Users')
      .doc(id)
      .get()
      .then(data => {
        setMentor(data.data());
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
          console.log('data Channel', e.id);
          setChannel(e);
        });
      });
  };

  const getUrl = async docs => {
    let url = await storage()
      .ref('Documents/dtfRx4OdM6gLATep0iCmSAOk9RC3-1665081232.pdf')
      .getDownloadURL();

    console.log('URL >>>', url);
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
        const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

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
      <Header back={true} title="Details" />
      <ScrollView p={4} flex={1}>
        <VStack space={4} pb={8}>
          <ConsultantCard
            name={mentor?.name}
            nim={mentor?.nim}
            jurusan={mentor?.jurusan}
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
            <VStack>
              {mentoring.map(data => (
                <HStack py={4} space={2} alignItems="center">
                  <Pdf
                    // page={1}
                    source={{
                      uri: 'https://firebasestorage.googleapis.com/v0/b/dikota-9c1dc.appspot.com/o/Documents%2FdtfRx4OdM6gLATep0iCmSAOk9RC3-1665081232.pdf?alt=media&token=0f9f250f-1f3f-4240-b274-082d0bf9ce46',
                    }}
                    onError={() => {
                      console.log('error');
                    }}
                    style={{height: 80, width: 60}}
                  />
                  <VStack flex={1}>
                    <Text>Draft File</Text>
                    <Text fontSize={10}>
                      {moment(data.createAt).format('DD MMM YY, hh:mm A')}
                    </Text>
                  </VStack>
                  <TouchableOpacity
                    onPress={() => {
                      // alert('test');
                      downloadFile(
                        'https://firebasestorage.googleapis.com/v0/b/dikota-9c1dc.appspot.com/o/Documents%2FdtfRx4OdM6gLATep0iCmSAOk9RC3-1665081232.pdf?alt=media&token=0f9f250f-1f3f-4240-b274-082d0bf9ce46',
                      );
                    }}>
                    <Icon as={Ion} name="download-outline" size="2xl" />
                  </TouchableOpacity>
                </HStack>
              ))}
              <Divider />
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
