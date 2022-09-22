import {Center, Image, VStack} from 'native-base';
import React, {useEffect} from 'react';
import Logo from '@assets/Icon.png';

import {navigate} from '@commons/RootNavigation';

const Splash = () => {
  return (
    <VStack flex={1} justifyContent="center">
      <Center>
        <Image source={Logo} w="2/4" resizeMode="contain" alt="Dikota Mobile" />
      </Center>
    </VStack>
  );
};

export default Splash;
