import React, { useState, useEffect} from "react";
import './Employer.css';
import './Buttons.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import logo from "./TDA Logo.jpg";
import Table from 'react-bootstrap/Table'

function EmployerDashboard(props) {
  const [profiles, cProfiles] = useState([]);
  const [unfilter, unfilterProfiles] = useState([]);
  const [current, cCurrent] = useState(undefined);

  const refreshList = () => {
    // console.log(props.client.getProfiles())
    props.client.getEmployedProfile('No').then((response) => {
    cProfiles(response.data)
    unfilterProfiles(response.data)
    })
  };

  useEffect(() => {
    refreshList();
  }, []);

const filters = (tech) => {
    cProfiles (profiles.filter(profiles => {
    console.log(profiles.skills)
    return profiles.skills.includes(tech);
      }
  ))
};

const unfilters = () => {
  cProfiles (unfilter);
  window.location.reload(true) 
};

const section1 = () => {
  
    return profiles.map((current) => {      

      return (
        <Table> 
          <div key={current._id}>
          
            <div className = "gradCard1">
              <div><img className="profileImage" src={current.image} alt ="Grad Profile" width="100px" height="100px"/> <br></br><strong></strong></div>                  
              <tb className = "fieldSpace"><strong>Full Name:  </strong>   {current.fullName}</tb>  <br />
              <tb className = "fieldSpace"><strong>Course Title:  </strong>   {current.courseTitle}</tb>    <br /> 
              <tb className = "fieldSpace"><strong>Email:  </strong> {current.email}</tb> <br />
              <tb className = "fieldSpace"><strong>Contact Number:  </strong>   {current.contactNumber}</tb> <br />  
              <tb className = "fieldSpace"><strong>City:</strong>   {current.city}</tb>
              <br /><tb className = "fieldSpace"><strong>Full Bio:</strong> {current.bio}</tb><br />
              <tb className = "fieldSpace"><strong>List of Skills:</strong> {current.skills}</tb>   <br />                     
              <a href={current.linkedIn} target="_blank" rel="noopener noreferrer"><strong>LinkedIn:</strong> {current.linkedIn} </a> <br />          
              <a href={current.gitHub} target="_blank" rel="noopener noreferrer"><strong>GitHub:</strong> {current.gitHub} </a>   <br />           
              <a href={current.portfolio} target="_blank" rel="noopener noreferrer"><strong>Portfolio:</strong> {current.portfolio} </a>  <br />
              <a href={current.cv} target="_blank" rel="noopener noreferrer"><strong>C.V:</strong> {current.cv} </a>                      
              <br></br>         
              <br></br>
            </div>
            
          </div>  
        </Table>
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

    <Container fluid className = " row mainContainer col-md-12">
    
      <div className = " row  col-md-8">

        <div className = "EmployerForm">

          <h1><strong>Graduate Search For Employers</strong></h1>

            <form>
                <p><strong>Please select the skills you are looking for:</strong></p>
            
                <div className = "row">

                  <input type="checkbox" className = "Boxsize" name="Teamwork" onChange={() => filters("Teamwork")}/><label for="Teamwork">Teamwork</label>
                  <input type="checkbox" className = "Boxsize" name="GitHub" onChange={() => filters("GitHub")}/><label for="GitHub">GitHub</label>
                  <input type="checkbox" className = "Boxsize" name="HTML" onChange={() => filters("HTML")}/><label for="HTML">HTML</label>
                  <input type="checkbox" className = "Boxsize" name="Javascript" onChange={() => filters("Javascript")}/><label for="Javascript">Javascript</label> 
                  <input type="checkbox" className = "Boxsize" name="CSS" onChange={() => filters("CSS")}/><label for="CSS">CSS</label>
                  <input type="checkbox" className = "Boxsize" name="Bootstrap" onChange={() => filters("Bootstrap")}/><label for="Bootstrap">Bootstrap</label>
                  <input type="checkbox" className = "Boxsize" name="PHP" onChange={() => filters("PHP")}/><label for="PHP">PHP</label>
                  <input type="checkbox" className = "Boxsize" name="Flexbox" onChange={() => filters("Flexbox")}/><label for="Flexbox">Flexbox</label>
                  <input type="checkbox" className = "Boxsize" name="OOP" onChange={() => filters("OOP")}/><label for="OOP">OOP</label>
                  <input type="checkbox" className = "Boxsize" name="Paired_Programming" onChange={() => filters("Paired Programming")}/><label for="Paired Programming">Paired Programming</label>
                  <input type="checkbox" className = "Boxsize" name="TDD" onChange={() => filters("TDD")}/><label for="TDD">TDD</label>

                </div>

                <div className = "row2">

                  <br></br>
                  <input type="checkbox" className = "Boxsize" name="MongoDB" onChange={() => filters("MongoDB")}/><label for="MongoDB">MongoDB</label>
                  <input type="checkbox" className = "Boxsize" name="SASS" onChange={() => filters("SASS")}/><label for="SASS">SASS</label>
                  <input type="checkbox" className = "Boxsize" name="Agile" onChange={() => filters("Agile")}/><label for="Agile">Agile</label>
                  <input type="checkbox" className = "Boxsize" name="REST_API" onChange={() => filters("REST API")}/><label for="REST API">REST API</label>
                  <input type="checkbox" className = "Boxsize" name="Express" onChange={() => filters("Express")}/><label for="Express">Express</label>
                  <input type="checkbox" className = "Boxsize" name="Regular_Expressions" onChange={() => filters("Regular Expressions")}/><label for="Regular Expressions">Regular Expressions</label>
                  <input type="checkbox" className = "Boxsize" name="Node.JS" onChange={() => filters("Node.JS")}/><label for="Node.JS">Node.JS</label>
                  <input type="checkbox" className = "Boxsize" name="Debugging" onChange={() => filters("Debugging")}/><label for="Debugging">Debugging</label>
                  <input type="checkbox" className = "Boxsize" name="Project Management" onChange={() => filters("Project Management")}/><label for="Project Management">Project Management</label>

                </div>

            </form>

            <br></br>
            <br/> <input type="checkbox" name="Clear Filters" className = "Boxsize" onChange={() => unfilters("Clear Filters")}/><label for="Clear Filters">Clear Filters</label>

        </div>

        <br></br>
        <br></br>

        <Container className = "row col-md-12">
          
          <div className = "column2Section23 ">
          
              <div className = "cols">
                <Row>
                  <Col>{section1()}</Col>
                </Row>
              </div>

          </div>     
          
        </Container>

      </div>
  
{/* /********************************************************************************************************************************/}      
    </Container>
      
{/* /**********************************************************************************************************************/}
    </>
  );
}

export default EmployerDashboard;


