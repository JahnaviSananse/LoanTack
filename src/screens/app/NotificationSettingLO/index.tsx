import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Switch,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import * as COLOR from 'src/constants/colors';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  getNotificationSettings,
  saveNotificationSettings,
} from 'src/redux/actions/user';
import {connect} from 'react-redux';
import {IReduxState} from 'src/redux/reducers';

interface INotificationProps {
  getNotificationSettings: Function;
  saveNotificationSettings: Function;
  loading: boolean;
  notificationData: any;
}
const NotificationSettingLO = (props: INotificationProps) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([{}]);

  React.useEffect(() => {
    props.getNotificationSettings();
    let ary = [
      {name: 'Direct Message', enable: false},
      {name: 'Document Upload', enable: false},
      {name: 'Application download from your link', enable: false},
    ];
    setData(ary);
  }, []);

  React.useEffect(() => {
    console.log('NotificationData', props.notificationData);
    if (props.notificationData != null) {
      let ary = [
        {name: 'Direct Message', enable: props.notificationData.direct_message},
        {
          name: 'Document Upload',
          enable: props.notificationData.document_upload,
        },
        {
          name: 'Application download from your link',
          enable: props.notificationData.app_download_from_link,
        },
      ];
      setData(ary);
    }
  }, [props.notificationData]);
  const renderItem = (item: any, index: number) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            style={styles.switchStyle}
            trackColor={{
              true: COLOR.THEME.TRACK_COLOR_TRUE,
              false: COLOR.THEME.TRACK_COLOR_FALSE,
            }}
            thumbColor={COLOR.THEME.WHITE}
            ios_backgroundColor={COLOR.THEME.TRACK_COLOR_FALSE}
            value={item.enable}
            onValueChange={() => {
              let currentData = JSON.parse(JSON.stringify(data));
              currentData[index].enable = currentData[index].enable
                ? false
                : true;
              setData(currentData);
              props.saveNotificationSettings(
                currentData[0].enable,
                currentData[1].enable,
                currentData[2].enable,
              );
            }}
          />
        </View>
        <View style={styles.separetor} />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}>
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Notification Settings'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.flatlistContainer}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.user.loading,
  notificationData: state.user.notificationData,
});

export default connect(mapStateToProps, {
  getNotificationSettings,
  saveNotificationSettings,
})(NotificationSettingLO);
