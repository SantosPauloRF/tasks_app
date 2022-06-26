import React, { createContext, useContext, useState } from "react"; 
import { auth } from '../firebaseCofig';
import {createUserWithEmailAndPassword } from "firebase/auth";


const userContext = createContext();

function useUserContex(){
    return useContext(userContext);
};




function UserContextProvedor( {children} ){

    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    

    const signInUser = (e) =>{
        e.preventDefault()
       createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            window.location.replace(`http://${window.location.host}/main/${credential.user.uid}`)
            
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage)
        });
        setPassword ("")
        setEmail ("")
    }

   return(
        <userContext.Provider value={ { 

            email, setEmail, 
            password, setPassword,
            setUser,
            signInUser

        } }> {children} </userContext.Provider>
    );
};

export {UserContextProvedor, useUserContex};
