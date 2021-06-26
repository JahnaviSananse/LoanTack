import * as TYPE from '../types/calculation';

const initialState = {
  loading: false,
  types: [],
  defaultData: {},
  savedData: [],
  calculatedData: {},
  conventionalError: '',
  isSuccess: false,
  jumboError: '',
  usdaError: '',
  vaError: '',
  typesError: '',
  afdError: '',
  county: [],
  conventionalRefinanceError: '',
  jumboRefinanceError: '',
  usdaRefinanceError: '',
  vaRefinanceError: '',
  fhaRefinanceError: '',
  sirError: '',
};

export default (
  state = initialState,
  action: IReduxAction,
): typeof initialState => {
  switch (action.type) {
    //get default
    case TYPE.GET_DEFAULT_REQUEST: {
      return {
        ...state,
        loading: true,
        defaultData: {},
        isSuccess: false,
        conventionalError: '',
        jumboError: '',
        usdaError: '',
        vaError: '',
        typesError: '',
        afdError: '',
        sirError: '',
      };
    }
    case TYPE.GET_DEFAULT_SUCCESS: {
      return {
        ...state,
        loading: false,
        defaultData: action.payload.data.data,
        isSuccess: false,
        conventionalError: '',
        jumboError: '',
        usdaError: '',
        vaError: '',
        afdError: '',
        sirError: '',
      };
    }
    case TYPE.GET_DEFAULT_ERROR: {
      return {
        ...state,
        loading: false,
        defaultData: {},
        isSuccess: false,
        conventionalError: '',
        jumboError: '',
        usdaError: '',
        vaError: '',
        afdError: '',
      };
    }
    case TYPE.DEFAULT_DATA_CLEAR: {
      return {
        ...state,
        loading: false,
        defaultData: {},
        isSuccess: false,
        conventionalError: '',
        jumboError: '',
        usdaError: '',
        vaError: '',
        fhaRefinanceError: '',
        conventionalRefinanceError: '',
        jumboRefinanceError: '',
        usdaRefinanceError: '',
        vaRefinanceError: '',
        sirError: '',
      };
    }
    //get types
    case TYPE.GET_TYPES_REQUEST: {
      return {
        ...state,
        loading: true,
        types: [],
        defaultData: {},
        typesError: '',
      };
    }
    case TYPE.GET_TYPES_SUCCESS: {
      return {
        ...state,
        loading: false,
        types: action.payload.data.data,
        defaultData: {},
        typesError: '',
      };
    }
    case TYPE.GET_TYPES_ERROR: {
      return {
        ...state,
        loading: false,
        types: [],
        defaultData: {},
        typesError: action.payload,
      };
    }
    //get saved calculation
    case TYPE.GET_SAVED_REQUEST: {
      return {
        ...state,
        loading: true,
        savedData: [],
      };
    }
    case TYPE.GET_SAVED_SUCCESS: {
      let temp = action.payload.data.data.reverse();
      return {
        ...state,
        loading: false,
        savedData: temp,
      };
    }
    case TYPE.GET_SAVED_ERROR: {
      return {
        ...state,
        loading: false,
        savedData: [],
      };
    }
    //get saved detail calculation
    case TYPE.GET_SAVED_DETAIL_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
      };
    }
    case TYPE.GET_SAVED_DETAIL_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
      };
    }
    case TYPE.GET_SAVED_DETAIL_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
      };
    }
    //get county
    case TYPE.GET_COUNTY_REQUEST: {
      return {
        ...state,
        loading: true,
        county: [],
      };
    }
    case TYPE.GET_COUNTY_SUCCESS: {
      return {
        ...state,
        loading: false,
        county: action.payload.data.data,
      };
    }
    case TYPE.GET_COUNTY_ERROR: {
      return {
        ...state,
        loading: false,
        county: [],
      };
    }
    //save calculation
    case TYPE.SAVE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        defaultData: {},
        //savedData: [],
      };
    }
    case TYPE.SAVE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        defaultData: {},
        //savedData: action.payload.data.data,
      };
    }
    case TYPE.SAVE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        defaultData: {},
        //savedData: [],
      };
    }

    //FHA calculation
    case TYPE.FHA_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
      };
    }
    case TYPE.FHA_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
      };
    }
    case TYPE.FHA_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
      };
    }

    //conventional calculation
    case TYPE.CONVENTIONAL_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        conventionalError: '',
      };
    }
    case TYPE.CONVENTIONAL_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        conventionalError: '',
      };
    }
    case TYPE.CONVENTIONAL_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        conventionalError: action.payload,
      };
    }

    //jumbo calculation
    case TYPE.JUMBO_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        jumboError: '',
      };
    }
    case TYPE.JUMBO_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        jumboError: '',
      };
    }
    case TYPE.JUMBO_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        jumboError: action.payload,
      };
    }
    //usda calculation
    case TYPE.USDA_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        usdaError: '',
      };
    }
    case TYPE.USDA_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        usdaError: '',
      };
    }
    case TYPE.USDA_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        usdaError: action.payload,
      };
    }

    //va calculation
    case TYPE.VA_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        vaError: '',
      };
    }
    case TYPE.VA_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        vaError: '',
      };
    }
    case TYPE.VA_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        vaError: action.payload,
      };
    }

    //affordability calculation
    case TYPE.AFD_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        afdError: '',
      };
    }
    case TYPE.AFD_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        afdError: '',
      };
    }
    case TYPE.AFD_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        afdError: action.payload,
      };
    }

    //Refinance
    //fha calculation
    case TYPE.FHA_REFINANCE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        fhaRefinanceError: '',
      };
    }
    case TYPE.FHA_REFINANCE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        fhaRefinanceError: '',
      };
    }
    case TYPE.FHA_REFINANCE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        fhaRefinanceError: action.payload,
      };
    }

    //conventional calculation
    case TYPE.CONVETIONAL_REFINANCE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        conventionalRefinanceError: '',
      };
    }
    case TYPE.CONVETIONAL_REFINANCE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        conventionalRefinanceError: '',
      };
    }
    case TYPE.CONVETIONAL_REFINANCE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        conventionalRefinanceError: action.payload,
      };
    }

    //jumbo calculation
    case TYPE.JUMBO_REFINANCE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        jumboRefinanceError: '',
      };
    }
    case TYPE.JUMBO_REFINANCE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        jumboRefinanceError: '',
      };
    }
    case TYPE.JUMBO_REFINANCE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        jumboRefinanceError: action.payload,
      };
    }

    //usda calculation
    case TYPE.USDA_REFINANCE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        usdaRefinanceError: '',
      };
    }
    case TYPE.USDA_REFINANCE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        usdaRefinanceError: '',
      };
    }
    case TYPE.USDA_REFINANCE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        usdaRefinanceError: action.payload,
      };
    }

    //va calculation
    case TYPE.VA_REFINANCE_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        vaRefinanceError: '',
      };
    }
    case TYPE.VA_REFINANCE_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        vaRefinanceError: '',
      };
    }
    case TYPE.VA_REFINANCE_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        vaRefinanceError: action.payload,
      };
    }

    //should i refinance
    case TYPE.SIR_CALCULATION_REQUEST: {
      return {
        ...state,
        loading: true,
        calculatedData: {},
        sirError: '',
      };
    }
    case TYPE.SIR_CALCULATION_SUCCESS: {
      return {
        ...state,
        loading: false,
        calculatedData: action.payload.data.data,
        sirError: '',
      };
    }
    case TYPE.SIR_CALCULATION_ERROR: {
      return {
        ...state,
        loading: false,
        calculatedData: {},
        sirError: action.payload,
      };
    }
    default:
      return state;
  }
};
