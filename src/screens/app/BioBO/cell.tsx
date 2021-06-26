import React from 'react';
import { FlatList, Linking, Text, TouchableOpacity, View } from 'react-native';
import * as IMAGES from 'src/assets/images';
import Image from 'src/components/Image';
import * as COLOR from 'src/constants/colors';
import styles from './styles';

interface ICellProps {
  item?: any;
}

const Cell = (props: ICellProps) => {
  const { item } = props;
  const [linkData, setLinkData] = React.useState<any[]>([]);
  let lincenceNum = item.licence ? item.licence : '';

  const renderImage = (type: string) => {
    switch (type) {
      case 'website_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_WEBSITE : IMAGES.IC_BLACK_WEBSITE
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'facebook_link':
        return (
          <Image
            source={item.role === 2 ? IMAGES.IC_FACEBOOK : IMAGES.IC_BLACK_FB}
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'twitter_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_TWITTER : IMAGES.IC_BLACK_TWITTER
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'linkedin_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_LINKEDIN : IMAGES.IC_BLACK_LINKEDIN
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'google_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_GPLUS : IMAGES.IC_BLACK_GOOGLE_PLUS
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'youtube_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_YOUTUBE : IMAGES.IC_BLACK_YOUTUBE
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      case 'pinterest_link':
        return (
          <Image
            source={
              item.role === 2 ? IMAGES.IC_PINTEREST : IMAGES.IC_BLACK_PINTREST
            }
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );

      default:
        return (
          <Image
            source={item.role === 2 ? IMAGES.IC_MAIL : IMAGES.IC_BLACK_MAIL}
            style={styles.ofcIcon}
            resizeMode={'contain'}
            tintColor={COLOR.getTheme()}
          />
        );
    }
  };
  const renderItem = (item: any) => {
    if (item[1].value === null) {
      return;
    }
    return (
      <TouchableOpacity
        style={styles.ofcButton}
        onPress={() => {
          if (item[1].value.includes('https://')) {
            Linking.openURL(item[1].value);
          } else {
            let email = 'mailto:' + item[1].value;
            Linking.openURL(email);
          }
        }}
      >
        <View style={styles.ofcIcon}>{renderImage(item[1].key)}</View>
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    if (Object.values(item.social_links).length > 0) {
      let temp: any[] = [];
      Object.entries(item.social_links).map((res: any) => {
        if (res[1] !== null) {
          let obj = {
            key: res[0],
            value: res[1],
          };
          temp.push(obj);
        }
      });
      setLinkData(temp);
    }
  }, [item.social_links]);

  return (
    <View style={styles.ofcContainer}>
      <View
        style={[
          styles.ofcSubContainer,
          { backgroundColor: item.role === 2 ? COLOR.getTheme() : '#1F2428' },
        ]}
      >
        <View style={styles.detailConatainer}>
          <Text style={styles.ofcName}>{item.name}</Text>
          <Text style={styles.ofcDesignation}>{item.designation}</Text>
          <Text style={styles.ofcCode}>{'NMLS: ' + lincenceNum}</Text>
        </View>
        {item.profile_photo && (
          <Image
            source={{ uri: item.profile_photo }}
            style={styles.profileImage}
          />
        )}

        {Object.values(item.social_links).length > 0 && (
          <View
            style={{
              marginTop: 100,
              justifyContent: 'space-between',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
          >
            <FlatList
              style={{ width: '90%' }}
              nestedScrollEnabled={true}
              scrollEnabled={true}
              data={Object.entries(linkData)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => renderItem(item, index)}
              numColumns={4}
            />
          </View>
        )}
        {/* <Text>{JSON.stringify(item.social_links)}</Text> */}
        {/* <View style={styles.socialMargin}>
          <View style={styles.ofcSocialContaier}>
            <TouchableOpacity
              style={styles.ofcButton}
              // onPress={() => navigation.navigate('BioBO')}
              onPress={() =>
                item.social_links.website_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.website_link,
                })
              }>
              <Image
                source={item.role === 2 ? IMAGES.IC_WEBSITE : IMAGES.IC_BLACK_WEBSITE}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.ofcButton} onPress={() => Linking.openURL('mailto:' + item.email)}>
              <Image
                source={item.role === 2 ? IMAGES.IC_MAIL : IMAGES.IC_BLACK_MAIL}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.facebook_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.facebook_link,
                })
              }>
              <Image
                source={item.role === 2 ? IMAGES.IC_FACEBOOK : IMAGES.IC_BLACK_FB}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.twitter_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.twitter_link,
                })
              }>
              <Image
                source={item.role === 2 ? IMAGES.IC_TWITTER : IMAGES.IC_BLACK_TWITTER}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.ofcMoreSocialContaier}>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.linkedin_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.linkedin_link,
                })
              }>
              <Image
                source={
                  item.role === 2 ? IMAGES.IC_LINKEDIN : IMAGES.IC_BLACK_LINKEDIN
                }
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.google_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.google_link,
                })
              }>
              <Image
                source={
                  item.role === 2 ? IMAGES.IC_GPLUS : IMAGES.IC_BLACK_GOOGLE_PLUS
                }
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.youtube_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.youtube_link,
                })
              }>
              <Image
                source={item.role === 2 ? IMAGES.IC_YOUTUBE : IMAGES.IC_BLACK_YOUTUBE}
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ofcButton}
              onPress={() =>
                item.social_links.pinterest_link != null &&
                navigation.navigate('Webview', {
                  url: item.social_links.pinterest_link,
                })
              }>
              <Image
                source={
                  item.role === 2 ? IMAGES.IC_PINTEREST : IMAGES.IC_BLACK_PINTREST
                }
                style={styles.ofcIcon}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View> */}
      </View>
    </View>
  );
};
export default Cell;
