// Importing necessary hooks and types from React
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Defining the shape of the WalletContext
interface WalletContextProps {
  isConnected: boolean;
  balance: number;
}

// Creating the WalletContext with default values
const WalletContext = createContext<WalletContextProps>({ isConnected: false, balance: 0 });

// Defining the props for the WalletProvider component
interface WalletProviderProps {
  children: ReactNode;
}

// Defining the WalletProvider component
export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    // Set initial values for isConnected and balance
    setIsConnected(true);
    setBalance(100);
  }, []);

  // Providing the WalletContext to child components
  return (
    <WalletContext.Provider value={{ isConnected, balance }}>
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the WalletContext
export const useWallet = () => useContext(WalletContext);
