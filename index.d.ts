import * as React from 'react';
declare global {
    interface IReduxAction {
        type: string;
        payload: any;
    }
}
