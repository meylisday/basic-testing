import { doStuffByTimeout, readFileAsynchronously, doStuffByInterval } from '.';
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';

jest.mock('path');
jest.mock('fs');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    jest.runAllTimers();
    expect(mockedTimeout).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const mockedTimeout = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    jest.runAllTimers();
    doStuffByTimeout(callback, 1000);
    expect(mockedTimeout).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const mockedInterval = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    jest.runAllTicks();
    expect(mockedInterval).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 10);
    jest.advanceTimersByTime(30);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const filePath = 'test.ts';

    const pathJoinSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);
    expect(pathJoinSpy).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    const filePath = 'test.ts';
    const mockExistsSync = jest.spyOn(fs, 'existsSync');
    mockExistsSync.mockImplementation(() => false);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const filePath = 'test.ts';
    const fileContent = 'File content';
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(fileContent);
    const result = await readFileAsynchronously(filePath);
    expect(result).toBe(fileContent);
  });
});
