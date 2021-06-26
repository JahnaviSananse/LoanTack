import { NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}
export function replace(name: string, params: any) {
  navigationRef.current?.reset({
    routes: [
      {
        name: name,
      },
    ],
  });
}
export function goBack() {
  return navigationRef.current?.goBack();
}
