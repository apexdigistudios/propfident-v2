declare module "*.css" {
  const content: { [key: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
declare module "next/font/google" {
  export interface NextFont {
    style: {
      fontFamily: string;
      fontWeight?: string;
      fontStyle?: string;
    };
    className: string;
    variable: string;
  }

  export function Geist(options?: {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    variable?: string;
    display?: string;
  }): NextFont;

  export function Geist_Mono(options?: {
    weight?: string | string[];
    style?: string | string[];
    subsets?: string[];
    variable?: string;
    display?: string;
  }): NextFont;
}