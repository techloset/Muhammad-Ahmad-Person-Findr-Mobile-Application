import CheckBox from 'react-native-check-box';

import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import useSignup from './useSignup';
import {Images} from '../../assets/constants/constants';
import signupStyle from './style';

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
  },
  stretch: {
    width: 230,
    height: 130,
    marginLeft: 230,
  },
});

const Signup = ({navigation}: any) => {
  const {
    getNameColor,
    getPasswordColor,
    handleInputChange,
    handleSignUp,
    setEmail,
    setPassword,
    setIsChecked,
    setName,
    isChecked,
    inputValue,
    password,
  } = useSignup(navigation);
  {
    return (
      <ScrollView style={styles.container}>
        <Image style={styles.stretch} source={Images.vector} />
        <Text style={signupStyle.Findr}>Findr</Text>
        <Text style={signupStyle.mainheading}>Join the Search for Hope</Text>
        <Text style={signupStyle.name}>Name</Text>
        <TextInput
          style={[signupStyle.input1, {color: getNameColor()}]}
          onChangeText={text => {
            handleInputChange(text);
            setName(text);
          }}
          value={inputValue}
          placeholder="Please type here…"
        />
        <Text style={signupStyle.textemail}>Email</Text>
        <View style={signupStyle.inputemail}>
          <Image style={{marginLeft: 15}} source={Images.emailIcon} />
          <TextInput
            style={{
              flex: 1,
              padding: 12,
              height: 44,
              borderRadius: 8,
              borderWidth: 0,
            }}
            placeholder="Please type here…"
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
          />
        </View>
        <Text style={{marginLeft: 33, marginRight: 34}}>
          Your email address is your username.
        </Text>
        <Text style={signupStyle.passwordH}>password</Text>
        <TextInput
          style={[signupStyle.input1, {color: getPasswordColor()}]}
          placeholder="Please type here…"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <Text
          style={{
            marginLeft: 33,
            marginRight: 34,
          }}>
          Your password must be 8 character.{' '}
        </Text>
        <View
          style={{flexDirection: 'row', marginLeft: 33, alignItems: 'center'}}>
          <View style={{marginRight: 8, marginTop: 8}}>
            <CheckBox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
            />
          </View>
          <Text
            style={{height: 20, width: 500, color: '#121212', marginTop: 9}}>
            Remember me
          </Text>
        </View>
        <Text style={{height: 20, width: 500, marginHorizontal: 90}}>
          Save my login details for next time.
        </Text>
        <TouchableOpacity onPress={handleSignUp} style={signupStyle.button}>
          <Text style={signupStyle.buttontext}>Next</Text>
        </TouchableOpacity>
        <Text style={signupStyle.LastLine}>Need Help or Have Questions?</Text>
      </ScrollView>
    );
  }
};
export default Signup;
