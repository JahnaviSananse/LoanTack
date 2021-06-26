import * as TYPE from '../types/user';

const initialState = {
  loading: false,
  profileData: [],
  borrowerProfileSuccess: false,
  passwordChangeMessage: '',
  passwordChangeSuccess: false,
  borrowerProfileMessage: '',
  LOProfileSuccess: false,
  LOProfileMessage: '',
  notificationData: [],
  getNotificationSuccess: false,
  referSuccess: false,
  chatID: '',
  chatID_failure_message: '',
  borrowers: [],
  fileUri: '',
  lo_dashboard: [],
  notifications: [],
  saveTokenSussess: false,
  updateEmailMessage: '',
  updateEmailFailureMessage: '',
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get chat id
    case TYPE.GET_CHAT_ID_REQUEST: {
      return {
        ...state,
        loading: true,
        chatID: '',
        chatID_failure_message: '',
      };
    }
    case TYPE.GET_CHAT_ID_SUCCESS: {
      return {
        ...state,
        loading: false,
        chatID: action.payload.chat_id,
        chatID_failure_message: '',
      };
    }
    case TYPE.GET_CHAT_ID_ERROR: {
      return {
        ...state,
        loading: false,
        chatID: '',
        chatID_failure_message: action.payload,
      };
    }
    case TYPE.CHAT_ID_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        chatID: '',
        chatID_failure_message: '',
      };
    }
    //refer deep link
    case TYPE.REFER_DEEP_LINK_REQUEST: {
      return {
        ...state,
        loading: true,
        referSuccess: false,
      };
    }
    case TYPE.REFER_DEEP_LINK_SUCCESS: {
      return {
        ...state,
        loading: false,
        referSuccess: true,
      };
    }
    case TYPE.REFER_DEEP_LINK_ERROR: {
      return {
        ...state,
        loading: false,
        referSuccess: false,
      };
    }
    //get user profile
    case TYPE.GET_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        updateEmailMessage: '',
        updateEmailFailureMessage: '',
      };
    }
    case TYPE.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        profileData: action.payload.data,
      };
    }
    case TYPE.GET_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        profileData: [],
      };
    }
    //change password
    case TYPE.CHANGE_PASSWORD_REQUEST: {
      return {
        ...state,
        loading: true,
        passwordChangeMessage: '',
        passwordChangeSuccess: false,
      };
    }
    case TYPE.CHANGE_PASSWORD_SUCCESS: {
      setTimeout(() => {
        state.passwordChangeSuccess = false;
      }, 1000);
      return {
        ...state,
        loading: false,
        passwordChangeSuccess: true,
        passwordChangeMessage: '',
      };
    }
    case TYPE.CHANGE_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        passwordChangeMessage: action.payload,
        passwordChangeSuccess: false,
      };
    }
    case TYPE.CHANGE_PASSWORD_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        passwordChangeMessage: '',
        passwordChangeSuccess: false,
      };
    }

    //borrower profile update
    case TYPE.SAVE_BORROWER_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        borrowerProfileMessage: '',
        borrowerProfileSuccess: false,
      };
    }
    case TYPE.SAVE_BORROWER_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        borrowerProfileSuccess: true,
        borrowerProfileMessage: '',
      };
    }
    case TYPE.SAVE_BORROWER_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        borrowerProfileMessage: action.payload,
        borrowerProfileSuccess: false,
      };
    }
    case TYPE.BORROWER_PROFILE_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        borrowerProfileMessage: '',
        borrowerProfileSuccess: false,
        updateEmailMessage: '',
      };
    }
    //LO profile update
    case TYPE.SAVE_LO_PROFILE_REQUEST: {
      return {
        ...state,
        loading: true,
        LOProfileSuccess: false,
        LOProfileMessage: '',
      };
    }
    case TYPE.SAVE_LO_PROFILE_SUCCESS: {
      return {
        ...state,
        loading: false,
        LOProfileSuccess: true,
        LOProfileMessage: '',
      };
    }
    case TYPE.SAVE_LO_PROFILE_ERROR: {
      return {
        ...state,
        loading: false,
        LOProfileMessage: action.payload,
        LOProfileSuccess: false,
      };
    }
    case TYPE.LO_PROFILE_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        LOProfileMessage: '',
        LOProfileSuccess: false,
        updateEmailMessage: '',
      };
    }

    //get user notification
    case TYPE.GET_NOTIFICATION_SETTING_REQUEST: {
      return {
        ...state,
        loading: true,
        getNotificationSuccess: false,
      };
    }
    case TYPE.GET_NOTIFICATION_SETTING_SUCCESS: {
      return {
        ...state,
        loading: false,
        getNotificationSuccess: true,
        notificationData: action.payload,
      };
    }
    case TYPE.GET_NOTIFICATION_SETTING_ERROR: {
      return {
        ...state,
        loading: false,
        getNotificationSuccess: false,
      };
    }
    //save user notification
    case TYPE.SAVE_NOTIFICATION_SETTING_REQUEST: {
      return {
        ...state,
        loading: true,
        //getNotificationSuccess: false,
      };
    }
    case TYPE.SAVE_NOTIFICATION_SETTING_SUCCESS: {
      return {
        ...state,
        loading: false,
        //getNotificationSuccess: true,
        //notificationData: action.payload,
      };
    }
    case TYPE.SAVE_NOTIFICATION_SETTING_ERROR: {
      return {
        ...state,
        loading: false,
        //LOProfileMessage: action.payload.message,
        //getNotificationSuccess: false,
      };
    }

    //get borrowers
    case TYPE.GET_BORROWERS_REQUEST: {
      return {
        ...state,
        loading: true,
        borrowers: [],
      };
    }
    case TYPE.GET_BORROWERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        borrowers: action.payload,
      };
    }
    case TYPE.GET_BORROWERS_ERROR: {
      return {
        ...state,
        loading: false,
        borrowers: [],
      };
    }

    // save Chat Document
    case TYPE.SAVE_CHAT_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        fileUri: '',
      };
    }
    case TYPE.SAVE_CHAT_DOCUMENT_SUCCESS: {
      //let url = action.payload.data.uri
      return {
        ...state,
        loading: false,
        fileUri: action.payload,
      };
    }
    case TYPE.SAVE_CHAT_DOCUMENT_ERROR: {
      return {
        ...state,
        loading: false,
        fileUri: '',
      };
    }

    //update Email
    case TYPE.UPADTE_EMAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        updateEmailMessage: '',
        updateEmailFailureMessage: '',
      };
    }
    case TYPE.UPADTE_EMAIL_SUCCESS: {
      //let url = action.payload.data.uri
      return {
        ...state,
        loading: false,
        updateEmailMessage: 'User Details Updated',
        updateEmailFailureMessage: '',
      };
    }
    case TYPE.UPADTE_EMAIL_ERROR: {
      return {
        ...state,
        loading: false,
        updateEmailMessage: '',
        updateEmailFailureMessage: action.payload,
      };
    }
    case TYPE.CLEAR_UPDATE_EMAIL: {
      return {
        ...state,
        loading: false,
        updateEmailMessage: '',
        updateEmailFailureMessage: '',
      };
    }

    //get LO dashboard list
    case TYPE.GET_LO_DASHBOARD_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        lo_dashboard: [],
      };
    }
    case TYPE.GET_LO_DASHBOARD_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        lo_dashboard: action.payload.messages,
      };
    }
    case TYPE.GET_LO_DASHBOARD_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        lo_dashboard: [],
      };
    }

    //get notification list
    case TYPE.GET_NOTIFICATION_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        notifications: [],
      };
    }
    case TYPE.GET_NOTIFICATION_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: action.payload,
      };
    }
    case TYPE.GET_NOTIFICATION_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        notifications: [],
      };
    }

    //save user token
    case TYPE.SAVE_DEVICE_TOKEN_REQUEST: {
      return {
        ...state,
        loading: true,
        saveTokenSussess: false,
      };
    }
    case TYPE.SAVE_DEVICE_TOKEN_SUCCESS: {
      return {
        ...state,
        loading: false,
        saveTokenSussess: true,
      };
    }
    case TYPE.SAVE_DEVICE_TOKEN_ERROR: {
      return {
        ...state,
        loading: false,
        saveTokenSussess: false,
      };
    }

    default:
      return state;
  }
};
