import axios from "axios";
//const url =  "http://localhost:3001/";
const url = "https://finaltdaproject.herokuapp.com/"; 


export class ApiClient {

  constructor(token, logoutHandler) {
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token
      },
      data,
    }).catch((error) => {
      console.log("api error" , this.token);
      if(error.response.status === 403) {
        //logout the user
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }      
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  login(userName,password) {
    console.log(userName, password);
    return this.apiCall("post", `${url}auth`, {"userName": userName, "password": password});
  }

  // all profiles in database
  getProfiles() {
    return this.authenticatedCall("get", url);
  }

  // graduate view
  getGradProfile(id) {
    console.log(id)
    return this.authenticatedCall("get", `${url}id/${id}`);
  }

  // only pulls available graduates for viewing
  getEmployedProfile(employed) {
    console.log(employed)
    return this.authenticatedCall("get", `${url}employed/${employed}`);
  }

  // allows the user to add a new profile
  addProfile(courseTitle, fullName, email, contactNumber, city, bio, skills, linkedIn, gitHub, portfolio, employed, image, cv) {
    return this.authenticatedCall("post", url, {courseTitle, fullName, email, contactNumber, city, bio, skills, linkedIn, gitHub, portfolio, employed, image, cv});
  }

  // allows the user the remove a profile
  removeProfile(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  //allows the user the update a profile
  updateProfile(id, courseTitle, fullName, email, contactNumber, city, bio, skills, linkedIn, gitHub, portfolio, employed, image, cv) {
    return this.authenticatedCall("put", `${url}${id}`, {courseTitle, fullName, email, contactNumber, city, bio, skills, linkedIn, gitHub, portfolio, employed, image, cv});
  }
}
