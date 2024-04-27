import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { getBookData } from "../api/actions.ts";
import { useWallet } from './walletContext.tsx';

const BookCard: React.FC = () => {
  const [data, setData] = useState<Book>();
  const [loadingState, setLoadingState] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [showReviews, setShowReviews] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBorrowLoading, setIsBorrowLoading] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showCloseSession, setShowCloseSession] = useState(false);
  const { isConnected, balance } = useWallet();
  const [buttonText, setButtonText] = useState("Match from Pool");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBalanceFetched, setIsBalanceFetched] = useState(false);
  const [balanceFetched, setBalanceFetched] = useState(0);
  const [isInputClicked, setIsInputClicked] = useState(false);
  
  const handleSearch = () => {
  if (!isConnected || balance <= 0) {
    setError('Please connect to wallet first\nor balance must be > 0');
    return;
  }

  const wordCount = title.trim().split(/\s+/).length;
  if (wordCount < 2 || wordCount > 4) {
    setError("Title must be between 2 - 4 words.");
    return;
  }
  setLoadingState(true);
  getBookData(title)
    .then((res) => {
      setError("");
      if (res) {
        setData(res);
        setLoadingState(false);
        setIsButtonDisabled(true);
        setShowCloseSession(false);
      }
      // Fetch balance after successful search
     fetchBalance(); 
    })
    .catch((error) => {
      setLoadingState(false);
      setData(undefined);
      setError(error);
    });
};


const handleBorrow = () => {
  console.log('handleBorrow is called');
  if (!isConnected || balance === 0) {
    setError('Please connect to wallet first');
    return;
  }

  setIsBorrowLoading(true);
  setShowReviews(false); // Hide reviews when borrowing process starts
  fetchBalance();
  setTimeout(async () => {
    setIsBorrowLoading(false);
    setIsPaymentComplete(true);
    setShowReviews(true);
  }, 3000);
};


  const handleReadNow = () => {
    setShowContent(true);
    setIsPaymentComplete(false);
    setShowReviews(false);
  };

  const handleCloseSession = () => {
    setData(undefined);
    setTitle("");
    setError("");
    setShowContent(false);
    setIsButtonDisabled(false);
    setIsPaymentComplete(false);
    setShowReviews(false);
    setShowCloseSession(false);
  };

  const fetchBalance = async () => {
    try {
      console.log('fetchBalance is called');
      const response = await fetch('https://legendary-dollop-44wvvjjg74xfqq6r-3000.app.github.dev/api/config/balance');
      const data = await response.json();
      setBalanceFetched(data.balance); // Update balanceFetched with the fetched balance
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-center gap-3">
      <form
        onSubmit={(e) => {
          if (!isBalanceFetched) {
            e.preventDefault();
            return;
          }
      
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="flex flex-col w-full p-0 space-y-4 items-center">
        {isBalanceFetched && (
          <div style={{ 
            backgroundColor: '#D6BCFA', 
            border: 'none', 
            color: 'white', 
            padding: '5px 10px', 
            textAlign: 'center', 
            textDecoration: 'none', 
            display: 'inline-block', 
            fontSize: '12px', 
            margin: '2px 2px', 
            cursor: 'default' // Change the cursor to default when hovering over the balance
          }}>
            Wallet Balance: {balanceFetched} ALGO
          </div>
        )}
          <Input
  id="booktitle"
  type="text"
  label={showContent ? "Find Another Book" : "Enter a Book Title"}
  value={title}
  onClick={async () => {
    setIsInputClicked(true); // Set isInputClicked to true when input box is clicked
    if (!isBalanceFetched) { // Only set buttonText and errorMessage if balance is not fetched
      setButtonText("Processing input...");
      await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay here
      setButtonText("Connect a Wallet");
      setErrorMessage("Error: This service requires active wallet connection.");
    }
  }}
  onChange={(e) => {
    setTitle(e.target.value);
    setIsButtonDisabled(false);
    setShowCloseSession(false);
  }}
/>

        {errorMessage && <p className="text-xs text-red-600 ">{errorMessage}</p>}
        {!isBalanceFetched && (
          <Button
          className=""
          color={buttonText === "Connect a Wallet" ? "secondary" : "primary"}
          disabled={!isInputClicked} // Button is disabled if input box is not clicked
          onClick={async () => {
            setButtonText("Fetching Wallet...");
            try {
              const response = await fetch('https://legendary-dollop-44wvvjjg74xfqq6r-3000.app.github.dev/api/config/balance');
              const data = await response.json();
              await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay here
              setButtonText(`Balance: ${data.balance}`);
              setBalanceFetched(data.balance); // Set balanceFetched to the fetched balance
              setIsBalanceFetched(true); // Set this to true after successful fetch
              setErrorMessage(""); // Reset the error message
            } catch (error) {
              setErrorMessage("Error: Failed to fetch balance.");
              console.error('Failed to fetch balance:', error);
              setButtonText("Retry"); // Set button text to "Retry" if fetch fails
            }
          }}
        >
          {buttonText}
        </Button>
        

        )}
    
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {isBalanceFetched &&
          <Button
            className=""
            color="secondary"
            isLoading={loadingState}
            type="submit"
            disabled={isButtonDisabled}
          >
            Match from Pool
          </Button>}
        </div>
      </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img src={data.image} alt={data.title} style={{ borderRadius: '10%', width: '100%' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-3xl font-bold text-white bg-gray-500 bg-opacity-50 w-full text-center py-2 overflow-hidden whitespace-pre-wrap">{data.title}</h1>
              </div>
            </div>
            <div className="text-left">
              <p className="text-lg"><strong>Author:</strong> {data.author}</p>
              <p className="text-lg"><strong>Publication Year:</strong> {data.publicationYear}</p>
              <p className="text-lg"><strong>Genre:</strong> {data.genre}</p>
            </div>
            {!showContent && (
              <Card className="mt-4">
                <CardBody>
                  <p className="text-lg text-justify"><strong>Summary:</strong> {data.summary}</p>
                </CardBody>
              </Card>
            )}
            {showContent && (
              <>
                <h2 className="text-x font-bold mt-6 ml-4 text-left underline">Full Text:</h2>
                <Card className="mt-0 max-h-[500px] overflow-auto">
                  <CardBody>
                    <p className="text-lg text-justify">{data.content}</p>
                  </CardBody>
                </Card>
              </>
            )}
            {!isPaymentComplete && !showContent && (
              <>
                <div className="flex justify-center mt-4">
                  <span
                    className="bg-blue-200 px-2 py-1 rounded cursor-pointer"
                    onClick={() => setShowReviews(!showReviews)}
                  >
                    {showReviews ? 'Hide Review' : `Reviews: ${data.reviews.length}`}
                  </span>
                </div>
                {showReviews && (
                  <div className="flex flex-col items-start mt-4 overflow-auto max-h-60 bg-gray-200 p-4 rounded">
                    {data.reviews.map((review, index) => (
                      <div key={index}>
                        <p><strong>{review.reviewer}</strong> rated it {review.rating} stars</p>
                        <p>{review.text}</p>
                        {index < data.reviews.length - 1 && <hr className="my-2 border-t-2 border-gray-400" />}
                      </div>
                    ))}
                  </div>
                )}
                {!isPaymentComplete && (
                  <Button className="mt-4" color="secondary" onClick={handleBorrow} disabled={isBorrowLoading}>
                    {isBorrowLoading ? 'Processing...' : 'Borrow book for 0.01 algo'}
                  </Button>
                )}
              </>
            )}
            {isPaymentComplete && (
              <>
                <p className="text-gray-600 mt-2">Payment complete</p>
                {!showContent && (
                  <Button className="mt-2" color="secondary" onClick={handleReadNow}>
                    Read Now
                  </Button>
                )}
              </>
            )}
          </div>
        </CardBody>
      ) : null}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {data && !showCloseSession && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
      {showContent && (
        <div className="flex justify-center mb-4">
          <Button className="mt-2" color="secondary" onClick={handleCloseSession}>
            Close Session
          </Button>
        </div>
      )}
    </Card>
  );
};

export default BookCard;
