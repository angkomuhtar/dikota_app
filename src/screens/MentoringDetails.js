import {
  Avatar,
  Button,
  Divider,
  HStack,
  Icon,
  ScrollView,
  Text,
  TextField,
  View,
  VStack,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Loading from '../components/Modal/Loading';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';
import {PermissionsAndroid, TouchableOpacity} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import Mentoring from './Mentoring';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const MentoringDetails = props => {
  const [loading, setLoading] = useState('');
  const params = props.route.params.data;
  const [research, setResearch] = useState([]);
  const [mentoring, setMentoring] = useState([]);
  const [Review, setReview] = useState('');
  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    const Research = firestore()
      .collection('Research')
      .doc(params.researchId)
      .onSnapshot(GetResearch);

    return Research;
  }, []);

  const GetResearch = Query => {
    // console.log(Query.data());
    setResearch(Query.data());
    firestore()
      .collection('Users')
      .doc(Query.data().user)
      .get()
      .then(data => {
        console.log(data.data());
        setResearch({
          name: data.data().name,
          nim: data.data().nim,
          jurusan: data.data().jurusan,
          judul: Query.data().judul,
          mentor: Query.data().mentor,
        });
      });
  };

  useEffect(() => {
    const Mentoring = firestore()
      .collection('Mentoring')
      .where('researchId', '==', params.researchId)
      .onSnapshot(GetMentoring);

    return Mentoring;
  }, []);

  const GetMentoring = Query => {
    console.log('MENTOR', Query.docs);
    setMentoring(
      Query.docs.map(data => ({
        id: data.id,
        createAt: data.data().createAt,
        file: data.data().file,
        researchId: data.data().researchId,
        status: data.data().status,
        step: data.data().step,
      })),
    );
  };

  const sendReview = id => {
    console.log(research.mentor[0]);
    let data;
    if (research.mentor[0] == user.uid) {
      data = {mentor1Review: Review};
    } else {
      data = {mentor2Review: Review};
    }

    firestore()
      .collection('Mentoring')
      .doc(id)
      .update(data)
      .then(() => {
        console.log('Update');
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
        setLoading(true);
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
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            console.log(error);
          });
      } else {
        console.log('permission Denied');
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Header title="Details" back={true} />
      <Loading open={loading} />
      <ScrollView flex={1}>
        <VStack p={4} space={3}>
          <HStack space={4} alignItems="center">
            <Avatar size="lg" />
            <VStack>
              <Text fontSize="md" fontWeight="semibold">
                {research.name}
              </Text>
              <Text fontSize="xs" fontWeight="semibold">
                {research.nim} - {research.jurusan}
              </Text>
            </VStack>
          </HStack>
          <Text fontSize="lg" fontWeight="semibold">
            {research.judul}
          </Text>
          <VStack p="4" background="white" rounded="md">
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
                  {data.status == 'open' && (
                    <>
                      <TextField
                        multiline={true}
                        value={Review}
                        onChangeText={e => {
                          setReview(e);
                        }}
                      />
                      <Button onPress={() => sendReview(data.id)}>
                        Submit Review
                      </Button>
                    </>
                  )}
                </VStack>
                <Divider mt={4} />
              </VStack>
            ))}
          </VStack>
        </VStack>
      </ScrollView>
    </>
  );
};

export default MentoringDetails;
