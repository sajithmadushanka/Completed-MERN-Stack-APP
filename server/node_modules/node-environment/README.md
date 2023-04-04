[![Code Style](https://github.com/pherval/node-environment/actions/workflows/code-style.yml/badge.svg)](https://github.com/pherval/node-environment/actions/workflows/code-style.yml) [![Publish to NPM](https://github.com/pherval/node-environment/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/pherval/node-environment/actions/workflows/publish-npm.yml)

# node-environment

Inspect or return the environment variable `NODE_ENV`

## Requirements

`node >=12`

## Features

-   Consult `NODE_ENV` known values (`dev`, `development`, `production`, `prod`)
-   Give `development` as default value
-   Return the raw value from `NODE_ENV`
-   All queries are case-insensitive

## Installation

Install `node-environment` with npm

```bash
  npm install node-environment
```

## Usage/Examples

Using CommonJS modules

```javascript
const { env } = require('node-environment')
```

Using ECMAScript modules

```javascript
import { env } from 'node-environment'
```

```javascript
process.env.NODE_ENV = 'dev'

env('development') // true
env('staging', 'development') // true
env('test', 'production') // false
env() // "dev"
```

## API Reference

The package only expose one function:

```javascript
  env(): string
  env(query: string, ...otherEnvironments: string[]): boolean
```

#### Aliases:

`prod == production`

`dev == development`

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

## License

[MIT](https://choosealicense.com/licenses/mit/)
