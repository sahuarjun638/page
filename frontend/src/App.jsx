import React, { useState } from "react";

import Login from "./pag/login.jsx";
import Signup from "./pag/signup.jsx";

const App = () => {
  const [page, setPage] = useState("signup");

  const handleSignupSuccess = () => {
    setPage("login");
  };

  return (
    <div>
      <nav>
        {page === "signup" ? (
          <Signup onSignupSuccess={handleSignupSuccess} />
        ) : (
          <Login />
        )}
      </nav>
    </div>
  );
};

export default App;
