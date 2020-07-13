import { DefaultTheme } from 'styled-components';

const xsMax = 575;
const smMax = 767;
const mdMax = 991;
const lgMax = 1199;
const xlMax = 1599;

const gridColumns = 24;

const theme: DefaultTheme = {
  colors: {
    primary: '#F94F28',
    secondary: '#332E31',
    shadow: '#F2F2F2',
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
      font-size: 52px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 54px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 64px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    `,
    h2: `
    @media (max-width: ${xsMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 23px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 600;
      font-size: 28px;
      line-height: 100%;
    }
    `,
    p1: `
    @media (max-width: ${xsMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 12px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 21px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Montserrat;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 100%;
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

  borderRadius: '20px',

  grid: {
    getGridColumns: (cols: number, extraGutters = 0): string => {
      const nGutters = cols - 1 + extraGutters;
      return `calc((((100% - (${
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

  loadOptimizedImage: (url: string): string => {
    const trace = require(`../../public/images/${url}?trace`).trace;
    // TODO remove first image loaded as soon as webp support comes to safari
    return `url(${require(`../../public/images/${url}`)}), url(${require(`../../public/images/${url}?webp`)}), url("${trace}")`;
  },
};

export default theme;
