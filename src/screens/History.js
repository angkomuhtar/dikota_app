import {HStack, ScrollView, Skeleton, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Header from '@components/Header';
import ChatCard from '@components/Card/ChatCard';
import Photo from '@assets/photo.jpg';
import Photo2 from '@assets/photos.jpg';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import ChatCardLoading from '@components/Card/ChatCardLoading';

const History = () => {
  const {user, userData} = useSelector(state => state.auth);
  const [research, setResearch] = useState(null);
  const [mentor1, setMentor1] = useState('');
  const [mentor2, setMentor2] = useState('');

  useEffect(() => {
    const Unsub = firestore()
      .collection('Research')
      .where('user', '==', user.uid)
      .onSnapshot(onResult);
    return Unsub;
  }, []);

  const onResult = async Snapshot => {
    // console.log(Snapshot.docs);
    if (Snapshot.size == 1) {
      Snapshot.docs.map(async data => {
        setResearch(data);
        setMentor1(await data.data().mentor1.get());
        setMentor2(await data.data().mentor2.get());
      });
    } else {
      setMentor1('');
      setMentor2('');
      setResearch(null);
    }
  };

  return (
    <>
      <Header title="Appointment" />
      <ScrollView>
        <VStack p={4} space={3}>
          {mentor1 ? (
            <ChatCard
              id={mentor1.id}
              name={mentor1.data().name}
              mentor="1"
              img={Photo}
              researchId={research.id}
            />
          ) : (
            <ChatCardLoading />
          )}
          {mentor2 ? (
            <ChatCard
              id={mentor2.id}
              name={mentor2.data().name}
              mentor="2"
              img={Photo}
              researchId={research.id}
            />
          ) : (
            <ChatCardLoading />
          )}
        </VStack>
      </ScrollView>
    </>
  );
};

export default History;
