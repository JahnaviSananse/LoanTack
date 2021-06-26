import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  AsyncStorage,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import { closeModal, OpenValidationAlert } from 'src/redux/actions/common';
import { assignLO, clearAssignData } from 'src/redux/actions/dashboard_bo';
import { getBorrowers, getChatID } from 'src/redux/actions/user';
import { IReduxState } from 'src/redux/reducers';
import * as Router from '../../../routes/router';
import styles from './styles';
interface ISelectLO {
  loofficerData: any;
  assignLO: Function;
  assignloMessage: string;
  loading: boolean;
  OpenValidationAlert: Function;
  clearAssignData: Function;
  closeModal: Function;
  userData: any;
  getBorrowers: Function;
  borrowers: any[];
  getChatID: Function;
  chatID: any;
}
const SelectLO = (props: ISelectLO) => {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState<any>([]);
  const [conversationData, setConversationData] = React.useState<any[]>([]);
  const [selectedItem, setSelectedItem] = React.useState();
  const params: any = useRoute().params;

  React.useEffect(() => {
    if (props.userData.role === 2) {
      props.getBorrowers();
    }
  }, []);

  React.useEffect(() => {
    if (params) {
      setConversationData(params.data);
    }
  }, [params]);

  React.useEffect(() => {
    if (props.chatID && selectedItem && selectedItem.name !== '') {
      navigation.goBack();
      console.log('SEcte', selectedItem);
      navigation.navigate('ChatLO', {
        name: selectedItem.name,
        borrower_id: selectedItem.id,
        isBack: true,
        chatId: props.chatID,
      });
    }
  }, [props.chatID]);

  React.useEffect(() => {
    if (props.borrowers) {
      let tempArray: any[] = [];
      props.borrowers.map((iObj: any) => {
        let fData = conversationData.filter(
          (fObj: any) => fObj.userId === iObj.id,
        );
        if (fData.length === 0) {
          tempArray.push(iObj);
        }
      });
      setData(tempArray);
    }
  }, [props.borrowers]);

  React.useEffect(() => {
    if (props.userData.role !== 2 && props.loofficerData.data !== undefined) {
      if (props.loofficerData.data.data.result) {
        setData(props.loofficerData.data.data.result);
      }
    }
    if (search && search !== '') {
      let ary = [];
      data.map((mvalue) => {
        let n = mvalue.name.toLowerCase().search(search.toLowerCase());
        if (n !== -1) {
          ary.push(mvalue);
        }
      });
      setData(ary);
    } else {
      if (props.userData.role === 2) {
        setData(props.borrowers);
      } else if (props.loofficerData.data !== undefined) {
        if (props.loofficerData.data.data.result) {
          setData(props.loofficerData.data.data.result);
        }
      }
    }
    if (props.assignloMessage && !props.loading) {
      AsyncStorage.getItem(CONSTANT.USER_DATA).then((value) => {
        let data = JSON.parse(value);
        data.data.user.parent_id = true;
        AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(data));
      });
      setTimeout(() => {
        let obj = {
          message: props.assignloMessage,
          type: 'success',
        };
        props.OpenValidationAlert(obj);
        Router.replace('DashboardBO', {});
        props.clearAssignData();
        props.closeModal();
      }, 500);
    }
  }, [search, props.loofficerData, props.assignloMessage]);
  const renderItem = (item: any) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setSelectedItem(item);
            if (props.userData.role !== 2) {
              let obj = {
                assign_lo_number: item.id,
              };
              props.assignLO(obj);
            } else {
              setTimeout(() => {
                props.getChatID({ borrower_id: item.id });
              }, 500);
            }
          }}
          style={styles.cellContainer}
        >
          {item.profile_photo ? (
            <Image source={{ uri: item.profile_photo }} style={styles.avatar} />
          ) : (
            <Image
              source={IMAGES.IC_PLACEHOLDER}
              style={styles.avatar}
              tintColor={COLOR.getTheme()}
            />
          )}
          <Text style={styles.nameText}>{item.name}</Text>
        </TouchableOpacity>
        <View style={styles.separetor} />
      </View>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={
            props.userData && props.userData.role === 2
              ? 'Select Borrower'
              : 'Select Loan Officer'
          }
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <View style={styles.dataContainer}>
          <View style={styles.searchContainer}>
            <Image source={IMAGES.IC_SEARCH} style={styles.searchIcon} />
            <TextInput
              style={styles.textInput}
              value={search}
              placeholder={'Search'}
              onChangeText={(text) => setSearch(text)}
            />
          </View>
          <FlatList
            data={data}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
          />
        </View>
        <COMPONENT.Popup />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loofficerData: state.dashboard_bo.loofficerData,
  assignloMessage: state.dashboard_bo.assignloMessage,
  loading: state.dashboard_bo.loading,
  userData: state.auth.userData,
  borrowers: state.user.borrowers,
  chatID: state.user.chatID,
});

export default connect(mapStateToProps, {
  assignLO,
  OpenValidationAlert,
  clearAssignData,
  closeModal,
  getBorrowers,
  getChatID,
})(SelectLO);
