import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DashboardLO from 'src/screens/app/DashboardLO';
import NotificationLO from 'src/screens/app/NotificationLO';
import SelectLoanOfficerBO from 'src/screens/app/SelectLoanOfficerBO';

const Stack = createStackNavigator();

export const DashboardStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {/* <Stack.Screen name="ScanStatusBO" component={ScanStatusBO} /> */}
    {/* <Stack.Screen name="ScanBO" component={ScanBO} /> */}
    {/* <Stack.Screen name="RefinanceResult" component={RefinanceResult} /> */}
    {/* <Stack.Screen name="AffordabilityResult" component={AffordabilityResult} /> */}

    {/* <Stack.Screen name="ResultBO" component={ResultBO} /> */}
    {/* <Stack.Screen name="Amortization" component={Amortization} /> */}
    {/* <Stack.Screen name="ResultDetailBO" component={ResultDetailBO} /> */}
    {/* <Stack.Screen name="SavedCalculationBO" component={SavedCalculationBO} /> */}

    {/* <Stack.Screen name="DashboardBO" component={DashboardBO} />
    <Stack.Screen name="BioBO" component={BioBO} /> */}

    <Stack.Screen name="DashboardLO" component={DashboardLO} />
    <Stack.Screen name="SelectLoanOfficerBO" component={SelectLoanOfficerBO} />
    <Stack.Screen name="NotificationLO" component={NotificationLO} />
  </Stack.Navigator>
);
