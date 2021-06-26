export interface tabbarResponse {
    username: string;
    password: string;
}
/**
 *  redux type
 */
export const SET_TABBAR_TABS = 'SET_TABBAR_TABS';
/**
 * constants
 */
export const AUTH_TOKEN_INFO = 'AUTH_TOKEN_INFO';

interface settabbarAction {
    type: typeof SET_TABBAR_TABS;
    payload: tabbarResponse;
}
export type AuthActionType =
    | settabbarAction

