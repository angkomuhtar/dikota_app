import {ScrollView, VStack} from 'native-base';
import React from 'react';
import Header from '@components/Header';
import ChatCard from '@components/Card/ChatCard';
import Photo from '@assets/photo.jpg';
import Photo2 from '@assets/photos.jpg';

const History = () => {
  return (
    <>
      <Header title="Appointment" />
      <ScrollView>
        <VStack p={4} space={3}>
          <ChatCard name="Faisal, S.T. M.T." img={Photo} />
          <ChatCard name="Faisal Akib, S.Kom. M.Kom." img={Photo2} />
        </VStack>
      </ScrollView>
    </>
  );
};

export default History;
