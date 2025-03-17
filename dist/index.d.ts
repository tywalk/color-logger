type LoggerCallback = (message: string, ...args: string[]) => void;
declare class Colorizer {
    color: string;
    constructor(color: string);
    colorize: (string: string) => string;
    colorizeArgs(...args: string[]): string[];
}
export declare const color: {
    red: {
        default: Colorizer;
        bright: Colorizer;
    };
    green: {
        default: Colorizer;
        bright: Colorizer;
    };
    yellow: {
        default: Colorizer;
        bright: Colorizer;
    };
    blue: {
        default: Colorizer;
        bright: Colorizer;
    };
    magenta: {
        default: Colorizer;
        bright: Colorizer;
    };
    cyan: {
        default: Colorizer;
        bright: Colorizer;
    };
};
declare const levels: {
    off: number;
    error: number;
    warn: number;
    log: number;
    info: number;
    trace: number;
    debug: number;
};
export declare class Logger {
    #private;
    area: string;
    constructor(level: keyof typeof levels, area: string);
    levelLog: (level: number, callback: LoggerCallback) => (message: string, ...args: string[]) => false | void;
    log: (message: string, ...args: string[]) => false | void;
    success: (message: string, ...args: string[]) => false | void;
    error: (message: string, ...args: string[]) => false | void;
    warn: (message: string, ...args: string[]) => false | void;
    info: (message: string, ...args: string[]) => false | void;
    trace: (message: string, ...args: string[]) => false | void;
    debug: (message: string, ...args: string[]) => false | void;
    setDebug(debug: boolean): void;
    /**
     * Sets area where logger will be used.
     * **Should usually only be called when new threads area involved.**
     * @param {string} scope area to use logger
     */
    useScope(scope: string): void;
}
declare const mainLogger: Logger;
export default mainLogger;
