import React, {useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
import {View, Text, Image} from 'react-native';
const Splash = ({navigation}: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);
  return (
    <View style={{backgroundColor: '#5B59FE', flex: 1}}>
      <Animatable.Text
        style={{
          color: 'white',
          marginLeft: 94,
          marginRight: 133,
          marginTop: 380,
          fontFamily: 'Familjen Grotesk',
          fontSize: 64,
          fontWeight: '700',
          lineHeight: 77,
          textAlign: 'center',
          marginBottom: -15,
        }}
        duration={3000}
        animation="flipInY">
        Findr
      </Animatable.Text>
      <Animatable.View
        style={{marginLeft: 193, marginRight: 95}}
        duration={3000}
        animation="flipInY">
        <Image source={require('../../assets/signin/Search.png')} />
      </Animatable.View>
    </View>
  );
};
export default Splash;
