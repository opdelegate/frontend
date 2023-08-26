import { extendTheme } from '@chakra-ui/react';

export const OPDELEGATES_RED = '#ff0420';
export const OPDELEGATES_PURPLE = '#9205fd';

const theme = extendTheme({
  components: {
    // Radio: adjustantRadioTheme,
    // Tabs: adjustantTabTheme,
    // MultiSelect: MultiSelectTheme,
    // Button: adjustantButtonTheme,
    // Checkbox: adjustantCheckboxTheme,
    // Link: adjustantSelectedLinkTheme,
  },
  colors: {
    opdelegatesRed: OPDELEGATES_RED,
    opdelegatesPurple: OPDELEGATES_PURPLE,
  },
});

export default theme;
