import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Spinner from "./Components/Spinner";
import { useState } from "react";
import AdminPortal from "./Components/AdminPortal";
import "./index.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { Toaster } from "sonner";

function App() {
  const [withdrawalRequests, setWithdrawalRequests] = useState([
    {
      accountTitle: "John Doe",
      accountNumber: "03001234567",
      userName: "johndoe",
      coins: 10,
    },
    {
      accountTitle: "Jane Doe",
      accountNumber: "03007654321",
      userName: "janedoe",
      coins: 15,
    },
  ]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/lucky-draw"
            element={
              <Spinner
                withdrawalRequests={withdrawalRequests}
                setWithdrawalRequests={setWithdrawalRequests}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <AdminPortal
                withdrawalRequests={withdrawalRequests}
                setWithdrawalRequests={setWithdrawalRequests}
              />
            }
          />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from './Components/Home';
// import './index.css';
// import Spinner from './Components/Spinner';

// function App() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/lucky-draw" element={<Spinner />} />
//             </Routes>
//         </Router>
//     );
// }

// export default App;
