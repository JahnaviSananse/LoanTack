import * as TYPE from '../types/document';

const initialState = {
  loading: false,
  documents: [],
  documentsDetail: {},
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get document list
    case TYPE.GET_DOCUMENT_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
        documents: [],
      };
    }
    case TYPE.GET_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        documents: action.payload.data.data,
      };
    }
    case TYPE.GET_DOCUMENT_LIST_ERROR: {
      return {
        ...state,
        loading: false,
        documents: [],
      };
    }
    //get documents detail
    case TYPE.GET_DOCUMENT_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        documentsDetail: {},
      };
    }
    case TYPE.GET_DOCUMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        documentsDetail: action.payload.data.data,
      };
    }
    case TYPE.GET_DOCUMENT_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        documentsDetail: {},
      };
    }
    default:
      return state;
  }
};
