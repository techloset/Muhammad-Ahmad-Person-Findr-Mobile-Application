import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
const Upload = ({navigation}: any) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const imagePicker = () => {
    let options = {
      mediaType: 'photo',
      storageOptions: {
        path: 'image',
        quality: 1,
      },
    } as ImageLibraryOptions;
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel) {
        const selectedImgUri = response.assets?.[0]?.uri;
        if (selectedImgUri) {
          setSelectedImage(selectedImgUri);
        }
      }
    });
  };

  const uploadImage = async () => {
    try {
      const imageUri = selectedImage;
      const fileName = imageUri?.substring(imageUri.lastIndexOf('/') + 1);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const ref = firebase.storage().ref(`images/${fileName}`);
      const uploadTask = ref.put(blob);

      return new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          snapshot => {},
          error => {
            reject(error);
          },
          async () => {
            const downloadURL = await uploadTask.snapshot!.ref.getDownloadURL();
            resolve(downloadURL);
          },
        );
      });
    } catch (error) {
      console.error('Error uploading image: ', error);
      throw error;
    }
  };

  const [data, setData] = useState({
    Name: '',
    Dateofbirth: '',
    Gender: '',
    Height: '',
    Weight: '',
    EyeColor: '',
    Nickname: '',
    HairColor: '',
    Lengthofthehair: '',
    PictureURL: '',
    ReportedBy: '',
    LastSceneLocation: '',
  });

  const handleChange = (key: string, value: string) => {
    setData({...data, [key]: value});
  };
  const handleSubmit = async () => {
    try {
      const PictureURL = await uploadImage();
      const randomId = firestore().collection('allUserData').doc().id;
      await firestore()
        .collection('allUserData')
        .doc(randomId)
        .set({...data, PictureURL, randomId});
      console.log('Data added successfully!');
      Alert.alert('Data added successfully!');
      setData({
        Name: '',
        Dateofbirth: '',
        Gender: '',
        Height: '',
        Weight: '',
        EyeColor: '',
        Nickname: '',
        HairColor: '',
        Lengthofthehair: '',
        PictureURL: '',
        ReportedBy: '',
        LastSceneLocation: '',
      });
    } catch (error) {
      console.error('Error adding data: ', error);
      Alert.alert('Please Enter Full Details');
    }
  };

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    handleChange('Dateofbirth', currentDate.toString());
  };

  return {
    handleChange,
    imagePicker,
    handleSubmit,
    selectedImage,
    data,
    setShowPicker,
    onChangeDate,
    showPicker,
    date,
  };
};

export default Upload;
