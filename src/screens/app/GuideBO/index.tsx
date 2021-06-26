import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import { toggleSettingOption } from 'src/redux/actions/common';
import { getGuideList } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';
interface IGuideBOProps {
  toggleSettingOption: any;
  showOptions: boolean;
  updateInfoModal: Function;
  getGuideList: Function;
  loading: boolean;
  guideList: any;
  infoMessages: any;
  isGuest: boolean;
}
const GuideBO = (props: IGuideBOProps) => {
  const navigation = useNavigation();
  const params = useRoute().params;
  const [data, setData] = React.useState([{}]);

  React.useEffect(() => {
    props.getGuideList();
  }, []);

  React.useEffect(() => {
    if (Object.keys(props.guideList).includes('mortgage_guide_list')) {
      let tempData: any[] = [];
      props.guideList.mortgage_guide_list.map((item: any) => {
        let obj: any = {
          title: item.name,
          image: item.url,
          redirect: getRedirect(item.name),
        };
        item.name === 'Checklist' ? (obj.stack = 'ChecklistScreen') : null;
        tempData.push(obj);
      });
      setData(tempData);
    }
  }, [props.guideList]);

  const getRedirect = (name: string) => {
    switch (name) {
      case 'Learning Center':
        return 'LearningCenterBO';
      case 'Loan Programs':
        return 'LoanProgramsBO';
      case 'Glossary':
        return 'GlossaryBO';
      case 'Checklist':
        return 'ChecklistBO';
    }
  };

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.cellContainer}
        onPress={() => {
          if (item.stack) {
            navigation.navigate(item.stack, {
              screen: item.redirect,
              params: { isBack: true },
            });
          } else {
            navigation.navigate(item.redirect);
          }
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.icon}
          tintColor={COLOR.getTheme()}
          resizeMode={'contain'}
        />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAwareL}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.HeaderBO
          title={'Guide'}
          infoMessage={props.infoMessages?.guide_info}
          leftImg={
            params !== undefined ? IMAGES.IC_BACK : IMAGES.IC_HEADER_SETTING
          }
          leftClick={() =>
            params !== undefined
              ? navigation.goBack()
              : props.toggleSettingOption(!props.showOptions)
          }
          rightOneImg={IMAGES.IC_HEADER_INFO}
          popupInfo={{
            title: modalInfo.default.guidedTitle,
            description: modalInfo.default.guidedDescription,
          }}
          rightOneClick={() => {}}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
        />
        {!props.loading && (
          <FlatList
            scrollEnabled={false}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => renderItem(item)}
          />
        )}
      </SafeAreaView>
      <COMPONENT.Loader isLoading={props.loading} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  showOptions: state.common.showOptions,
  loading: state.guide.loading,
  guideList: state.guide.guideList,
  infoMessages: state.auth.infoMessages,
  isGuest: state.common.isGuest,
});

export default connect(mapStateToProps, {
  toggleSettingOption,
  getGuideList,
})(GuideBO);
