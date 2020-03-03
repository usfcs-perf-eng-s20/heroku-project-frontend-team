import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import ProfileAPICalls from './profileAPICalls';

function Profile(props) {
  useState(()=>{
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
    
  })
  const [profileName, setProfileName] = useState("Perf");
  const [age, setAge] = useState(50);
  const [email, setEmail] = useState("perfeng.loginteam@gmail.com");
  const [city, setCity] = useState("San Francisco");

  const [newProfileName, setNewProfileName] = useState(undefined);
  const [newAge, setNewAge] = useState(undefined);
  const [newEmail, setNewEmail] = useState(undefined);
  const [newCity, setNewCity] = useState(undefined);

  useEffect(() => {
    console.log(profileName);
  }, [profileName]);

  return (
    <div>
      Hello, {profileName}
      <br />
      Age: {age} 
      <br />
      Email: {email} 
      <br />
      City: {city} 
      <br />
      <br />
      Change your name:
      <input onChange={e => setNewProfileName(e.target.value)}></input>
      <br />
      Change your age:
      <input onChange={e => setNewAge(e.target.value)}></input>
      <br />
      Change your email:
      <input onChange={e => setNewEmail(e.target.value)}></input>
      <br />
      Change your city:
      <input onChange={e => setNewCity(e.target.value)}></input>
      <br />
      <Button style={{'color':'green'}} onClick={()=>{}}>Submit</Button>
      <Button style={{'color':'red'}} onClick={()=>{setNewProfileName(undefined);setNewAge(undefined);setNewEmail(undefined);setNewCity(undefined)}}>Cancel</Button>
    </div>
  );
}

export default Profile;
