export const THEME = {
  WHITE: '#FFFFFF',
  GREEN: '#4FB263',
  CEll_BG: '#F7F8FA',
  BLACK: '#1F2428',
  LIGHT_GRAY: '#8D8E90',
  SEPARETOR: '#CACACA',
  TAB_BLACK: '#1F2428',
  TAB_ACTIVE: '#4FB263',
  TAB_DEACTIVE: '#8D8E90',
  RED: '#EB4949',
  TITLE_GRAY: '#8D8E90',
  TRACK_COLOR_TRUE: '#4FB263',
  TRACK_COLOR_FALSE: '#CACACA',
  LIGHT_BLUE: '#F5F6FA',
  THUMB_COLOR: '#D4D5DB',
  YELLOW: '#F4C427',
  SKY_BLUE: '#1fb0f0',
  DARK_BLUE: '#5880c9',
};

let THEME_COLOR = '#4FB263';
let THEME_COLOR_LIGHT = '#BAFAC7';
let TAB_CONTAINER_COLOR = '#1F2428';
let SECONDARY_FONT = '#FFFFFF';
export const setTheme = (
  color: string,
  lightColor: string,
  tabColor: string,
  secondaryFontColor: string,
) => {
  THEME_COLOR = color;
  THEME_COLOR_LIGHT = lightColor;
  TAB_CONTAINER_COLOR = tabColor;
  SECONDARY_FONT = secondaryFontColor;
};

export const setDefaultTheme = () => {
  THEME_COLOR = '#4FB263';
  THEME_COLOR_LIGHT = '#BAFAC7';
  TAB_CONTAINER_COLOR = '#1F2428';
  SECONDARY_FONT = '#FFFFFF';
};

export const getTheme = () => {
  return THEME_COLOR;
};

export const getLightTheme = () => {
  return THEME_COLOR_LIGHT;
};

export const getTabContainerColor = () => {
  return TAB_CONTAINER_COLOR;
};

export const getSecondaryFontColor = () => {
  return SECONDARY_FONT;
};
