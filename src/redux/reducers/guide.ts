import * as TYPE from '../types/guide';

const initialState = {
  loading: false,
  loanprogram: [],
  loanprogramDetail: {},
  learningcenter: [],
  learningcenterDetail: {},
  privacy: {},
  disclaimer: {},
  checklist: [],
  guideList: [],
  glossaryList : [],
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get guide list
    case TYPE.GET_GUIDE_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        guideList: [],
      };
    }
    case TYPE.GET_GUIDE_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        guideList: action.payload.data.data,
      };
    }
    case TYPE.GET_GUIDE_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        guideList: [],
      };
    }
    //get loan program
    case TYPE.GET_LOAN_PROGRAM_REQUEST: {
      return {
        ...state,
        loading: true,
        loanprogram: [],
      };
    }
    case TYPE.GET_LOAN_PROGRAM_SUCCESS: {
      return {
        ...state,
        loading: false,
        loanprogram: action.payload.data.data,
      };
    }
    case TYPE.GET_LOAN_PROGRAM_ERROR: {
      return {
        ...state,
        loading: false,
        loanprogram: [],
      };
    }
    //get loan program detail
    case TYPE.GET_LOAN_PROGRAM_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        loanprogramDetail: {},
      };
    }
    case TYPE.GET_LOAN_PROGRAM_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        loanprogramDetail: action.payload.data.data,
      };
    }
    case TYPE.GET_LOAN_PROGRAM_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        loanprogramDetail: {},
      };
    }
    //get learning center
    case TYPE.GET_LEARNING_CENTER_REQUEST: {
      return {
        ...state,
        loading: true,
        learningcenter: [],
      };
    }
    case TYPE.GET_LEARNING_CENTER_SUCCESS: {
      return {
        ...state,
        loading: false,
        learningcenter: action.payload.data.data,
      };
    }
    case TYPE.GET_LEARNING_CENTER_ERROR: {
      return {
        ...state,
        loading: false,
        learningcenter: [],
      };
    }
    //get learning center detail
    case TYPE.GET_LEARNING_CENTER_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        learningcenterDetail: {},
      };
    }
    case TYPE.GET_LEARNING_CENTER_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        learningcenterDetail: action.payload.data.data,
      };
    }
    case TYPE.GET_LEARNING_CENTER_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        learningcenterDetail: {},
      };
    }
    //get checklist
    case TYPE.GET_CHECKLIST_REQUEST: {
      return {
        ...state,
        loading: true,
        checklist: [],
      };
    }
    case TYPE.GET_CHECKLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        checklist: action.payload.data.data,
      };
    }
    case TYPE.GET_CHECKLIST_ERROR: {
      return {
        ...state,
        loading: false,
        checklist: [],
      };
    }
    //get privacy
    case TYPE.GET_PRIVACY_REQUEST: {
      return {
        ...state,
        loading: true,
        privacy: {},
      };
    }
    case TYPE.GET_PRIVACY_SUCCESS: {
      return {
        ...state,
        loading: false,
        privacy: action.payload.data.data,
      };
    }
    case TYPE.GET_PRIVACY_ERROR: {
      return {
        ...state,
        loading: false,
        privacy: {},
      };
    }
    //get disclaimer
    case TYPE.GET_DISCLAIMER_REQUEST: {
      return {
        ...state,
        loading: true,
        disclaimer: {},
      };
    }
    case TYPE.GET_DISCLAIMER_SUCCESS: {
      return {
        ...state,
        loading: false,
        disclaimer: action.payload.data.data,
      };
    }
    case TYPE.GET_DISCLAIMER_ERROR: {
      return {
        ...state,
        loading: false,
        disclaimer: {},
      };
    }
    //update checklist
    case TYPE.UPDATE_CHECKLIST_REQUEST: {
      return {
        ...state,
        // loading: true,
        //checklist: [],
      };
    }
    case TYPE.UPDATE_CHECKLIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        checklist: action.payload.data.data,
        //checklist: action.payload,
      };
    }
    case TYPE.UPDATE_CHECKLIST_ERROR: {
      return {
        ...state,
        loading: false,
        //checklist: [],
      };
    }
    case TYPE.GET_GLOSSARYLIST_REQUEST : {
      return {
        ...state,
        loading : true,
        glossaryList : [],
      };
    }
    case TYPE.GET_GLOSSARYLIST_SUCCESS : {
      return {
        ...state,
        glossaryList : action.payload.data.data,
        loading : false,
      }
    }
    case TYPE.GET_GLOSSARYLIST_ERROR : {
      return {
        ...state,
        loading : false,
        glossaryList : []
      }
    }
    default:
      return state;
  }
};
