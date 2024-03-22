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
        <Image
          style={styles.stretch}
          source={require('../../assets/signin/Vector.png')}
        />
        <Text style={style.Findr}>Findr</Text>
        <Text style={style.mainheading}>Join the Search for Hope</Text>

        <Text style={style.name}>Name</Text>
        <TextInput
          style={[style.input1, {color: getNameColor()}]}
          onChangeText={text => {
            handleInputChange(text);
            setName(text);
          }}
          value={inputValue}
          placeholder="Please type here…"
        />

        <Text style={style.textemail}>Email</Text>
        <View style={style.inputemail}>
          <Image
            style={{marginLeft: 15}}
            source={require('../../assets/signin/Icon.png')}
          />
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
        <Text style={style.passwordH}>password</Text>
        <TextInput
          style={[style.input1, {color: getPasswordColor()}]}
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
        <TouchableOpacity onPress={handleSignUp} style={style.button}>
          <Text style={style.buttontext}>Next</Text>
        </TouchableOpacity>
        <Text style={style.LastLine}>Need Help or Have Questions?</Text>
      </ScrollView>
    );
  }
};

const style = StyleSheet.create({
  button: {
    backgroundColor: '#5B59FE',
    marginLeft: 33,
    marginRight: 34,
    marginTop: 24,
    borderRadius: 8,
  },
  buttontext: {
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 23,
  },
  Findr: {
    color: '#5B59FE',
    marginTop: -30,
    fontFamily: 'Familjen Grotesk',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 77,
    textAlign: 'center',
  },
  mainheading: {
    color: '#121212',
    width: 400,
    fontSize: 23,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  name: {
    color: '#121212',
    width: 40,
    marginTop: 34,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  inputemail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 33,
    marginRight: 34,
    marginTop: 5,
    borderWidth: 1,
    width: 310,
    borderColor: '#D0D5DD',
    borderRadius: 8,
  },
  input1: {
    padding: 12,
    marginTop: 6,
    height: 44,
    marginLeft: 33,
    marginRight: 4,
    maxWidth: 500,
    width: 308,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  textemail: {
    color: '#121212',
    width: 40,
    marginTop: 24,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  passwordH: {
    color: '#121212',
    width: 65,
    marginTop: 24,
    marginLeft: 33,
    height: 30,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  LastLine: {
    color: '#5B59FE',
    textDecorationLine: 'underline',
    marginTop: 31,
    textAlign: 'center',
  },
});

export default Signup;
