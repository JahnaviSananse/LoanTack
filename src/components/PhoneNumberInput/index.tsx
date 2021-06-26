import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import * as IMAGE from 'src/assets/images';
import styles from './style';

const PhoneNumberInput = (props: any) => {
  const [text, setText] = React.useState('');
  const { value, placeholder, title, onChangeText, style, maxLength } = props;
  const [callingCode, setCallingCode] = React.useState('+1');
  const [countryCode, setCountryCode] = React.useState('US');
  const [showPicker, setShowPicker] = React.useState(false);
  const [withCloseButton, setWithCloseButton] = React.useState(true);
  //   const [closeButtonImage, setCloseButtonImage] = React.useState(
  //     IMAGE.IC_CLOSE,
  //   );
  let closeButtonImage = IMAGE.IC_BACK;
  let closeButtonImageStyle = styles.closeIcon;
  let closeButtonStyle = styles.closeIcon;

  let keyType = props.keyboardType ? props.keyboardType : 'default';
  let length = maxLength ? maxLength : 60;
  const onSelect = (country: any) => {
    props.onSelect(country);
    setCountryCode(country.cca2);
    setWithCloseButton(false);
    setCallingCode('+' + country.callingCode);
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.placeholderText}>{title}</Text>
      <View style={[style, styles.extraPadding]}>
        <TouchableOpacity
          onPress={() => setShowPicker(true)}
          style={styles.countryCodeContainer}
        >
          <CountryPicker
            {...{
              countryCode,
              onSelect,
              withCloseButton: true,
              closeButtonImage,
              closeButtonImageStyle,
              closeButtonStyle,
            }}
            visible={showPicker}

            // withCloseButton
            // withCloseButton={true}
            // containerButtonStyle={{ width: 18, height: 18 }}
            // onClose={() => setShowPicker(false)}
          />
          <Text>{callingCode}</Text>
        </TouchableOpacity>
        <View style={styles.saperator} />
        <TextInput
          maxLength={length}
          keyboardType={keyType}
          secureTextEntry={
            props.secureTextEntry ? props.secureTextEntry : false
          }
          style={[
            styles.textInput,
            { fontStyle: text.trim().length > 0 ? 'normal' : 'italic' },
          ]}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => {
            setText(text.trim());
            onChangeText(text.trim());
          }}
          value={value}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
};
export default PhoneNumberInput;
