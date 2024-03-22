// import React from 'react';
// import {Alert} from 'react-native';
// import firebase from '@react-native-firebase/app';

// const useForgot = (navigation: any) => {
//   const changePassword = (email: string) => {
//     // Check if the user is authenticated
//     firebase
//       .auth()
//       .sendPasswordResetEmail(email)
//       .then(() => {
//         Alert.alert('Password reset email sent successfully');
//       })
//       .catch(error => {
//         Alert.alert(error.message);
//       });
//   };

//   return {
//     changePassword,
//   };
// };

// export default useForgot;

import React, {useState} from 'react';
import {Alert} from 'react-native';
import firebase from '@react-native-firebase/app';

const useForgot = (navigation: any) => {
  const [email, setEmail] = useState('');
  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Email is required');
      return;
    }

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('Password reset email sent successfully!');
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return {
    handleResetPassword,
    email,
    setEmail,
  };
};

export default useForgot;
