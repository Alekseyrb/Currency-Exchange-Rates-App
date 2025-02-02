import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ExchangeProvider, useExchange } from './ExchangeContext';

jest.mock('@react-native-async-storage/async-storage');

describe('ExchangeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides default favorites as an empty array', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExchangeProvider>{children}</ExchangeProvider>
    );
    const { result } = renderHook(() => useExchange(), { wrapper });

    expect(result.current.favorites).toEqual([]);
  });

  it('adds a currency to favorites', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExchangeProvider>{children}</ExchangeProvider>
    );
    const { result } = renderHook(() => useExchange(), { wrapper });

    act(() => {
      result.current.toggleFavorite('USD', 1.1);
    });

    expect(result.current.favorites).toEqual([{ currency: 'USD', rate: 1.1 }]);
  });

  it('removes a currency from favorites', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExchangeProvider>{children}</ExchangeProvider>
    );
    const { result } = renderHook(() => useExchange(), { wrapper });

    act(() => {
      result.current.toggleFavorite('USD', 1.1);
      result.current.toggleFavorite('USD', 1.1);
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('loads favorites from AsyncStorage on mount', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([{ currency: 'EUR', rate: 0.85 }])
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExchangeProvider>{children}</ExchangeProvider>
    );
    const { result, waitForNextUpdate } = renderHook(() => useExchange(), { wrapper });

    await waitForNextUpdate();

    expect(result.current.favorites).toEqual([{ currency: 'EUR', rate: 0.85 }]);
  });

  it('saves favorites to AsyncStorage when updated', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExchangeProvider>{children}</ExchangeProvider>
    );
    const { result } = renderHook(() => useExchange(), { wrapper });

    act(() => {
      result.current.toggleFavorite('GBP', 0.75);
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'favorites',
      JSON.stringify([{ currency: 'GBP', rate: 0.75 }])
    );
  });
});
