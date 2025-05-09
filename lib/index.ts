import picocolors from 'picocolors';
const plugin = require('tailwindcss/plugin');

import validate from './validate';

import type { PluginAPI } from 'tailwindcss/plugin';

import type {
  ContainerMaxWidths,
  GridGutters,
  TailwindBootstrapGridFlatOptions,
  TailwindBootstrapGridOptions,
} from '../types';

const DEFAULT_GRID_COLUMNS = 12;
const DEFAULT_GRID_GUTTER_WIDTH = '1.5rem';

function parsePluginOptions(
  flatOptions: TailwindBootstrapGridFlatOptions,
): TailwindBootstrapGridOptions {
  const parsedOptions: TailwindBootstrapGridOptions = {
    gridGutters: {},
    containerMaxWidths: {},
  };

  for (const [key, value] of Object.entries(flatOptions)) {
    switch (true) {
      case key.startsWith('grid-gutters-'): {
        const gutterKey = key.replace('grid-gutters-', '');
        (parsedOptions.gridGutters as GridGutters)[gutterKey] = value;
        break;
      }

      case key.startsWith('container-max-widths-'): {
        const widthKey = key.replace('container-max-widths-', '');
        (parsedOptions.containerMaxWidths as ContainerMaxWidths)[widthKey] =
          value;
        break;
      }

      case key === 'grid-columns':
        parsedOptions.gridColumns = value;
        break;

      case key === 'grid-gutter-width':
        parsedOptions.gridGutterWidth = value;
        break;

      case key === 'generate-container':
        parsedOptions.generateContainer = value;
        break;

      case key === 'rtl':
        parsedOptions.rtl = value;
        break;

      case key === 'respect-important':
        parsedOptions.respectImportant = value;
        break;
    }
  }

  return parsedOptions;
}

export default plugin.withOptions(
  (pluginOptions: TailwindBootstrapGridOptions) => (options: PluginAPI) => {
    const { addComponents, addBase, config } = options;
    const screens = config('theme.screens');
    const important = config('important');

    const parsedOptions = parsePluginOptions(
      pluginOptions as TailwindBootstrapGridFlatOptions,
    );

    const {
      gridColumns,
      gridGutterWidth,
      gridGutters,
      generateContainer,
      containerMaxWidths,
      rtl,
      respectImportant,
    } = validate({ screens })({
      gridColumns: DEFAULT_GRID_COLUMNS,
      gridGutterWidth: DEFAULT_GRID_GUTTER_WIDTH,
      generateContainer: true,
      rtl: false,
      respectImportant: true,
      ...parsedOptions,
    });

    if (generateContainer) {
      console.warn(
        `⚠️  The ${picocolors.yellow(
          'container',
        )} core plugin is enabled and you're also generating ${picocolors.green(
          '.container',
        )} class with the ${picocolors.bold(
          'tailwind-bootstrap-grid',
        )} plugin. This might lead to unexpected styling issues, disable either of one.`,
      );
    }

    const screenKeys = Object.keys(screens);
    const columns = Array.from(
      Array(gridColumns),
      (_value, index) => index + 1,
    );
    const rowColsSteps = columns.slice(
      0,
      Math.floor((gridColumns ?? DEFAULT_GRID_COLUMNS) / 2),
    );

    const setImportant = (value: string) =>
      respectImportant && important && value != null
        ? `${value} !important`
        : value;

    {
      // =============================================================================================
      // Container
      // =============================================================================================
      if (generateContainer) {
        addComponents(
          [
            {
              '.container, .container-fluid': {
                width: setImportant('100%'),
                marginRight: setImportant('auto'),
                marginLeft: setImportant('auto'),
                paddingRight: setImportant(
                  `var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`,
                ),
                paddingLeft: setImportant(
                  `var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`,
                ),
              },
            },
          ],
          { respectImportant },
        );
        addBase(
          Object.fromEntries(
            screenKeys.map((name) => [
              `@media (min-width: ${containerMaxWidths?.[name] ?? screens[name]})`,
              {
                '.container': {
                  maxWidth: setImportant(
                    containerMaxWidths?.[name] ?? screens[name],
                  ),
                },
              },
            ]),
          ),
        );
      }
    }

    {
      // =============================================================================================
      // Row
      // =============================================================================================
      addComponents(
        {
          '.row': {
            '--bs-gutter-x': gridGutterWidth ?? DEFAULT_GRID_GUTTER_WIDTH,
            '--bs-gutter-y': '0',
            display: 'flex',
            flexWrap: 'wrap',
            marginTop: 'calc(var(--bs-gutter-y) * -1)',
            marginRight: 'calc(var(--bs-gutter-x) / -2)',
            marginLeft: 'calc(var(--bs-gutter-x) / -2)',
            '& > *': {
              boxSizing: 'border-box',
              flexShrink: '0',
              width: '100%',
              maxWidth: '100%',
              paddingRight: 'calc(var(--bs-gutter-x) / 2)',
              paddingLeft: 'calc(var(--bs-gutter-x) / 2)',
              marginTop: 'var(--bs-gutter-y)',
            },
          },
        },
        { respectImportant },
      );
    }

    {
      // =============================================================================================
      // Columns
      // =============================================================================================
      addComponents(
        [
          {
            '.col': {
              flex: '1 0 0%',
            },
            '.row-cols-auto': {
              '& > *': {
                flex: '0 0 auto !important',
                width: 'auto',
              },
            },
          },
          ...rowColsSteps.map((rowCol) => ({
            [`.row-cols-${rowCol}`]: {
              '& > *': {
                flex: '0 0 auto !important',
                width: `${100 / rowCol}%`,
              },
            },
          })),
          {
            '.col-auto': {
              flex: '0 0 auto !important',
              width: 'auto',
            },
          },
          ...columns.map((size) => ({
            [`.col-${size}`]: {
              flex: '0 0 auto !important',
              width: `${(100 / (gridColumns ?? DEFAULT_GRID_COLUMNS)) * size}% !important`,
            },
          })),
        ],
        { respectImportant },
      );
    }

    {
      // =============================================================================================
      // Offsets
      // =============================================================================================
      addComponents(
        [
          ...[0, ...columns.slice(0, -1)].map((size) => {
            const margin = `${(100 / (gridColumns ?? DEFAULT_GRID_COLUMNS)) * size}%`;
            return rtl
              ? {
                  [`[dir="ltr"] .offset-${size}`]: {
                    marginLeft: margin,
                    marginRight: '',
                  },
                  [`[dir="rtl"] .offset-${size}`]: {
                    marginRight: margin,
                    marginLeft: '',
                  },
                }
              : {
                  [`.offset-${size}`]: { marginLeft: margin },
                };
          }),
        ],
        { respectImportant },
      );
    }

    {
      // =============================================================================================
      // Gutters
      // =============================================================================================
      if (gridGutters && Object.keys(gridGutters).length) {
        addComponents(
          Object.entries(gridGutters).map(([key, value]) => ({
            [`.g-${key}`]: {
              '--bs-gutter-x': value.toString(),
              '--bs-gutter-y': value.toString(),
            },
            [`.gx-${key}`]: {
              '--bs-gutter-x': value.toString(),
              '--bs-gutter-y': '',
            },
            [`.gy-${key}`]: {
              '--bs-gutter-y': value.toString(),
              '--bs-gutter-x': '',
            },
          })),
          { respectImportant },
        );
      }
    }

    {
      // =============================================================================================
      // Ordering
      // =============================================================================================
      addComponents(
        [
          {
            '.order-first': { order: '-1' },
            '.order-last': {
              order: ((gridColumns ?? DEFAULT_GRID_COLUMNS) + 1).toString(),
            },
          },
          ...[0, ...columns].map((size) => ({
            [`.order-${size}`]: { order: `${size}` },
          })),
        ],
        { respectImportant },
      );
    }
  },
);
