import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/Store';
import useReports from '../reports/useReports';
import auth from '@react-native-firebase/auth';
const Home = ({navigation}: any) => {
  const user = auth()?.currentUser;
  const {loading} = useSelector((state: RootState) => state.firestore);
  const {filteredReports, modalVisible, setModalVisible} =
    useReports(navigation);
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
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{marginTop: 40}}>Please Wait....</Text>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.Findr}>Findr</Text>
      <Image
        style={styles.searchForHope}
        source={require('../../assets/home/SearchForHope.png')}
      />
      <View style={styles.searchinput}>
        <TextInput placeholder="Search" style={{marginLeft: 16}} />
        <Image
          style={styles.search}
          source={require('../../assets/home/search.png')}
        />
      </View>
      <Image
        style={styles.main}
        source={require('../../assets/home/main.png')}
      />
      <View style={{marginTop: 20, flexDirection: 'row', marginHorizontal: 40}}>
        <Text style={{fontWeight: '400', fontSize: 23, color: '#0F0F0F'}}>
          Featured Profiles
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: '#0802A3',
            marginLeft: 90,
            marginTop: 6,
          }}
          onPress={() => navigation.navigate('Reports')}>
          See More
        </Text>
      </View>
      {/* Slider */}
      <ScrollView
        style={{marginTop: 10, height: 320, width: 380, marginLeft: 20}}
        horizontal={true}>
        {filteredReports.map((report: any, index: number) => (
          <View style={styles.mainView} key={index}>
            <Text style={styles.mainHeading}>MISSING</Text>
            <ImageBackground
              style={styles.imageBackground}
              source={{uri: report.PictureURL}}>
              <LinearGradient
                style={styles.overlay}
                colors={['transparent', 'rgba(0, 0, 0, 6)']}>
                <View style={{marginLeft: 8}}>
                  <Text style={styles.color}>Name : {report.Name}</Text>
                  <Text style={styles.color}>
                    Reported by : {report.ReportedBy}
                  </Text>
                  <Text style={styles.color}>
                    Location : {report.LastSceneLocation}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setSelectedCardIndex(index);
                      setModalVisible(true);
                    }}>
                    <Text style={styles.buttontext}>Contact Person</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
      {/* popup */}
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
                    <Image
                      style={styles.cancel}
                      source={require('../../assets/Editprofile/cancel.png')}
                    />
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
                  />
                  <TouchableOpacity
                    style={styles.email}
                    onPress={handleEmailContact}>
                    <Text style={styles.emailtext}>Contact Via Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.report}>
                    <Text style={styles.reporttext}>Report Found</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  main: {marginTop: 27, marginHorizontal: 38, width: 335, height: 224},
  Findr: {
    color: '#5B59FE',
    marginTop: 8,
    fontFamily: 'Familjen Grotesk',
    fontSize: 64,
    fontWeight: '700',
    lineHeight: 77,
    textAlign: 'center',
  },
  searchForHope: {
    width: 115,
    height: 24,
    marginLeft: 185,
    marginRight: 105,
    marginTop: -20,
  },
  search: {
    width: 19,
    height: 19,
    marginLeft: 185,
    marginRight: 9,
    marginTop: 0,
  },
  searchinput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 285,
    height: 40,
    marginLeft: 63,
    marginRight: 63,
    marginTop: 26,
    borderWidth: 1,
    borderColor: '#0F0F0F',
    borderRadius: 8,
  },
  color: {
    color: 'white',
  },
  main2: {
    width: 365,
    height: 304,
    borderRadius: 8,
    marginRight: 16,
    flexDirection: 'row',
    gap: 10,
    marginLeft: 20,
  },
  imageBackground: {
    width: 213,
    height: 260,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  mainView: {
    width: 213,
    height: 44,
    borderRadius: 8,
    backgroundColor: 'red',
    marginRight: 16,
  },
  mainHeading: {
    width: 160,
    height: 38,
    paddingTop: 2,
    paddingLeft: 31,
    fontWeight: '400',
    marginBottom: 3,
    fontSize: 32,
    color: '#FFFFFF',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
