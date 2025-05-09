import type { PluginCreator } from 'tailwindcss/plugin';

export type Screens = Record<string, string>;

export interface GridGutters {
  [key: string]: string | number;
}

export interface ContainerMaxWidths {
  [breakpoint: string]: string;
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
