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
    family: 'Heebo',
    style: 'normal',
    h1: `
    @media (max-width: ${xsMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 52px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 80px;
      line-height: 100%;
    }
    `,
    h2: `
    @media (max-width: ${xsMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 26px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 42px;
      line-height: 100%;
    }
    `,
    p1: `
    @media (max-width: ${xsMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: bold;
      font-size: 36px;
      line-height: 100%;
    }
    `,
    p2: `
    @media (max-width: ${xsMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 100%;
    }
    @media (min-width: ${xsMax + 1}px) and (max-width: ${smMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${smMax + 1}px) and (max-width: ${mdMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${mdMax + 1}px) and (max-width: ${lgMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${lgMax + 1}px) and (max-width: ${xlMax}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 100%;
    }
    @media (min-width: ${xlMax + 1}px) {
      font-family: Heebo;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
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

  borderRadius: '2px',

  grid: {
    getGridColumns: (cols, extraGutters = 0) => {
      const nGutters = cols - 1 + extraGutters;
      return `calc((((100% - (${
        gridColumns - 1
      } * var(--gutter))) / ${gridColumns}) * ${cols}) + (${nGutters} * var(--gutter)))`;
    },
    xsGutter: '4px',
    smGutter: '8px',
    mdGutter: '10px',
    lgGutter: '10px',
    xlGutter: '12px',
    xxlGutter: '14px',
  },
};

export default theme;
