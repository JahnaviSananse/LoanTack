import { Dispatch } from 'redux';
import * as API from 'src/api/document';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/document';

const msg: string = 'Something went wrong!';


export const getDocumentList = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DOCUMENT_LIST_REQUEST });
    const data = await API.getDocumentsList();
    dispatch({
      type: TYPE.GET_DOCUMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DOCUMENT_LIST_ERROR,
      payload: error,
    });
  }
};



export const getDocumentDetail = (id: number) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DOCUMENT_DETAIL_REQUEST });
    const data = await API.getDocumentsDetail(id);
    dispatch({
      type: TYPE.GET_DOCUMENT_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DOCUMENT_DETAIL_ERROR,
      payload: error,
    });
  }
};
