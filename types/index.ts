import type { PluginCreator } from 'tailwindcss/plugin';

export type Screens = Record<string, string>;

export interface GridGutters {
  [key: string]: string | number;
}

export interface ContainerMaxWidths {
  [breakpoint: string]: string;
}

export interface TailwindBootstrapGridFlatOptions {
  'grid-columns': number;
  'grid-gutter-width': string;
  'grid-gutters-0': number;
  'grid-gutters-1': string;
  'grid-gutters-2': string;
  'grid-gutters-3': string;
  'grid-gutters-4': string;
  'grid-gutters-5': string;
  'generate-container': boolean;
  'container-max-widths-sm': string;
  'container-max-widths-md': string;
  'container-max-widths-lg': string;
  'container-max-widths-xl': string;
  'container-max-widths-xxl': string;
  rtl: boolean;
  'respect-important': boolean;
}

export interface TailwindBootstrapGridOptions {
  gridColumns?: number;
  gridGutterWidth?: string;
  gridGutters?: GridGutters;
  generateContainer?: boolean;
  containerMaxWidths?: ContainerMaxWidths;
  rtl?: boolean;
  respectImportant?: boolean;
}

export type TailwindBootstrapGridPlugin = (
  options?: TailwindBootstrapGridOptions,
) => PluginCreator;
