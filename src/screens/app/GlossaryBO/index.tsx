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
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import { getGlossarylist } from 'src/redux/actions/guide';
import { IReduxState } from 'src/redux/reducers';
import * as modalInfo from 'src/redux/types/modalDescription';
import styles from './styles';

const desc =
  'Welcome to our comprehensive mortgage glossary where you can find definitions of various mortgage and real estate related terms.';
interface IGlossaryBOProps {
  getGlossarylist: Function;
  glossaryList: any;
  loading: boolean;
  infoMessages: any;
}
const LearningCenterBO = (props: IGlossaryBOProps) => {
  const navigation = useNavigation();
  const [showAlert, setShowAlert] = React.useState(false);
  const [data, setData] = React.useState();

  React.useEffect(() => {
    props.getGlossarylist();
  }, []);

  React.useEffect(() => {
    setData(
      props.glossaryList.sort(function (a: any, b: any) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }),
    );
  }, [props.glossaryList]);

  const renderItem = (item: any, ind: number) => {
    return (
      <View style={styles.cell}>
        <TouchableOpacity
          style={styles.cellContainer}
          onPress={() => {
            let tempData = JSON.parse(JSON.stringify(data));
            tempData[ind].isOpen = !tempData[ind].isOpen;
            setData(tempData);
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Image
            source={item.isOpen ? IMAGES.IC_UP_ARROW : IMAGES.IC_DOWN_ARROW}
            style={styles.arrow}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        {item.isOpen === true && (
          <View style={styles.flatlist}>
            <View style={styles.descText}>
              <HTML html={item.description} />
            </View>
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
          title={'Glossary'}
          infoMessage={props.infoMessages?.glossary_list_info}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
          rightOneClick={() => setShowAlert(true)}
          rightOneImg={IMAGES.IC_HEADER_INFO}
          righTwoImg={IMAGES.IC_HEADER_SHARE}
          popupInfo={{
            title: modalInfo.default.glossaryTitle,
            description: modalInfo.default.glossaryDescription,
          }}
        />
        {!props.loading && (
          <FlatList
            scrollEnabled={true}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => renderItem(item, index)}
          />
        )}
        <COMPONENT.InfoPopup
          title={'Glossary'}
          visible={showAlert}
          description={desc}
          closeAlert={() => closeAlert()}
        />
      </SafeAreaView>
      <COMPONENT.Loader isLoading={props.loading} />
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: IReduxState) => ({
  glossaryList: state.guide.glossaryList,
  loading: state.guide.loading,
  infoMessages: state.auth.infoMessages,
});

export default connect(mapStateToProps, { getGlossarylist })(LearningCenterBO);
