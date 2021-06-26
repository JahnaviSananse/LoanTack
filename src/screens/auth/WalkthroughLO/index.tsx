import React from 'react';
import {
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Dimensions,
  View,
  Text,
} from 'react-native';
import * as IMAGES from 'src/assets/images'
import styles from './styles';
import Image from 'src/components/Image';



const WalkthroughLO = () => {
  const [data, setData] = React.useState([])
  const [currentIndex, setCurrentIndex] = React.useState(0)
  React.useEffect(() => {
    if (data.length === 0) {
      let ary = [
        { title: "Loan Calculator", description: "Calculate your monthly payment by inputting a few values", image: IMAGES.IC_WT_ONE },
        { title: "Scan Documents", description: "Scan documents using your camera and submit them securely.", image: IMAGES.IC_WT_TWO },
        { title: "Loan Checklists", description: "Keep track of what items are needed to apply for your loan.", image: IMAGES.IC_WT_THREE }
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
      alert("main screen")
    }
  }
  const onSkipPress = () => {
    alert("onSkipPress")
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
        <View style={[styles.countTwo, { backgroundColor: currentIndex >= 1 ? 'white' : "#219238" }]} />
        <View style={[styles.countThree, { backgroundColor: currentIndex >= 2 ? 'white' : "#219238" }]} />
      </View>
    </SafeAreaView >
  );
};

export default WalkthroughLO;

