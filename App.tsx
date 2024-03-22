import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './navigation/Navigation';

const App = () => {
  return <Navigation />;
};

export default App;

const styles = StyleSheet.create({});

// import React, {useState} from 'react';
// import {View, TextInput, Button, StyleSheet} from 'react-native';
// import firebase from '@react-native-firebase/app';
// import firestore from '@react-native-firebase/firestore';
// const AddDataForm = () => {
//   const [data, setData] = useState({
//     name: '',
//     age: '',
//   });

//   const handleChange = (key: string, value: string) => {
//     setData({...data, [key]: value});
//   };

//   const handleSubmit = () => {
//     firestore()
//       .collection('name')
//       .add(data)
//       .then(() => {
//         console.log('Data added successfully!');
//         // Clear form after submission
//         setData({name: '', age: ''});
//       })
//       .catch(error => {
//         console.error('Error adding data: ', error);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={data.name}
//         onChangeText={text => handleChange('name', text)}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Age"
//         value={data.age}
//         onChangeText={text => handleChange('age', text)}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
// });

// export default AddDataForm;

// import React from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import splash from './auth/splash/splash';
// import Signup from './auth/signup/signup';
// import login from './auth/login/login';
// import forgot from './auth/forgot/forgot';
// import News from './screens/news/news';
// import Profile from './screens/profile/profile';
// import Reports from './screens/reports/reports';
// import Home from './screens/home/home';
// import Upload from './screens/upload/upload';
// import {Image, Text, View} from 'react-native-animatable';
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           height: 62,
//           marginHorizontal: 40,
//           borderRadius: 44,
//           marginBottom: 15,
//           borderWidth: 2,
//           borderColor: 'black',
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View>
//               <Image
//                 source={require('./assets/home/Home.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? 'blue' : 'black',
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Reports"
//         component={Reports}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View>
//               <Image
//                 source={require('./assets/home/reports.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? 'blue' : 'black',
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Upload"
//         component={Upload}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View>
//               <Image
//                 source={require('./assets/home/upload.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? 'blue' : 'black',
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="News"
//         component={News}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View>
//               <Image
//                 source={require('./assets/home/profile.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? 'blue' : 'black',
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({focused}) => (
//             <View>
//               <Image
//                 source={require('./assets/home/profile.png')}
//                 resizeMode="contain"
//                 style={{
//                   width: 25,
//                   height: 25,
//                   tintColor: focused ? 'blue' : 'black',
//                 }}
//               />
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="Splash"
//         screenOptions={{headerShown: false}}>
//         <Stack.Screen name="Login" component={login} />
//         <Stack.Screen name="Signup" component={Signup} />
//         <Stack.Screen name="Forgot" component={forgot} />
//         <Stack.Screen name="Splash" component={splash} />
//         <Stack.Screen name="Home" component={Tabs} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
// import React, {useState} from 'react';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// const App = () => {
//   const [selectImage, setselectImage] = useState('');
//   const ImagePicker = () => {
//     let options = {
//       storageOptions: {
//         path: 'image',
//       },
//     };
//     launchImageLibrary(options, response => {
//       setselectImage(response.assets[0].uri);
//       console.log(response.assets[0].uri);
//     });
//   };
//   return (
//     <View>
//       <TouchableOpacity
//         onPress={() => {
//           ImagePicker();
//         }}>
//         <Text>hang </Text>
//         <Image width={400} height={800} source={{uri: selectImage}} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({});
