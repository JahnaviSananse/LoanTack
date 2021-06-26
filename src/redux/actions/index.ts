// export * as Authntication from './auth';
import * as authActions from './auth';
import * as commonActions from './common';
import * as dashboardActions from './dashboard_bo';
import * as modalActions from './modal';
import * as messageActions from './message';

export const ActionCreators = {
  ...authActions,
  ...commonActions,
  ...modalActions,
  ...dashboardActions,
  ...messageActions,
};
