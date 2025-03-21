"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
test('error to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    index_1.default.error("error message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR] error message"));
    consoleSpy.mockRestore();
});
test('trace to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'trace').mockImplementation(() => { });
    index_1.default.setLevel("trace");
    index_1.default.trace("trace message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[TRACE] trace message"));
    consoleSpy.mockRestore();
});
test('debug to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => { });
    index_1.default.setLevel("debug");
    index_1.default.debug("debug message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] debug message"));
    consoleSpy.mockRestore();
});
test('info to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => { });
    index_1.default.setLevel("info");
    index_1.default.info("info message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[INFO] info message"));
    consoleSpy.mockRestore();
});
test('success to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    index_1.default.setLevel("log");
    index_1.default.success("success message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("success message"));
    consoleSpy.mockRestore();
});
test('log to be logged', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    index_1.default.setLevel("log");
    index_1.default.log("log message");
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("log message"));
    consoleSpy.mockRestore();
});
