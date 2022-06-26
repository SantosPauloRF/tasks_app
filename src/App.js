import React from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Main from "./pages/Main"
import Register from "./pages/Register"
import ErrorPage from "./pages/ErrorPage"
import CheckUser from "./components/CheckUser"
import {UserContextProvedor} from "./components/UserContext"

function App() {

  return (
   <>
    <UserContextProvedor>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Main/:user" element={
            <CheckUser>
              <Main />
            </CheckUser>
          } />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </UserContextProvedor>
   </>
  )
}

export default App;
