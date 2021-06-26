import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  View,
  Text,
  AsyncStorage
} from 'react-native';
import * as IMAGES from 'src/assets/images'
import styles from './styles';
import * as CONSTANT from 'src/constants/constant'
import { useNavigation } from '@react-navigation/native';
import Image from 'src/components/Image';

const Walkthrough = () => {
  const [data, setData] = React.useState([])
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = React.useState(0)
  React.useEffect(() => {
    AsyncStorage.setItem(CONSTANT.IS_FIRST_TIME, "false")
    if (data.length === 0) {
      let ary = [
        { title: "Loan Calculator", description: "Calculate your monthly payment by inputting a few values", image: IMAGES.IC_WT_ONE_BO },
        { title: "Scan Documents", description: "Scan documents using your camera and submit them securely.", image: IMAGES.IC_WT_TWO_BO },
        { title: "Loan Checklists", description: "Keep track of what items are needed to apply for your loan.", image: IMAGES.IC_WT_THREE_BO }
      ]
      setData(ary)
    }
  }, [])
  // const flatListRef = null
  const onNextPress = () => {
    let index = currentIndex + 1
    setCurrentIndex(index)
    if (index < 3) {
      flatListRef.scrollToIndex({ animated: true, index: index });
    } else {
      navigation.reset({
        routes: [{
          name: 'Login'
          // name: "VerificationCode"
        }]
      })
    }
  }
  const onSkipPress = () => {
    navigation.reset({
      routes: [{
        name: 'Login'
        // name: "VerificationCode"
      }]
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        ref={(ref) => { flatListRef = ref }}
        renderItem={({ item, index }) =>
          <View style={styles.subContainer}>
            <View style={styles.extraView}></View>
            <View style={styles.imageContainer}>
              <Image source={item.image} style={styles.image} resizeMode={'contain'} />
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.descText}>{item.description}</Text>
              <TouchableOpacity style={styles.nextContainer} onPress={() => onNextPress()}>
                <Text style={styles.nextText}>
                  {index !== 2 ? "NEXT" : "LET’S START"}
                </Text>
              </TouchableOpacity>

              {index !== 2 &&
                < TouchableOpacity style={styles.skipContainer} onPress={() => onSkipPress()}>
                  <Text style={styles.skipText}>SKIP</Text>
                </TouchableOpacity>}
            </View>
          </View>
        }
      />
      <View style={styles.countContainer}>
        <View style={styles.countOne} />
        <View style={[styles.countTwo, { backgroundColor: currentIndex >= 1 ? "#219238" : '#CACACA' }]} />
        <View style={[styles.countThree, { backgroundColor: currentIndex >= 2 ? "#219238" : '#CACACA' }]} />
      </View>
    </SafeAreaView >
  );
};

export default Walkthrough;

