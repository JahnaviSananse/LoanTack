import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import * as API from 'src/api/dashboard_bo';
import * as CONSTANT from 'src/constants/constant';
import * as ROUTER from 'src/routes/router';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/dashboard_bo';
import { ActionCreators } from './index';
//get color scheme
export const getColorScheme = (redirect?: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_COLOR_SCHEME_REQUEST });
    const data = await API.getColorScheme();
    //let finalData = data.data.data;
    console.log('COLOR RED', redirect);

    if (data.data) {
      dispatch({
        type: TYPE.GET_COLOR_SCHEME_SUCCESS,
        payload: data.data.data,
      });
      if (redirect) {
        ROUTER.replace(redirect, { isFirst: true });
      }

      // setTimeout(() => {
      //   ROUTER.replace("LoanTackTabsBO", { isFirst: true });
      // }, 100)
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_COLOR_SCHEME_ERROR,
      payload: error,
    });
  }
};

export const getMainList = (req: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_MAIN_LIST_REQUEST });

    const data = await API.getMainList();
    //console.log("Response", data);
    if (data.data) {
      let finalData = data.data.data;
      //finalData = Object.values(finalData).filter((fvalue) => fvalue.type === 1);
      dispatch({
        type: TYPE.GET_MAIN_LIST_SUCCESS,
        payload: finalData,
      });
      // ActionCreators.getColorScheme();
    }
  } catch (error) {
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({
      type: TYPE.GET_MAIN_LIST_ERROR,
      payload: error,
    });
  }
};

export const getDashboardList = (req: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DASHBOARD_LIST_REQUEST });
    const data = await API.getDashboardList();
    if (data.data) {
      console.log('DList Data', data.data);
      dispatch({
        type: TYPE.GET_DASHBOARD_LIST_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log('Direct Error');
    AsyncStorage.setItem(CONSTANT.IS_TOKEN_AVAILABLE, 'no');
    dispatch({
      type: TYPE.GET_DASHBOARD_LIST_ERROR,
      payload: error,
    });
  }
};
export const getAssignedLO = (req: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_ASSIGNED_LO_REQUEST });
    const data = await API.getAssignedLO();
    console.log('ASSIGNEDLO_DATA', data);
    if (data.data) {
      dispatch({
        type: TYPE.GET_ASSIGNED_LO_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.ASSIGN_LO_ERROR,
      payload: error,
    });
  }
};
export const getLODetails = (req: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DETAIL_REQUEST });
    const data = await API.getLODetails();
    console.log('LODETAIL_DATA', data);
    dispatch({
      type: TYPE.GET_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DETAIL_ERROR,
      payload: error,
    });
  }
};
export const getLOOfficers = (req: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_LOOFFICER_REQUEST });
    const data = await API.getLOOfficers();
    console.log('LO_DATA', data);
    dispatch({
      type: TYPE.GET_LOOFFICER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_LOOFFICER_ERROR,
      payload: error,
    });
  }
};

export const assignLO = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.ASSIGN_LO_REQUEST });
    const data = await API.AssignLO(request);
    console.log('ASSIGN', data);
    if (data.data) {
      dispatch(ActionCreators.getAssignedLO());
      dispatch(ActionCreators.getColorScheme());
      dispatch(ActionCreators.getMainList());
      dispatch(ActionCreators.getDashboardList());
      setTimeout(() => {
        dispatch({
          type: TYPE.ASSIGN_LO_SUCCESS,
          payload: data,
        });
      }, 200);
    }
  } catch (error) {
    dispatch({
      type: TYPE.ASSIGN_LO_ERROR,
      payload: error,
    });
  }
};

export const clearAssignData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.ASSIGN_LO_CLEAR,
  });
};

export const setTabbarTabs = (request: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.SET_TABBAR_TABS,
    payload: request,
  });
};
