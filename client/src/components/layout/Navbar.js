import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { FaPlusSquare, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Offres, Password, ProfilAgent } from "../Formulaires";
import { Register } from "../auth/Register";

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const [agent, setAgent] = useState(false);
  const [offre, setOffre] = useState(false);
  const [profil, setProfil] = useState(false);
  const [pass, setPass] = useState(false);

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
          onClick={() => setOffre(true)}
          className='nav-link btn btn-outline-warning text-light me-3'
        >
          <FaPlusSquare /> <span className='hide-sm'>Offres</span>
        </button>
      </li>
      <li className='nav-item'>
        <Link
          to='/password'
          className='nav-link btn btn-outline-info text-light me-3'
        >
          Mot de Passe
        </Link>
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
      {offre && (
        <Offres ouvrir={() => setOffre(true)} fermer={() => setOffre(false)} />
      )}
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
