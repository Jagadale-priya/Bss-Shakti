import React, {useState,useEffect } from 'react'
import urlData from "../UrlData"
import axios from 'axios';
import decrypt from "../views/Encryption/decrypt"
import encrypt from "../views/Encryption/encrypt"
import { useNavigate } from 'react-router-dom'
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];
 
  
  const AppLogout = ({ children }) => {
    const [mdata, setmdata] = useState(decrypt(JSON.parse(localStorage.getItem("mN")).subContent))
    // const [mdata, setmdata] = useState()
    const [adata, setadata] = useState(decrypt(JSON.parse(localStorage.getItem("data"))))
    const navigate = useNavigate();
    let timer;
  
  // this function sets the timer that logs out the user after 10 secs
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      // clears any pending timer.
      resetTimer();
      // Listener clean up. Removes the existing event listener from the window
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      // logs out user
      logoutAction();
    }, 900000); 
  };
  
  // this resets the timer if it exists.
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };
  
 
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);
  
  // logs out user by clearing out auth token in localStorage and redirecting url to /signin page.
  const logoutAction = () => {
    var data={};
    data.mobileNumber=mdata.mobileNumber
    var url=new URL(urlData+"admin/logout")
    let headers = {
      Authorization: adata.authToken,
    };
    var options = {
      method: "post",
      url: url,
      headers: headers,
      data:encrypt(data)
    };
    axios
    .request(options).then(response=>{
      navigate("/")
        localStorage.clear()
      }).catch(error=>{
          navigate('/')
          localStorage.clear()
      })
  };
  
    return children;
  };
  
  export default AppLogout;