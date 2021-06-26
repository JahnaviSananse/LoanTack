import { Dispatch, AnyAction } from 'redux';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/callback';
import * as API from 'src/api/callback';

const msg: string = 'Something went wrong!';

export const callbackRequest = (
 req: any
) => async (dispatch: Dispatch, store: IReduxState) => {
 try {
  dispatch({ type: TYPE.CALLBACK_REQUEST_REQUEST });
  const data = await API.callbackRequest(req);
  dispatch({
   type: TYPE.CALLBACK_REQUEST_SUCCESS,
   payload: data.data,
  });
 } catch (error) {
  console.log('Error', error);
  dispatch({
   type: TYPE.CALLBACK_REQUEST_ERROR,
   payload: error,
  });
 }
};


export const clearCallback = () => async (
 dispatch: Dispatch,
 store: IReduxState,
) => {
 dispatch({
  type: TYPE.CALLBACK_REQUEST_CLEAR,
 });
};