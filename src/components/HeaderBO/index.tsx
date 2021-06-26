import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';
import { connect } from 'react-redux';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import { logout_user } from 'src/redux/actions/auth';
import { toggleSettingOption } from 'src/redux/actions/common';
import { updateInfoModal } from 'src/redux/actions/modal';
import { IReduxState } from 'src/redux/reducers';
import { IModalPopup } from 'src/redux/types/modal';
import styles from './style';

interface IHeaderProps {
  leftImg?: any;
  rightOneImg?: any;
  righTwoImg?: any;
  leftClick?: any;
  rightOneClick?: any;
  rightTwoClick?: Function;
  title: string;
  showOptions: boolean;
  toggleSettingOption: any;
  popupInfo?: IModalPopup;
  updateInfoModal: Function;
  logout_user: Function;
  infoMessage: string;
  assignedloData: any;
  isGuest: boolean;
}

const data = [
  { title: 'Settings', redirect: 'SettingBO', stack: 'settingScreen' },
  {
    title: 'Notifications',
    redirect: 'NotificationLO',
    stack: 'NotificationScreen',
  },
  { title: 'Log Out', redirect: 'Login' },
];

const guestData = [{ title: 'Log In', redirect: 'Login' }];

const HeaderBO = (props: IHeaderProps) => {
  const {
    leftImg,
    rightOneImg,
    rightTwoClick,
    righTwoImg,
    leftClick,
    rightOneClick,
    title,
    showOptions,
    toggleSettingOption,
    isGuest,
  } = props;
  const [dLink, setDLink] = React.useState('');
  const navigation = useNavigation();
  let headerTitle = title ? title : '';

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.cell}
        onPress={() => {
          toggleSettingOption(!showOptions);
          setTimeout(() => {
            if (props.isGuest === true) {
              navigation.goBack();
            } else {
              if (item.redirect !== 'Login') {
                navigation.navigate(item.stack, {
                  screen: item.redirect,
                  params: { isBack: true },
                });
              } else {
                LogoutAlert();
              }
            }
          }, 100);
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.saperator} />
      </TouchableOpacity>
    );
  };
  const LogoutAlert = () => {
    Alert.alert('LoanTack', 'Are you sure want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          COLOR.setDefaultTheme();
          props.logout_user();
        },
      },
    ]);
  };
  const renderOptions = () => {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={props.showOptions}
        onRequestClose={() => {
          toggleSettingOption(!showOptions);
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => toggleSettingOption(!showOptions)}
          style={styles.modalView}
        >
          <View
            style={[
              styles.flatlistContainer,
              { height: props.isGuest ? 50 : 150 },
            ]}
          >
            <FlatList
              data={props.isGuest ? guestData : data}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => renderItem(item)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  function ShareFile() {
    let tLink = props.assignedloData?.data
      ? props.assignedloData.data.link
      : '';
    const shareOptions = {
      title: 'Share via',
      url: tLink,
      message: 'LoanTack App Link ' + tLink,
    };
    Share.open(shareOptions)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  }
  return (
    <View>
      <View style={styles.container}>
        {/* {!isGuest  && ( */}
        <TouchableOpacity style={styles.leftImgContainer} onPress={leftClick}>
          <Image
            source={leftImg}
            style={styles.img}
            resizeMode={'contain'}
          ></Image>
        </TouchableOpacity>
        {/* )} */}
        <View style={styles.headerTitleContainer}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles.headerText, { color: COLOR.getTheme() }]}
          >
            {headerTitle}
          </Text>
        </View>
        {!isGuest && (
          <TouchableOpacity
            style={styles.rightOneContainer}
            onPress={() => {
              // Show Popup
              props.updateInfoModal(true, headerTitle, props.infoMessage);
              // if (props.popupInfo) {
              //   props.updateInfoModal(
              //     true,
              //     props.popupInfo.title,
              //     props.popupInfo.description,
              //   );
              // } else if (props.rightOneClick) {
              //   props.rightOneClick();
              // }
            }}
          >
            <Image
              source={rightOneImg}
              style={styles.rightImage}
              resizeMode={'contain'}
            ></Image>
          </TouchableOpacity>
        )}
        {!isGuest && (
          <TouchableOpacity
            style={styles.rightTwoContainer}
            onPress={() => {
              // rightTwoClick();
              ShareFile();
            }}
          >
            <Image
              source={righTwoImg}
              style={styles.rightImage}
              resizeMode={'contain'}
            ></Image>
          </TouchableOpacity>
        )}
        <Text style={styles.versionText}>{DeviceInfo.getVersion()}</Text>
      </View>
      {renderOptions()}
    </View>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  assignedloData: state.dashboard_bo.assignedloData,
  isGuest: state.common.isGuest,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  updateInfoModal,
  logout_user,
})(HeaderBO);
