# strip-json-trailing-commas

[![npm version](https://badge.fury.io/js/strip-json-trailing-commas.svg)](https://badge.fury.io/js/strip-json-trailing-commas)
[![CI](https://github.com/nokazn/strip-json-trailing-commas/workflows/CI/badge.svg)](https://github.com/nokazn/strip-json-trailing-commas/actions?workflow=CI)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Strip trailing commas from JSON files.

## Requirements

Node.js >= v18.0.0

## Installation

```bash
$ npm i strip-json-trailing-commas
$ yarn add strip-json-trailing-commas
$ pnpm i strip-json-trailing-commas
$ bun i strip-json-trailing-commas
```

## Usage

```ts
import stripJsonTrailingCommas from 'strip-json-trailing-commas';

console.log(stripJsonTrailingCommas(`{ "a": 1, }`));
// -> { "a": 1 }

// with options
console.log(
  stripJsonTrailingCommas(`{ "a": 1   , }`, {
    stripWhitespace: false,
  }),
);
// -> { "a": 1    }
```

## API

`stripJsonTrailingCommas(content, options?)`

### `content`

Type: `string`

Receive JSON string and return a string without trailing commas.

### `options`

Type: `object`

#### `stripWhitespace`

- Type: `boolean`
- Default: `true`

Strip some whitespace between end of data and trailing commas.

## License

MIT
