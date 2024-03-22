// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import React, {useEffect, useState} from 'react';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
// import {Alert} from 'react-native';
// import { useDispatch } from 'react-redux';

// export const useLogin = (navigation: any) => {
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   // const handleSignIn = () => {
//   //   if (!email) {
//   //     Alert.alert('Please enter your email address');
//   //   }
//   //   auth()
//   //     .createUserWithEmailAndPassword(email, password)
//   //     .then(userCredential => {
//   //       console.log('User account created & signed in!');
//   //       Alert.alert('User Login');
//   //       if (userCredential?.user?.email) {
//   //         setUserEmail(userCredential.user.email);
//   //         navigation.navigate('Home', {userEmail: userCredential.user.email});
//   //       }
//   //       if (!userCredential?.user?.email) {
//   //         Alert.alert('Please Enter Detail');
//   //       }
//   //     })
//   //     .catch(error => {
//   //       if (error.code === 'auth/email-already-in-use') {
//   //         Alert.alert('That email address is already in use!');
//   //       }
//   //       if (error.code === 'auth/invalid-email') {
//   //         Alert.alert('That email address is invalid!');
//   //       }
//   //     });
//   // };

//   const handleSignIn = () => {
//     const dispatch = useDispatch();

//     if (!email || !password) {
//       Alert.alert('Please enter your email and password');
//       return;
//     }

//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         console.log('User signed in!');
//         Alert.alert('User Login');
//         if (userCredential?.user?.email) {
//           // Assuming you have a state variable and a navigation prop
//           // to handle the user email and navigation.
//           // const [userEmail, setUserEmail] = useState('');
//           // navigation.navigate('Home', { userEmail: userCredential.user.email });
//           // setUserEmail(userCredential.user.email);
//           Alert.alert('ggggg');
//         }
//       })
//       .catch(error => {
//         if (error.code === 'auth/user-not-found') {
//           Alert.alert('No user found with that email address');
//         }
//         if (error.code === 'auth/wrong-password') {
//           Alert.alert('Invalid password');
//         }
//         if (error.code === 'auth/invalid-email') {
//           Alert.alert('Invalid email address');
//         }

//         // Additional error handling if needed
//         console.error('Error during sign-in:', error);
//       });
//   };

//   // Google Signin
//   const [userEmail, setUserEmail] = useState<string>('');
//   useEffect(() => {
//     GoogleSignin.configure({
//       webClientId:
//         '422069894074-ukc0b7e0jh885h4jpnsq1hf67g5fn540.apps.googleusercontent.com',
//     });
//   }, []);

//   const GoogleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//       const {idToken, user} = await GoogleSignin.signIn();
//       const googleCredential = auth.GoogleAuthProvider.credential(idToken);
//       const userCredential = await auth().signInWithCredential(
//         googleCredential,
//       );
//       console.log('After Firebase Sign-In', userCredential);

//       console.log(userCredential.user.email);
//       if (userCredential?.user?.email) {
//         setUserEmail(userCredential.user.email);
//         navigation.navigate('Home');
//       }
//       const userData = {
//         email: user.email,
//       };
//       await firestore().collection('users').doc(user.id).set(userData);
//       navigation.navigate('Home', {userEmail: userCredential.user.email});

//       dispatch(setLoggedIn({
//         user: {
//           name: userCredential.user.displayName,
//           email: userCredential.user.email,
//           photo: userCredential.user.photoURL,
//           uid: userCredential.user.uid,
//         },
//       }));

//       return userCredential;
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       throw error;
//     }
//   };

//   return {
//     GoogleSignIn,
//     handleSignIn,
//     setEmail,
//     setPassword,
//     setUserEmail,
//     userEmail,
//   };
// };

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
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
        console.log('User signed in!');
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

      // Clearing any existing user session
      await GoogleSignin.signOut();

      const {idToken, user} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      console.log('After Firebase Sign-In', userCredential);
      console.log(userCredential.user.email);

      if (userCredential?.user?.email) {
        setUserEmail(userCredential.user.email);
        navigation.navigate('Home');
      }

      const userData = {
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      };

      await firestore()
        .collection('Users')
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
