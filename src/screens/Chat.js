import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import Header from '@components/Header';
import {Text, View} from 'native-base';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const {user, userData} = useSelector(state => state.auth);

  useEffect(() => {
    const Unsub = firestore()
      .collection('Chats')
      .orderBy('createdAt', 'desc')
      .onSnapshot(onResult, onError);
    return Unsub;
  }, []);

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
    console.error(error);
  }

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    const {_id, createdAt, text, user} = messages[0];
    firestore()
      .collection('Chats')
      .add({
        _id,
        createdAt,
        text,
        user,
      })
      .then(() => {
        console.log('User added!');
      });
  }, []);

  // useLayoutEffect(() => {
  //   const collectionRef = collection(database, 'chats');
  //   console.log('test', collectionRef);
  //   const q = query(collectionRef, orderBy('createdAt', 'desc'));

  //   const unsubscribe = onSnapshot(q, querySnapshot => {
  //     console.log('querySnapshot unsusbscribe');
  //     setMessages(
  //       querySnapshot.docs.map(doc => ({
  //         _id: doc.data()._id,
  //         createdAt: doc.data().createdAt.toDate(),
  //         text: doc.data().text,
  //         user: doc.data().user,
  //       })),
  //     );
  //   });
  //   return unsubscribe;
  // }, []);

  // const onSend = useCallback(async (messages = []) => {
  //   setMessages(previousMessages =>
  //     GiftedChat.append(previousMessages, messages),
  //   );
  //   // setMessages([...messages, ...messages]);

  //   alert('hallo');
  //   try {
  //     // const {_id, createdAt, text, user} = messages[0];
  //     const docRef = await addDoc(collection(database, 'chats'), {
  //       first: 'Ada',
  //       last: 'Lovelace',
  //       born: 1815,
  //     });
  //     console.log('Document written with ID: ', docRef.id);
  //   } catch (e) {
  //     console.error('Error adding document: ', e);
  //   }
  //   // addDoc(collection(database, 'chats'), {
  //   //   _id,
  //   //   createdAt,
  //   //   text,
  //   //   user,
  //   // });
  // }, []);

  // useEffect(() => {
  //   // const querySnapshot = getDocs(collection(db, 'users'));
  //   // querySnapshot.forEach(doc => {
  //   //   console.log(`${doc.id} => ${doc.data()}`);
  //   // });
  // }, []);

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
