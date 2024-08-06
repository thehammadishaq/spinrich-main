// import { useState, useEffect } from "react";
// import { Wheel } from "react-custom-roulette";
// import io from "socket.io-client";
// import PropTypes from "prop-types";
// import { toast } from "sonner";

// const data = [
//   { option: "0", style: { backgroundColor: "red", textColor: "white" } },
//   { option: "1x", style: { backgroundColor: "blue", textColor: "white" } },
//   { option: "2x", style: { backgroundColor: "green", textColor: "white" } },
//   { option: "1.5x", style: { backgroundColor: "yellow", textColor: "black" } },
//   {
//     option: "1 new turn",
//     style: { backgroundColor: "orange", textColor: "white" },
//   },
//   { option: "0.5x", style: { backgroundColor: "purple", textColor: "white" } },
// ];

// const socket = io("http://localhost:5000");

// const SpinnerWithButton = ({ withdrawalRequests, setWithdrawalRequests }) => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);
//   const [playerCoins, setPlayerCoins] = useState(60);
//   const [message, setMessage] = useState("");
//   const [showAlert, setShowAlert] = useState(false);
//   const [turnCount, setTurnCount] = useState(0);
//   const [freeTurn, setFreeTurn] = useState(false);
//   const [showWithdrawForm, setShowWithdrawForm] = useState(false);
//   const [formValues, setFormValues] = useState({
//     accountTitle: "",
//     accountNumber: "",
//     userName: "",
//     coins: 0,
//   });

//   useEffect(() => {
//     socket.on("result", ({ message }) => {
//       setMessage(message);
//       setShowAlert(true);
//     });

//     return () => {
//       socket.off("result");
//     };
//   }, []);

//   useEffect(() => {
//     if (!mustSpin && showAlert) {
//       setTimeout(() => {
//         toast(message);
//         setShowAlert(false);
//       }, 1000);
//     }
//   }, [mustSpin, showAlert, message]);

//   const handleSpinClick = () => {
//     if (playerCoins >= 10 || freeTurn) {
//       if (!freeTurn) {
//         setPlayerCoins(playerCoins - 10);
//       } else {
//         setFreeTurn(false);
//       }

//       let newPrizeNumber;
//       if (turnCount === 0) {
//         const firstTurnOptions = [1, 3, 4, 5];
//         newPrizeNumber =
//           firstTurnOptions[Math.floor(Math.random() * firstTurnOptions.length)];
//       } else if (turnCount === 1) {
//         const secondTurnOptions = [0, 1, 3, 4, 5];
//         newPrizeNumber =
//           secondTurnOptions[
//             Math.floor(Math.random() * secondTurnOptions.length)
//           ];
//       } else {
//         newPrizeNumber = Math.floor(Math.random() * data.length);
//       }

//       setPrizeNumber(newPrizeNumber);
//       setMustSpin(true);
//       setTurnCount(turnCount + 1);
//     } else {
//       toast("Not enough coins!");
//     }
//   };

//   const handleStopSpinning = () => {
//     setMustSpin(false);

//     const prize = data[prizeNumber].option;
//     switch (prize) {
//       case "1x":
//         setPlayerCoins((prev) => prev + 10);
//         setMessage("You won 1x! 10 coins added.");
//         break;
//       case "1.5x":
//         setPlayerCoins((prev) => prev + 15);
//         setMessage("You won 1.5x! 15 coins added.");
//         break;
//       case "0.5x":
//         setPlayerCoins((prev) => prev + 5);
//         setMessage("You won 0.5x! 5 coins added.");
//         break;
//       case "1 new turn":
//         setFreeTurn(true);
//         setMessage("You won a free turn! Spin again without losing coins.");
//         break;
//       case "2x":
//         setMessage("You won 2x! No additional coins awarded.");
//         break;
//       default:
//         setMessage("No prize this time.");
//         break;
//     }

//     setShowAlert(true);
//   };

//   const handleWithdrawClick = () => {
//     setFormValues({
//       accountTitle: "",
//       accountNumber: "",
//       userName: "",
//       coins: playerCoins,
//     });
//     setShowWithdrawForm(true);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     let newdata = {
//       accountTitle: "",
//       accountNumber: "",
//       userName: "",
//       coins: "",
//     };
//     newdata = formValues;
//     if (newdata) {
//       setWithdrawalRequests([...withdrawalRequests, newdata]);
//       // console.log(withdrawalRequests);

//       setPlayerCoins(0);
//       setShowWithdrawForm(false);
//       toast("You will receive the money in 2 to 3 hours.");
//       // Send this data to the server (use socket.io or a POST request)
//     } else {
//       toast.error("All fields are required.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-4 text-white">
//       <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-6">
//         <h2 className="text-4xl font-bold text-center mb-12">SpinRich</h2>
//         <p className="text-center text-lg mb-4">Coins: {playerCoins}</p>
//         <div className="relative flex justify-center items-center mb-4">
//           <Wheel
//             mustStartSpinning={mustSpin}
//             prizeNumber={prizeNumber}
//             data={data}
//             onStopSpinning={handleStopSpinning}
//           />
//         </div>
//         <button
//           onClick={handleSpinClick}
//           className="bg-orange-600 mt-8 text-white font-semibold rounded-full w-full py-3 transition duration-300 ease-in-out hover:bg-orange-500 disabled:bg-gray-400"
//           disabled={mustSpin}
//         >
//           Spin
//         </button>
//         <button
//           onClick={handleWithdrawClick}
//           className="bg-red-500 mt-4 text-white font-semibold rounded-full w-full py-3 transition duration-300 ease-in-out hover:bg-red-700"
//         >
//           Withdraw
//         </button>
//       </div>

//       {showWithdrawForm && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
//           <form
//             onSubmit={handleFormSubmit}
//             className="bg-white p-6 rounded-lg z-50"
//           >
//             <h3 className="text-2xl font-bold mb-4">Withdrawal Form</h3>
//             <div className="mb-4">
//               <label className="block text-sm font-bold mb-2">
//                 Account Title
//               </label>
//               <input
//                 type="text"
//                 name="accountTitle"
//                 value={formValues.accountTitle}
//                 onChange={handleFormChange}
//                 className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-bold mb-2">
//                 Account Number
//               </label>
//               <input
//                 type="text"
//                 name="accountNumber"
//                 value={formValues.accountNumber}
//                 onChange={handleFormChange}
//                 className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-bold mb-2">Username</label>
//               <input
//                 type="text"
//                 name="userName"
//                 value={formValues.userName}
//                 onChange={handleFormChange}
//                 className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-bold mb-2">Coins</label>
//               <input
//                 type="text"
//                 name="coins"
//                 value={formValues.coins}
//                 readOnly
//                 className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none bg-gray-200"
//               />
//             </div>
//             <button
//               type="submit"
//               className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// // PropTypes validation
// SpinnerWithButton.propTypes = {
//   withdrawalRequests: PropTypes.arrayOf(
//     PropTypes.shape({
//       accountTitle: PropTypes.string.isRequired,
//       accountNumber: PropTypes.string.isRequired,
//       userName: PropTypes.string.isRequired,
//       coins: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   setWithdrawalRequests: PropTypes.func.isRequired,
// };

// export default SpinnerWithButton;

//New Code

import { useState, useEffect, useRef } from "react";
import { Wheel } from "react-custom-roulette";
import io from "socket.io-client";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { getDatabase, ref, onValue, update, set } from "firebase/database"; // Firebase functions
import { getAuth } from "firebase/auth"; // Import Firebase authentication
import useClickOutsideDetector from "../Hooks/useClickOutsideDetector";

const data = [
  { option: "0", style: { backgroundColor: "red", textColor: "white" } },
  { option: "1x", style: { backgroundColor: "blue", textColor: "white" } },
  { option: "2x", style: { backgroundColor: "green", textColor: "white" } },
  { option: "1.5x", style: { backgroundColor: "yellow", textColor: "black" } },
  {
    option: "1 new turn",
    style: { backgroundColor: "orange", textColor: "white" },
  },
  { option: "0.5x", style: { backgroundColor: "purple", textColor: "white" } },
];

const socket = io("http://localhost:5000");

const SpinnerWithButton = ({ withdrawalRequests, setWithdrawalRequests }) => {
  const ref2 = useRef(null);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [playerCoins, setPlayerCoins] = useState(0); // Initialize to 0
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const [freeTurn, setFreeTurn] = useState(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState(false);
  const [formValues, setFormValues] = useState({
    accountTitle: "",
    accountNumber: "",
    userName: "",
    coins: 0,
  });

  const auth = getAuth();
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const db = getDatabase();
      const dbRef = ref(db, `users/${auth?.currentUser?.uid}`);
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          setPlayerCoins(data.coins || 0); // Set initial coins
        }
      });
    }
  }, [userId]);

  useEffect(() => {
    socket.on("result", ({ message }) => {
      setMessage(message);
      setShowAlert(true);
    });

    return () => {
      socket.off("result");
    };
  }, []);

  useEffect(() => {
    if (!mustSpin && showAlert) {
      setTimeout(() => {
        toast(message);
        setShowAlert(false);
      }, 1000);
    }
  }, [mustSpin, showAlert, message]);

  const updateCoinsInFirebase = (newCoins) => {
    if (userId) {
      const db = getDatabase();
      const dbRef = ref(db, `users/${auth?.currentUser?.uid}`);
      update(dbRef, { coins: newCoins });
    }
  };

  const handleSpinClick = () => {
    if (playerCoins >= 10 || freeTurn) {
      if (!freeTurn) {
        const newCoins = playerCoins - 10;
        setPlayerCoins(newCoins);
        updateCoinsInFirebase(newCoins);
      } else {
        setFreeTurn(false);
      }

      let newPrizeNumber;
      if (turnCount === 0) {
        const firstTurnOptions = [1, 3, 4, 5];
        newPrizeNumber =
          firstTurnOptions[Math.floor(Math.random() * firstTurnOptions.length)];
      } else if (turnCount === 1) {
        const secondTurnOptions = [0, 1, 3, 4, 5];
        newPrizeNumber =
          secondTurnOptions[
            Math.floor(Math.random() * secondTurnOptions.length)
          ];
      } else {
        newPrizeNumber = Math.floor(Math.random() * data.length);
      }

      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setTurnCount(turnCount + 1);
    } else {
      toast("Not enough coins!");
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);

    const prize = data[prizeNumber].option;
    let newCoins = playerCoins;
    switch (prize) {
      case "1x":
        newCoins += 10;
        setMessage("You won 1x! 10 coins added.");
        break;
      case "1.5x":
        newCoins += 15;
        setMessage("You won 1.5x! 15 coins added.");
        break;
      case "0.5x":
        newCoins += 5;
        setMessage("You won 0.5x! 5 coins added.");
        break;
      case "1 new turn":
        setFreeTurn(true);
        setMessage("You won a free turn! Spin again without losing coins.");
        break;
      case "2x":
        setMessage("You won 2x! No additional coins awarded.");
        break;
      default:
        setMessage("No prize this time.");
        break;
    }

    setPlayerCoins(newCoins);
    updateCoinsInFirebase(newCoins);
    setShowAlert(true);
  };

  const handleWithdrawClick = () => {
    setFormValues({
      accountTitle: "",
      accountNumber: "",
      userName: "",
      coins: playerCoins,
    });
    setShowWithdrawForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newdata = formValues;
    if (newdata.accountTitle && newdata.accountNumber && newdata.userName) {
      setWithdrawalRequests([...withdrawalRequests, newdata]);
      const db = getDatabase();
      const withdrawalRef = ref(db, `withdrawals/${auth?.currentUser?.uid}`);
      const userRef = ref(db, `users/${auth?.currentUser?.uid}`);

      set(withdrawalRef, newdata).then(() => {
        update(userRef, { coins: 0 });
      });

      setPlayerCoins(0);
      setShowWithdrawForm(false);
      toast("You will receive the money in 2 to 3 hours.");
    } else {
      toast.error("All fields are required.");
    }
  };

  // Outside Click Detector

  useClickOutsideDetector(ref, () => {
    setShowWithdrawForm(false);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black via-gray-800 to-gray-900 p-4 text-white">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-4xl font-bold text-center mb-12">SpinRich</h2>
        <p className="text-center text-lg mb-4">Coins: {playerCoins}</p>
        <div className="relative flex justify-center items-center mb-4">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={handleStopSpinning}
          />
        </div>
        <button
          onClick={handleSpinClick}
          className="bg-orange-600 mt-8 text-white font-semibold rounded-full w-full py-3 transition duration-300 ease-in-out hover:bg-orange-500 disabled:bg-gray-400"
          disabled={mustSpin}
        >
          Spin
        </button>
        <button
          onClick={handleWithdrawClick}
          className="bg-red-500 mt-4 text-white font-semibold rounded-full w-full py-3 transition duration-300 ease-in-out hover:bg-red-700"
        >
          Withdraw
        </button>
      </div>

      {showWithdrawForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 ">
          <form
            onSubmit={handleFormSubmit}
            ref={ref2}
            className="bg-white p-6 rounded-lg z-50 w-[400px] !text-black"
          >
            <h3 className="text-2xl font-bold mb-4">Withdrawal Form</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Account Title
              </label>
              <input
                type="text"
                name="accountTitle"
                value={formValues.accountTitle}
                onChange={handleFormChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={formValues.accountNumber}
                onChange={handleFormChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Username</label>
              <input
                type="text"
                name="userName"
                value={formValues.userName}
                onChange={handleFormChange}
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Coins</label>
              <input
                type="text"
                name="coins"
                value={formValues.coins}
                readOnly
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none bg-gray-200"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

// PropTypes validation
SpinnerWithButton.propTypes = {
  withdrawalRequests: PropTypes.arrayOf(
    PropTypes.shape({
      accountTitle: PropTypes.string.isRequired,
      accountNumber: PropTypes.string.isRequired,
      userName: PropTypes.string.isRequired,
      coins: PropTypes.number.isRequired,
    })
  ).isRequired,
  setWithdrawalRequests: PropTypes.func.isRequired,
};

export default SpinnerWithButton;
