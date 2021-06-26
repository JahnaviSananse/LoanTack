import { Dimensions, Platform } from 'react-native';

const dim = Dimensions.get('window');
const isX =
  Platform.OS === 'ios' && (dim.height > 800 || dim.width > 800) ? true : false;

export const MSG = '';
export const IS_IPHONEX = isX ? true : false;
export const IPHONE = Platform.OS === 'ios' ? true : false;
export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const TAB_HEIGHT = isX ? 100 : 60;

export const DEEPLINK_URL = 'deeplink_url';
export const DEEPLINK_ID = 'deeplink_id';
export const IS_DEEPLINK_DONE = 'is_deeplink_done';
export const USER_DATA = 'user_data';
export const IS_GUEST = 'isGuest';
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const IS_FIRST_TIME = 'is_first_time';
export const CUSTOM_LINK = 'custom_link';
export const IS_TOKEN_AVAILABLE = 'is_token_available';

export const TIME_FORMATE = 'hh:mm A';
export const TIME_FORMATE_D = 'hh:mm A';
export const TIME_FORMATE_M = 'MM/DD';
export const TIME_FORMATE_MSG_TITLE = 'MMM DD, YYYY';

export const CheckPassword = (inputtxt: string) => {
  var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (inputtxt.match(passw)) {
    return true;
  } else {
    return false;
  }
};
