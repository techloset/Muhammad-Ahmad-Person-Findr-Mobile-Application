// import auth from '@react-native-firebase/auth';

// import {SetStateAction, useState} from 'react';
// import {Alert} from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import {current} from '@reduxjs/toolkit';
// import {useDispatch} from 'react-redux';
// import {setLoggedIn} from '../../redux/auth/authSlice';
// const Signup = ({navigation}: any) => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');

//   const handleSignUp = (navigation: any) => {
//     const dispatch = useDispatch();
//     if (!email) {
//       Alert.alert('Please enter your email address');
//     }
//     auth()
//       .createUserWithEmailAndPassword(email, password)
//       .then(userCredential => {
//         try {
//           const uid = auth().currentUser?.uid;
//           firestore()
//             .collection('Users')
//             .doc(uid)
//             .set({
//               name,
//               email,
//               password,
//             })
//             .then(() => {
//               console.log('User data uploaded to Firestore!');
//             })
//             .catch(error => {
//               console.error('Error uploading user data to Firestore: ', error);
//             });
//           dispatch(
//             setLoggedIn({
//               user: userCredential.user.email as {
//                 name?: string;
//                 email?: string;
//                 password?: string;
//               },
//             }),
//           );
//         } catch (error) {
//           console.log('error', error);
//         }
//         console.log('User account created & signed in!');
//         Alert.alert('User signup');
//         navigation.navigate('Home');

//         if (!userCredential?.user?.email) {
//           Alert.alert('Please Enter Detail');
//         }
//       })
//       .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//           Alert.alert('That email address is already in use!');
//         }
//         if (error.code === 'auth/invalid-email') {
//           Alert.alert('That email address is invalid!');
//         }
//       });
//   };

//   // onclick input text color
//   const [inputValue, setInputValue] = useState('');
//   const handleInputChange = (text: SetStateAction<string>) => {
//     setInputValue(text);
//   };
//   const getNameColor = () => {
//     const minCharacterLimit = 5;
//     return inputValue.length < minCharacterLimit ? 'red' : 'black';
//   };
//   const getPasswordColor = () => {
//     const minCharacterLimit = 8;
//     return password.length >= minCharacterLimit ? '#121212' : 'red';
//   };
//   const handleNameChange = (text: string) => {
//     // setName(text);
//   };
//   {
//     return {
//       getNameColor,
//       getPasswordColor,
//       handleInputChange,
//       handleSignUp,
//       setEmail,
//       setPassword,
//       setIsChecked,
//       setName,
//       isChecked,
//       inputValue,
//       password,
//     };
//   }
// };
// export default Signup;

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

  const dispatch = useDispatch(); // Move useDispatch outside of the component

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

        console.log('User account created & signed in!');
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
