// NextUI components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react"; // React's useState hook
import { getBookData } from "../api/actions.ts"; // API action
import { useWallet } from './walletContext.tsx'; // Wallet context

// BookCard component
const BookCard: React.FC = () => {
  // State variables
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
  const { isConnected, balance } = useWallet(); // Wallet status and balance
  const [buttonText, setButtonText] = useState("Match from Pool");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBalanceFetched, setIsBalanceFetched] = useState(false);
  const [balanceFetched, setBalanceFetched] = useState(0);
  const [isInputClicked, setIsInputClicked] = useState(false);

  // Search handler
  const handleSearch = () => {
    // Wallet connection and balance check
    if (!isConnected || balance <= 0) {
      setError('Please connect to wallet first\nor balance must be > 0');
      return;
    }

     // Count words in title
    const wordCount = title.trim().split(/\s+/).length;

    // Validate word count
    if (wordCount < 2 || wordCount > 4) {
      setError("Title must be between 2 - 4 words.");
      return;
    }
    
    setLoadingState(true); // Set loading state
    getBookData(title)  // Fetch book data
      .then((res) => {
        setError("");

        // Handle successful fetch
        if (res) {
          setData(res);
          setLoadingState(false);
          setIsButtonDisabled(true);
          setShowCloseSession(false);
        }
        // Fetch balance after successful search
      })
      .catch((error) => {
         // Handle fetch error
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  // Function to handle borrow operation
  const handleBorrow = () => {
    // Check wallet connection and balance
    console.log('handleBorrow is called');
    if (!isConnected || balance === 0) {
      setError('Please connect to wallet first');
      return;
    }

    setIsBorrowLoading(true); // Start borrow process
    setShowReviews(false);
    fetchBalance();

    // Simulate borrow process delay
    setTimeout(async () => {
      setIsBorrowLoading(false);
      setIsPaymentComplete(true);
      setShowReviews(true);
    }, 3000);
  };

  // Function to handle read now operation
  const handleReadNow = () => {
    setShowContent(true);
    setIsPaymentComplete(false);
    setShowReviews(false);
  };

  // Function to handle close session operation
  const handleCloseSession = () => {
    setData(undefined); // Reset state variables
    setTitle("");
    setError("");
    setShowContent(false);
    setIsButtonDisabled(false);
    setIsPaymentComplete(false);
    setShowReviews(false);
    setShowCloseSession(false);
    fetchBalance();  // Fetch balance
  };

  // Function to fetch balance
  const fetchBalance = async () => {
    try {
       // Fetch balance from API
      console.log('fetchBalance is called');
      const response = await fetch('https://legendary-dollop-44wvvjjg74xfqq6r-3000.app.github.dev/api/config/balance');
      const data = await response.json();

         // Update balanceFetched state
      setBalanceFetched(data.balance); // Update balanceFetched with the fetched balance
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  // Render component
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex justify-center gap-3">
        <form

        // Prevent form submission if balance is not fetched
          onSubmit={(e) => {
            if (!isBalanceFetched) {
              e.preventDefault();
              return;
            }

            // Prevent default form submission and trigger search
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-0 space-y-4 items-center">
            {/* Display wallet balance if fetched */}
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

              // Handle input click
              onClick={async () => {
                setIsInputClicked(true); // Set isInputClicked to true when input box is clicked
                if (!isBalanceFetched) { // Only set buttonText and errorMessage if balance is not fetched
                  setButtonText("Processing input...");
                  await new Promise(resolve => setTimeout(resolve, 2000)); // Add delay here
                  setButtonText("Connect a Wallet");
                  setErrorMessage("Error: This service requires active wallet connection.");
                }
              }}

              // Handle input change
              onChange={(e) => {
                setTitle(e.target.value);
                setIsButtonDisabled(false);
                setShowCloseSession(false);
              }}
            />

            {/* Display error message if exists */}
            {errorMessage && <p className="text-xs text-red-600 ">{errorMessage}</p>}
            {!isBalanceFetched && (
              <Button
                className=""
                color={buttonText === "Connect a Wallet" ? "secondary" : "primary"}
                disabled={!isInputClicked} // Button is disabled if input box is not clicked
                
                // Handle button click
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

                    // Handle fetch error
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

            {/* Display error message if exists */}
            {error && <p className="text-xs text-red-600 ">{error}</p>}

            {/* Display match button if balance is fetched */}
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

       {/* Display book data if exists */}
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              {/* Display book image */}
              <img src={data.image} alt={data.title} style={{ borderRadius: '10%', width: '100%' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                 {/* Display book title */}
                <h1 className="text-3xl font-bold text-white bg-gray-500 bg-opacity-50 w-full text-center py-2 overflow-hidden whitespace-pre-wrap">{data.title}</h1>
              </div>
            </div>

            {/* Display book details */}
            <div className="text-left">
              <p className="text-lg"><strong>Author:</strong> {data.author}</p>
              <p className="text-lg"><strong>Publication Year:</strong> {data.publicationYear}</p>
              <p className="text-lg"><strong>Genre:</strong> {data.genre}</p>
            </div>
            
            {/* Display book summary if content is not shown */}
            {!showContent && (
              <Card className="mt-4">
                <CardBody>
                  <p className="text-lg text-justify"><strong>Summary:</strong> {data.summary}</p>
                </CardBody>
              </Card>
            )}

            {/* Display book content if content is shown */}
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

            {/* Display reviews and borrow button if payment is not complete and content is not shown */}
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

                  {/* Display payment complete message and read now button if payment is complete */}
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

           {/* Display last update message if data exists and session is not closed */}
          {data && !showCloseSession && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}

          {/* Display message if data does not exist */}
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
