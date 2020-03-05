import React, { useState } from "react";
import ProfileAPICalls from "./profileAPICalls";

function Profile(props) {
  try {
    setInterval(() => {
      ProfileAPICalls.getMyProfile(0).then(
        v => {
          console.log(v);
        },
        error => {
          console.log(error);
        }
      );
    }, 3000);
  } catch (e) {
    console.log(e);
  }
  const [profileName] = useState("Perf Eng");
  const [age] = useState(50);
  const [email] = useState("perfeng.loginteam@gmail.com");
  const [city] = useState("San Francisco");

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
