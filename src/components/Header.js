import {HStack, Icon, Text, View} from 'native-base';
import React from 'react';
import {Pressable, SafeAreaView} from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '@commons/RootNavigation';

const Header = ({back = false, setting = false, title}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#FFF'}}>
      <HStack
        borderBottomColor="gray.50"
        borderBottomWidth={2}
        bg="white"
        justifyContent="space-between"
        space={2}
        alignItems="center"
        p={4}>
        {back && (
          <Pressable w={30} onPress={() => goBack()}>
            <Icon as={Ion} name="chevron-back" size={30} color="primary.400" />
          </Pressable>
        )}
        <View flex={1} justifyContent="center">
          <Text
            fontFamily="mulish"
            fontWeight="800"
            color="primary.800"
            fontSize={15}
            textTransform="uppercase">
            {title}
          </Text>
        </View>
        {setting ? (
          <Pressable w={30} onPress={() => navigate('setting')}>
            <Icon
              as={Ion}
              name="ios-settings-outline"
              size={25}
              color="primary.400"
            />
          </Pressable>
        ) : (
          <View w={30} />
        )}
      </HStack>
    </SafeAreaView>
  );
};

export default Header;
