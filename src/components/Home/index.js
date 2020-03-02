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
      <img src='https://www.joblo.com/assets/images/joblo/posters/2019/01/IO-poster-1.jpg'/>
      <img src='https://www.mauvais-genres.com/26247/avengers-endgame-original-movie-poster-15x21-in-2019-anthony-russo-robert-downey-jr.jpg'/>
      <img src='https://images.moviepostershop.com/replicas-movie-poster-1000778791.jpg'/>
      <img src='https://www.arthipo.com/image/cache/catalog/genel-tasarim/all-posters/sinema-cinema-film-postersleri/yabanci-filmler/1/pfilm1505-avatar-2_c02bbf7f-poster-movie-film-1000x1000.jpg'/>
      </Coverflow>
    </div>
  );
}

export default Home;
