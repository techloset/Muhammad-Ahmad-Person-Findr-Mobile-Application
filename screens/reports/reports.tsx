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
        <View style={styles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.backButton} source={Images.backPage} />
          </TouchableOpacity>
          <Text style={styles.h1}>Missing Person Details</Text>
        </View>
        <View style={styles.searchinput}>
          <TextInput
            placeholder="Search"
            style={{marginLeft: 16}}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Image style={styles.search} source={Images.search} />
        </View>
        <View style={styles.filterDiv}>
          <Text style={styles.filterText}>Filter By:</Text>
          <TouchableOpacity onPress={() => handleFilter('Male')}>
            <Text style={styles.touch}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Female')}>
            <Text style={styles.touch}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter('Custom')}>
            <Text style={styles.touch}>Custom</Text>
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
                  style={styles.person}
                  source={{uri: report.PictureURL}}
                />
              </View>
              <View style={{marginLeft: 8}}>
                <Text>Name : {report.Name}</Text>
                <Text>NickName : {report.Nickname}</Text>
                <Text>Reported By : {report.ReportedBy}</Text>

                <Text style={{width: 250}}>
                  Last Scene Location : {report.LastSceneLocation}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleOpen({report});
                    setSelectedCardIndex(index);
                    setModalVisible(true);
                  }}>
                  <Text style={styles.buttontext}>Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
      </View>
      <View style={styles.centeredView}>
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
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCardIndex(null); // Reset selected card index when modal is closed
                      setModalVisible(false);
                    }}>
                    <Image style={styles.cancel} source={Images.cancel} />
                  </TouchableOpacity>
                  <Image
                    style={styles.personpopup}
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
                    style={{
                      width: 303,
                      marginTop: 16,
                      marginHorizontal: 16,
                      borderWidth: 1,
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
                    style={{
                      width: 303,
                      marginTop: 16,
                      marginHorizontal: 16,
                      borderWidth: 1,
                      height: 100,
                      borderRadius: 8,
                      gap: 10,
                      padding: 8,
                    }}
                    onChangeText={text =>
                      setNewData(prevState => ({
                        ...prevState,
                        Description: text,
                      }))
                    }
                  />

                  <TouchableOpacity
                    style={styles.email}
                    onPress={handleEmailContact}>
                    <Text style={styles.emailtext}>Contact Via Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.report}>
                    <Text style={styles.reporttext} onPress={handleSubmit}>
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  cancel: {
    width: 10,
    height: 10,
    marginLeft: 308,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 23,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  emailtext: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: '#5B59FE',
    fontWeight: '500',
    fontSize: 11,
    paddingHorizontal: 100,
  },
  email: {
    backgroundColor: 'white',
    marginLeft: 18,
    marginRight: 17,
    marginTop: 112,
    borderRadius: 8,
    borderColor: '#5B59FE',
    borderWidth: 1,
  },
  reporttext: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 11,
    paddingHorizontal: 110,
  },
  report: {
    backgroundColor: '#5B59FE',
    marginLeft: 18,
    marginRight: 17,
    marginTop: 16,
    borderRadius: 8,
  },
  personpopup: {
    width: 100,
    height: 100,
    marginTop: 24,
    marginLeft: 118,
    marginRight: 117,
    marginBottom: 16,
    borderRadius: 200,
  },
  first: {
    flexDirection: 'row',
    marginLeft: 26,
    marginRight: 29,
    marginTop: 16,
    gap: 16,
  },
  backButton: {
    marginLeft: 3,
    width: 18,
    height: 12,
    marginTop: 11,
  },
  h1: {
    height: 30,
    color: '#000000',
    fontWeight: '600',
    fontSize: 23,
  },
  search: {
    width: 19,
    height: 19,
    marginLeft: 240,
    marginRight: 9,
    marginTop: 0,
  },
  searchinput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 345,
    height: 40,
    marginLeft: 33,
    marginRight: 63,
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#0F0F0F',
    borderRadius: 8,
  },
  filterText: {
    width: 65,
    height: 23,
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
  },
  filterDiv: {
    marginTop: 26,
    marginLeft: 21,
    marginBottom: 16,
    marginRight: 21,
    flexDirection: 'row',
  },
  touch: {
    color: '#344054',
    backgroundColor: '#FCFCFD',
    borderRadius: 6,
    gap: 8,
    width: 60,
    height: 36,
    textAlign: 'center',
    elevation: 6,
    marginHorizontal: 10,
    paddingTop: 8,
    marginTop: -8,
  },
  person: {
    marginLeft: 20,
    width: 115,
    height: 154,
  },
  buttontext: {
    marginVertical: 5,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 11,
  },
  button: {
    backgroundColor: '#5B59FE',
    marginTop: 15,
    borderRadius: 8,
    width: 95,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
