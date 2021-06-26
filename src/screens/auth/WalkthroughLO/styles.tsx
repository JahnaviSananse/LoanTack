import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height
const imageSize = screenHeight * 0.40 - 50
export default styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#4fb263'
  },
  subContainer: {
    height: '100%',
    width: screenWidth,
    backgroundColor: '#4fb263'
  },
  extraView: {
    height: "15%",
    width: '100%'
  },
  imageContainer: {
    height: "40%",
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: imageSize,
    width: imageSize
  },
  detailContainer: {
    height: "40%",
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  descText: {
    color: 'white',
    fontSize: 15,
    marginTop: 20,
    textAlign: 'center',
    marginHorizontal: 15
  },
  nextContainer: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: 'white',
    borderRadius: 4
  },
  nextText: {
    color: '#4fb263',
    fontSize: 15,
    fontWeight: 'bold'
  },
  skipContainer: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'transparent',
    borderRadius: 4
  },
  skipText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  countContainer: {
    height: "10%",
    width: '100%',
    backgroundColor: "#4fb263",
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  countOne: {
    height: 4,
    width: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    marginRight: 5
  },
  countTwo: {
    height: 4,
    width: 20,
    marginRight: 5,
    borderRadius: 2
  },
  countThree: {
    height: 4,
    width: 20,
    marginRight: 5,
    borderRadius: 2
  }

});