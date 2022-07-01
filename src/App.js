//REACT ROUTER DOM
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//PAGES
import Login from "pages/Login";
import Main from "pages/Main";
import Register from "pages/Register";
import ErrorPage from "pages/ErrorPage";
import CheckUser from "components/CheckUser";
//CONTEXT PROVIDER
import { UserContextProvedor } from "components/UserContext";

export default function App() {
  return (
    <>
    <UserContextProvedor>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route
          path="/Main/:user"
          element={
            <CheckUser>
              <Main />
            </CheckUser>
          }
        />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </UserContextProvedor>
    </>
  );
};
