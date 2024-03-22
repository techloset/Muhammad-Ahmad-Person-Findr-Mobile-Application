import auth from '@react-native-firebase/auth';
import {useState} from 'react';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/auth/authSlice';

const Signup = ({navigation}: any) => {
  const [isChecked, setIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const handleSignUp = () => {
    if (!email || !password || !name) {
      Alert.alert('Please enter all required fields');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredential => {
        const uid = auth().currentUser?.uid;

        try {
          await firestore().collection('Users').doc(uid).set({
            name,
            email,
            password,
          });

          dispatch(
            setLoggedIn({
              user: {
                name,
                email,
              },
            }),
          );
        } catch (error) {
          console.error('Error uploading user data to Firestore: ', error);
        }

        Alert.alert('User signup');
        navigation.navigate('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        } else {
          Alert.alert('Error signing up:', error.message);
        }
      });
  };

  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const getNameColor = () => {
    const minCharacterLimit = 5;
    return inputValue.length < minCharacterLimit ? 'red' : 'black';
  };

  const getPasswordColor = () => {
    const minCharacterLimit = 8;
    return password.length >= minCharacterLimit ? '#121212' : 'red';
  };
  {
    return {
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
    };
  }
};
export default Signup;
