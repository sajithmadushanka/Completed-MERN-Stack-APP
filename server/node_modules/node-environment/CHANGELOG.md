# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.5.0] - 2021-08-26

### Added

-   Query multiple environments at once:

    ```javascript
    env('development', 'test') // true for NODE_ENV=development
    ```

## [0.4.0] - 2021-08-26

### Fixed

-   typescript index.d.ts correctly expose the API

### Changed

-   Rename package name from node.env-inspector to node-environment

## [0.3.0] - 2021-06-04

### Added

-   [README](/README.md)

## [0.2.0] - 2021-06-04

### Added

-   inspect NODE_ENV environment variable and query for specific value or return its value if none is given through `env` interface
-   Add authored declaration file [index.d.ts](/lib/index.d.ts) to be used by typescript projects

## [0.1.0] - 2021-06-04

### Added

-   project setup with prettier, eslint and jest

[unreleased]: https://github.com/pherval/node-environment/compare/v0.5.0...HEAD
[0.5.0]: https://github.com/pherval/node-environment/compare/v0.4.0...0.5.0
[0.4.0]: https://github.com/pherval/node-environment/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/pherval/node-environment/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/pherval/node-environment/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/pherval/node-environment/releases/tag/v0.1.0

```

```
