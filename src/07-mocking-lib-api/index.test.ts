import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  afterEach(async () => {
    throttledGetDataFromApi.cancel();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const mockAxiosCreate = axios.create as jest.Mock;
    const mockBaseURL = 'https://jsonplaceholder.typicode.com';
    const mockAxiosInstance = {
      get: jest.fn().mockResolvedValue({ data: {} }),
    };
    mockAxiosCreate.mockReturnValue(mockAxiosInstance);

    await throttledGetDataFromApi('posts');

    expect(mockAxiosCreate).toHaveBeenCalledWith({
      baseURL: mockBaseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const mockRelativePath = '/posts';
    const mockAxiosCreate = axios.create as jest.Mock;
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: {} }),
    };

    mockAxiosCreate.mockImplementationOnce(() => mockAxiosClient);

    await throttledGetDataFromApi(mockRelativePath);

    expect(mockAxiosClient.get).toHaveBeenCalledWith(mockRelativePath);
  });

  test('should return response data', async () => {
    const mockRelativePath = '/posts';
    const mockResponseData = { value: 'string' };
    const mockAxiosCreate = axios.create as jest.Mock;
    const mockAxiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: mockResponseData }),
    };

    mockAxiosCreate.mockImplementationOnce(() => mockAxiosClient);

    const result = await throttledGetDataFromApi(mockRelativePath);

    expect(result).toEqual(mockResponseData);
  });
});
