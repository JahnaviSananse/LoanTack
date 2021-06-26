import * as React from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './styles';
interface IProps {
  isLeft?: boolean;
  sign?: string;
  placeholder: string;
  value: any;
  customStyle?: any;
  onChangeText: any;
  keyboardType?: any;
  maxLength?: number;
}

const SignatureTextInput = (props: IProps) => {
  const renderTextInput = () => {
    return (
      <TextInput
        placeholder={props.placeholder}
        maxLength={props.maxLength ? props.maxLength : 10}
        value={props.value}
        style={props.customStyle}
        onChangeText={props.onChangeText}
        keyboardType={'decimal-pad'}></TextInput>
    );
  };
  return (
    <View>
      {props.isLeft ? (
        <View style={styles.container}>
          <View style={styles.signContainer}>
            <Text style={styles.signatureText}>{props.sign}</Text>
          </View>

          {renderTextInput()}
        </View>
      ) : (
        <View style={styles.container}>
          {renderTextInput()}
          <View style={styles.signRightContainer}>
            <Text style={styles.signatureText}>{props.sign}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default SignatureTextInput;
