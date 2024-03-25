import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useForgot from './useForgot';
import {Images} from '../../assets/constants/constants';
import forgotStyles from './style';

export const Forgot = ({navigation}: any) => {
  const {handleResetPassword, email, setEmail} = useForgot(navigation);

  return (
    <ScrollView>
      <View
        style={{flexDirection: 'row', marginLeft: 47, marginTop: 29, gap: 16}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Image
            style={{marginLeft: 3, width: 18, height: 12, marginTop: 11}}
            source={Images.backPage}
          />
        </TouchableOpacity>
        <Text style={forgotStyles.forget}>Forgot Password</Text>
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

      <Text style={forgotStyles.emailH}>Email</Text>
      <View style={forgotStyles.fullinput}>
        <Image style={{marginLeft: 15}} source={Images.emailIcon} />
        <TextInput
          style={forgotStyles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="Please type here…"
          placeholderTextColor="black"
        />
      </View>
      <TouchableOpacity
        style={forgotStyles.button}
        onPress={handleResetPassword}>
        <Text style={forgotStyles.buttontext}>Send Reset Code</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Forgot;
