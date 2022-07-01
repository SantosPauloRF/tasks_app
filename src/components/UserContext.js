//REACT LIB
import { createContext, useContext, useState } from "react";
//FIREBASE LIBS
import { db, auth } from "../firebaseCofig";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword } from "firebase/auth";


const userContext = createContext();

function useUserContex() {
  return useContext(userContext);
}

function UserContextProvedor({ children }) {
  const [textoAtual, setTextoAtual] = useState("");
  const [tasks, setTasks] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const signInUser = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setUser(credential.user.uid);
        console.log("creatin user")
        setDoc(doc(db, "usersDB", credential.user.uid), {
          id: credential.user.uid,
          email: email,
          tasks: [],
        });
      })
      .catch((err) => {
        switch (err.message) {
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
              setError("*Senha deve conter no mínimo 6 caracteres");
              break;
          case "Firebase: Error (auth/email-already-in-use).":
              setError("*Email já cadastrado");
              break;  
          case "Firebase: Error (auth/wrong-password).":
              setError("*Senha incorreta");
              break;       
        default:
          setError(err.message);    
        };
      });
  };

  const getInfos = async () => {
    const docRef = doc(db, "usersDB", user);
    const docSnap = await getDoc(docRef);
    setTasks(docSnap.data().tasks);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser("");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        setUser(credential.user.uid);
       
      })
      .catch((err) => {
        switch (err.message) {
          case "Firebase: Error (auth/invalid-email).":
            setError("*Email inválido");
            break;
          case "Firebase: Error (auth/user-not-found).":
            setError("*Email não cadastrado");
            break;
          case "Firebase: Error (auth/wrong-password).":
            setError("*Senha incorreta");
            break;
          
            default:
            setError(err.message);
        }
      });
  };

  const handdleAddTask = (e) => {
    e.preventDefault();

    const userDoc = doc(db, "usersDB", user);
    updateDoc(userDoc, {
      tasks: arrayUnion(textoAtual),
    }).then(() => {
      setTasks((prev) => [...prev, textoAtual]);
    });

    setTextoAtual("");
  };

  const deleteTask = (value) => {
    const userDoc = doc(db, "usersDB", user);
    updateDoc(userDoc, {
      tasks: arrayRemove(value),
    });

    setTasks(
      tasks.filter((task) => {
        return task !== value;
      })
    );
  };

  return (
    <userContext.Provider
      value={{
        email, setEmail,
        password, setPassword,
        user, setUser,
        textoAtual, setTextoAtual,
        error, setError,
        tasks, setTasks,
        signInUser,
        handdleAddTask,
        deleteTask,
        getInfos,
        logout,
        login
      }}>
      {children} 
    </userContext.Provider>
  );
};

export { UserContextProvedor, useUserContex };
