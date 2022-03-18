import React, { Fragment, useState } from "react";
import { logout } from "../../actions/auth";
import { Register } from "../auth/Register";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Password, ProfilAgent } from "../Formulaires";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const auth = useSelector((state) => state.auth);
  const { name, lastName, id, post, isAdmin, isAuthenticated } = auth;
  const dispatch = useDispatch();
  const [agent, setAgent] = useState(false);
  const [profil, setProfil] = useState(false);
  const [pass, setPass] = useState(false);
  console.log(auth);
  const authLinks = (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <button
          onClick={() => setAgent(true)}
          className='nav-link btn btn-outline-primary text-light me-3'
        >
          <FaUserPlus /> <span className='hide-sm'>Agent</span>
        </button>
      </li>
      <li className='nav-item'>
        <button
          onClick={() => setProfil(true)}
          className='nav-link btn btn-outline-info text-light me-3'
        >
          Profil
        </button>
      </li>

      <li className='nav-item'>
        <a
          onClick={logout}
          href='/'
          className='nav-link text-light btn btn-danger'
        >
          <FaSignOutAlt /> <span className='hide-sm'>Déconnecter</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='nav justify-content-end'>
      <li className='nav-item'>
        <Link to='/' className='nav-link text-light'>
          Accueil
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link btn btn-success text-light'>
          <FaSignInAlt /> Connecter
        </Link>
      </li>
    </ul>
  );

  return (
    <>
      <nav className='navbar bg-dark'>
        <div className='container'>
          <h2 className='navbar-brand text-light'>Clinique Afoua</h2>

          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        </div>
      </nav>
      {agent && (
        <Register
          ouvrir={() => setAgent(true)}
          fermer={() => setAgent(false)}
        />
      )}
      {profil && (
        <ProfilAgent
          ouvrir={() => setProfil(true)}
          fermer={() => setProfil(false)}
        />
      )}
      {pass && (
        <Password ouvrir={() => setPass(true)} fermer={() => setPass(false)} />
      )}
    </>
  );
};
