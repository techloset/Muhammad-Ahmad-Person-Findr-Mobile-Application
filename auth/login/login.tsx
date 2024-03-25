import React, {useEffect} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {useLogin} from './useLogin';
import {Images} from '../../assets/constants/constants';
import loginStyles from './style';

const Login = ({navigation}: any) => {
  const {GoogleSignIn, handleSignIn, setEmail, userEmail, setPassword} =
    useLogin(navigation);
  return (
    <View>
      <Text style={loginStyles.Findr}>Findr</Text>
      <Image style={loginStyles.searchForHope} source={Images.searchForHope2} />
      <Text style={loginStyles.mainheading1}>Welcome Back</Text>
      <Text style={loginStyles.headinginput1}>Email</Text>
      <View style={loginStyles.firstinput}>
        <Image style={{marginLeft: 15}} source={Images.emailIcon} />
        <TextInput
          placeholder="Please type here…"
          onChangeText={Email => setEmail(Email)}
        />
      </View>
      <Text style={{marginLeft: 33, marginRight: 34, marginTop: 8}}>
        Your email address is your username.
      </Text>
      <Text style={loginStyles.headinginput2}>Password</Text>
      <TextInput
        style={loginStyles.secondinput}
        placeholder="Please type here…"
        secureTextEntry
        onChangeText={password => setPassword(password)}
      />
      <TouchableOpacity style={loginStyles.button} onPress={handleSignIn}>
        <Text style={loginStyles.buttontext}>Log in</Text>
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
        source={Images.or}
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
          source={Images.google}
        />
      </TouchableOpacity>
      <Image
        style={{width: 200, height: 85, marginLeft: 105, marginTop: 60}}
        source={Images.vector2}
      />
    </View>
  );
};

export default Login;
