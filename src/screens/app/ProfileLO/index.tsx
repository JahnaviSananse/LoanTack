import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import {
  clearLOProfile,
  clearUpdateEmail,
  getUserProfile,
  saveLOProfile,
  updateEmail,
} from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import styles from './styles';

interface IProfileLO {
  getUserProfile: Function;
  saveLOProfile: Function;
  loading: boolean;
  profileData: any;
  LOProfileMessage: string;
  OpenValidationAlert: Function;
  LOProfileSuccess: boolean;
  closeModal: Function;
  userData: Object;
  clearLOProfile: Function;
  updateEmail: Function;
  updateEmailMessage: string;
  updateEmailFailureMessage: string;
  clearUpdateEmail: Function;
}

const ProfileLO = (props: IProfileLO) => {
  const navigation = useNavigation();
  const [bio, setBio] = React.useState('');
  const [profileImage, setProfileImage] = React.useState({});
  const [email, setEmail] = React.useState('');
  const [oldEmail, setOldEmail] = React.useState('');

  React.useEffect(() => {
    props.getUserProfile();
  }, []);
  React.useEffect(() => {
    if (props.LOProfileMessage && props.LOProfileSuccess == false) {
      setTimeout(() => {
        let obj = {
          message: props.LOProfileMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
      }, 1000);
    }
    if (props.LOProfileSuccess) {
      let obj = {
        message: 'Profile updated successfully',
        type: 'success',
      };
      props.clearLOProfile();
      setTimeout(() => {
        props.OpenValidationAlert(obj);
        setTimeout(() => {
          props.closeModal();
          navigation.goBack();
        }, 1500);
      }, 500);
    }
    if (props.profileData.data && !props.loading) {
      let data = props.profileData.data;

      let bioData =
        data?.bio !== null &&
        data?.bio !== undefined &&
        data?.bio !== 'undefined'
          ? data?.bio?.replace(/<[^>]+>/g, '')
          : '';
      setBio(bioData);
      setEmail(data.email);
      setOldEmail(data.email);
      if (data.profile_photo != null && data.profile_photo != '') {
        var obj = {
          uri: data.profile_photo,
          filename: data.profile_photo.substring(
            data?.profile_photo?.lastIndexOf('/') + 1,
          ),
          type: 'image/jpeg',
        };
        setProfileImage(obj);
      } else {
        setProfileImage({});
      }
    }
  }, [props.LOProfileMessage, props.LOProfileSuccess, props.profileData]);

  React.useEffect(() => {
    if (props.updateEmailFailureMessage !== '') {
      setTimeout(() => {
        let obj = {
          message: props.updateEmailFailureMessage,
          type: 'failure',
        };
        props.OpenValidationAlert(obj);
        props.clearUpdateEmail();
        setTimeout(() => {
          props.closeModal();
          // navigation.goBack();
        }, 1500);
      }, 500);
    }
    if (props.updateEmailMessage !== '') {
      setTimeout(() => {
        let obj = {
          message: props.updateEmailMessage,
          type: 'success',
        };
        props.OpenValidationAlert(obj);
        props.clearUpdateEmail();
        setTimeout(() => {
          props.closeModal();
          // navigation.goBack();
        }, 1500);
      }, 500);
    }
  }, [props.updateEmailFailureMessage, props.updateEmailMessage]);

  const renderButtons = () => {
    return (
      <View style={styles.btnContainer}>
        <COMPONENT.Button
          title={'SAVE'}
          type={'fill'}
          onPress={() => {
            let data = props.profileData.data;
            console.log('profileImage', bio);
            if (data.profile_photo !== profileImage.uri || data.bio !== bio) {
              props.saveLOProfile(profileImage, bio);
            }
            if (email !== '' && oldEmail !== email) {
              props.updateEmail(email);
            }
          }}
        />
        <COMPONENT.Button
          title={'CANCEL'}
          type={'unfill'}
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  const chooseImage = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    }).then((images) => {
      console.log('IMAGE_DATA', typeof images);
      var obj = {
        uri: images.path,
        filename: images.path.substring(images?.path?.lastIndexOf('/') + 1),
        type: images.mime,
      };
      console.log('IMAGE_FINAL', obj);
      setProfileImage(obj);
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <COMPONENT.Header
        title={'Profile Settings'}
        leftImg={IMAGES.IC_BACK}
        leftClick={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView>
        <View style={styles.profileContainer}>
          <Text style={styles.profileText}>Profile Photo</Text>
          <TouchableOpacity
            onPress={() => chooseImage()}
            style={styles.btnAddPic}
          >
            {profileImage === {} || profileImage === null ? (
              <Image
                source={IMAGES.IC_ADD}
                style={styles.add}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                source={{ uri: profileImage.uri }}
                style={styles.profileImage}
                resizeMode={'cover'}
              />
            )}
          </TouchableOpacity>
          <COMPONENT.TextField
            maxLength={50}
            value={email}
            width={'100%'}
            keyboardType={'default'}
            title={'Email'}
            placeholder={'Enter Here'}
            secureTextEntry={false}
            style={styles.textFieldSmall}
            isDarkBorder={true}
            onChangeText={(text: string) => {
              setEmail(text);
            }}
          />
          <View style={styles.bioContainer}>
            <Text style={styles.bioText}>Bio</Text>
            <TextInput
              maxLength={200}
              style={[
                styles.textField,
                {
                  fontStyle:
                    bio != ''
                      ? //? bio.length > 0
                        'normal'
                      : 'italic',
                  //: 'italic',
                },
              ]}
              underlineColorAndroid={'transparent'}
              multiline={true}
              numberOfLines={6}
              value={bio}
              placeholder={'Enter Here'}
              onChangeText={(bio: string) => {
                setBio(bio);
              }}
            />
          </View>
        </View>
        {renderButtons()}
        <COMPONENT.Popup />
        <COMPONENT.Loader isLoading={props.loading} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.user.loading,
  profileData: state.user.profileData,
  LOProfileSuccess: state.user.LOProfileSuccess,
  LOProfileMessage: state.user.LOProfileMessage,
  userData: state.auth.userData,
  updateEmailMessage: state.user.updateEmailMessage,
  updateEmailFailureMessage: state.user.updateEmailFailureMessage,
});

export default connect(mapStateToProps, {
  getUserProfile,
  saveLOProfile,
  OpenValidationAlert,
  closeModal,
  clearLOProfile,
  updateEmail,
  clearUpdateEmail,
})(ProfileLO);
