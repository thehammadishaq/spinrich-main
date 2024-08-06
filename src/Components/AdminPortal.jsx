import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { realtimeDb } from "../Config/FirebaseConfig";
import { onValue, ref, remove } from "firebase/database";
import { toast } from "sonner";

const AdminPortal = ({ withdrawalRequests, setWithdrawalRequests }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  //Get Data from Firebase

  const getData = () => {
    const databaseRef = ref(realtimeDb, `withdrawals`);
    // Get current user UID

    onValue(databaseRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  const adminCredentials = {
    username: "spinrich",
    password: "spinrich@123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      username === adminCredentials.username &&
      password === adminCredentials.password
    ) {
      setIsAuthenticated(true);
    } else {
      alert("Invalid login credentials");
    }
  };
  const handleDelete = (key) => {
    const userRef = ref(realtimeDb, `withdrawals/${key}`);
    remove(userRef)
      .then(() => {
        toast.success("User deleted successfully");
        // Remove the user from the local state
        setData((prevData) => {
          const updatedData = { ...prevData };
          delete updatedData[key];
          return updatedData;
        });
      })
      .catch((error) => {
        toast.error("Error Occured While Deleting User");
        console.error("Error deleting user: ", error);
      });
  };
  if (isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold mb-8">Admin Portal</h1>
        {data && Object.keys(data).length > 0 ? (
          <table className="table-auto bg-gray-800 rounded-lg p-6">
            <thead>
              <tr>
                <th className="px-4 py-2">Account Title</th>
                <th className="px-4 py-2">Account Number</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Coins</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((key) => {
                const user = data[key];
                return (
                  <tr
                    key={key}
                    className="bg-gray-700 border-b border-gray-600"
                  >
                    <td className="px-4 py-2">{user?.name || "N/A"}</td>
                    <td className="px-4 py-2">{user?.accountNumber}</td>
                    <td className="px-4 py-2">{user?.username || "N/A"}</td>
                    <td className="px-4 py-2">{user?.email}</td>
                    <td className="px-4 py-2">{user?.coins}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDelete(key)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-400 text-3xl">
            No data available
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// PropTypes validation
AdminPortal.propTypes = {
  withdrawalRequests: PropTypes.arrayOf(
    PropTypes.shape({
      accountTitle: PropTypes.string,
      accountNumber: PropTypes.string,
      userName: PropTypes.string,
      coins: PropTypes.number,
    })
  ).isRequired,
  setWithdrawalRequests: PropTypes.func.isRequired,
};

export default AdminPortal;
