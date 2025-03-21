import mainLogger from '../index';

test('error to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  mainLogger.error("error message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[ERROR] error message"));

  consoleSpy.mockRestore();
});
test('trace to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'trace').mockImplementation(() => {});

	mainLogger.setLevel("trace");
  mainLogger.trace("trace message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[TRACE] trace message"));

  consoleSpy.mockRestore();
});
test('debug to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'debug').mockImplementation(() => {});

	mainLogger.setLevel("debug");
  mainLogger.debug("debug message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[DEBUG] debug message"));

  consoleSpy.mockRestore();
});
test('info to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'info').mockImplementation(() => {});

	mainLogger.setLevel("info");
  mainLogger.info("info message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("[INFO] info message"));

  consoleSpy.mockRestore();
});
test('success to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

	mainLogger.setLevel("log");
  mainLogger.success("success message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("success message"));

  consoleSpy.mockRestore();
});
test('log to be logged', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

	mainLogger.setLevel("log");
  mainLogger.log("log message");

  expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("log message"));

  consoleSpy.mockRestore();
});