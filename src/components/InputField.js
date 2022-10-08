import React, {useState} from 'react';
import {HStack, Icon, Input, Text, View, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Controller} from 'react-hook-form';
import {TouchableOpacity} from 'react-native';

const InputField = props => {
  const {
    name,
    textSecure = false,
    placeholder,
    iconName,
    label,
    control,
    rules = {},
  } = props;
  const [eyes, setEyes] = useState(textSecure ? 'eye-off' : 'eye');
  return (
    <Controller
      control={control}
      rules={rules}
      name={name}
      render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
        <VStack w="full" space={1}>
          <Text
            fontFamily="mulish"
            color="gray.300"
            fontWeight="800"
            fontSize={12}
            textTransform="uppercase">
            {label ? label : name}
          </Text>
          <Input
            {...props}
            onChangeText={onChange}
            secureTextEntry={eyes == 'eye' ? false : true}
            onBlur={onBlur}
            variant="outline"
            onFocus={false}
            borderColor={error ? 'danger.300' : 'success.400'}
            InputLeftElement={
              <Icon
                as={<Ionicons name={iconName} />}
                size={5}
                ml="4"
                color="muted.400"
              />
            }
            InputRightElement={
              textSecure && (
                <TouchableOpacity
                  onPress={() => setEyes(eyes == 'eye' ? 'eye-off' : 'eye')}>
                  <Icon
                    as={<Ionicons name={eyes} />}
                    size={5}
                    mr="4"
                    color="muted.400"
                  />
                </TouchableOpacity>
              )
            }
            size="xl"
            placeholder={placeholder}
            fontFamily="mulish"
            fontWeight="300"
            fontSize={14}
            px={4}
            py={4}
          />

          <HStack alignItems="center" justifyContent="flex-end">
            {error ? (
              <>
                <Icon
                  as={<Ionicons name="alert-circle" />}
                  size={4}
                  mr="2"
                  color="danger.300"
                />
                <Text
                  fontFamily="mulish"
                  color="danger.300"
                  fontWeight="300"
                  fontSize={12}
                  textTransform="capitalize">
                  {error.message}
                </Text>
              </>
            ) : (
              <Text
                fontFamily="mulish"
                color="danger.300"
                fontWeight="300"
                fontSize={12}
                textTransform="capitalize">
                {''}
              </Text>
            )}
          </HStack>
        </VStack>
      )}
    />
  );
};

export default InputField;
