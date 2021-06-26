import { Dispatch } from 'redux';
import * as API from 'src/api/calculation';
import * as ROUTER from 'src/routes/router';
import { IReduxState } from '../reducers';
import * as TYPE from '../types/calculation';

const msg: string = 'Something went wrong!';

export const getDefault = (type: string) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_DEFAULT_REQUEST });
    const data = await API.getDefault(type);
    dispatch({
      type: TYPE.GET_DEFAULT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_DEFAULT_ERROR,
      payload: error,
    });
  }
};

export const clearDefaultData = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.DEFAULT_DATA_CLEAR,
  });
};

export const getTypes = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_TYPES_REQUEST });
    const data = await API.getTypes();
    if (data.data) {
      dispatch({
        type: TYPE.GET_TYPES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_TYPES_ERROR,
      payload: error,
    });
  }
};

export const getSavedCalculation = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_SAVED_REQUEST });
    const data = await API.getSavedCalculation();
    dispatch({
      type: TYPE.GET_SAVED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_SAVED_ERROR,
      payload: error,
    });
  }
};

export const getSavedCalculationDetail = (id: number) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_SAVED_DETAIL_REQUEST });
    const data = await API.getSavedCalculationDetail(id);
    dispatch({
      type: TYPE.GET_SAVED_DETAIL_SUCCESS,
      payload: data,
    });
    if (data.data && data.data.data) {
      if (data.data.data?.could_save !== undefined) {
        ROUTER.navigate('CalculatorScreen', {
          screen: 'RefinanceResult',
          params: { isBack: true, isSaved: true, iType: 'saved_calculation' },
        });
      } else {
        ROUTER.navigate('CalculatorScreen', {
          screen: 'ResultBO',
          params: { isBack: true, isSaved: true, iType: 'saved_calculation' },
        });
      }
    }
  } catch (error) {
    dispatch({
      type: TYPE.GET_SAVED_DETAIL_ERROR,
      payload: error,
    });
  }
};

export const getCounty = (id: number) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.GET_COUNTY_REQUEST });
    const data = await API.getCounty(id);
    dispatch({
      type: TYPE.GET_COUNTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.GET_COUNTY_ERROR,
      payload: error,
    });
  }
};

export const saveCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.SAVE_CALCULATION_REQUEST });
    const data = await API.saveCalculation(request);
    dispatch({
      type: TYPE.SAVE_CALCULATION_SUCCESS,
      payload: data,
    });
    if (data) {
      setTimeout(() => {
        ROUTER.navigate('SavedCalculationScreen', {
          screen: 'SavedCalculationBO',
          params: { isBack: true },
        });
        // ROUTER.navigationRef?.current?.reset({
        //   index: 1,
        //   // routes: [
        //   //   {
        //   //     // name: 'SavedCalculationScreen',
        //   //     params: { isBack: true },
        //   //   },
        //   // ],
        //   action: [
        //     ROUTER.navigate('SavedCalculationScreen', {
        //       screen: 'SavedCalculationBO',
        //       params: { isBack: true },
        //     }),
        //   ],
        // });
      }, 500);
    }
  } catch (error) {
    dispatch({
      type: TYPE.SAVE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const clearSaveCalculation = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.SAVE_CALCULATION_DATA_CLEAR,
  });
};

export const fhaCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.FHA_CALCULATION_REQUEST });
    const data = await API.fhaCalculation(request);
    dispatch({
      type: TYPE.FHA_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'fhaPurchase' });
  } catch (error) {
    dispatch({
      type: TYPE.FHA_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const clearFHACalculation = () => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  dispatch({
    type: TYPE.FHA_CALCULATION_DATA_CLEAR,
  });
};

//conventionalCalculation
export const conventionalCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.CONVENTIONAL_CALCULATION_REQUEST });
    const data = await API.conventionalCalculation(request);
    dispatch({
      type: TYPE.CONVENTIONAL_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'conventionalPurchase' });
  } catch (error) {
    dispatch({
      type: TYPE.CONVENTIONAL_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//jumboCalculation
export const jumboCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.JUMBO_CALCULATION_REQUEST });
    const data = await API.jumboCalculation(request);
    dispatch({
      type: TYPE.JUMBO_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'jumboPurchase' });
  } catch (error) {
    dispatch({
      type: TYPE.JUMBO_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//usdaCalculation
export const usdaCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.USDA_CALCULATION_REQUEST });
    const data = await API.usdaCalculation(request);
    dispatch({
      type: TYPE.USDA_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'usdaPurchase' });
  } catch (error) {
    dispatch({
      type: TYPE.USDA_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//vaCalculation
export const vaCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.VA_CALCULATION_REQUEST });
    const data = await API.vaCalculation(request);
    dispatch({
      type: TYPE.VA_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'vaPurchase' });
  } catch (error) {
    dispatch({
      type: TYPE.VA_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//affordability Calculation
export const affordabilityCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.AFD_CALCULATION_REQUEST });
    const data = await API.affordabilityCalculation(request);
    dispatch({
      type: TYPE.AFD_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('AffordabilityResult', { iType: 'affordability' });
  } catch (error) {
    dispatch({
      type: TYPE.AFD_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//Refinance

export const fhaRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.FHA_REFINANCE_CALCULATION_REQUEST });
    const data = await API.fhaRefinanceCalculation(request);
    dispatch({
      type: TYPE.FHA_REFINANCE_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'fhaRefinance' });
  } catch (error) {
    dispatch({
      type: TYPE.FHA_REFINANCE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const convetionalRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.CONVETIONAL_REFINANCE_CALCULATION_REQUEST });
    const data = await API.conventionalRefinanceCalculation(request);
    dispatch({
      type: TYPE.CONVETIONAL_REFINANCE_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'convetionalRefinance' });
  } catch (error) {
    dispatch({
      type: TYPE.CONVETIONAL_REFINANCE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const jumboRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.JUMBO_REFINANCE_CALCULATION_REQUEST });
    const data = await API.jumboRefinanceCalculation(request);
    dispatch({
      type: TYPE.JUMBO_REFINANCE_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'jumboRefinance' });
  } catch (error) {
    dispatch({
      type: TYPE.JUMBO_REFINANCE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const usdaRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.USDA_REFINANCE_CALCULATION_REQUEST });
    const data = await API.usdaRefinanceCalculation(request);
    dispatch({
      type: TYPE.USDA_REFINANCE_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'usdaRefinance' });
  } catch (error) {
    dispatch({
      type: TYPE.USDA_REFINANCE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

export const vaRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.VA_REFINANCE_CALCULATION_REQUEST });
    const data = await API.vaRefinanceCalculation(request);
    dispatch({
      type: TYPE.VA_REFINANCE_CALCULATION_SUCCESS,
      payload: data,
    });
    ROUTER.navigate('ResultBO', { iType: 'vaRefinance' });
  } catch (error) {
    dispatch({
      type: TYPE.VA_REFINANCE_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//should i refinance calculation
export const shouldIRefinanceCalculation = (request: Object) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.SIR_CALCULATION_REQUEST });
    const data = await API.shouldIRefinanceCalculation(request);
    if (data.data) {
      dispatch({
        type: TYPE.SIR_CALCULATION_SUCCESS,
        payload: data,
      });
      ROUTER.navigate('RefinanceResult', {});
    }
  } catch (error) {
    dispatch({
      type: TYPE.SIR_CALCULATION_ERROR,
      payload: error,
    });
  }
};

//delete
export const deleteCalculation = (id: any) => async (
  dispatch: Dispatch,
  store: IReduxState,
) => {
  try {
    dispatch({ type: TYPE.DELETE_CALCULATION_REQUEST });
    const data = await API.deleteCalculation(id);
    dispatch({
      type: TYPE.DELETE_CALCULATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TYPE.DELETE_CALCULATION_ERROR,
      payload: error,
    });
  }
};
