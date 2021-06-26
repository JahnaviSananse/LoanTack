import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import * as API from 'src/api/user';
import * as CONSTANT from 'src/constants/constant';
import { assignLO } from '../actions/dashboard_bo';
import { LOGIN_SUCCESS_EMAIL } from '../types/auth';
import * as TYPE from '../types/user';
// const msg: string = 'Something went wrong!';

///user/chat-id
export const getChatID = (req?: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_CHAT_ID_REQUEST });
    console.log('Req Chat ID', req);
    const data = await API.getChatID(req);
    if (data.data) {
      console.log('Chat ID ', data.data);
      dispatch({
        type: TYPE.GET_CHAT_ID_SUCCESS,
        payload: data.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_CHAT_ID_ERROR,
      payload: error,
    });
  }
};

export const clearChatIDData = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.CHAT_ID_DATA_CLEAR,
  });
};

//mob/api/v1/user/deep-link
export const referDeepLink = (req: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.REFER_DEEP_LINK_REQUEST });
    console.log('Req Refee', req);
    const data = await API.referDeepLink(req);
    if (data.data) {
      console.log('Refered Data ', data.data);
      dispatch({
        type: TYPE.REFER_DEEP_LINK_SUCCESS,
        payload: data,
      });
      let obj = {
        assign_lo_number: req.referred_by,
      };
      dispatch(assignLO(obj));
      // ActionCreators(assignLO(obj))
    }
  } catch (error) {
    dispatch({
      type: TYPE.REFER_DEEP_LINK_ERROR,
      payload: error,
    });
  }
};

export const getUserProfile = (req: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_PROFILE_REQUEST });
    const data = await API.getUserProfile();
    dispatch({
      type: TYPE.GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_PROFILE_ERROR,
      payload: error,
    });
  }
};

export const changePassword = (
  password: string,
  new_password: string,
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.CHANGE_PASSWORD_REQUEST });
    const data = await API.changePassword({
      password,
      new_password,
    });
    dispatch({
      type: TYPE.CHANGE_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.CHANGE_PASSWORD_ERROR,
      payload: error,
    });
  }
};

export const clearChangePassword = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.CHANGE_PASSWORD_DATA_CLEAR,
  });
};

export const saveBorrowerProfile = (request: Object) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch({ type: TYPE.SAVE_BORROWER_PROFILE_REQUEST });
    const data = await API.saveBorrowerProfile(request);
    dispatch({
      type: TYPE.SAVE_BORROWER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.SAVE_BORROWER_PROFILE_ERROR,
      payload: error,
    });
  }
};

export const clearBorrowerProfile = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.BORROWER_PROFILE_DATA_CLEAR,
  });
};

export const saveLOProfile = (profile_photo: any, bio: string) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch({ type: TYPE.SAVE_LO_PROFILE_REQUEST });
    const data = await API.saveUserProfile({
      profile_photo,
      bio,
    });
    dispatch({
      type: TYPE.SAVE_LO_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //console.log('ACTIONERROR', error);
    dispatch({
      type: TYPE.SAVE_LO_PROFILE_ERROR,
      payload: error,
    });
  }
};

export const clearLOProfile = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.LO_PROFILE_DATA_CLEAR,
  });
};

export const getNotificationSettings = (
  profile_photo: any,
  bio: string,
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_NOTIFICATION_SETTING_REQUEST });
    const data = await API.getNotification({
      profile_photo,
      bio,
    });
    dispatch({
      type: TYPE.GET_NOTIFICATION_SETTING_SUCCESS,
      payload: data.data.data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_NOTIFICATION_SETTING_ERROR,
      payload: error,
    });
  }
};

export const saveNotificationSettings = (
  direct_message: boolean,
  document_upload: boolean,
  app_download_from_link: boolean,
) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.SAVE_NOTIFICATION_SETTING_REQUEST });
    const data = await API.saveNotification({
      direct_message,
      document_upload,
      app_download_from_link,
    });
    dispatch({
      type: TYPE.SAVE_NOTIFICATION_SETTING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: TYPE.SAVE_NOTIFICATION_SETTING_ERROR,
      payload: error,
    });
  }
};

//get Borrowers

export const getBorrowers = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_BORROWERS_REQUEST });
    const data = await API.getBorrowers();
    if (data.data) {
      console.log('BO Data', data.data);
      dispatch({
        type: TYPE.GET_BORROWERS_SUCCESS,
        payload: data.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_BORROWERS_ERROR,
      payload: error,
    });
  }
};

//save chat document
export const saveChatDocument = (chat_document: any) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch({ type: TYPE.SAVE_CHAT_DOCUMENT_REQUEST });
    const data = await API.saveChatDocument({ chat_document });
    if (data.data) {
      dispatch({
        type: TYPE.SAVE_CHAT_DOCUMENT_SUCCESS,
        payload: data.data.data.url,
      });
    }
  } catch (error) {
    //console.log('ACTIONERROR', error);
    dispatch({
      type: TYPE.SAVE_CHAT_DOCUMENT_ERROR,
      payload: error,
    });
  }
};

export const clearChatDocumentData = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.SAVE_CHAT_DOCUMENT_ERROR,
  });
};

export const clearUpdateEmail = () => async (dispatch: Dispatch) => {
  dispatch({
    type: TYPE.CLEAR_UPDATE_EMAIL,
  });
};

export const updateEmail = (email: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.UPADTE_EMAIL_REQUEST });
    const data = await API.updateEmail(email);
    // console.log('Email Updated Data', data, data.data.data);

    const finalData = data.data;
    // console.log('User Dara', finalData);
    if (finalData) {
      AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'yes');
      // AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(finalData));
      AsyncStorage.setItem(
        CONSTANT.ACCESS_TOKEN,
        data.data.data.token.token.access_token,
      );
      AsyncStorage.setItem(
        CONSTANT.REFRESH_TOKEN,
        data.data.data.token.token.refresh_token,
      );

      // console.log('IS_TOKEN_AVAILABLE');
      setTimeout(() => {
        dispatch({
          type: LOGIN_SUCCESS_EMAIL,
          payload: finalData,
        });
      }, 200);
      dispatch({
        type: TYPE.UPADTE_EMAIL_SUCCESS,
      });

      // ROUTER.goBack();
    }
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: TYPE.UPADTE_EMAIL_ERROR,
      payload: error,
    });
  }
};

// getLODashboardList
export const getLODashboardList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_LO_DASHBOARD_LIST_REQUEST });
    const data = await API.getLODashboardList();
    if (data.data) {
      console.log('Lo list Data', data.data);
      dispatch({
        type: TYPE.GET_LO_DASHBOARD_LIST_SUCCESS,
        payload: data.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_LO_DASHBOARD_LIST_ERROR,
      payload: error,
    });
  }
};

//get notifications listing /user/listing/notifications
export const getNotificationList = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.GET_NOTIFICATION_LIST_REQUEST });
    const data = await API.getNotificationList();
    if (data.data) {
      console.log('Notification list Data', data.data);
      dispatch({
        type: TYPE.GET_NOTIFICATION_LIST_SUCCESS,
        payload: data.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_NOTIFICATION_LIST_ERROR,
      payload: error,
    });
  }
};

//save user token
export const saveDeviceToken = (request: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: TYPE.SAVE_DEVICE_TOKEN_REQUEST });
    const data = await API.saveDeviceToken(request);
    console.log('Device Token API ca;ll', data);
    if (data.data) {
      dispatch({
        type: TYPE.SAVE_DEVICE_TOKEN_SUCCESS,
        payload: data.data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.SAVE_DEVICE_TOKEN_ERROR,
      payload: error,
    });
  }
};
