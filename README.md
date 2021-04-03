# strip-json-trailing-commas

Strip trailing commas from JSON files.

## Installation

```bash
$ yarn add strip-json-trailing-commas
```

or

```bash
$ npm i strip-json-trailing-commas
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

Receive JSON string and returns a string without trailing commas.

### `options`

Type: `object`

#### `stripWhitespace`

- Type: `boolean`
- Default: `true`

Strip some whitespace between end of data and trailing commas.

## License

MIT
