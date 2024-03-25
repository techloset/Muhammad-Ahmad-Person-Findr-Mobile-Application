import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/constants/constants';
import profileStyles from './style';

const Profile = ({navigation}: any) => {
  const user = auth()?.currentUser;

  const signout = async () => {
    await auth().signOut();
    Alert.alert('User Signout');
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={{marginLeft: -5}}>
      <View style={profileStyles.firstRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{marginLeft: 35, width: 18, height: 12, marginTop: 21}}
            source={Images.backPage}
          />
        </TouchableOpacity>
        <Text style={profileStyles.mainHeading}>Edit Profile</Text>
        <TouchableOpacity
          onPress={() => {
            signout();
          }}>
          <Image
            style={{
              marginLeft: 80,
              width: 24,
              height: 24,
              marginRight: 24,
              marginTop: 12,
            }}
            source={Images.Logout}
          />
        </TouchableOpacity>
      </View>
      <Image
        style={profileStyles.personpicture}
        source={user?.photoURL ? {uri: user.photoURL} : Images.personLogo}
      />
      <Text style={profileStyles.name}>Name</Text>
      <TextInput style={profileStyles.input1} value={user?.displayName || ''} />

      <Text style={profileStyles.textemail}>Email</Text>
      <View style={profileStyles.inputemail}>
        <Image style={{marginLeft: 15}} source={Images.emailIcon} />
        <TextInput
          style={{
            flex: 1,
            padding: 12,
            height: 44,
            borderRadius: 8,
            color: 'black',
            borderWidth: 0,
          }}
          value={user?.email || ''}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={profileStyles.button}>
        <Text style={profileStyles.buttontext}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Profile;
