import { Route, Routes } from "react-router-dom";
import Landing from "./routes/Home";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import TicketManager from "./routes/TicketManager";
import Signup from "./routes/SignUp";
function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/ticket-manager" element={<TicketManager/> } />
      </Routes>
    </>
  )
}

export default App
