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
    h1: `
    @media (max-width: 480px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 52px;
      line-height: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: 1025px) and (max-width: 1200px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: 1201px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    `,
    h2: `
    @media (max-width: 480px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: 1025px) and (max-width: 1200px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: 1201px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    `,
    p1: `
    @media (max-width: 480px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: 1025px) and (max-width: 1200px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: 1201px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    `,
    p2: `
    @media (max-width: 480px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 100%;
    }
    @media (min-width: 481px) and (max-width: 768px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: 769px) and (max-width: 1024px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: 1025px) and (max-width: 1200px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: 1201px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    `,
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
