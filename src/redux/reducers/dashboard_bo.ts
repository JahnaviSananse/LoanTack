import * as TYPE from '../types/dashboard_bo';

const initialState = {
  loading: false,
  mainlistData: [],
  loofficerData: [],
  lodetailData: [],
  assignedloData: [],
  assignloMessage: '',
  dashboardList: [],
  colorScheme: {},
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get color scheme
    case TYPE.GET_COLOR_SCHEME_REQUEST: {
      return {
        ...state,
        loading: true,
        colorScheme: {},
      };
    }
    case TYPE.GET_COLOR_SCHEME_SUCCESS: {
      return {
        ...state,
        loading: false,
        colorScheme: action.payload,
      };
    }
    case TYPE.GET_COLOR_SCHEME_ERROR: {
      return {
        ...state,
        loading: false,
        colorScheme: {},
      };
    }

    //get main list data
    case TYPE.GET_MAIN_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        mainlistData: [],
      };
    }
    case TYPE.GET_MAIN_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        mainlistData: action.payload,
      };
    }
    case TYPE.GET_MAIN_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        mainlistData: [],
      };
    }
    //get dashboard list data
    case TYPE.GET_DASHBOARD_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        dashboardList: [],
      };
    }
    case TYPE.GET_DASHBOARD_LIST_SUCCESS: {
      console.log("coming GET_DASHBOARD_LIST_SUCCESS :", action.payload.data.data)
      return {
        ...state,
        loading: false,
        dashboardList: action.payload.data.data,
      };
    }
    case TYPE.GET_DASHBOARD_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        dashboardList: [],
      };
    }
    //get loofficer data
    case TYPE.GET_LOOFFICER_REQUEST: {
      return {
        ...state,
        loading: true,
        loofficerData: [],
      };
    }
    case TYPE.GET_LOOFFICER_SUCCESS: {
      return {
        ...state,
        loading: false,
        loofficerData: action.payload,
      };
    }
    case TYPE.GET_LOOFFICER_ERROR: {
      return {
        ...state,
        loading: false,
        loofficerData: [],
      };
    }
    //get loofficer details data
    case TYPE.GET_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        lodetailData: [],
      };
    }
    case TYPE.GET_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        lodetailData: action.payload,
      };
    }
    case TYPE.GET_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        lodetailData: [],
      };
    }
    //get assigned lo data
    case TYPE.GET_ASSIGNED_LO_REQUEST: {
      return {
        ...state,
        loading: true,
        assignedloData: [],
      };
    }
    case TYPE.GET_ASSIGNED_LO_SUCCESS: {
      return {
        ...state,
        loading: false,
        assignedloData: action.payload,
      };
    }
    case TYPE.GET_ASSIGNED_LO_ERROR: {
      return {
        ...state,
        loading: false,
        assignedloData: [],
      };
    }
    //assign lo
    case TYPE.ASSIGN_LO_REQUEST: {
      return {
        ...state,
        loading: true,
        assignloMessage: '',
      };
    }
    case TYPE.ASSIGN_LO_SUCCESS: {
      return {
        ...state,
        loading: false,
        assignloMessage: action.payload.data.message,
      };
    }
    case TYPE.ASSIGN_LO_ERROR: {
      return {
        ...state,
        loading: false,
        assignloMessage: action.payload,
      };
    }
    case TYPE.ASSIGN_LO_CLEAR: {
      return {
        ...state,
        assignloMessage: '',
      };
    }
    case TYPE.SET_TABBAR_TABS: {
      return {
        ...state,
        mainlistData: action.payload,
      };
    }
    default:
      return state;
  }
};
