import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextProps {
  isConnected: boolean;
  balance: number;
}

const WalletContext = createContext<WalletContextProps>({ isConnected: false, balance: 0 });

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Set initial values for isConnected and balance
    setIsConnected(true);
    setBalance(100);
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, balance }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
