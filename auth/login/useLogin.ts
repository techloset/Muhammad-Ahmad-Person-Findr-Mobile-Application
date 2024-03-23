import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {setLoggedIn} from '../../redux/auth/authSlice'; // Update this path

export const useLogin = (navigation: any) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignIn = () => {
    if (!email || !password) {
      Alert.alert('Please enter your email and password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential?.user?.email) {
          Alert.alert('User login');
        }
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('No user found with that email address');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('Invalid password');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Invalid email address');
        }

        console.error('Error during sign-in:', error);
      });
  };

  const [userEmail, setUserEmail] = useState<string>('');
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '422069894074-ukc0b7e0jh885h4jpnsq1hf67g5fn540.apps.googleusercontent.com',
    });
  }, []);

  const GoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      await GoogleSignin.signOut();

      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      if (userCredential?.user?.email) {
        setUserEmail(userCredential.user.email);
        navigation.navigate('Home');
      }

      const userData = {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      };

      await firestore()
        .collection('allUserAuth')
        .doc(userCredential.user.uid)
        .set(userData);

      navigation.navigate('Home', {userEmail: userCredential.user.email});

      dispatch(
        setLoggedIn({
          user: userCredential.user.email as {
            displayName?: string;
            email?: string;
            photoURL?: string;
            password?: string;
          },
        }),
      );

      console.log(user);

      return userCredential;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  };

  return {
    GoogleSignIn,
    handleSignIn,
    setEmail,
    setPassword,
    setUserEmail,
    userEmail,
  };
};
