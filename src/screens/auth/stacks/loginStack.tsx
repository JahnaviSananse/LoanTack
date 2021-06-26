import { createStackNavigator } from '@react-navigation/stack';
import { Router } from '../../../routes/router';

const Stack = createStackNavigator();

export const Login = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.Login} component={Login} />
  </Stack.Navigator>
);

export const Splash = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.Splash} component={Splash} />
  </Stack.Navigator>
);

export const ForgotPassword = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.ForgotPassword} component={ForgotPassword} />
  </Stack.Navigator>
);

export const ResetPassword = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.ResetPassword} component={ResetPassword} />
  </Stack.Navigator>
);


export const Signup = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.Signup} component={Signup} />
  </Stack.Navigator>
);

export const VerificationCode = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.VerificationCode} component={VerificationCode} />
  </Stack.Navigator>
);

export const Walkthrough = () => (
  <Stack.Navigator>
    <Stack.Screen name={Router.Walkthrough} component={Walkthrough} />
  </Stack.Navigator>
);

