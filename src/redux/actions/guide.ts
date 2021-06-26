import { Dispatch } from 'redux';
import * as API from 'src/api/guide';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/guide';

const msg: string = 'Something went wrong!';

export const getGuideList = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_GUIDE_LIST_REQUEST });
    // console.log('store', store.common.isGuest);
    const data = await API.getGuideList(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_GUIDE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_GUIDE_LIST_ERROR,
      payload: error,
    });
  }
};

export const getLoanProgram = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_LOAN_PROGRAM_REQUEST });
    const data = await API.getLoanProgram(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_LOAN_PROGRAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_LOAN_PROGRAM_ERROR,
      payload: error,
    });
  }
};

export const getLoanProgramDetail = (id: number) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_LOAN_PROGRAM_DETAIL_REQUEST });
    const data = await API.getLoanProgramDetail(id, store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_LOAN_PROGRAM_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_LOAN_PROGRAM_DETAIL_ERROR,
      payload: error,
    });
  }
};

export const getLearningCenter = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_LEARNING_CENTER_REQUEST });
    const data = await API.getLearningCenter(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_LEARNING_CENTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_LEARNING_CENTER_ERROR,
      payload: error,
    });
  }
};

export const getLearningCenterDetail = (id: number) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_LEARNING_CENTER_DETAIL_REQUEST });
    const data = await API.getLearningCenterDetail(id, store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_LEARNING_CENTER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_LEARNING_CENTER_DETAIL_ERROR,
      payload: error,
    });
  }
};

export const getChecklist = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_CHECKLIST_REQUEST });
    const data = await API.getChecklist(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_CHECKLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_CHECKLIST_ERROR,
      payload: error,
    });
  }
};

export const getPrivacy = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_PRIVACY_REQUEST });
    const data = await API.getPrivacy(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_PRIVACY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_PRIVACY_ERROR,
      payload: error,
    });
  }
};

export const getDisclaimer = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DISCLAIMER_REQUEST });
    const data = await API.getDisclaimer(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_DISCLAIMER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DISCLAIMER_ERROR,
      payload: error,
    });
  }
};

export const updateChecklist = (req: any, mainData: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.UPDATE_CHECKLIST_REQUEST });
    const data = await API.updateChecklist(req);
    // dispatch({
    //   type: TYPE.UPDATE_CHECKLIST_SUCCESS,
    //   payload: mainData,
    // });
    dispatch({
      type: TYPE.UPDATE_CHECKLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log('Error', error);
    dispatch({
      type: TYPE.UPDATE_CHECKLIST_ERROR,
      payload: error,
    });
  }
};

export const getGlossarylist = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_GLOSSARYLIST_REQUEST });
    const data = await API.getGlossarylist(store?.common?.isGuest);
    dispatch({
      type: TYPE.GET_GLOSSARYLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_GLOSSARYLIST_ERROR,
      payload: error,
    });
  }
};
