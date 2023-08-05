import { RouterProvider } from "react-router-dom";
import router from "./Routes/router";
import "./App.css";
import PostContextProvider from "./Context/PostContext";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router} />
      </PostContextProvider>
    </AuthProvider>
  );
}

export default App;
