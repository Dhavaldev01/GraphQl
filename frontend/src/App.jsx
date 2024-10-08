import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Transactionpage from "./pages/Transactionpage";
import SignUpPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/ui/Header";

function App() {
  const authUser = false;
  return (
    <>
   { authUser && <Header/>}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/transaction/:id" element={<Transactionpage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
