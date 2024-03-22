import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import splash from '../auth/splash/splash';
import Signup from '../auth/signup/signup';
import login from '../auth/login/login';
import forgot from '../auth/forgot/forgot';
import News from '../screens/news/news';
import Profile from '../screens/profile/Profile';
import Reports from '../screens/reports/reports';
import Home from '../screens/home/home';
import Upload from '../screens/upload/upload';
import {Image, Text, View} from 'react-native-animatable';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 62,
          marginHorizontal: 40,
          borderRadius: 44,
          marginBottom: 15,
          borderWidth: 3,
          borderColor: 'black',
          borderTopWidth: 3,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/navIcons/home2.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/navIcons/reports.png')}
                resizeMode="contain"
                style={{
                  width: 38,
                  height: 38,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/navIcons/upload.png')}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/navIcons/news.png')}
                resizeMode="contain"
                style={{
                  width: 28,
                  height: 28,

                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <Image
                source={require('../assets/navIcons/profile.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? 'blue' : 'black',
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        {!user ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgot" component={forgot} />
            <Stack.Screen name="Splash" component={splash} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {/* <Stack.Screen name="Splash" component={splash} /> */}
            <Stack.Screen name="Home" component={Tabs} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
