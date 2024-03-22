import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useLogin} from './useLogin';

const Login = ({navigation}: any) => {
  const {GoogleSignIn, handleSignIn, setEmail, userEmail, setPassword} =
    useLogin(navigation);

  return (
    <View>
      <Text style={styles.Findr}>Findr</Text>
      <Image
        style={styles.searchForHope}
        source={require('../../assets/login/SearchForHope.png')}
      />
      <Text style={styles.mainheading1}>Welcome Back</Text>
      <Text style={styles.headinginput1}>Email</Text>
      <View style={styles.firstinput}>
        <Image
          style={{marginLeft: 15}}
          source={require('../../assets/login/Icon.png')}
        />
        <TextInput
          placeholder="Please type here…"
          onChangeText={Email => setEmail(Email)}
        />
      </View>
      <Text style={{marginLeft: 33, marginRight: 34, marginTop: 8}}>
        Your email address is your username.
      </Text>
      <Text style={styles.headinginput2}>Password</Text>
      <TextInput
        style={styles.secondinput}
        placeholder="Please type here…"
        secureTextEntry
        onChangeText={password => setPassword(password)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttontext}>Log in</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 22}}>
        <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
          <Text style={{marginLeft: 54, color: 'black'}}>
            Forget your password
          </Text>
        </TouchableOpacity>
        <Text> | </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{marginRight: 74, color: 'black'}}>
            Register for an account
          </Text>
        </TouchableOpacity>
      </View>
      <Image
        style={{width: 400, height: 33, marginTop: 21}}
        source={require('../../assets/login/or.png')}
      />
      <TouchableOpacity
        onPress={() =>
          GoogleSignIn()
            .then(res => {
              console.log(res.user);
            })
            .catch(error => console.log(error))
        }>
        <Image
          style={{
            width: 60,
            height: 57,
            gap: 30,
            marginHorizontal: 175,
            marginTop: 27,
          }}
          source={require('../../assets/login/google.png')}
        />
      </TouchableOpacity>
      <Image
        style={{width: 200, height: 85, marginLeft: 105, marginTop: 60}}
        source={require('../../assets/login/Vector2.png')}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  Findr: {
    color: '#5B59FE',
    marginTop: 70,
    fontFamily: 'Familjen Grotesk',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 77,
    textAlign: 'center',
  },
  searchForHope: {
    width: 115,
    height: 24,
    marginLeft: 185,
    marginRight: 105,
    marginTop: -20,
  },
  mainheading1: {
    fontFamily: 'Familjen Grotesk',
    marginLeft: 39.5,
    marginTop: 24,
    marginRight: 39.5,
    fontSize: 45,
    lineHeight: 54,
    color: '#0F0F0F',
    fontWeight: '700',
  },
  headinginput1: {
    color: '#121212',
    width: 40,
    marginTop: 24,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  headinginput2: {
    color: '#121212',
    width: 70,
    marginTop: 24,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  firstinput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 310,
    marginLeft: 33,
    marginRight: 34,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    borderRadius: 8,
  },
  secondinput: {
    padding: 12,
    marginTop: 6,
    height: 44,
    marginLeft: 33,
    marginRight: 34,
    width: 308,
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D0D5DD',
  },
  buttontext: {
    marginTop: 12,
    marginBottom: 12,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 23,
  },
  button: {
    backgroundColor: '#5B59FE',
    marginLeft: 33,
    marginRight: 34,
    marginTop: 24,
    borderRadius: 8,
  },
});

export default Login;
