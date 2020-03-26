import React, { useState } from "react";
import MyTopApicalls from "../MyTopApicalls";
// import "./TopUsers.css";

const data = {
  body: [
    {
      user: "Frank",
      checkouts: 45,
      favs: 15,
      ratings: 110
    },
    {
      user: "Zini",
      checkouts: 10,
      favs: 2,
      ratings: 120
    }
  ]
};

function TopUsers() {
  const [filter, setFilter] = useState(0);

  const sortBy = () => {
    switch (filter) {
      case 0:
        return (a, b) => b.checkouts - a.checkouts;
      case 1:
        return (a, b) => b.favs - a.favs;
      case 2:
      default:
        return (a, b) => b.ratings - a.ratings;
    }
  };
  return (
    <div>
      <h1>Top Users</h1>
      <table>
        <tbody>
          <tr>
            <td>User</td>
            <td onClick={() => {setFilter(0); data = MyTopApicalls.getMyTops('Checkouts');}}># COs</td>
            <td onClick={() => {setFilter(1); data = MyTopApicalls.getMyTops('Faves');}}># Favs</td>
            <td onClick={() => {setFilter(2); data = MyTopApicalls.getMyTops('Ratings');}}># Ratings</td>
          </tr>
          {data.body
            .sort(sortBy())
            .map(({ user, checkouts, favs, ratings }) => (
              <tr key={user}>
                <td>{user}</td>
                <td>{checkouts}</td>
                <td>{favs}</td>
                <td>{ratings}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopUsers;
