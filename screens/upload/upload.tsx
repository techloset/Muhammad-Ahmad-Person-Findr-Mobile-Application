import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import FormInput from '../../components/form/FormInput';
import useUpload from './useUpload';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Images} from '../../assets/constants/constants';
const Upload = ({navigation}: any) => {
  const {
    handleChange,
    imagePicker,
    showPicker,
    date,
    onChangeDate,
    setShowPicker,
    handleSubmit,
    selectedImage,
    data,
  } = useUpload(navigation);

  return (
    <ScrollView>
      <View>
        <View style={styles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={styles.backButton} source={Images.backPage} />
          </TouchableOpacity>
          <Text style={styles.h1}>Missing Person Details</Text>
        </View>
        <Text style={styles.h2}>Basic Details of Missing Person</Text>
        <Text style={styles.inputName}>Missing Person’s Full Name</Text>
        <FormInput
          value={data.Name}
          onChangeText={text => handleChange('Name', text)}
        />
        <Text style={styles.inputName}>Reported By</Text>
        <FormInput
          value={data.ReportedBy}
          onChangeText={text => handleChange('ReportedBy', text)}
        />
        <Text style={styles.inputName}>Last scene Location </Text>
        <FormInput
          value={data.LastSceneLocation}
          onChangeText={text => handleChange('LastSceneLocation', text)}
        />
        <Text style={styles.inputName}>Gender</Text>
        <FormInput
          value={data.Gender}
          onChangeText={text => handleChange('Gender', text)}
        />
        <Text style={styles.inputName}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <View style={styles.datePickerContainer}>
            <TextInput
              style={styles.datePickerInput}
              editable={false}
              placeholder="Select Date"
              value={data.Dateofbirth} // Display date in the input
            />
            <Image style={{marginRight: 10}} source={Images.calender} />
          </View>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Text style={styles.inputName}>Nickname or Known aliases</Text>
        <FormInput
          value={data.Nickname}
          onChangeText={text => handleChange('Nickname', text)}
        />
      </View>
      <View>
        <Text style={styles.h2}>Physical Description</Text>
        <Text style={styles.inputName}>Height</Text>
        <TextInput
          style={styles.input}
          value={data.Height.toString()}
          onChangeText={text => handleChange('Height', text)}
          keyboardType="numeric"
        />
        <Text style={styles.inputName}>Weight</Text>
        <TextInput
          style={styles.input}
          value={data.Weight.toString()}
          onChangeText={text => handleChange('Weight', text)}
          keyboardType="numeric"
        />
        <Text style={styles.inputName}>Eye Color</Text>
        <FormInput
          value={data.EyeColor}
          onChangeText={text => handleChange('EyeColor', text)}
        />
        <Text style={styles.inputName}>Hair Color</Text>
        <FormInput
          value={data.HairColor}
          onChangeText={text => handleChange('HairColor', text)}
        />
        <Text style={styles.inputName}>Length Of The Hair</Text>
        <TextInput
          style={styles.input}
          value={data.Lengthofthehair.toString()}
          onChangeText={text => handleChange('Lengthofthehair', text)}
          keyboardType="numeric"
        />
        <Text style={styles.h2}>Upload Photographs</Text>
        <View style={{height: 250, width: 430, marginLeft: 20, marginTop: 20}}>
          <TouchableOpacity onPress={imagePicker}>
            <ImageBackground
              source={Images.imagePicker}
              style={{width: '90%', height: '100%'}}>
              {selectedImage ? (
                <Image
                  source={{uri: selectedImage}}
                  style={{width: 350, height: 250}}
                  resizeMode="cover"
                />
              ) : null}
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 30,
    marginTop: 5,
    borderWidth: 1,
    maxWidth: 500,
    width: 335,
    borderColor: '#BCBCBF',
    borderRadius: 8,
  },
  datePickerInput: {
    flex: 1,
    padding: 12,
    height: 44,
    borderRadius: 8,
    borderWidth: 0,
  },
  input: {
    height: 44,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginHorizontal: 30,
    marginTop: 8,
    marginBottom: 8,
    width: 335,
  },
  submitContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 25,
  },
  submitButton: {
    backgroundColor: '#5B59FE',
    width: 207,
    height: 44,
    borderRadius: 8,
    marginVertical: 16,
    marginHorizontal: 84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 23,
    lineHeight: 27,
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
  h2: {
    fontWeight: '400',
    fontSize: 23,
    lineHeight: 27,
    color: '#000000',
    marginLeft: 20,
    marginRight: 64,
    marginTop: 40,
  },
  inputName: {
    color: '#000000',
    marginLeft: 20,
    marginRight: 184,
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Upload;
