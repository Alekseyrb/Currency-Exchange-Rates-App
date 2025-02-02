import React, {createContext, useContext, useState} from 'react';

interface ExchangeContextProps {
  favorites: {currency: string; rate: number}[];
  toggleFavorite: (currency: string, rate: number) => void;
}

const ExchangeContext = createContext<ExchangeContextProps | undefined>(
  undefined,
);

export const ExchangeProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<
    {currency: string; rate: number}[]
  >([]);

  const toggleFavorite = (currency: string, rate: number) => {
    setFavorites(prev =>
      prev.some(item => item.currency === currency)
        ? prev.filter(item => item.currency !== currency)
        : [...prev, {currency, rate}],
    );
  };

  return (
    <ExchangeContext.Provider value={{favorites, toggleFavorite}}>
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context)
    throw new Error('useExchange must be used within an ExchangeProvider');
  return context;
};
