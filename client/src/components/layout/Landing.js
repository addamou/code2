import React from "react";
import { Link } from "react-router-dom";
import videoSource from "../../assiets/img/bgVideo.mp4";

const Landing = () => {
  return (
    <div className='Container'>
      <video autoPlay='autoplay' loop='loop' muted className='Video'>
        <source src={videoSource} type='video/mp4' />
        Votre Navigateur ne supporte pas cette video.
      </video>
      <div className='Content'>
        <div className='SubContent'>
          <h1 className='textAnim'>
            <span style={{ color: "blue" }}>CLINIQUE</span>{" "}
            <span style={{ color: "red" }}>MEDICALE</span>{" "}
            <span style={{ color: "blue" }}>AFOUA</span>
          </h1>
          <p>Connecter a votre Compte</p>
          <button className='btn btn-outline-dark'>
            <Link to='/login' className='nav-link'>
              Démarrer
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
