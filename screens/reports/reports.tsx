import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/Store';
import useReports from './useReports';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/constants/constants';
import useUpload from ' ../../../screens/upload/useUpload';
import reportStyles from './style';

const App = ({navigation}: any) => {
  const {handleChange, data} = useUpload(navigation);
  const user = auth()?.currentUser;
  const {loading} = useSelector((state: RootState) => state.firestore);
  const [searchQuery, setSearchQuery] = useState('');
  const {
    handleFilter,
    filteredReports,
    handleSubmit,
    setNewData,
    handleOpen,
    modalVisible,
    setModalVisible,
  } = useReports(navigation);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(
    null,
  );

  const handleEmailContact = () => {
    if (user?.email) {
      Linking.openURL(`mailto:${user.email}`);
    } else {
      Alert.alert('Error', 'User email not found');
    }
  };

  return (
    <ScrollView>
      <View>
        <View style={reportStyles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={reportStyles.backButton} source={Images.backPage} />
          </TouchableOpacity>
          <Text style={reportStyles.h1}>Missing Person Details</Text>
        </View>
        <View style={reportStyles.searchinput}>
          <TextInput
            placeholder="Search"
            placeholderTextColor="black"
            style={{marginLeft: 13}}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Image style={reportStyles.search} source={Images.search} />
        </View>
        <View style={reportStyles.filterDiv}>
          <Text style={reportStyles.filterText}>Filter By:</Text>
          <TouchableOpacity onPress={() => handleFilter('Male')}>
            <Text style={reportStyles.touch}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Female')}>
            <Text style={reportStyles.touch}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Custom')}>
            <Text style={reportStyles.touch}>Custom</Text>
          </TouchableOpacity>
        </View>
        {filteredReports
          .filter(report =>
            report.Name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((report: any, index: number) => (
            <View
              key={index}
              style={{flexDirection: 'row', marginLeft: 5, marginBottom: 16}}>
              <View>
                <Image
                  style={reportStyles.person}
                  source={{uri: report.PictureURL}}
                />
              </View>
              <View style={{marginLeft: 8}}>
                <Text style={{color: 'black'}}>Name : {report.Name}</Text>
                <Text style={{color: 'black'}}>
                  NickName : {report.Nickname}
                </Text>
                <Text style={{color: 'black'}}>
                  Reported By : {report.ReportedBy}
                </Text>

                <Text style={{width: 250, color: 'black'}}>
                  Last Scene Location : {report.LastSceneLocation}
                </Text>
                <TouchableOpacity
                  style={reportStyles.button}
                  onPress={() => {
                    handleOpen({report});
                    setSelectedCardIndex(index);
                    setModalVisible(true);
                  }}>
                  <Text style={reportStyles.buttontext}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
      <View style={reportStyles.centeredView}>
        {filteredReports.map((report: any, index: number) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setSelectedCardIndex(index);
              setModalVisible(true);
            }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible && selectedCardIndex === index}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalVisible(false);
              }}>
              <View style={reportStyles.centeredView}>
                <View style={reportStyles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCardIndex(null); // Reset selected card index when modal is closed
                      setModalVisible(false);
                    }}>
                    <Image style={reportStyles.cancel} source={Images.cancel} />
                  </TouchableOpacity>
                  <Image
                    style={reportStyles.personpopup}
                    source={{uri: report.PictureURL}}
                  />
                  <Text style={{color: '#000000'}}>Name : {report.Name}</Text>
                  <Text style={{color: '#000000'}}>
                    Date Of Birth : {report.Dateofbirth}
                  </Text>
                  <Text style={{color: '#000000'}}>
                    Last Seen Location : {report.LastSceneLocation}
                  </Text>

                  <TextInput
                    placeholder="Location"
                    placeholderTextColor="black"
                    style={{
                      width: 303,
                      marginTop: 16,
                      marginHorizontal: 16,
                      borderWidth: 1,
                      color: 'black',
                      height: 34,
                      borderRadius: 8,
                      gap: 10,
                      padding: 8,
                    }}
                    onChangeText={text =>
                      setNewData(prevState => ({
                        ...prevState,
                        NewLocation: text,
                      }))
                    }
                  />

                  <TextInput
                    placeholder="More Description"
                    placeholderTextColor="black"
                    style={{
                      width: 303,
                      marginTop: 16,
                      color: 'black',
                      marginHorizontal: 16,
                      borderWidth: 1,
                      height: 100,
                      borderRadius: 8,
                      gap: 10,
                      padding: 8,
                    }}
                    multiline={true}
                    onChangeText={text =>
                      setNewData(prevState => ({
                        ...prevState,
                        Description: text,
                      }))
                    }
                  />
                  <TouchableOpacity
                    style={reportStyles.email}
                    onPress={handleEmailContact}>
                    <Text style={reportStyles.emailtext}>
                      Contact Via Email
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={reportStyles.report}>
                    <Text
                      style={reportStyles.reporttext}
                      onPress={handleSubmit}>
                      Report Found
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default App;
