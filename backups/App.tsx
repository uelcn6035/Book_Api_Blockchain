import "./App.css";
import NavBar from "./components/NavBar";
import BookCard from "./components/bookCard";
import { WalletProvider } from './components/walletContext.tsx';

const App = () => {
  return (
    <WalletProvider>
      <div className="flex flex-col h-screen">
        <NavBar />
        <div className="flex flex-1 overflow-auto flex-col items-center align-middle justify-center  h-full w-full">
          <BookCard />
        </div>
      </div>
    </WalletProvider>
  );
};

export default App;