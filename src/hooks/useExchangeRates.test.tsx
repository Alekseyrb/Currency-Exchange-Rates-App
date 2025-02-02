import { renderHook } from '@testing-library/react-hooks';
import useExchangeRates from './useExchangeRates';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useExchangeRates', () => {
  it('fetches exchange rates successfully', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { rates: { EUR: 0.85, GBP: 0.75 } },
    });

    const { result, waitForNextUpdate } = renderHook(() => useExchangeRates());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.rates).toEqual({ EUR: 0.85, GBP: 0.75 });
    expect(result.current.loading).toBe(false);
  });

  it('handles error if fetching fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result, waitForNextUpdate } = renderHook(() => useExchangeRates());

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.error).toBe('Network Error');
    expect(result.current.rates).toEqual({});
    expect(result.current.loading).toBe(false);
  });

  it('has correct initial state', () => {
    const { result } = renderHook(() => useExchangeRates());

    expect(result.current.rates).toEqual({});
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });
});
