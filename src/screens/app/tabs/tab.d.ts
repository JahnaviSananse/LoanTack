import { Route } from '@react-navigation/native';

type AppParamList = {
  Home: undefined;
  Search: undefined;
  Notification: undefined;
  Profile: undefined;
  // More: undefined;
};

export type AppRouteProp = Pick<
  Route<'Home' | 'Search' | 'Notifications' | 'Profile'>,
  'key' | 'name' | 'params'
>;
