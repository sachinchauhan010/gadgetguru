import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Context from "./context";
function App() {
  const fetchUserDetails = async () => {
    const dataResponse = await fetch("http://localhost:8000/api/user-details", {
      method: "GET",
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    console.log("User Data", dataApi);
  };
  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <Context.Provider value={{fetchUserDetails}}>
      <ToastContainer />
      <Header />
      <Outlet />
    </Context.Provider>
  );
}

export default App;
