import { Dispatch } from 'redux';
import { SET_CHANNEL_READ, RESET_CHANNEL_READ } from '../types/message';

export const setReadData = (data: any) => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: SET_CHANNEL_READ,
      payload: data,
    });
  } catch (error) {}
};
export const resetReadData = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: RESET_CHANNEL_READ,
    });
  } catch (error) {}
};
