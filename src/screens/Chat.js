import React from 'react';
import Header from '@components/Header';
import {Text, View} from 'native-base';

const Chat = () => {
  return (
    <View>
      <Header back={true} title="Mentoring Chats" />
      <Text>Chat</Text>
    </View>
  );
};

export default Chat;
