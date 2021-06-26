import * as TYPE from '../types/message';

const initialState = {
  readChannelData: [] as any,
};
export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    case TYPE.RESET_CHANNEL_READ: {
      return {
        ...state,
        readChannelData: [],
      };
    }
    case TYPE.SET_CHANNEL_READ: {
      let data = action.payload;

      let currentData = [] as any;
      state.readChannelData.map((item: any) => {
        if (item.chatId !== data.chatId) {
          currentData.push(item);
        }
      });
      currentData.push(data);
      return {
        ...state,
        readChannelData: currentData,
      };
    }
    default:
      return state;
  }
};
