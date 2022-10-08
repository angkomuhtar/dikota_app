import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Header from '@components/Header';
import {Text, View} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Chat = props => {
  const [messages, setMessages] = useState([]);
  const {user, userData} = useSelector(state => state.auth);
  let {channelId} = props.route.params;

  useEffect(() => {
    console.log('channel ID', channelId);
    const Unsub = firestore()
      .collection('Chats')
      .where('channelId', '==', channelId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(onResult, onError);
    return Unsub;
  }, [channelId]);

  function onResult(QuerySnapshot) {
    setMessages(
      QuerySnapshot.docs.map(doc => ({
        _id: doc.data()._id,
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      })),
    );
  }

  function onError(error) {
    setMessages([]);
    console.log('ERR : >>>', error);
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    console.log(messages[0]);
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('Chats')
      .add({
        _id,
        createdAt,
        text,
        user,
        channelId: channelId,
      })
      .then(() => {
        console.log('User added!');
      });
  }, []);

  return (
    <View flex={1}>
      <Header back={true} title="Mentoring Chats" />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.email,
          avatar: 'https://i.pravatar.cc/300',
        }}
      />
    </View>
  );
};

export default Chat;
