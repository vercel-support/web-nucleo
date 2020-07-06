import { DefaultTheme } from 'styled-components';

const theme: DefaultTheme = {
  colors: {
    primary: '#F94F28',
    secondary: '#332E31',
    shadow: '#F2F2F2',
  },

  font: {
    family: 'Heebo',
    style: 'normal',
  },

  breakpoints: {
    xs: '(max-width: 480px)',
    sm: '(min-width: 481px) and (max-width: 768px)',
    md: '(min-width: 769px) and (max-width: 1024px)',
    lg: '(min-width: 1025px) and (max-width: 1200px)',
    xl: '(min-width: 1201px)',

    // small and down
    smd: '(max-width: 768px)',
    mdd: '(max-width: 1024px)',
    lgd: '(max-width: 1200px)',

    // small and up
    smu: '(min-width: 481px)',
    mdu: '(min-width: 769px)',
    lgu: '(min-width: 1025px)',
  },

  borderRadius: '2px',
};

export default theme;
