import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      primary: string;
      secondary: string;
      shadow: string;
    };

    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;

      smd: string;
      mdd: string;
      lgd: string;

      smu: string;
      mdu: string;
      lgu: string;
    };

    font: {
      family: string;
      style: string;
    };
  }
}
