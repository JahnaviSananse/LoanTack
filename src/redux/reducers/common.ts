import * as IMAGES from 'src/assets/images';
import * as TYPES from '../types/common';
const initialState = {
  tabs: [
    {
      name: 'Uploaded Documents',
      screenName: 'UploadedDocumentBO',
      key: '0',
      grey: IMAGES.IC_DOCUMENT_GRAY,
      white: IMAGES.IC_DOCUMENT_WHITE,
      green: IMAGES.IC_DOCUMENT_GREEN,
    },
    {
      name: 'Callback Request',
      screenName: 'CallbackBO',
      key: '5',
      grey: IMAGES.IC_PHONE_GRAY,
      white: IMAGES.IC_PHONE_WHITE,
      green: IMAGES.IC_PHONE_GREEN,
    },
    {
      name: 'Saved Calculations',
      screenName: 'SavedCalculationBO',
      key: '3',
      grey: IMAGES.IC_ACCOUNTING_GRAY,
      white: IMAGES.IC_ACCOUNTING_WHITE,
      green: IMAGES.IC_ACCOUNTING_GREEN,
    },
    {
      name: 'Notifications',
      screenName: 'NotificationLO',
      key: '2',
      grey: IMAGES.IC_NOTIFICATION_GRAY,
      white: IMAGES.IC_NOTIFICATION_WHITE,
      green: IMAGES.IC_NOTIFICATION_GREEN,
    },
    {
      name: 'Message',
      key: '1',
      screenName: 'MessageLO',
      grey: IMAGES.IC_MESSAGE_GRAY,
      white: IMAGES.IC_MESSAGE_WHITE,
      green: IMAGES.IC_MESSAGE_GREEN,
    },
    {
      name: 'Checklist',
      screenName: 'ChecklistBO',
      key: '4',
      grey: IMAGES.IC_CHECKLIST_GRAY,
      white: IMAGES.IC_CHECKLIST_WHITE,
      green: IMAGES.IC_CHECKLIST_GREEN,
    },
    { name: '', key: '6', image: '' },
    { name: '', key: '7', image: '' },
    {
      name: 'Dashboard',
      screenName: 'DashboardBO',
      key: '8',
      grey: IMAGES.IC_DASHBOARD_GRAY,
      white: IMAGES.IC_DASHBOARD_WHITE,
      green: IMAGES.IC_DASHBOARD_GREEN,
    },
    {
      name: 'Calculator',
      screenName: 'CalculatorBO',
      key: '9',
      grey: IMAGES.IC_CALCULATOR_GRAY,
      white: IMAGES.IC_CALCULATOR_WHITE,
      green: IMAGES.IC_CALCULATOR_GREEN,
    },
    {
      name: 'Scan',
      screenName: 'ScanDocumentBO',
      key: '10',
      grey: IMAGES.IC_SCAN_GRAY,
      white: IMAGES.IC_SCAN_WHITE,
      green: IMAGES.IC_SCAN_GREEN,
    },
    {
      name: 'Guide',
      screenName: 'GuideBO',
      key: '11',
      grey: IMAGES.IC_GUIDE_GRAY,
      white: IMAGES.IC_GUIDE_WHITE,
      green: IMAGES.IC_GUIDE_GREEN,
    },
  ],
  showOptions: false,
  scanRedirect: 'ScanDocumentBO',
  message: '',
  type: 'failure',
  modalVisible: false,
  redirect: '',
  customLink: '',
  scanimages: [],
  filename: '',
  theme: '',
  loading: false,
  currentDate: '',
  isGuest: false,
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    case TYPES.SET_GUEST: {
      return {
        ...state,
        isGuest: action.payload,
      };
    }
    case TYPES.SCAN_REDIRECT: {
      return {
        ...state,
        scanRedirect: action.payload,
      };
    }

    case TYPES.SET_THEME: {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case TYPES.SET_CURRENT_DATE: {
      return {
        ...state,
        currentDate: action.payload,
      };
    }
    case TYPES.SET_DEFAULT_THEME: {
      return {
        ...state,
        theme: 'rgba(79,178,99,1)',
      };
    }
    case TYPES.SET_SCAN_IMAGES: {
      return {
        ...state,
        scanimages: state.scanimages.concat(action.payload),
      };
    }
    case TYPES.CLEAR_SCAN_IMAGES: {
      return {
        ...state,
        scanimages: [],
      };
    }
    case TYPES.SET_FILE_NAME: {
      return {
        ...state,
        filename: action.payload,
      };
    }
    case TYPES.SET_TABBAR_TABS: {
      return {
        ...state,
        tabs: action.payload,
      };
    }
    case TYPES.SET_SETTING_OPENS: {
      return {
        ...state,
        showOptions: action.payload,
      };
    }
    case TYPES.SHOW_VALIDATION_ALERT: {
      return {
        ...state,
        message: action.payload.message,
        type: action.payload.type,
        redirect: action.payload.redirect,
        modalVisible: true,
      };
    }
    case TYPES.CLOSE_VALIDATION_ALERT: {
      return {
        ...state,
        modalVisible: false,
        redirect: '',
        message: '',
      };
    }
    case TYPES.SET_CUSTOM_LINK: {
      return {
        ...state,
        customLink: action.payload,
      };
    }

    //set loader
    case TYPES.SET_LOADER_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }

    //clear loader
    case TYPES.CLEAR_LOADER: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};
