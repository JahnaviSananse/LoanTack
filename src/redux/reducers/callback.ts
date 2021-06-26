import * as TYPE from '../types/callback';

const initialState = {
  loading: false,
  callbackSuccess: '',
  callbackError: ''
  // loanprogram: [],
  // learningcenter: [],
  // checklist: []
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //callback request
    case TYPE.CALLBACK_REQUEST_REQUEST: {
      return {
        ...state,
        loading: true,
        callbackSuccess: '',
        callbackError: ''
        //loanprogram: [],
      };
    }
    case TYPE.CALLBACK_REQUEST_SUCCESS: {
      return {
        ...state,
        loading: false,
        callbackSuccess: action.payload.message,
        callbackError: ''
        //loanprogram: action.payload.data.data,
      };
    }
    case TYPE.CALLBACK_REQUEST_ERROR: {
      return {
        ...state,
        loading: false,
        callbackSuccess: '',
        callbackError: action.payload
        //loanprogram: [],
      };
    }
    case TYPE.CALLBACK_REQUEST_CLEAR: {
      return {
        ...state,
        loading: false,
        callbackSuccess: '',
        callbackError: ''
        //loanprogram: [],
      };
    }

    default:
      return state;
  }
};
