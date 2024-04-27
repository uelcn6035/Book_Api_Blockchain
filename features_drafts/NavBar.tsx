import { useState, useEffect } from "react";
import axios, { AxiosError } from 'axios'; 
import { Navbar, NavbarBrand, NavbarContent, Button } from "@nextui-org/react";
import { MdApi } from "react-icons/md";

const NavBar = () => {
  const [algoBalance, setAlgoBalance] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null); // Add a new state for error
  const [connectionStatus, setConnectionStatus] = useState('Connect to Wallet'); // New state for connection status
  const [showBalance, setShowBalance] = useState(false); // New state for balance visibility

  useEffect(() => {
    // Fetch balance when component mounts
    fetchBalance();
  }, []); // Empty dependency array to run effect only once on mount

  const fetchBalance = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/config/balance'); // Include the full URL
      console.log('Server response:', res);  // Log the server response
      if (res.data && typeof res.data.balance === 'number') {
        setAlgoBalance(res.data.balance);
        setError(null); // Clear the error when fetch is successful
      } else {
        console.error('Unexpected response data:', res.data);
        setError('Unexpected response data'); // Set the error state
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Type assertion
      if (axiosError.response) {
        console.error("Failed to fetch balance:", axiosError.response);
      } else {
        console.error("Error:", axiosError);
      }
      setError('Failed to fetch balance'); // Set the error state
    }
  };
  
  const connectWallet = () => {
    setConnectionStatus('Connecting...');
    setTimeout(() => {
      setConnectionStatus('Connected');
    }, 1000); // Delay of 1 seconds
  };

  console.log('Rendering NavBar...');  // Log when rendering NavBar

  return (
    <Navbar className="bg-slate-100 h-16">
      <NavbarBrand>
        <MdApi className="w-8 h-8 text-primary" />
        <p className="font-bold text-inherit">Library API</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
      </NavbarContent>
      <NavbarContent justify="end">
      <Button onClick={connectionStatus === 'Connected' ? (e) => {e.preventDefault(); setShowBalance(true);} : connectWallet}>
        {connectionStatus === 'Connected' ? (
          <div>
            Connected
            <br/>
            {showBalance ? (
              error ? error : (algoBalance === null ? "Loading..." : <span style={{color: 'blue'}}>Balance: {algoBalance} Algos</span>)
            ) : (
              <a href="#" onClick={(e) => {e.stopPropagation(); setShowBalance(true);}} style={{color: 'blue'}}>Click to show balance</a>
            )}
          </div>
        ) : connectionStatus}
      </Button>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
