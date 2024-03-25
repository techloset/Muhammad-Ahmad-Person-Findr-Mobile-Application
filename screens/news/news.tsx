import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from 'react-native';
import useReports from '../reports/useReports';
import auth from '@react-native-firebase/auth';
import {Images} from '../../assets/constants/constants';
import NewsStyles from './styles';

const App = ({navigation}: any) => {
  const user = auth()?.currentUser;
  const [searchQuery, setSearchQuery] = useState('');
  const {
    filteredReports,
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
        <View style={NewsStyles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={NewsStyles.backButton} source={Images.backPage} />
          </TouchableOpacity>
          <Text style={NewsStyles.h1}>News</Text>
        </View>
        {filteredReports
          .filter(report =>
            report.Name.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((report: any, index: number) => {
            if (!report.NewLocation && !report.Description) {
              return null;
            }
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  marginLeft: 5,
                  marginTop: 16,
                  marginBottom: 16,
                }}>
                <View>
                  <Image
                    style={NewsStyles.person}
                    source={{uri: report.PictureURL}}
                  />
                </View>
                <View style={{marginLeft: 8}}>
                  <Text>Name : {report.Name}</Text>
                  <Text>Reported By : {report.ReportedBy}</Text>
                  <Text>NickName : {report.Nickname}</Text>
                  <Text style={{width: 250}}>
                    Last Scene Location :{report.NewLocation}
                  </Text>
                  <Text style={{width: 250}}>
                    Discription :{report.Description}
                  </Text>
                  <TouchableOpacity
                    style={NewsStyles.button}
                    onPress={() => {
                      handleOpen({report});
                      setSelectedCardIndex(index);
                      setModalVisible(true);
                    }}>
                    <Text style={NewsStyles.buttontext}>Contact Person</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </View>
      {/* popup */}
      <View style={NewsStyles.centeredView}>
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
              <View style={NewsStyles.centeredView}>
                <View style={NewsStyles.modalView}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedCardIndex(null);
                      setModalVisible(false);
                    }}>
                    <Image style={NewsStyles.cancel} source={Images.cancel} />
                  </TouchableOpacity>
                  <Image
                    style={NewsStyles.personpopup}
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
                    style={NewsStyles.email}
                    onPress={handleEmailContact}>
                    <Text style={NewsStyles.emailtext}>Contact Via Email</Text>
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
