import { DefaultTheme } from 'styled-components';

export const xsMax = 575;
export const smMax = 767;
export const mdMax = 991;
export const lgMax = 1199;
export const xlMax = 1599;

const gridColumns = 24;

const theme: DefaultTheme = {
  animations: {
    show: `
      @keyframes show {
        to {
          opacity: 1;
          transform: none;
        }
      }
      animation: show 500ms ease-out 200ms forwards;
    `,
  },
  colors: {
    primary: '#f94f28',
    secondary: '#332e31',
    grey: '#f2f2f2',
    shadow: '#f5f5f5',
  },

  font: {
    family: 'Montserrat',
    style: 'normal',
    h1: `
    @media (max-width: ${xsMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 40px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 44px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 48px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 52px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 56px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 56px;
      line-height: 100%;
    }
    `,
    h2: `
    @media (max-width: ${xsMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 23px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 23px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 25px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 28px;
      line-height: 100%;
    }
    `,
    p1: `
    @media (max-width: ${xsMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 140%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 140%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 140%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 19px;
      line-height: 140%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 140%;
    }
    `,
  },

  breakpoints: {
    xs: `(max-width: ${xsMax}px)`,
    sm: `(min-width: ${xsMax + 1}px) and (max-width: ${smMax}px)`,
    md: `(min-width: ${smMax + 1}px) and (max-width: ${mdMax}px)`,
    lg: `(min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px)`,
    xl: `(min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px)`,
    xxl: `(min-width: ${xlMax + 1}px)`,

    // small and down
    smd: `(max-width: ${smMax}px)`,
    mdd: `(max-width: ${mdMax}px)`,
    lgd: `(max-width: ${lgMax}px)`,
    xld: `(max-width: ${xlMax}px)`,

    // small and up
    smu: `(min-width: ${xsMax + 1}px)`,
    mdu: `(min-width: ${smMax + 1}px)`,
    lgu: `(min-width: ${mdMax + 1}px)`,
    xlu: `(min-width: ${lgMax + 1}px)`,
  },

  borderRadius: '16px',

  grid: {
    getGridColumns: (cols: number, extraGutters = 0): string => {
      const nGutters = cols - 1 + extraGutters;
      return `calc((((100vw - (${
        gridColumns - 1
      } * var(--gutter))) / ${gridColumns}) * ${cols}) + (${nGutters} * var(--gutter)))`;
    },
    xsGutter: '4px',
    smGutter: '6px',
    mdGutter: '6px',
    lgGutter: '6px',
    xlGutter: '6px',
    xxlGutter: '6px',
  },

  headerHeight: '80px',
  footerHeight: '80px',

  loadOptimizedImage: (url: string): string => {
    const trace = require(`../../public/images/${url}?trace`).trace;
    return `url(${require(`../../public/images/${url}`)}), url("${trace}")`;
  },
};

export default theme;
