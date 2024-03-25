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
import {Images} from '../../assets/constants/constants';
import auth from '@react-native-firebase/auth';
import homeStyles from './style';

const Home = ({navigation}: any) => {
  const user = auth()?.currentUser;
  const {loading} = useSelector((state: RootState) => state.firestore);
  const {
    filteredReports,
    modalVisible,
    setNewData,
    handleOpen,
    handleFilter,
    handleSubmit,
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

  if (loading) {
    return (
      <View style={homeStyles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{marginTop: 40}}>Please Wait....</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={homeStyles.Findr}>Findr</Text>
      <Image style={homeStyles.searchForHope} source={Images.searchForHope2} />
      <View style={homeStyles.searchinput}>
        <TextInput placeholder="Search" style={{marginLeft: 16}} />
        <Image style={homeStyles.search} source={Images.search} />
      </View>
      <Image style={homeStyles.main} source={Images.main} />
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
          <View style={homeStyles.mainView} key={index}>
            <Text style={homeStyles.mainHeading}>MISSING</Text>
            <ImageBackground
              style={homeStyles.imageBackground}
              source={{uri: report.PictureURL}}>
              <LinearGradient
                style={homeStyles.overlay}
                colors={['transparent', 'rgba(0, 0, 0, 6)']}>
                <View style={{marginLeft: 8}}>
                  <Text style={homeStyles.color}>Name : {report.Name}</Text>
                  <Text style={homeStyles.color}>
                    Reported by : {report.ReportedBy}
                  </Text>
                  <Text style={homeStyles.color}>
                    Location : {report.LastSceneLocation}
                  </Text>
                  <TouchableOpacity
                    style={homeStyles.button}
                    onPress={() => {
                      handleOpen({report});
                      setSelectedCardIndex(index);
                      setModalVisible(true);
                    }}>
                    <Text style={homeStyles.buttontext}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
      {/* popup */}
      <View style={homeStyles.centeredView}>
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
              <View style={homeStyles.centeredView}>
                <View style={homeStyles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCardIndex(null);
                      setModalVisible(false);
                    }}>
                    <Image style={homeStyles.cancel} source={Images.cancel} />
                  </TouchableOpacity>
                  <Image
                    style={homeStyles.personpopup}
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
                    style={homeStyles.email}
                    onPress={handleEmailContact}>
                    <Text style={homeStyles.emailtext}>Contact Via Email</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={homeStyles.report}
                    onPress={handleSubmit}>
                    <Text style={homeStyles.reporttext}>Report Found</Text>
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

export default Home;
