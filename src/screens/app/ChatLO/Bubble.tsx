import moment from 'moment';
import React from 'react';
import { Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import FileViewer from 'react-native-file-viewer';
// import ProgressBarAnimated from 'react-native-progress-bar-animated';
import RNFetchBlob from 'rn-fetch-blob';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import * as CONSTANT from 'src/constants/constant';
import styles from './styles';

interface ICellProps {
  item?: any;
  showDate?: boolean;
  index: number;
  userID: number;
  msgArry?: any[];
  onSelectImage: Function;
}
const getTime = (date: any) => {
  //2021-01-21 13:20:17
  // var hours = date.getHours();
  // var minutes = date.getMinutes();
  // var ampm = hours >= 12 ? 'PM' : 'AM';
  const final = moment.utc(date).format('hh:mm A');
  // hours = hours % 12;
  // hours = hours ? hours : 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? '0' + minutes : minutes;
  // var strTime = hours + ':' + minutes + ' ' + ampm;
  return final;
};
const isUrl = (url: string) => {
  var strRegex = '^((https|Https|Http|http|ftp|rtsp|mms)?://)';
  // + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
  // + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
  // + "|" // 允许IP和DOMAIN（域名）
  // + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
  // + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
  // + "[a-z]{2,6})" // first level domain- .com or .museum
  // + "(:[0-9]{1,4})?" // 端口- :80
  // + "((/?)|" // a slash isn't required if there is no file name
  // + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
  var re = new RegExp(strRegex);
  return re.test(url);
};

const OpenFile = (url: string) => {
  FileViewer.open(url)
    .then(() => {
      // success
    })
    .catch((error) => {
      // error
    });
};

const Bubble = (props: ICellProps) => {
  const { item, showDate, userID, index = 0, msgArry } = props;
  const { config, fs } = RNFetchBlob;
  const [progress, setProgress] = React.useState(20);
  let textStyle = isUrl(item.text) ? styles.linkText : styles.normalText;
  let dateDisplay =
    moment().format(CONSTANT.TIME_FORMATE_MSG_TITLE) ===
    moment.utc(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE)
      ? 'Today'
      : moment.utc(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE);

  let user = item.user;
  let isCurrentUser = user?._id === userID ? true : false;
  let timerTitle = '';
  timerTitle = moment(item.createdAt).format(CONSTANT.TIME_FORMATE_MSG_TITLE);
  function downloadFile(url: string, filename: string) {
    let DownloadDir = fs.dirs.DocumentDir; // this is the pictures directory. You can check the available directories in the wiki.

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
        notification: true,
        description: 'Downloading image.',
      },
      path: DownloadDir + '/' + filename,
    };
    config(options)
      .fetch('GET', url)
      .then((res) => {
        // console.log(res);
        // setLoading(false);
        setTimeout(() => {
          if (Platform.OS === 'ios') {
            RNFetchBlob.ios.previewDocument(res.data);
          }
        }, 500);
      });
  }

  //return(<View><Text>HI</Text></View>)
  // let fileFormat = 'JPG' || 'jpg' || 'png' || 'PNG' || 'HEIC' || 'heic';
  // const barWidth = Dimensions.get('screen').width - 170;
  // const progressCustomStyles = {
  //   backgroundColor: COLOR.THEME.GREEN,
  //   borderRadius: 10,
  //   // borderColor: COLOR.THEME.GREEN,
  //   position: 'absolute',
  //   height: 3,
  //   left: 0,
  // };
  return (
    <View style={styles.cellContainer}>
      {showDate ? (
        <View>
          <View style={styles.dateSaperator} />
          <Text style={styles.dateText}>{dateDisplay}</Text>
        </View>
      ) : null}
      {item.type === 1 ? (
        <TouchableOpacity
          onPress={() => {
            props.onSelectImage(item.url);
            // Linking.openURL(item.url);
            // OpenFile(item.url);
          }}
          style={
            isCurrentUser
              ? styles.imageRight
              : [styles.imageLeft, { backgroundColor: COLOR.getLightTheme() }]
          }
        >
          <View style={styles.flexView}>
            <Image
              source={IMAGES.IC_ADD_IMAGE}
              style={styles.cellImage}
              resizeMode={'contain'}
              tintColor={COLOR.getTheme()}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={styles.cellText}
            >
              {item.text}
            </Text>
            {!isCurrentUser && (
              <TouchableOpacity
                onPress={() => downloadFile(item.url, item.text)}
                style={styles.imageContanier}
              >
                <Image
                  source={IMAGES.IC_ATTACHEMENT_DOWNLOAD}
                  style={styles.cellImage}
                  resizeMode={'contain'}
                  tintColor={COLOR.getTheme()}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* {isCurrentUser && (
          <View style={styles.progressContainer}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              value={progress}
              backgroundColorOnComplete={COLOR.THEME.GREEN}
            />
            <Text style={styles.progressTitle}>{progress} %</Text>
          </View>
          )} */}
        </TouchableOpacity>
      ) : item.type === 2 ? (
        <TouchableOpacity
          onPress={() => {
            // props.onSelectImage(item.url);
            Linking.openURL(item.url);
            // OpenFile(item.url);
          }}
          style={
            isCurrentUser
              ? styles.imageRight
              : [styles.imageLeft, { backgroundColor: COLOR.getLightTheme() }]
          }
        >
          <View style={styles.flexView}>
            <Image
              source={IMAGES.IC_ATTACHEMENT_DOC}
              style={styles.cellImage}
              resizeMode={'contain'}
              tintColor={COLOR.getTheme()}
            />
            <Text
              numberOfLines={2}
              ellipsizeMode={'tail'}
              style={styles.cellText}
            >
              {item.text}
            </Text>
            {!isCurrentUser && (
              <TouchableOpacity
                onPress={() => downloadFile(item.url, item.text)}
                style={styles.imageContanier}
              >
                <Image
                  source={IMAGES.IC_ATTACHEMENT_DOWNLOAD}
                  style={styles.cellImage}
                  resizeMode={'contain'}
                  tintColor={COLOR.getTheme()}
                />
              </TouchableOpacity>
            )}
          </View>
          {/* {isCurrentUser && (
            <View style={styles.progressContainer}>
              <ProgressBarAnimated
                {...progressCustomStyles}
                width={barWidth}
                value={progress}
                backgroundColorOnComplete={COLOR.THEME.GREEN}
              />
              <Text style={styles.progressTitle}>{progress} %</Text>
            </View>
          )} */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={
            isCurrentUser
              ? styles.rightBubble
              : [styles.leftBubble, { backgroundColor: COLOR.getLightTheme() }]
          }
          onPress={() => Linking.openURL(item.text)}
        >
          <Text style={textStyle}>{item.text}</Text>
        </TouchableOpacity>
      )}
      {/* {item.pdf && (
        <View
          style={
            isCurrentUser
              ? styles.imageRight
              : [styles.imageLeft, {backgroundColor: COLOR.getLightTheme()}]
          }>
          <Image
            source={IMAGES.IC_ATTACHEMENT_DOC}
            style={styles.cellImage}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
          <Text style={styles.cellText}>{item.filename}</Text>
          {isCurrentUser && (
            <TouchableOpacity style={styles.imageContanier}>
              <Image
                source={IMAGES.IC_ATTACHEMENT_DOWNLOAD}
                style={styles.cellImage}
                resizeMode={'contain'}
                tintColor={COLOR.getTheme()}
              />
            </TouchableOpacity>
          )}
        </View>
      )} */}
      {/* {item.text && (
        <TouchableOpacity
          style={
            isCurrentUser
              ? styles.rightBubble
              : [styles.leftBubble, {backgroundColor: COLOR.getLightTheme()}]
          }
          onPress={() => Linking.openURL(item.text)}>
          <Text style={textStyle}>{item.text}</Text>
        </TouchableOpacity>
      )} */}
      <Text style={isCurrentUser ? styles.rightTime : styles.leftTime}>
        {getTime(item.createdAt)}
      </Text>

      {/* <Text
        style={{ padding: 10, backgroundColor: 'red', position: 'absolute' }}
      >
        {moment(item.createdAt).format('DD/MM/YYYY')}
      </Text> */}
    </View>
  );
};
export default Bubble;
