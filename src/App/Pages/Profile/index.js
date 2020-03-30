import React, { useContext } from "react";
import useAxios from "axios-hooks";

import { LOGIN_API } from "constants/api_constants";
import { Context } from "providers/Store.js";

function Profile() {
  const [{ userId }] = useContext(Context);

  const [{ data: userInfoData, loading: userInfoLoading }] = useAxios({
    url: `${LOGIN_API.getUserInfo}`,
    params: {
      userId
    }
  });

  if (userInfoLoading) return <div className="loading">Loading</div>;

  const { city, userName, email, age } = userInfoData?.users[0];

  return (
    <div className="profile">
      <div>City: {city} </div>
      <div>userName: {userName} </div>
      <div>email: {email} </div>
      <div>age: {age} </div>
    </div>
  );
}

export default Profile;
