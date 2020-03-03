import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import ProfileAPICalls from './profileAPICalls';

function Profile(props) {
  try {
    setInterval(() => {
      ProfileAPICalls.getMyProfile(0).then(
          (v) => {
            console.log( v );
          },
          (error) => {
            console.log( error );
          }
      );
    }, 3000);
  } catch(e) {
    console.log(e);
  }
  const [profileName, setProfileName] = useState("Perf Eng");
  const [age, setAge] = useState(50);
  const [email, setEmail] = useState("perfeng.loginteam@gmail.com");
  const [city, setCity] = useState("San Francisco");

  
  

  return (
    <div>
      Hello, {profileName}
      <br />
      Age: {age} 
      <br />
      Email: {email} 
      <br />
      City: {city} 
      </div>
  );
}

export default Profile;
