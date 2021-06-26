import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import {
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { Image } from 'src/components';
import * as COLORS from 'src/constants/colors';
import styles from './styles';

interface IPanButtonProps {
  onGesture?: Function;
  onPress?: Function;
  imageUrl: any;
  title: any;
  isSelected: boolean;
  width: number;
}

const PanButton = (props: IPanButtonProps) => {
  const { onGesture, onPress, imageUrl, title, isSelected, width } = props;
  const [disable, setDisable] = useState(true);

  return (
    <PanGestureHandler
      onGestureEvent={() => {
        setDisable(false);
      }}
      onHandlerStateChange={(state) => {
        // setDisable(false);
        onGesture(true);
        setDisable(true);
      }}
    >
      <View style={[styles.singalTab, { width: width }]}>
        <TapGestureHandler
          enabled={false}
          numberOfTaps={1}
          onHandlerStateChange={(state) => {
            onGesture(true);
          }}
          onBegan={(e) => {
            // Alert.alert('Begin', String(e.nativeEvent.state));
          }}
          onCancelled={(e) => {
            Alert.alert('Cancelled', String(e.nativeEvent.state));
          }}
          onActivated={(e) => {
            // Alert.alert('Activated', String(e.nativeEvent.state));
            onGesture(false);
            onPress();
          }}
          onEnded={(e) => {
            onGesture(false);
            onPress();
          }}
          onFailed={(e) => {
            // Alert.alert('Fsiled', String(e.nativeEvent.state));
          }}
          onGestureEvent={(e) => {
            Alert.alert('Eeven', e.nativeEvent.state);
          }}
          //   onPress={() => {
          //     onPress();
          //   }}
        >
          <View>
            <Image
              source={{
                uri: imageUrl,
              }}
              style={styles.tabIcon}
              resizeMode={'contain'}
              tintColor={
                isSelected ? COLORS.getTheme() : COLORS.getSecondaryFontColor()
              }
            />
            <Text
              style={[
                styles.tabTitle,
                {
                  color: isSelected
                    ? COLORS.getTheme()
                    : COLORS.getSecondaryFontColor(),
                },
              ]}
            >
              {title}
            </Text>
          </View>
        </TapGestureHandler>
      </View>
    </PanGestureHandler>
  );
};

export default PanButton;
