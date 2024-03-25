import React from 'react';
import {
  View,
  Text,
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
import uploadStyles from './style';

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
        <View style={uploadStyles.first}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image style={uploadStyles.backButton} source={Images.backPage} />
          </TouchableOpacity>
          <Text style={uploadStyles.h1}>Missing Person Details</Text>
        </View>
        <Text style={uploadStyles.h2}>Basic Details of Missing Person</Text>
        <Text style={uploadStyles.inputName}>Missing Person’s Full Name</Text>
        <FormInput
          value={data.Name}
          onChangeText={text => handleChange('Name', text)}
        />
        <Text style={uploadStyles.inputName}>Reported By</Text>
        <FormInput
          value={data.ReportedBy}
          onChangeText={text => handleChange('ReportedBy', text)}
        />
        <Text style={uploadStyles.inputName}>Last scene Location </Text>
        <FormInput
          value={data.LastSceneLocation}
          onChangeText={text => handleChange('LastSceneLocation', text)}
        />
        <Text style={uploadStyles.inputName}>Gender</Text>
        <FormInput
          value={data.Gender}
          onChangeText={text => handleChange('Gender', text)}
        />
        <Text style={uploadStyles.inputName}>Date of Birth</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <View style={uploadStyles.datePickerContainer}>
            <TextInput
              style={uploadStyles.datePickerInput}
              editable={false}
              placeholder="Select Date"
              value={data.Dateofbirth}
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
        <Text style={uploadStyles.inputName}>Nickname or Known aliases</Text>
        <FormInput
          value={data.Nickname}
          onChangeText={text => handleChange('Nickname', text)}
        />
      </View>
      <View>
        <Text style={uploadStyles.h2}>Physical Description</Text>
        <Text style={uploadStyles.inputName}>Height</Text>
        <TextInput
          style={uploadStyles.input}
          value={data.Height.toString()}
          onChangeText={text => handleChange('Height', text)}
          keyboardType="numeric"
        />
        <Text style={uploadStyles.inputName}>Weight</Text>
        <TextInput
          style={uploadStyles.input}
          value={data.Weight.toString()}
          onChangeText={text => handleChange('Weight', text)}
          keyboardType="numeric"
        />
        <Text style={uploadStyles.inputName}>Eye Color</Text>
        <FormInput
          value={data.EyeColor}
          onChangeText={text => handleChange('EyeColor', text)}
        />
        <Text style={uploadStyles.inputName}>Hair Color</Text>
        <FormInput
          value={data.HairColor}
          onChangeText={text => handleChange('HairColor', text)}
        />
        <Text style={uploadStyles.inputName}>Length Of The Hair</Text>
        <TextInput
          style={uploadStyles.input}
          value={data.Lengthofthehair.toString()}
          onChangeText={text => handleChange('Lengthofthehair', text)}
          keyboardType="numeric"
        />
        <Text style={uploadStyles.h2}>Upload Photographs</Text>
        <View style={{height: 250, width: 470, marginLeft: 20, marginTop: 20}}>
          <TouchableOpacity onPress={imagePicker}>
            <ImageBackground
              source={Images.imagePicker}
              style={{width: '80%', height: '100%'}}>
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
      <View style={uploadStyles.submitContainer}>
        <TouchableOpacity
          style={uploadStyles.submitButton}
          onPress={handleSubmit}>
          <Text style={uploadStyles.submitButtonText}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Upload;
