import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type MoreStackParams = {
  Profile: undefined;
  ViewOffer: undefined;

};

type MoreStackNavProps<T extends keyof MoreStackParams> = {
  navigation: StackNavigationProp<MoreStackParams, T>;
  route: RouteProp<MoreStackParams, T>;
};
