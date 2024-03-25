import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataFromFirestore} from '../../redux/user/firestoreSlice';
import {RootState} from '../../redux/store/Store';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

const App = ({navigation, report}: any) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [reportData, setReportData] = useState();
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state: RootState) => state.firestore);

  useEffect(() => {
    dispatch(fetchDataFromFirestore());
  }, [dispatch]);

  const handleFilter = (gender: string) => {
    setSelectedGender(gender);
  };

  const filteredReports = data.filter((item: any) => {
    return selectedGender === '' || item.Gender === selectedGender;
  });

  const [newData, setNewData] = useState({
    Description: '',
    NewLocation: '',
  });
  const handleOpen = ({report}: any) => {
    setReportData(report);
  };
  const handleSubmit = async () => {
    try {
      const report = reportData as any;
      console.log('report => ', report.randomId);
      const id = report.randomId;
      const userIdRef = await firestore().collection('allUserData').doc(id);
      const userIdDoc = await userIdRef.get();
      console.log('userIdDoc', userIdDoc);
      if (userIdDoc.exists) {
        await userIdRef.update({
          Description: newData.Description,
          NewLocation: newData.NewLocation,
        });
        Alert.alert('Location and Description updated successfully');
      } else {
        // console.log('report', report);
        const newUserIdRef = await firestore().collection('allUserData').doc();
        await newUserIdRef.set({
          Description: newData.Description,
          NewLocation: newData.NewLocation,
        });
        Alert.alert('Location and Description updated successfully');
      }
    } catch (error) {
      console.error('Error during updating Location and Description: ', error);
      Alert.alert('Error during updating Location and Description');
    }
  };

  return {
    handleFilter,
    useEffect,
    handleOpen,
    filteredReports,
    loading,
    modalVisible,
    setModalVisible,
    handleSubmit,
    setNewData,
  };
};

export default App;
