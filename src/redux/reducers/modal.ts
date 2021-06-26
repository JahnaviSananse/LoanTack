import {IReduxState} from './index';
import * as TYPES from '../types/modal';
import * as IMAGES from 'src/assets/images';

const initialState = {
  isInfo: false,
  title: '',
  description: '',
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    case TYPES.UPDATE_INFO_MODAL: {
      return {
        ...state,
        isInfo: action.payload.isInfo,
        title: action.payload.title,
        description: action.payload.description,
      };
    }
    default:
      return state;
  }
};
