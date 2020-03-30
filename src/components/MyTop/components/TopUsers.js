import React, { useState, useEffect } from "react";
import MyTopApicalls from "../MyTopApicalls";
// import "./TopUsers.css";



function TopUsers() {
  const [filter, setFilter] = useState(0);
  const [data, setData] = useState([]);

  const sortBy = () => {
    switch (filter) {
      case 0:
        console.log("@filter0@", filter);
        return (a, b) => b.checkoutsCount - a.checkoutsCount;
      case 1:
        console.log("@filter1@", filter);
        return (a, b) => b.favsCount - a.favsCount;
      case 2:
      default:
        console.log("@filter2@", filter);
        return (a, b) => b.ratingsCount - a.ratingsCount;
    }
  };

  const refreshHandler = () =>{
    MyTopApicalls.getTopUsers('favs').then(
      (v) => {
          console.log( "@getTopUsers Succeeded@", v );
          setData(v);
      },
      (error) => {
          console.log( error );
      }
    );
  }

  useEffect(() => {
    refreshHandler();
  },[]);

  return (
    <div>
      <h1>Top Users</h1>
      <button onClick={refreshHandler}>Refresh</button>
      <table>
        <tbody>
          <tr>
            <td>User</td>
            <td onClick={() => {setFilter(0)}}>checkoutsCount</td>
            <td onClick={() => {setFilter(1)}}>favsCount</td>
            <td onClick={() => {setFilter(2)}}>ratingsCount</td>
          </tr>
          {data
            .sort(sortBy())
            .map(({ userName, favsCount, checkoutsCount, ratingsCount }, index) => (
              <tr key={index}>
                <td>{userName}</td>
                <td>{checkoutsCount}</td>
                <td>{favsCount}</td>
                <td>{ratingsCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopUsers;

