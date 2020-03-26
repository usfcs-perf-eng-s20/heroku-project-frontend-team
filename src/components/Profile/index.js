import React, { useState } from "react";
import useAxios from "axios-hooks";
import useLoginStatus from "../../provider/useLoginStatus";
import { LOGIN_API } from "../../provider/routes_constants";

function Profile(props) {
  const [userId, loginLoading, loginError] = useLoginStatus({
    bypass: true
  });

  const [
    { data: userInfoData, loading: userInfoLoading, error: userInfoError }
  ] = useAxios({
    url: `${LOGIN_API.getUserInfo}`,
    params: {
      userId: 1
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
