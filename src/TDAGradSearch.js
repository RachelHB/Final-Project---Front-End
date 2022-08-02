import React, { useState, useEffect} from "react";
import './App.css';
import './TDAGradSearch.css';
import './Login.css';
import './Navigation.css';
import './Buttons.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Add from './Add';
import logo from "./TDA Logo.jpg";


function TDAGradSearch(props) {
  const [profiles, cProfiles] = useState([]);
  const [current, cCurrent] = useState(undefined);
  const [unfilter, unfilterProfiles] = useState([]);
  const [visibleOutput, setVisibleOutput] = useState(false);
  const [visibleInput, setVisibleInput] = useState(true);


  const refreshList = () => {
    props.client.getProfiles().then((response) => {
    // console.log(response.data)
    cProfiles(response.data)
    unfilterProfiles(response.data)             
    })
  };

  const filters = (tech) => {
    // console.log(profiles)
    cProfiles (profiles.filter(profiles => {
      return profiles.fullName.toUpperCase().includes(tech);
        }
    ))
  };

  const rolefilters = (tech) => {
    // console.log(profiles)
    cProfiles (profiles.filter(profiles => {
      return profiles.roles.toUpperCase().includes(tech);
        }
    ))
  };

  const unfilters = () => {
    cProfiles (unfilter);
    document.getElementById("search").value = "";
  };

  const roleunfilters = () => {
    cProfiles (unfilter);
    document.getElementById("searchroles").value = "";
  };

  const removeProfile = (id) => {
    props.client.removeProfile(id).then(() => refreshList());
  };

  const updateProfile = (profile) => {
    cCurrent(profile);
  };

  useEffect(() => {
    refreshList();
  }, []);

  const NewGrad = () => {
    return profiles.map((current) => {
      return (
        <div className="gradProfile" key={current._id}>
            <div className = "gradCard">
              <div className="topLeft">
                <h3>User Name:</h3>
                <tb>{current.userName}</tb>

                <h3>Password:</h3>
                <tb>{current.password}</tb>

                <h3>Profile Role:</h3>
                <tb>{current.roles}</tb> 
                
                <h3>Full Name:</h3>                       
                <tb>{current.fullName}</tb>  
                
                <h3>Course Title:</h3>
                <tb>{current.courseTitle}</tb>  
 
                <h3>List of Skills:</h3>
                <tb>{current.skills}</tb>   

                <h3>Employed?</h3>     
                
                <tb>{current.employed}</tb> 
              </div>    

              <div className="topRight">
                <h3>Email:</h3>
                <tb>{current.email}</tb>

                <h3>Contact Number:</h3>
                <tb>{current.contactNumber}</tb>   

                <h3>City:</h3>
                <tb>{current.city}</tb>

                <h3>LinkedIn:</h3>
                <a href={current.linkedIn} target="_blank" rel="noopener noreferrer"> {current.linkedIn} </a> <br></br> <br></br>

                <h3>GitHub:</h3>       
                <a href={current.gitHub} target="_blank" rel="noopener noreferrer"> {current.gitHub} </a> <br></br>  <br></br>     

                <h3>Portfolio Page:</h3>
                <a href={current.portfolio} target="_blank" rel="noopener noreferrer"> {current.portfolio} </a>    <br></br>
              </div>                                                                       
            </div>
            <br></br> 

            <div className="bioSpace">
                <h3 className="bioTitle">Full Bio:</h3>
                <tb>{current.bio}</tb>
            </div>

            
            <div className="editRemoveButtons">
                <button className = "editButton"  onClick={() => {updateProfile(current); setVisibleInput(false); setVisibleOutput(true)}}> Edit Profile</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                <button className = "removeButton"  onClick={() => removeProfile (current._id)}> Remove Profile</button>  
            </div>
            <br></br> 
            <br></br>
                     
        </div>
                
      );
    });
  };
  
  const NewEmployer = () => {
    return profiles.map((current) => {
      return (
        <div key={current._id}>
            <div className = "gradCard">

              <tb className = "fieldSpace"><strong>Full Name:</strong>   {current.fullName}</tb>                
              <tb className = "fieldSpace"><strong>Email:</strong> {current.email}</tb>
              <tb className = "fieldSpace"><strong>Contact Number:</strong>   {current.contactNumber}</tb>   
              <tb className = "fieldSpace"><strong>City:</strong>   {current.city}</tb>
              <tb className = "fieldSpace"><strong>Full Bio:</strong> {current.bio}</tb>
              <button className = "login-submit2"  onClick={() => {updateProfile(current); setVisibleInput(false); setVisibleOutput(true)}}> Edit Employer Profile</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
              <button className = "login-submit2"  onClick={() => removeProfile (current._id)}> Remove Employer Profile</button>  
              <br></br>         
              <br></br>

            </div>
        </div>
      );
    });
  };


  return (
    <>


      {/* /****Navigation Bar****************************************************************************************************************************/}
          
      <Navbar  className = "header col-md-12">
        <Container >
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="140"
              height="140"
              // className="d-inline-block align-top"
              alt="TDA logo"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>


      {/* /****Main Container*********************************************************************************************************************************/}

      <Container fluid className = " row mainFrame col-md-12">
      
        {/* /****Column 1 - Image and links***************************************************************************************************************/}
      
        <div className =" leftPannel col-md-2">
     
          <Row>
            <h1 className="tda"> the 
              <br></br>DEVELOPER 
              <br></br>Academy
            </h1>

                {/*create a new Gradute */}
                <div className="innerLeftPannel">
                  <><p>Create a new Graduate Profile</p></>
                  
                  <button className = "createNewButton"  onClick={() => {updateProfile(current); setVisibleInput(false); setVisibleOutput(true)}}> Create New Profile</button>
                  <br></br>
                  <br></br>

                  <><p>Search for a Graduate by Full Name</p></>
                  
                  <><input type="text" id="search" onChange={() => filters(document.getElementById("search").value.toUpperCase())}/></>
                  <br></br>
                              
                  <button className="clearButton" onClick={() =>  unfilters("Clear Filters")}> 
                    Clear               
                  </button>          
                  
                  <br></br>
                  <br></br>
                  <><p>Search for a Profiles by Roles</p></>

                  <><input type="text" id="searchroles" onChange={() => rolefilters(document.getElementById("searchroles").value.toUpperCase())}/></>             
                  <br></br>
             
                  <button className="clearButton" onClick={() =>  roleunfilters("Clear Filters")}> 
                      Clear            
                  </button>
              
                </div>

          </Row>

          <br></br>

        </div>

        {/* /****Column 2 - Name, details and 2 tabs***************************************************************************************************************/}      
      
        <div className = "col-md-10">

            {/* /****Column 2/1 - User Input form***************************************************************************************************************/}  
            <Container className = "rightSection col-md-10">

              {visibleOutput && 

                    <div className = "editProfile">
                      <Add
                        client={props.client}
                        refreshList={() => {
                          refreshList();
                          cCurrent(undefined);
                          window.location.reload(true) 
                        }}
                        currentProfile={current}
                      />
                    </div>
                
                }


              {/* /****Column 2/2 - Profile Display table***************************************************************************************************************/}    
              <div className = "newGradDisplay col-md-5">

                {visibleInput &&  

                <div>
        
                  {NewGrad()}
                
                </div>

                } 
              
              </div>     
              
            </Container>

        </div>
         
      </Container>
        
    </>
  );
}

export default TDAGradSearch;


