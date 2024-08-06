// import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { IsUserSignedIn } from "../Utils/Helpers";
import { toast } from "sonner";

const Home = () => {
  let islogedin = IsUserSignedIn();
  const navigate = useNavigate("");

  const CheckingStatus = () => {
    if (islogedin) {
      navigate("/lucky-draw");
    } else {
      toast.error("Please Login To Play the Game");
      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-orange-500">
      <h1 className="text-6xl font-extrabold mb-8">SpinRich</h1>
      <p className="text-center text-lg mb-6">
        Play one spin for 20 RS. Remember to withdraw your winnings before
        leaving!
      </p>
      <button
        onClick={CheckingStatus}
        className="px-8 py-3 bg-orange-600 text-white rounded-full text-2xl transition duration-300 ease-in-out hover:bg-orange-500 glow-effect"
      >
        Play Game
      </button>
      <footer className="absolute bottom-4">
        <Link to="/admin" className="text-sm text-gray-400 hover:text-gray-300">
          Admin Login
        </Link>
      </footer>
    </div>
  );
};

export default Home;

// import { Link } from 'react-router-dom';

// const Home = () => {
//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//             <h1 className="text-5xl font-bold mb-8">SpinRich</h1>
//             <div>
//                 <Link to="/lucky-draw" className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-4">PlayGame</Link>
//             </div>
//         </div>
//     );
// };

// export default Home;
