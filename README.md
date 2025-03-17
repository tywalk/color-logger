# Color Logger

Color Logger is a simple logging utility for Node.js applications that allows you to log messages with different colors for better readability.

## Installation

To install Color Logger, use npm:

```bash
npm install color-logger
```

## Usage

First, require the Color Logger module in your application:

```javascript
const colorLogger = require('color-logger');
```

Then, you can use the different logging methods provided:

```javascript
colorLogger.info('This is an info message');
colorLogger.warn('This is a warning message');
colorLogger.error('This is an error message');
colorLogger.success('This is a success message');
colorLogger.trace('This is a trace message');
colorLogger.debug('This is a debug message');
```

## Methods

- `info(message)`: Logs an informational message in blue.
- `warn(message)`: Logs a warning message in yellow.
- `error(message)`: Logs an error message in red.
- `success(message)`: Logs a success message in green.
- `trace(message)`: Logs a trace message in cyan.
- `debug(message)`: Logs a debug message in purple.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.
