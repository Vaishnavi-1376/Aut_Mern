import React, { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-4">
        <button onClick={() => setPage("login")} className="px-4 py-2 bg-green-600 text-white rounded">
          Login
        </button>
        <button onClick={() => setPage("register")} className="px-4 py-2 bg-blue-600 text-white rounded">
          Register
        </button>
      </div>
      {page === "login" ? <Login /> : <Register />}
    </div>
  );
}

export default App;
