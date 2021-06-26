import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import * as API from 'src/api/auth';
import * as CONSTANT from 'src/constants/constant';
import * as ROUTER from 'src/routes/router';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/auth';
import { ActionCreators } from './index';
import { resetReadData } from './message';

export const getInfoMessage = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_INFO_MESSAGE_REQUEST });
    const data = await API.getInfoMessage();
    console.log('Info Message', data);
    if (data.data) {
      dispatch({
        type: TYPE.GET_INFO_MESSAGE_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_INFO_MESSAGE_FAILURE,
      payload: error,
    });
  }
};

export const doLogin = (email: string, password: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({ type: TYPE.LOGIN_REQUEST });
    const data = await API.login({ email, password });
    if (data && data.data.email_verified) {
      //@ts-ignore
      dispatch(ActionCreators.getColorScheme());
      data.email = email;
      AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'yes');
      AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(data));
      AsyncStorage.setItem(CONSTANT.ACCESS_TOKEN, data.data.token.access_token);
      AsyncStorage.setItem(
        CONSTANT.REFRESH_TOKEN,
        data.data.token.refresh_token,
      );
      setTimeout(() => {
        dispatch({
          type: TYPE.LOGIN_SUCCESS,
          payload: data,
        });
      }, 500);
    } else {
      dispatch({
        type: TYPE.LOGIN_SUCCESS,
        payload: data,
      });
      ROUTER.navigate('VerificationCode', { email: email, verify: true });
    }
  } catch (error) {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({
      type: TYPE.LOGIN_ERROR,
      payload: error,
    });
  }
};

export const setLoginData = (data: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.LOGIN_SUCCESS,
    payload: data,
  });
};

export const doSignup = (request: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  console.log('Signup Request', request);
  try {
    dispatch({ type: TYPE.SIGNUP_REQUEST });
    const data = await API.signup(request);
    dispatch({
      type: TYPE.SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.SIGNUP_ERROR,
      payload: error,
    });
  }
};
export const clearSignupData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.SIGNUP_DATA_CLEAR,
  });
};

export const clearForgotData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.FORGOT_PASSWORD_CLEAR,
  });
};

export const clearLoginData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
  dispatch({
    type: TYPE.LOGIN_DATA_CLEAR,
  });
};
export const resendCode = (request: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.RESEND_REQUEST });
    const data = await API.resendCode(request);
    dispatch({
      type: TYPE.RESEND_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.RESEND_ERROR,
      payload: error,
    });
  }
};
export const verifyCode = (request: Object, param: boolean) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({ type: TYPE.VERIFY_REQUEST });
    console.log('Request', request);
    const data = await API.verify(request);
    data.email = request.email;

    if (!param) {
      dispatch({
        type: TYPE.VERIFY_SUCCESS_SIGNUP,
        payload: data,
      });
      if (data && data.data.email_verified) {
        dispatch(ActionCreators.getColorScheme('LoanTackTabsBO'));
        AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'yes');
        AsyncStorage.setItem(CONSTANT.USER_DATA, JSON.stringify(data));
        AsyncStorage.setItem(
          CONSTANT.ACCESS_TOKEN,
          data.data.token.access_token,
        );
        AsyncStorage.setItem(
          CONSTANT.REFRESH_TOKEN,
          data.data.token.refresh_token,
        );
      }
    } else {
      dispatch({
        type: TYPE.VERIFY_SUCCESS,
        payload: data,
      });
    }

    /*if (request.type === 'VERIFY') {
      ROUTER.replace('Login', {});
    } else {
      ROUTER.navigate('ResetPassword', {});
    }*/
    // if (data.data.code) {
    //   // ROUTER.navigate('ResetPassword', {});
    // }
  } catch (error) {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({
      type: TYPE.VERIFY_ERROR,
      payload: error,
    });
  }
};
export const logout_user = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.LOGOUT_REQUEST });
    const data = await API.logout();
    if (data) {
      AsyncStorage.setItem(CONSTANT.DEEPLINK_ID, '');
      AsyncStorage.setItem(CONSTANT.DEEPLINK_URL, '');
      AsyncStorage.setItem(CONSTANT.IS_DEEPLINK_DONE, 'false');
      AsyncStorage.removeItem(CONSTANT.USER_DATA);
      AsyncStorage.removeItem(CONSTANT.ACCESS_TOKEN);
      AsyncStorage.removeItem(CONSTANT.REFRESH_TOKEN);

      //@ts-ignore
      dispatch(resetReadData());
      ROUTER.replace('Login', {});
    }
    dispatch({
      type: TYPE.LOGOUT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    AsyncStorage.removeItem(CONSTANT.USER_DATA);
    AsyncStorage.removeItem(CONSTANT.ACCESS_TOKEN);
    AsyncStorage.removeItem(CONSTANT.REFRESH_TOKEN);
    ROUTER.replace('Login', {});
    //@ts-ignore
    dispatch(resetReadData());
    dispatch({
      type: TYPE.LOGOUT_ERROR,
      payload: error,
    });
  }
};
export const forgotPassword_user = (request: object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.FORGOT_PASSWORD_REQUEST });
    const data = await API.forgotPassword({ email: request });
    dispatch({
      type: TYPE.FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
    if (data) {
      setTimeout(() => {
        ROUTER.navigate('VerificationCode', { email: request });
      }, 100);
    }
  } catch (error) {
    dispatch({
      type: TYPE.FORGOT_PASSWORD_ERROR,
      payload: error,
    });
  }
};
export const resetPassword_user = (request: object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.RESET_PASSWORD_REQUEST });
    const data = await API.resetPassword(request);
    dispatch({
      type: TYPE.RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.RESET_PASSWORD_ERROR,
      payload: error,
    });
  }
};
export const clearRedirect = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.RESET_PASSWORD_SUCCESS,
  });
};
