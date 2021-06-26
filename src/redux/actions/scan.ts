import { Dispatch } from 'redux';
import * as API from 'src/api/scan';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/scan';

const msg: string = 'Something went wrong!';

export const getDocument = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DOCUMENT_REQUEST });
    const data = await API.getDocument();
    dispatch({
      type: TYPE.GET_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DOCUMENT_ERROR,
      payload: error,
    });
  }
};

export const saveDocument = (request: Object, file: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    console.log('Req', request);
    dispatch({ type: TYPE.SAVE_DOCUMENT_REQUEST });
    const data = await API.saveDocument(request, file);
    dispatch({
      type: TYPE.SAVE_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.SAVE_DOCUMENT_ERROR,
      payload: error,
    });
  }
};

export const clearSaveDocument = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.SAVE_DOCUMENT_DATA_CLEAR,
  });
};

export const deleteDocument = (id: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.DELETE_DOCUMENT_REQUEST });
    const data = await API.deleteDocument(id);
    dispatch({
      type: TYPE.DELETE_DOCUMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.DELETE_DOCUMENT_ERROR,
      payload: error,
    });
  }
};
