import { useNavigation } from '@react-navigation/native';
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
import {
  getLearningCenter,
  getLearningCenterDetail,
} from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

interface ILearningCenterBOProps {
  loading: boolean;
  learningcenter: any;
  getLearningCenter: Function;
  getLearningCenterDetail: Function;
  infoMessages: any;
}
const LearningCenterBO = (props: ILearningCenterBOProps) => {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    props.getLearningCenter();
  }, []);
  const renderItem = (item: any) => {
    console.log('item.id', item.id);
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          props.getLearningCenterDetail(item.id);
          setTimeout(() => {
            navigation.navigate('LearningCenterDetailBO');
          }, 500);
        }}
      >
        <Text numberOfLines={1} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.saperator} />
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    if (props.learningcenter.length > 0) {
      setData(props.learningcenter);
    }
  }, [props.learningcenter]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Learning Center'}
          infoMessage={props.infoMessages?.learning_center}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneClick={() => setShowAlert(true)}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
          popupInfo={{
            title: modalInfo.default.learningCenterTitle,
            description: modalInfo.default.learningCenterDescription,
          }}
        />
        <FlatList
          scrollEnabled={false}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
        <COMPONENT.Loader isLoading={props.loading} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  loading: state.guide.loading,
  learningcenter: state.guide.learningcenter,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, {
  getLearningCenter,
  getLearningCenterDetail,
})(LearningCenterBO);
