
//REACT ROUTER DOM
import { useNavigate } from "react-router-dom";
import { useUserContex } from "../components/UserContext";
//FIREBASE LIBS
import { auth } from "../firebaseCofig";
import { onAuthStateChanged } from "firebase/auth";

const CheckUser = ({ children }) => {
  const navigate = useNavigate();
  const { setUser } = useUserContex();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser.uid);
    } else {
      navigate("/");
    }
  });

  return children;
};

 CheckUser;
