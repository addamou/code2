import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../utils/api";

export const Password = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const { user } = state;
  const { post, _id } = user;

  const initialPass = {
    password: "",
    confirmPassword: "",
  };
  const [reset, setReset] = useState(initialPass);
  const { password, confirmPassword } = reset;
  const change = (e) => {
    const { name, value } = e.target;
    setReset({ ...reset, [name]: value });
  };
  const submit = async (e) => {
    e.preventDefault();
    const res = await api.put(`/users/pass/${_id}`, reset);

    if (res) {
      toast.success("Votre mot de passe est bien modifié.", {
        position: "top-center",
      });
      setReset(initialPass);
      navigate(`/${post}`);
    }
  };
  const btn = password === confirmPassword && (
    <input type='submit' className='btn btn-success' value='Valider' />
  );

  return (
    <div className='py-5 container'>
      <form
        className='p-3 col-10 mx-auto'
        autoComplete='false'
        onSubmit={submit}
      >
        <h1 className='text-info my-2'>
          Formulaire de Modification de Mot de Passe
        </h1>
        <div className='form-group my-3'>
          <label htmlFor='password'>Nouveau Mot de passe</label>
          <input
            type='password'
            className='form-control mx-auto'
            value={password}
            onChange={change}
            placeholder='Nouveau mot de passe'
            name='password'
          />
        </div>
        <div className='form-group my-3'>
          <label htmlFor='confirmPassword'>Confirmer Mot de passe</label>
          <input
            type='password'
            className='form-control mx-auto'
            name='confirmPassword'
            value={confirmPassword}
            onChange={change}
            placeholder='confirmer le mot de passe'
          />
        </div>
        {btn}
      </form>
    </div>
  );
};
