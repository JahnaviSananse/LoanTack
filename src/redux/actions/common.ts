import { Dispatch } from 'redux';
import * as ROUTER from 'src/routes/router';
import { IReduxState } from '../reducers';
import * as TYPES from '../types/common';

export const setTheme = (color: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_THEME,
    payload: color,
  });
};

export const setGuest = (val: boolean) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_GUEST,
    payload: val,
  });
};

export const setCurrentDate = (date: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_CURRENT_DATE,
    payload: date,
  });
};

export const setLoaderTrue = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_LOADER_TRUE,
  });
};

export const clearLoader = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.CLEAR_LOADER,
  });
};

export const setDefaultTheme = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_DEFAULT_THEME,
    payload: '',
  });
};

export const getTheme = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.GET_THEME,
    payload: '',
  });
};

export const toggleSettingOption = (value: boolean) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_SETTING_OPENS,
    payload: value,
  });
};

export const setScanRedirect = (value: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SCAN_REDIRECT,
    payload: value,
  });
};
export const OpenValidationAlert = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SHOW_VALIDATION_ALERT,
    payload: request,
  });
};
export const closeModal = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.CLOSE_VALIDATION_ALERT,
    payload: false,
  });
};

export const setCutomLink = (request: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_CUSTOM_LINK,
    payload: request,
  });
};

export const setScanImageData = (request: any, isDelete: boolean) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_SCAN_IMAGES,
    payload: request,
  });
  if (!isDelete) {
    setTimeout(() => {
      // ROUTER.replace('ScanedDocumentBO', { file: '', isBack: true });
      ROUTER.navigationRef?.current?.reset({
        index: 2,
        routes: [
          {
            name: 'ScanedDocumentBO',
            params: { file: '', isBack: true },
          },
        ],
      });
    }, 300);
  }
};

export const setFileName = (request: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.SET_FILE_NAME,
    payload: request,
  });
};

export const clearScanImageData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPES.CLEAR_SCAN_IMAGES,
  });
};
