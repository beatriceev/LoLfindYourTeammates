import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Home from "./components/Home";

import "./App.css";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Login from "./components/Login";
import Register from "./components/Register";
import Player from "./components/Player";
import { HookProvider } from "./hooks/useHook.js";

const authentication = localStorage.getItem("authentication");

function App() {
  return (
    <>
      <CssBaseline />
      <HookProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute isAllowed={!!authentication} />}>
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/player/:id" element={<Player />} />
            <Route path="*" element={<h1>Error, Page Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </HookProvider>
    </>
  );
}
const ProtectedRoute = ({ isAllowed, redirectPath = "/", children }) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
export default App;
