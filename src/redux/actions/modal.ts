import * as TYPES from '../types/modal';
import {Dispatch, AnyAction} from 'redux';
import {IReduxState} from '../reducers';

export const updateInfoModal = (
  isInfo: boolean,
  title: string,
  description: string,
) => async (dispatch: Dispatch, store: IReduxState) => {
  dispatch({
    type: TYPES.UPDATE_INFO_MODAL,
    payload: {
      isInfo,
      title,
      description,
    },
  });
};
