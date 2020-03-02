import React from "react";
import Coverflow from '@stuuno/node-flow';

function Home() {
  return (
    <div>
      <Coverflow
      displayQuantityOfSide={2}
      navigation
      infiniteScroll
      enableHeading
      media={{
        '@media (max-width: 600px)': {
          height: '600px'
        },
        '@media (min-width: 100px)': {
          height: '600px'
        }
      }}
      >
      <img src='https://i.etsystatic.com/19446373/r/il/5789bb/1828896207/il_570xN.1828896207_j681.jpg'/>
      <img src='https://images-na.ssl-images-amazon.com/images/I/51k1da28EmL._AC_.jpg'/>
      <img src='https://pisces.bbystatic.com/image2/BestBuy_US/images/products/3453/34532974_so.jpg'/>
      <img src='https://cdn.europosters.eu/image/750/posters/avatar-limited-ed-one-sheet-sun-i7182.jpg'/>
      </Coverflow>
    </div>
  );
}

export default Home;
