# tailwind-bootstrap-grid

[![npm version][version-badge]][version]
![Build Status](https://github.com/karolis-sh/tailwind-bootstrap-grid/workflows/Node.js%20CI/badge.svg)
[![License: MIT][license-badge]][license]

Bootstrap **v5** flexbox grid system as a Tailwind CSS plugin.

Check the [demo](https://tailwind-bootstrap-grid.netlify.app/).

## Installation

```shell
npm i -D tailwind-bootstrap-grid
```

In your css file:

```css
@import 'tailwindcss';
@plugin "tailwind-bootstrap-grid" {
  grid-columns: 12;
  grid-gutter-width: '1.5rem';
  grid-gutters-0: 0;
  grid-gutters-1: 0.25rem;
  grid-gutters-2: 0.5rem;
  grid-gutters-3: 1rem;
  grid-gutters-4: 1.5rem;
  grid-gutters-5: 3rem;
  generate-container: true;
  container-max-widths-sm: 540px;
  container-max-widths-md: 720px;
  container-max-widths-lg: 960px;
  container-max-widths-xl: 1140px;
  container-max-widths-xxl: 1320px;
  rtl: true;
  respect-important: true;
}
```

This will generate Bootstrap v5 flexbox grid.

\* **NOTE**: When using the `.container` class from this plugin you will need to
[disable](https://tailwindcss.com/docs/container#disabling-entirely) the core
[container plugin](https://tailwindcss.com/docs/container/) as both plugins
expose a `.container` class.

## Features & Tailwind CSS options support

- ✅ custom screens
- ✅ custom separator
- ✅ custom prefix
- ✅ important
- ✅ rtl support

## Options

- Original Bootstrap grid's options:

  - `gridColumns` (default - `12`) - grid size
  - `gridGutterWidth` (default - `"1.5rem"`) - container and rows gutter width
  - `gridGutters` (default - `{ 0: 0 }`) - gutter variable class steps
    (`--bs-gutter-x`, `--bs-gutter-y`)
  - `containerMaxWidths` (default - `{}`) - the `max-width` container value for
    each breakpoint

- Extra options:
  - `generateContainer` (default - `true`) - whether to generate `.container` and
    `.container-fluid` classes
  - `rtl` (default - `false`) - rtl support (`.offset-x` classes will start
    responding to `[dir=ltr]` / `[dir=rtl]`)
  - `respectImportant` (default - `true`) - whether it should respect the `important`
    root config option

## FAQ

1. _**Why my `.container` doesn't have padding?**_ This plugin will not work properly
   with [core container plugin](https://tailwindcss.com/docs/container/) as both
   plugins expose a `.container` class.
1. _**How to use rtl css?**_ Set the `ltr` or `rtl` [dir](https://www.w3schools.com/tags/att_global_dir.asp)
   attribute on your container (usually the root `html`).
1. _**Is there a Bootstrap v4 grid implementation?**_ Yes, use `tailwind-bootstrap-grid@3`.

## Related

[postcss-bootstrap-4-grid](https://github.com/johnwatkins0/postcss-bootstrap-4-grid)

[version-badge]: https://badge.fury.io/js/tailwind-bootstrap-grid.svg
[version]: https://www.npmjs.com/package/tailwind-bootstrap-grid
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license]: https://opensource.org/licenses/MIT
