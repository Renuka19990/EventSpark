import React, { createContext, useContext, useState } from "react";
import axios from "axios"
const AuthContext = createContext();

const userRes = {
  isAuth: false,
  token: "",
  isAdmin: "",
};

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(userRes);

  const handleLogin = async ({ email, password }) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(email, password);
        const res = await axios.post("https://eventspark-ldbp.onrender.com/login", {
          email,
          password,
        });
        // setAuth(res.data.isAuth);
        if (res) {
          console.log(res);
          setLoggedIn({
            isAuth: true,
            token: res.data.token,
            isAdmin: res.data.role,
          });
        }
        // console.log(res.data.accessToken);
        localStorage.setItem("accessToken", res.data.token);
        resolve();
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  };
  console.log(LoggedIn);

  const handleSignUp = async (obj) => {
    try {
      const res = await axios.post("https://eventspark-ldbp.onrender.com/register", obj);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
            try {
              const token = localStorage.getItem("accessToken");
              const res = await axios.get("https://eventspark-ldbp.onrender.com/logout", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log(res);
              setLoggedIn(userRes);
              localStorage.removeItem("accessToken");
            } catch (error) {
              console.log(error);
            }
          };


  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  //
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout,handleLogout,handleSignUp,handleLogin,LoggedIn,setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// import { useState } from "react";
// import { createContext } from "react";
// import axios from "axios";

//   const userRes={
//     isAuth:false,
//     token:"",
//     isAdmin:false
//   }
// export const AuthContext =createContext();
// export const AuthContextProvider=({children})=>{
//       const [isLoggedIn, setLoggedIn] = useState(userRes);

//       const handleLogin = async({ email, password }) => {
//          return new Promise(async(resolve,reject)=>{
//             try {
//                 console.log(email,
//                   password)
//                 const res = await axios.post("http://localhost:3000/user/login", {
//                   email,
//                   password,
//                 });
//                 // setAuth(res.data.isAuth);
//                 if(res){
//                   setLoggedIn({
//                     isAuth:true,
//                     token:res.data.accessToken,
//                     isAdmin:res.data.isAdmin
//                   })
//                 }
//                 console.log(res.data.accessToken)
//                 localStorage.setItem("accessToken",res.data.accessToken);
//                 resolve();
//               } catch (error) {
//                 console.log(error);
//                 reject();
//               }
//             ;
//          })

//       };

//       console.log(isLoggedIn);
//       const handleSignup = async (obj) => {
//           try {
//             const res = await axios.post("http://localhost:3000/user/register", obj);
//             console.log(res.data);
//           } catch (error) {
//             console.log(error);
//           }
//       };

//       const handleLogout = async () => {
//         try {
//           const token = localStorage.getItem("accessToken");
//           const res = await axios.get("http://localhost:3000/user/logout", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           console.log(res);
//           setLoggedIn(userRes);
//           localStorage.removeItem("accessToken");
//         } catch (error) {
//           console.log(error);
//         }
//       };

//     return(
//         <AuthContext.Provider value={{handleSignup,handleLogin,handleLogout,isLoggedIn}}>
//              {children}
//         </AuthContext.Provider>
//     )
// }
