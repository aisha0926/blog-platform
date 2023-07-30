import React, { useState } from "react";
import AppRouter from "./Routes/AppRouter";

const App = () => {
  // need  logic to handle login state
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      {/* render the AppRouter component and pass the loggedIn state and setLoggedIn function as props */}
      <AppRouter loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default App;
