//theme.ts
import { DefaultTheme } from "@emotion/react";

declare module "@emotion/react" {
  export interface DefaultTheme {
    fontSize: {
      xxs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
    };
    color: {
      primary_light: string;
      primary_normal: string;
      primary_dark: string;
      //error
      error: string;
      //gray
      gray_50: string;
      gray_100: string;
      gray_200: string;
      gray_300: string;
      gray_400: string;
      gray_500: string;
      gray_600: string;
      gray_700: string;
      gray_800: string;
      gray_900: string;
      //black & white
      black: string;
      white: string;
    };
  }
}

const theme: DefaultTheme = {
  fontSize: {
    xxs: "12px",
    sm: "14px",
    base: "16px",
    md: "18px",
    lg: "24px",
  },

  color: {
    primary_light: "#7C21FF",
    primary_normal: "#6200EE",
    primary_dark: "#4A00B4",

    error: "#ED3124",

    gray_50: "#FAFAFA",
    gray_100: "#F5F5F5",
    gray_200: "#EEEEEE",
    gray_300: "#E0E0E0",
    gray_400: "#BDBDBD",
    gray_500: "#9E9E9E",
    gray_600: "#757575",
    gray_700: "#616161",
    gray_800: "#424242",
    gray_900: "#212121",

    black: "#000000",
    white: "#FFFFFF",
  },
};

export default theme;
