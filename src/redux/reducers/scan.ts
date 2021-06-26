import * as TYPE from '../types/scan';

const initialState = {
  loading: false,
  documentData: [],
  documentDeleteSuccess: false,
  documentDeleteMessage: '',
  saveDocumentSuccess: false,
  saveDocumentMessage: '',
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get document
    case TYPE.GET_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        documentData: [],
      };
    }
    case TYPE.GET_DOCUMENT_SUCCESS: {
      let data: any = action.payload.data;
      // console.log('Data', data);
      return {
        ...state,
        loading: false,
        documentData: data,
      };
    }
    case TYPE.GET_DOCUMENT_ERROR: {
      return {
        ...state,
        loading: false,
        documentData: [],
      };
    }
    //save document
    case TYPE.SAVE_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        saveDocumentMessage: '',
        saveDocumentSuccess: false,
      };
    }
    case TYPE.SAVE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        saveDocumentSuccess: true,
        saveDocumentMessage: '',
      };
    }
    case TYPE.SAVE_DOCUMENT_ERROR: {
      return {
        ...state,
        loading: false,
        saveDocumentMessage: action.payload,
        saveDocumentSuccess: false,
      };
    }
    case TYPE.SAVE_DOCUMENT_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        saveDocumentMessage: '',
        saveDocumentSuccess: false,
      };
    }

    //delete document
    case TYPE.DELETE_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        documentDeleteMessage: '',
        documentDeleteSuccess: false,
      };
    }
    case TYPE.DELETE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        documentDeleteSuccess: true,
        documentDeleteMessage: '',
      };
    }
    case TYPE.DELETE_DOCUMENT_ERROR: {
      return {
        ...state,
        loading: false,
        documentDeleteSuccess: false,
        documentDeleteMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
