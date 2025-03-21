const DEFAULT_LEVEL = "error";
const colorize = (color: string) => (string: string) => `\x1b[${color}m${string}\x1b[0m`;

type LoggerCallback = (message: string, ...args: string[]) => void;

class Colorizer {
  color: string;
  constructor(color: string) {
    this.color = color;
  }

  colorize = (string: string) => {
    return colorize(this.color)(string);
  };

  colorizeArgs(...args: string[]) {
    return args.map(this.colorize);
  }
}

export const color = {
  red: {
    default: new Colorizer("31"),
    bright: new Colorizer("31;1"),
  },
  green: {
    default: new Colorizer("32"),
    bright: new Colorizer("32;1"),
  },
  yellow: {
    default: new Colorizer("33"),
    bright: new Colorizer("33;1"),
  },
  blue: {
    default: new Colorizer("34"),
    bright: new Colorizer("34;1"),
  },
  magenta: {
    default: new Colorizer("35"),
    bright: new Colorizer("35;1"),
  },
  cyan: {
    default: new Colorizer("36"),
    bright: new Colorizer("36;1"),
  },
};

const levels = {
  off: -1,
  error: 0,
  warn: 1,
  log: 2,
  info: 3,
  trace: 4,
  debug: 5,
};

export class Logger {
  #level = levels[DEFAULT_LEVEL];
  #originalLevel = levels[DEFAULT_LEVEL];
  area = "";
  constructor(level: keyof typeof levels, area?: string) {
    level = level || DEFAULT_LEVEL;
    this.area = area || "";
    if (typeof levels[level] === "undefined") {
      console.error(
        "Logger level (%s) is not a valid level. Valid levels include: %s.",
        level,
        Object.keys(levels).join(", ")
      );
      level = DEFAULT_LEVEL;
    }
    this.#level = levels[level];
    this.#originalLevel = levels[level];
    this.debug("log level:", level, this.area);
  }
  #log(callback: LoggerCallback, message: string, ...args: string[]) {
    callback(message, ...args);
  }
  levelLog =
    (level: number, callback: LoggerCallback) =>
    (message: string, ...args: any[]) =>
      level <= this.#level &&
      this.#log(callback, `${this.area ? `(${this.area}) ` : ''}${message}`, ...args);

  log = this.levelLog(levels["log"], (message: string, ...args: string[]) =>
    console.log(message, ...args)
  );
  success = this.levelLog(levels["log"], (message: string, ...args: string[]) =>
    console.log(...color.green.bright.colorizeArgs(message, ...args))
  );
  error = this.levelLog(levels["error"], (message: string, ...args: string[]) =>
    console.error(
      ...color.red.bright.colorizeArgs(`[ERROR] ${message}`, ...args)
    )
  );
  warn = this.levelLog(levels["warn"], (message: string, ...args: string[]) =>
    console.warn(
      ...color.yellow.bright.colorizeArgs(`[WARN] ${message}`, ...args)
    )
  );
  info = this.levelLog(levels["info"], (message: string, ...args: string[]) =>
    console.info(
      ...color.blue.bright.colorizeArgs(`[INFO] ${message}`, ...args)
    )
  );
  trace = this.levelLog(levels["trace"], (message: string, ...args: string[]) =>
    console.trace(
      ...color.cyan.bright.colorizeArgs(`[TRACE] ${message}`, ...args)
    )
  );
  debug = this.levelLog(levels["debug"], (message: string, ...args: string[]) =>
    console.debug(
      ...color.magenta.bright.colorizeArgs(`[DEBUG] ${message}`, ...args)
    )
  );
  setLevel(level: keyof typeof levels) {
    const isDebug = this.#level === levels["debug"];
    if (!isDebug) {
      if (typeof levels[level] === "undefined") {
        console.error(
          "Logger level (%s) is not a valid level. Valid levels include: %s.",
          level,
          Object.keys(levels).join(", ")
        );
        return;
      }
      this.debug("Setting log level:", level, this.area);
      this.#level = levels[level];
    }
  }
  setDebug(debug: boolean) {
    const isDebug = this.#level === levels["debug"];
    if (isDebug !== debug) {
      console.warn("Setting debug:", debug, this.area);
      if (debug) {
        this.#level = levels["debug"];
      } else {
        this.#level = this.#originalLevel;
      }
    }
  }
  /**
   * Sets area where logger will be used.
   * **Should usually only be called when new threads area involved.**
   * @param {string} scope area to use logger
   */
  useScope(scope: string) {
    this.debug("Setting scope from %s to %s:", this.area, scope);
    this.area = scope;
  }
}

const mainLogger = new Logger(DEFAULT_LEVEL);
export default mainLogger;
