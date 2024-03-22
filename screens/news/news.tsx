import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
const News = ({navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView>
      <View style={styles.first}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.backButton}
            source={require('../../assets/forgot/backPage.png')}
          />
        </TouchableOpacity>
        <Text style={styles.h1}>Reports</Text>
      </View>
      {/* 1 */}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          marginBottom: 16,
        }}>
        <View>
          <Image
            style={styles.person}
            source={require('../../assets/home/person.png')}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text>Name: Akriti Dwivedi</Text>
          <Text>Reported by: Talha</Text>
          <Text>Location: Techloset Office,</Text>
          <Text>Faisalabad, Pakistan</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttontext}>Contact Person</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 2 */}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          marginBottom: 16,
        }}>
        <View>
          <Image
            style={styles.person}
            source={require('../../assets/home/person.png')}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text>Name: Akriti Dwivedi</Text>
          <Text>Reported by: Talha</Text>
          <Text>Location: Techloset Office,</Text>
          <Text>Faisalabad, Pakistan</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttontext}>Contact Person</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 3 */}
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          marginBottom: 16,
        }}>
        <View>
          <Image
            style={styles.person}
            source={require('../../assets/home/person.png')}
          />
        </View>
        <View style={{marginLeft: 8}}>
          <Text>Name: Akriti Dwivedi</Text>
          <Text>Reported by: Talha</Text>
          <Text>Location: Techloset Office,</Text>
          <Text>Faisalabad, Pakistan</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.buttontext}>Contact Person</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* popup */}

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={styles.cancel}
                  source={require('../../assets/Editprofile/cancel.png')}
                />
              </TouchableOpacity>
              <Image
                style={styles.personpopup}
                source={require('../../assets/Editprofile/person.png')}
              />
              <Text style={{color: '#000000'}}>Akriti Dwivedi</Text>
              <Text style={{color: '#000000'}}>25 Years Old Male</Text>
              <Text style={{color: '#000000'}}>
                Last Seen Time: 1/11/23 12:32:23 IST
              </Text>
              <Text style={{color: '#000000'}}>Last Seen Location: Mumbai</Text>
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
              <TouchableOpacity style={styles.email}>
                <Text style={styles.emailtext}>Contact Via Email</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.report}>
                <Text style={styles.reporttext}>Report Found</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default News;
const styles = StyleSheet.create({
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
  first: {
    flexDirection: 'row',
    marginLeft: 26,
    marginRight: 29,
    marginTop: 16,
    gap: 16,
    marginBottom: 26,
  },
  backButton: {
    marginLeft: 3,
    width: 18,
    height: 12,
    marginTop: 8,
  },
  personpopup: {
    width: 100,
    height: 100,
    marginTop: 24,
    marginLeft: 118,
    marginRight: 117,
    marginBottom: 16,
  },
  person: {
    marginLeft: 20,
    width: 115,
    height: 154,
  },
  h1: {
    height: 30,
    color: '#000000',
    fontWeight: '600',
    fontSize: 23,
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
  cancel: {
    width: 10,
    height: 10,
    marginLeft: 308,
  },
});
