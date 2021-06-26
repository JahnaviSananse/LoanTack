import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import HTML from 'react-native-render-html';
import * as IMAGES from 'src/assets/images';
import * as COMPONENT from 'src/components';
import Image from 'src/components/Image';
import Cell from './cell';
import styles from './styles';

const renderDetail = (title: string) => {
  return (
    <View style={styles.descContainer}>
      {/* <Text style={styles.officeTitle}>{title}</Text>
      <Text style={styles.officerDetail}>{detail}</Text> */}
      <View style={styles.htmlContainer}>
        <HTML
          html={title}
          allowFontScaling={true}
          tagsStyles={{
            br: { margin: 0 },
            p: { margin: 0 },
            em: { margin: 0 },
            u: { margin: 0 },
            strong: { margin: 0 },
          }}
          ignoredTags={['br']}
          classesStyles={{
            'ql-size-huge': {
              fontSize: 30,
            },
            'ql-size-small': {
              fontSize: 10,
            },
            'ql-size-large': {
              fontSize: 20,
            },
          }}
        />
      </View>
    </View>
  );
};
const BioBO = () => {
  const navigation = useNavigation();
  const params: any = useRoute().params;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled
      style={styles.keyboardAware}
    >
      <SafeAreaView style={styles.container}>
        <COMPONENT.Header
          title={'Bio'}
          leftImg={IMAGES.IC_BACK}
          leftClick={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.extraScroll}>
          <Image
            source={{ uri: params.item.logo }}
            resizeMode={'contain'}
            style={styles.logo}
          />
          <Cell item={params.item} />
          {renderDetail(params.item.bio)}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default BioBO;
