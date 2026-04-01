# Color Logger

[![npm version](https://badge.fury.io/js/%40tywalk%2Fcolor-logger.svg)](https://www.npmjs.com/package/@tywalk/color-logger)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A powerful, TypeScript-ready logging utility for Node.js applications that provides colored console output with configurable log levels, scoped logging, and advanced color formatting.

## ✨ Features

- 🎨 **Rich Color Support**: ANSI color codes with bright variants for enhanced readability
- 📊 **Configurable Log Levels**: Control output verbosity with 6 distinct levels
- 🔧 **TypeScript Support**: Full type definitions and IntelliSense support
- 🏷️ **Scoped Logging**: Organize logs by area/module for better debugging
- ⚡ **Zero Dependencies**: Lightweight and fast with no external dependencies
- 🛠️ **Flexible API**: Use the default logger or create custom instances

## 📦 Installation

```bash
npm install @tywalk/color-logger
```

## 🚀 Quick Start

### JavaScript (CommonJS)

```javascript
const logger = require('@tywalk/color-logger').default;

logger.info('Application started');
logger.warn('This is a warning');
logger.error('Something went wrong!');
logger.success('Operation completed successfully');
```

### TypeScript/ES Modules

```typescript
import logger from '@tywalk/color-logger';

logger.info('Application started');
logger.warn('This is a warning');
logger.error('Something went wrong!');
logger.success('Operation completed successfully');
```

## 📋 Log Levels

The logger supports 6 hierarchical log levels:

| Level | Value | Description |
|-------|-------| -----------|
| `off` | -1 | Disable all logging |
| `error` | 0 | Only error messages |
| `warn` | 1 | Warnings and errors |
| `log` | 2 | General logs, warnings, and errors |
| `info` | 3 | Info messages and above |
| `trace` | 4 | Trace messages and above |
| `debug` | 5 | All messages including debug |

### Setting Log Levels

```typescript
import logger from '@tywalk/color-logger';

// Set log level (messages above this level will be filtered out)
logger.setLevel('info');

// Enable/disable debug mode
logger.setDebug(true);

// These will now be visible
logger.info('This will be shown');
logger.error('This will be shown');

// This will be filtered out
logger.debug('This will be hidden unless debug mode is on');
```

## 🏷️ Scoped Logging

Organize your logs by area or module:

```typescript
import { Logger } from '@tywalk/color-logger';

// Create a scoped logger
const dbLogger = new Logger('info', 'DATABASE');
const apiLogger = new Logger('debug', 'API');

dbLogger.info('Connected to database');
// Output: (DATABASE) [INFO] Connected to database

apiLogger.warn('API rate limit approaching');
// Output: (API) [WARN] API rate limit approaching

// Change scope dynamically
logger.useScope('AUTH');
logger.info('User logged in');
// Output: (AUTH) [INFO] User logged in
```

## 🎨 Available Methods

| Method | Color | Level | Description |
|--------|-------|-------| -----------|
| `error(message, ...args)` | Red | 0 | Error messages with `[ERROR]` prefix |
| `warn(message, ...args)` | Yellow | 1 | Warning messages with `[WARN]` prefix |
| `log(message, ...args)` | Default | 2 | Standard log messages |
| `info(message, ...args)` | Blue | 3 | Informational messages with `[INFO]` prefix |
| `success(message, ...args)` | Green | 2 | Success messages (bright green) |
| `trace(message, ...args)` | Cyan | 4 | Trace messages with `[TRACE]` prefix |
| `debug(message, ...args)` | Magenta | 5 | Debug messages with `[DEBUG]` prefix |

### Multiple Arguments

All methods support multiple arguments:

```typescript
logger.info('User logged in:', { userId: 123, email: 'user@example.com' });
logger.error('Database error:', error.message, error.stack);
```

## 🔧 Advanced Usage

### Custom Logger Instances

```typescript
import { Logger } from '@tywalk/color-logger';

// Create loggers with different configurations
const errorLogger = new Logger('error', 'CRITICAL');
const debugLogger = new Logger('debug', 'DEV');

// Production vs Development logging
const isProd = process.env.NODE_ENV === 'production';
const appLogger = new Logger(isProd ? 'warn' : 'debug', 'APP');
```

### Direct Color Access

```typescript
import { color } from '@tywalk/color-logger';

// Use colors directly
console.log(color.red.bright.colorize('Critical error!'));
console.log(color.green.default.colorize('Success!'));

// Colorize multiple arguments
const coloredArgs = color.blue.bright.colorizeArgs('Info:', 'Database connected');
console.log(...coloredArgs);
```

## 🌈 Available Colors

Each color comes in two variants: `default` and `bright`

- `red` - Errors and critical messages
- `green` - Success and positive messages  
- `yellow` - Warnings and cautions
- `blue` - Informational messages
- `magenta` - Debug and development info
- `cyan` - Trace and detailed logging

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build TypeScript
npm run build

# Prepare for release
npm run ready
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/tywalk/color-logger/issues) on GitHub.

---

**Made with ❤️ for the Node.js community**
