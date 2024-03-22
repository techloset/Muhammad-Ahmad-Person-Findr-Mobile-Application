import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import useForgot from './useForgot';
import {Images} from '../../assets/constants/constants';

export const Forgot = ({navigation}: any) => {
  const {handleResetPassword, email, setEmail} = useForgot(navigation);

  return (
    <View>
      <View
        style={{flexDirection: 'row', marginLeft: 47, marginTop: 29, gap: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            style={{marginLeft: 3, width: 18, height: 12, marginTop: 11}}
            source={Images.backPage}
          />
        </TouchableOpacity>
        <Text style={styles.forget}>Forgot Password</Text>
      </View>
      <Image
        style={{marginHorizontal: 40, marginTop: 56}}
        source={Images.forgetMainPic}
      />
      <Text style={{textAlign: 'center', marginTop: 34, color: '#222526'}}>
        Please enter the email address associated
      </Text>
      <Text style={{textAlign: 'center', color: '#222526'}}>
        with your account. We'll send you a
      </Text>
      <Text style={{textAlign: 'center', color: '#222526'}}>
        verification code to reset your password.
      </Text>

      <Text style={styles.emailH}>Email</Text>
      <View style={styles.fullinput}>
        <Image style={{marginLeft: 15}} source={Images.emailIcon} />
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Please type here…"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttontext}>Send Reset Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forget: {
    height: 30,
    color: '#000000',
    fontWeight: '600',
    fontSize: 23,
  },
  emailH: {
    color: '#121212',
    width: 40,
    marginTop: 24,
    marginLeft: 33,
    height: 20,
    fontFamily: 'Familjen Grotesk',
    lineHeight: 27.6,
    textAlign: 'center',
  },
  fullinput: {
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
  input: {
    flex: 1,
    padding: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 0,
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
    marginTop: 46,
    borderRadius: 8,
  },
});

export default Forgot;
