import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/constants/constants';
const Profile = ({navigation}: any) => {
  const user = auth()?.currentUser;

  const signout = async () => {
    try {
      await auth().signOut();
      Alert.alert('User Signout');
      navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <View style={styles.firstRow}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={{marginLeft: 35, width: 18, height: 12, marginTop: 21}}
            source={Images.backPage}
          />
        </TouchableOpacity>
        <Text style={styles.mainHeading}>Edit Profile</Text>
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
        style={styles.personpicture}
        source={user?.photoURL ? {uri: user.photoURL} : Images.personLogo}
      />
      <Text style={styles.name}>Name</Text>
      <TextInput style={styles.input1} value={user?.displayName || ''} />

      <Text style={styles.textemail}>Email</Text>
      <View style={styles.inputemail}>
        <Image style={{marginLeft: 15}} source={Images.emailIcon} />
        <TextInput
          style={{
            flex: 1,
            padding: 12,
            height: 44,
            borderRadius: 8,
            borderWidth: 0,
          }}
          value={user?.email || ''}
          keyboardType="email-address"
        />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttontext}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  firstRow: {
    flexDirection: 'row',
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
    marginTop: 251,
    borderRadius: 8,
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
  name: {
    color: '#344054',
    width: 40,
    marginTop: 69,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
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
  mainHeading: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    marginLeft: 80,
    marginTop: 12,
    color: '#0F0F0F',
  },
  personpicture: {
    marginHorizontal: 125,
    width: 125,
    height: 125,
    marginTop: 16,
    borderRadius: 100,
  },
});
export default Profile;
