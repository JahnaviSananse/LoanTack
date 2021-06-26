import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import { getChecklist, updateChecklist } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

const rows = [
  {
    title: 'ID Verification',
    isOpen: false,
    options: [
      { title: 'Health Insurance', isSelected: false },
      { title: 'Passport', isSelected: false },
      { title: 'Work Visa', isSelected: false },
      { title: 'ID Verification', isSelected: false },
    ],
  },
  {
    title: 'Items Needed',
    isOpen: false,
    options: [
      { title: 'option1', isSelected: false },
      { title: 'option2', isSelected: false },
    ],
  },
  {
    title: 'Optional',
    isOpen: false,
    options: [
      { title: 'option1', isSelected: false },
      { title: 'option2', isSelected: false },
    ],
  },
];
const desc = 'You can maintain a checklist of necessary items in this section.';

interface IChecklistProps {
  loading: boolean;
  checklist: any;
  getChecklist: Function;
  updateChecklist: Function;
  infoMessages: any;
  isGuest: boolean;
}

const LearningCenterBO = (props: IChecklistProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [showAlert, setShowAlert] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [current, setCurrent] = React.useState('1');

  React.useEffect(() => {
    props.getChecklist();
  }, []);

  React.useEffect(() => {
    if (props.checklist.length > 0) {
      setData(props.checklist);
      // console.log('Data');
    }
  }, [props.checklist]);

  const renderCheckBox = (item: any, index: number, mainIndex: any) => {
    // console.log('Item', item.checked);
    return (
      <View style={styles.checkBoxContainer}>
        <TouchableOpacity
          style={styles.checkBox}
          onPress={() => {
            let tempData = JSON.parse(JSON.stringify(data));
            let value = !tempData[mainIndex].items[index].checked;
            tempData[mainIndex].items[index].checked = value;

            console.log('Rempo', tempData);
            setData(tempData);
            if (props.isGuest) {
              // setMain
              // setData(tempData);
            } else {
              // setData(tempData);
              let obj = {
                id: tempData[mainIndex].id,
                checklist_item_id: item.id.toString(),
                is_checked: value,
              };
              props.updateChecklist(obj, data);
            }
          }}
        >
          <Image
            source={
              item.checked ? IMAGES.IC_CHECKBOX_SELECTED : IMAGES.IC_CHECKBOX
            }
            style={styles.checkBoxIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        </TouchableOpacity>
        <Text style={styles.checkBoxText}>{item.name}</Text>
      </View>
    );
  };

  const renderItem = (currentItem: any, ind: number) => {
    return (
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.cellContainer}
          onPress={() => {
            let tempData = JSON.parse(JSON.stringify(props.checklist));
            if (current === tempData[ind].id) {
              setCurrent(current ? '' : tempData[ind].id);
            } else {
              setCurrent(tempData[ind].id);
            }
            setData(tempData);
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {currentItem.name}
          </Text>
          <Image
            source={
              current === currentItem.id
                ? IMAGES.IC_UP_ARROW
                : IMAGES.IC_DOWN_ARROW
            }
            style={styles.arrow}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        {currentItem.id === current && (
          <View style={styles.flatlist}>
            {/* {
              item.items && item.items.map((val: any, index: number) => {
                return renderCheckBox(val, index, ind)
              })
            } */}
            <FlatList
              data={currentItem.items}
              keyExtractor={(iObj) => iObj.id}
              renderItem={({ item, index }) => renderCheckBox(item, index, ind)}
            />
          </View>
        )}
      </View>
    );
  };
  const closeAlert = () => {
    setShowAlert(false);
  };
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Checklist'}
          infoMessage={props.infoMessages?.checklist_info}
          leftImg={params !== undefined && IMAGES.IC_BACK}
          leftClick={() => params !== undefined && navigation.goBack()}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          rightOneClick={() => setShowAlert(true)}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
          popupInfo={{
            title: modalInfo.default.checklistTitle,
            description: modalInfo.default.checklistDescription,
          }}
        />
        <FlatList
          scrollEnabled={true}
          data={props.isGuest ? data : props.checklist}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => renderItem(item, index)}
        />
        <COMPONENT.InfoPopup
          title={'Checklist'}
          visible={showAlert}
          desciption={desc}
          closeAlert={() => closeAlert()}
        />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  checklist: state.guide.checklist,
  infoMessages: state.auth.infoMessages,
  isGuest: state.common.isGuest,
});

export default connect(mapStateToProps, { getChecklist, updateChecklist })(
  LearningCenterBO,
);
