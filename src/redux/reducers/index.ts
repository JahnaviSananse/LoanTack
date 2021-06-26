import { combineReducers } from 'redux';
import AuthReducer from './auth';
import CalculationReducer from './calculation';
import CallbackReducer from './callback';
import CommonReducer from './common';
import Dashboard_boReducer from './dashboard_bo';
import DocumentReducer from './document';
import GuideReducer from './guide';
import ModalReducer from './modal';
import ScanReducer from './scan';
import UserReducer from './user';
import MessageReducer from './message';

const reducers = {
  auth: AuthReducer,
  common: CommonReducer,
  modal: ModalReducer,
  user: UserReducer,
  dashboard_bo: Dashboard_boReducer,
  scan: ScanReducer,
  guide: GuideReducer,
  callback: CallbackReducer,
  calculation: CalculationReducer,
  document: DocumentReducer,
  message: MessageReducer,
};

const combinedReducer = combineReducers(reducers);

export interface IReduxState {
  auth: ReturnType<typeof AuthReducer>;
  common: ReturnType<typeof CommonReducer>;
  modal: ReturnType<typeof ModalReducer>;
  user: ReturnType<typeof UserReducer>;
  dashboard_bo: ReturnType<typeof Dashboard_boReducer>;
  scan: ReturnType<typeof ScanReducer>;
  guide: ReturnType<typeof GuideReducer>;
  callback: ReturnType<typeof CallbackReducer>;
  calculation: ReturnType<typeof CalculationReducer>;
  document: ReturnType<typeof DocumentReducer>;
  message: ReturnType<typeof MessageReducer>;
}

export default combinedReducer;
