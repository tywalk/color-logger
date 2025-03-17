"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Logger_instances, _Logger_level, _Logger_originalLevel, _Logger_log;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.color = void 0;
const DEFAULT_LEVEL = "error";
const colorize = (color) => (string) => `\x1b[${color}m${string}\x1b[0m`;
class Colorizer {
    constructor(color) {
        this.colorize = (string) => {
            return colorize(this.color)(string);
        };
        this.color = color;
    }
    colorizeArgs(...args) {
        return args.map(this.colorize);
    }
}
exports.color = {
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
class Logger {
    constructor(level, area) {
        _Logger_instances.add(this);
        _Logger_level.set(this, levels[DEFAULT_LEVEL]);
        _Logger_originalLevel.set(this, levels[DEFAULT_LEVEL]);
        this.area = "main";
        this.levelLog = (level, callback) => (message, ...args) => level <= __classPrivateFieldGet(this, _Logger_level, "f") &&
            __classPrivateFieldGet(this, _Logger_instances, "m", _Logger_log).call(this, callback, `(${this.area}) ${message}`, ...args);
        this.log = this.levelLog(levels["log"], (message, ...args) => console.log(message, ...args));
        this.success = this.levelLog(levels["log"], (message, ...args) => console.log(...exports.color.green.bright.colorizeArgs(message, ...args)));
        this.error = this.levelLog(levels["error"], (message, ...args) => console.error(...exports.color.red.bright.colorizeArgs(`[ERROR] ${message}`, ...args)));
        this.warn = this.levelLog(levels["warn"], (message, ...args) => console.warn(...exports.color.yellow.bright.colorizeArgs(`[WARN] ${message}`, ...args)));
        this.info = this.levelLog(levels["info"], (message, ...args) => console.info(...exports.color.blue.bright.colorizeArgs(`[INFO] ${message}`, ...args)));
        this.trace = this.levelLog(levels["trace"], (message, ...args) => console.trace(...exports.color.cyan.bright.colorizeArgs(`[TRACE] ${message}`, ...args)));
        this.debug = this.levelLog(levels["debug"], (message, ...args) => console.debug(...exports.color.magenta.bright.colorizeArgs(`[DEBUG] ${message}`, ...args)));
        level = level || DEFAULT_LEVEL;
        this.area = area || "main";
        if (typeof levels[level] === "undefined") {
            console.error("Logger level (%s) is not a valid level. Valid levels include: %s.", level, Object.keys(levels).join(", "));
            level = DEFAULT_LEVEL;
        }
        __classPrivateFieldSet(this, _Logger_level, levels[level], "f");
        __classPrivateFieldSet(this, _Logger_originalLevel, levels[level], "f");
        console.log("log level:", level, this.area);
    }
    setDebug(debug) {
        const isDebug = __classPrivateFieldGet(this, _Logger_level, "f") === levels["debug"];
        if (isDebug !== debug) {
            console.warn("Setting debug:", debug, this.area);
            if (debug) {
                __classPrivateFieldSet(this, _Logger_level, levels["debug"], "f");
            }
            else {
                __classPrivateFieldSet(this, _Logger_level, __classPrivateFieldGet(this, _Logger_originalLevel, "f"), "f");
            }
        }
    }
    /**
     * Sets area where logger will be used.
     * **Should usually only be called when new threads area involved.**
     * @param {string} scope area to use logger
     */
    useScope(scope) {
        this.debug("Setting scope from %s to %s:", this.area, scope);
        this.area = scope;
    }
}
exports.Logger = Logger;
_Logger_level = new WeakMap(), _Logger_originalLevel = new WeakMap(), _Logger_instances = new WeakSet(), _Logger_log = function _Logger_log(callback, message, ...args) {
    callback(message, ...args);
};
const mainLogger = new Logger(DEFAULT_LEVEL, "main");
exports.default = mainLogger;
