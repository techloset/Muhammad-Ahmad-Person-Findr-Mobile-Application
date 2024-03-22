import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchDataFromFirestore} from '../../redux/user/firestoreSlice';
import {RootState} from '../../redux/store/Store';

const App = ({navigation}: any) => {
  const [selectedGender, setSelectedGender] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  return {
    handleFilter,
    useEffect,
    filteredReports,
    loading,
    modalVisible,
    setModalVisible,
  };
};

export default App;
