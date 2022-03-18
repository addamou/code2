import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";
import { Postes } from "../data/Postes";
import Modal from "../layout/Modal";

export const Register = ({ ouvrir, fermer }) => {
  const state = useSelector((state) => state.auth);
  const { user } = state;

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [post, setPost] = useState("");
  const [email, setEmail] = useState("");
  const [password] = useState("0000");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const newRegister = (e) => {
    dispatch(
      register({ name, lastName, phone, post, email, password, isAdmin })
    );
    fermer();
  };
  if (user.isAdmin === true) {
    return (
      <Modal
        ouvrir={ouvrir}
        fermer={fermer}
        click={newRegister}
        css={"col-6 border-primary border-3"}
        css1={"btn btn-success"}
        bg={"#C20F36C2"}
        titre={"ENREGISTREMENT D'AGENTS"}
        bouton={"ENREGISTRER"}
      >
        <form className='card p-3 bg-dark text-light' autoComplete='false'>
          <div className='row'>
            <div className='col-6'>
              <label htmlFor='name'>Prénom</label>
              <input
                type='text'
                required
                className='form-control text-capitalize'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Prénom'
                id='name'
              />
            </div>
            <div className='col-6'>
              <label htmlFor='lastName'>Nom de famille</label>
              <input
                type='text'
                required
                className='form-control text-capitalize'
                id='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder='Nom de Famille'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <label htmlFor='email'>Adresse Mail</label>
              <input
                type='email'
                className='form-control'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id='email'
              />
            </div>
            <div className='col-md-6'>
              <label htmlFor='phone'>Numéro de téléphone</label>
              <input
                type='tel'
                required
                className='form-control text-capitalize'
                id='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder='Numéro de téléphone'
              />
            </div>
          </div>

          <div className='form-group'>
            <label htmlFor='post' className='form-label'>
              Postes
            </label>
            <select
              className='form-control form-control-sm'
              required
              id='post'
              value={post}
              onChange={(e) => setPost(e.target.value)}
            >
              <option defaultValue={{}}>Choisir...</option>
              {Postes.map((item) => (
                <option key={item.id} value={item.poste}>
                  {item.poste}
                </option>
              ))}
            </select>
          </div>
          <div className='form-check mt-3'>
            <input
              type='checkbox'
              onChange={(e) => setIsAdmin(e.currentTarget.checked)}
              value={isAdmin}
              className='form-check-input'
              id='isAdmin'
            />
            <label className='form-check-label' htmlFor='isAdmin'>
              Est il un Administrateur du PlateForme ?
            </label>
            <br />
            <em>si c'est "Oui" cochet || Si c'est "Non" laissez</em>
          </div>
        </form>
      </Modal>
    );
  } else {
    return (
      <Modal
        ouvrir={ouvrir}
        fermer={fermer}
        css={"col-6 border-danger border-3"}
        css1={"btn btn-success"}
        bg={"#0016DD"}
        titre={"VOUS N'ETES PAS AUTORISE POUR CET ACTION"}
      >
        <div className='bg-light text-center display-4'>
          Cette action est destinée aux administrateurs.
        </div>
      </Modal>
    );
  }
};
