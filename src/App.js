import React , {useState} from "react";
import Dashboard from "./Dashboard";
import EmployerDashboard from "./EmployerDashboard";
import TDAGradSearch from "./TDAGradSearch";
import { ApiClient } from "./apiClient";
import Login from "./Login";
import './Buttons.css';
import {Button} from 'react-bootstrap';


function App() {

  const [token,changeToken] = useState(window.localStorage.getItem("token"));
  const [roles,changeRoles] = useState(window.localStorage.getItem("roles"));

  //stores token and roles on local storage
  const login = (newToken, newRoles) => {
    console.log(newRoles)
    window.localStorage.setItem("token",newToken)
    window.localStorage.setItem("roles",newRoles)
    changeToken(newToken);
    changeRoles(newRoles);
  }

  //removes token and roles on local storage when user logs out
  const logout = () => {
    window.localStorage.removeItem("token")
    window.localStorage.removeItem("roles")
    changeToken(undefined);
    changeRoles(undefined);
  }

  const client = new ApiClient(token, logout);


  //Sets up permissions for each user role and displays relevant views
  const page = () => {

    console.log(roles)

      if (roles === "GRADUATE") { 
          return <Dashboard client={client} token={token} />
      } else if (roles === "EMPLOYER") {
          return  <EmployerDashboard client={client}  />
          } else if (roles === "TDA") {
              return  <TDAGradSearch client={client}  /> 
          } else {
            logout() 
            console.log("no role");
          }      
    }



  return (
    <>
      {token ? (
        <>

        <Button  className = "logoutButton" onClick= {logout} size="sm">
          Log Out
        </Button>

    
        { page() }
         
        </>
      ) : (
        <Login loggedIn={(token, roles) => login(token, roles)} client={client} />
      )
      } 
    </>
  );
}
    


export default App;
