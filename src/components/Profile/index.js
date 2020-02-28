import React, { useState, useEffect } from "react";

function Profile(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileName, setProfileName] = useState("Samuel");

  useEffect(() => {
    console.log(profileName);
  }, [profileName]);

  return (
    <div>
      Profile
      <br />
      {searchQuery}
      <br />
      {profileName}
      <br />
      <input onChange={e => setSearchQuery(e.target.value)}></input>
      <br />
      <input onChange={e => setProfileName(e.target.value)}></input>
    </div>
  );
}

export default Profile;
