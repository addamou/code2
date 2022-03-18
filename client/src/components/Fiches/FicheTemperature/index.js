import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import { Entete1 } from "../../layout/Entetes";
import "./style.css";

const FicheTemperature = ({
  idPatient,
  print,
  close,
  nameAgent,
  lastNameAgent,
  date,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
  handleData,
}) => {
  const initialAdd = {
    labbel: "",
    j1matin: false,
    j1midi: false,
    j1soir: false,
    j2matin: false,
    j2midi: false,
    j2soir: false,
    j3matin: false,
    j3midi: false,
    j3soir: false,
    j4matin: false,
    j4midi: false,
    j4soir: false,
    j5matin: false,
    j5midi: false,
    j5soir: false,
    j6matin: false,
    j6midi: false,
    j6soir: false,
  };
  const [add, setAdd] = useState(initialAdd);
  const [data, setData] = useState({
    sexe: "",
    poids: "",
    chambre: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  //Submit
  const submit = (e) => {
    e.preventDefault();
    api
      .post("/fichetemperature", {
        patient: idPatient,
        ...data,
        traitement,
        ...T,
        examensComplementaires,
        agent: `${nameAgent} ${lastNameAgent}`,
      })
      .then((res) => {
        handleData(res.data);
        close();
        print();
        toast.info("Fiche de température prête", { position: "top-center" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeTraitement = (e) => {
    if (e.target.id === "labbel") {
      setAdd({ ...add, [e.target.id]: e.target.value });
    } else {
      setAdd({ ...add, [e.target.id]: e.target.checked });
    }
  };

  //Traitement
  const [traitement, setTraitement] = useState([]);

  const ajout = () => {
    setTraitement([...traitement, add]);
    setAdd(initialAdd);
  };

  //effacer un traitement
  const deleteAdd = (i) =>
    setTraitement(traitement.filter((el, index) => i !== index));

  //Checkbox jours des traitement
  const [T, setT] = useState({
    t42: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t41: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t40: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t39: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t38: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t37: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t36: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
    t35: {
      j1: false,
      j2: false,
      j3: false,
      j4: false,
      j5: false,
      j6: false,
    },
  });

  const retX = (i) => {
    let results = [];
    for (let a = 0; a < i; a++) {
      results.push(i);
    }
    return results;
  };

  const [examen, setExamen] = useState("");
  const [examensComplementaires, setExamensComplementaires] = useState([]);
  const valueExamen = (e) => {
    setExamen(e.target.value);
  };
  const addValueExamen = () => {
    setExamensComplementaires([...examensComplementaires, examen]);
  };

  //effacer autre examen
  const RemoveValueExamen = (i) =>
    setExamensComplementaires(
      examensComplementaires.filter((el, index) => index !== i)
    );

  const modify = (field, index) => {
    let traitementCopy = [...traitement];
    traitementCopy[index][field] = !traitementCopy[index][field];
    setTraitement(traitementCopy);
  };

  const modifyTemp = (temp, jour, e) => {
    setT({
      ...T,
      [temp]: {
        ...T[temp],
        [jour]: e.target.checked,
      },
    });
  };

  return (
    <form className='A4' autoComplete='false' style={{ fontSize: 11 }}>
      <Entete1 date={date} />
      <div>
        <div className='row text-center'>
          <div className='col-6'>
            Nom et Prénom:{" "}
            <span className='fw-bolder'>{` ${namePatient} ${lastNamePatient}`}</span>
          </div>
          <div className='col-6 text-end'>
            Age:{" "}
            <span className='fw-bolder'>
              {parseInt(date.getFullYear()) - parseInt(dateDeNaissance)}
              <span className='ms-1'>
                {parseInt(date.getFullYear()) - parseInt(dateDeNaissance) > 1
                  ? "ans"
                  : "an"}
              </span>
            </span>
          </div>
        </div>
        <div className='row my-2'>
          <div className='col-4'>
            <div className='form-group'>
              <select
                required
                className='form-select form-select border-bottom border-0 border-info rounded-0 border-3'
                value={data.sexe}
                id='sexe'
                onChange={(e) => handleChange(e)}
              >
                <option selected>Sexe...</option>
                <option value='Masculin'>Masculin</option>
                <option value='Féminin'>Feminin</option>
                <option value='Autres'>Autres</option>
              </select>
            </div>
          </div>
          <div className='col-4'>
            <input
              required
              type='number'
              className='form-control border-bottom border-0 border-info rounded-0 border-3'
              placeholder='Poids du Patient'
              value={data.poids}
              onChange={(e) => handleChange(e)}
              id='poids'
            />
          </div>
          <div className='col-4'>
            <input
              required
              type='text'
              className='form-control border-bottom border-0 border-info rounded-0 border-3'
              placeholder='Chambre Hospitalisation'
              value={data.chambre}
              onChange={(e) => handleChange(e)}
              id='chambre'
            />
          </div>
        </div>

        <div
          style={{ background: "#030A29", color: "#fff" }}
          className='row mb-1 align-items-center justify-content-between py-2'
        >
          <div className='col-4'>
            <div className='my-auto'>
              <input
                type='text'
                placeholder='Traitement'
                className='form-control border-bottom border-0 border-info rounded-0 border-3'
                value={add.labbel}
                onChange={(e) => handleChangeTraitement(e)}
                id='labbel'
              />
            </div>
          </div>
          <div className='col-8 my-auto'>
            <div className='d-flex'>
              <div className='mx-2'>
                <span className='fw-bolder'>J1: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j1matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j1matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j1midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j1midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j1soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j1soir'
                />
              </div>
              <div className='mx-2'>
                <span className='fw-bolder'>J2: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j2matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j2matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j2midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j2midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j2soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j2soir'
                />
              </div>
              <div className='mx-2'>
                <span className='fw-bolder'>J3: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j3matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j3matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j3midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j3midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j3soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j3soir'
                />
              </div>
            </div>
            <div className='d-flex'>
              <div className='mx-2'>
                <span className='fw-bolder'>J4: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j4matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j4matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j4midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j4midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j4soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j4soir'
                />
              </div>
              <div className='mx-2'>
                <span className='fw-bolder'>J5: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j5matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j5matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j5midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j5midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j5soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j5soir'
                />
              </div>
              <div className='mx-2'>
                <span className='fw-bolder'>J6: </span>
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j6matin}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j6matin'
                />
                <label>M </label>
                <input
                  type='checkbox'
                  checked={add.j6midi}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j6midi'
                />
                <label>S </label>
                <input
                  type='checkbox'
                  checked={add.j6soir}
                  onChange={(e) => handleChangeTraitement(e)}
                  id='j6soir'
                />
              </div>
              <button
                type='button'
                style={{ marginTop: "-22px" }}
                className='btn btn-success'
                onClick={() => ajout()}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
        <div className='table-responsive ficheT ficheTe'>
          <table
            id='table'
            style={{ borderSpacing: 0, padding: 5, textAlign: "center" }}
          >
            <thead>
              <tr className='bg-primary text-light'>
                <th style={{ width: 250 }}>TRAITEMENT</th>
                <th className='text-center'>
                  J1 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
                <th className='text-center'>
                  J2 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
                <th className='text-center'>
                  J3 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
                <th className='text-center'>
                  J4 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
                <th className='text-center'>
                  J5 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
                <th className='text-center'>
                  J6 <br />
                  <tr>
                    <td>M</td>
                    <td>M</td>
                    <td>S</td>
                  </tr>
                </th>
              </tr>
            </thead>
            <tbody>
              {traitement.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.labbel}</td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j1matin", index)}
                            checked={el.j1matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j1midi", index)}
                            checked={el.j1midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j1soir", index)}
                            checked={el.j1soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j2matin", index)}
                            checked={el.j2matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j2midi", index)}
                            checked={el.j2midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j2soir", index)}
                            checked={el.j2soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j3matin", index)}
                            checked={el.j3matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j3midi", index)}
                            checked={el.j3midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j3soir", index)}
                            checked={el.j3soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j4matin", index)}
                            checked={el.j4matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j4midi", index)}
                            checked={el.j4midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j4soir", index)}
                            checked={el.j4soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j5matin", index)}
                            checked={el.j5matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j5midi", index)}
                            checked={el.j5midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j5soir", index)}
                            checked={el.j5soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td>
                      <tr>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j6matin", index)}
                            checked={el.j6matin}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j6midi", index)}
                            checked={el.j6midi}
                          />
                        </td>
                        <td>
                          <input
                            type='checkbox'
                            onChange={(e) => modify("j6soir", index)}
                            checked={el.j6soir}
                          />
                        </td>
                      </tr>
                    </td>
                    <td
                      className='btn btn-danger p-0'
                      onClick={() => deleteAdd(index)}
                    >
                      X
                    </td>
                  </tr>
                );
              })}

              <tr className='bg-primary text-light'>
                <th className='text-center'>
                  <td className='border-0'>FR</td>
                  <td className='border-0'>Ur cc</td>
                  <td className='border-0'>Pouls</td>
                  <td className='border-0'>TA</td>
                  <td className='border-0'>T°</td>
                </th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
              <tr>
                <td>
                  <td></td>
                  <td>3500</td>
                  <td>180</td>
                  <td></td>
                  <td>42°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j1", e)}
                    checked={T.t42.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j2", e)}
                    checked={T.t42.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j3", e)}
                    checked={T.t42.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j4", e)}
                    checked={T.t42.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j5", e)}
                    checked={T.t42.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t42", "j6", e)}
                    checked={T.t42.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td></td>
                  <td>3000</td>
                  <td>160</td>
                  <td></td>
                  <td>41°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j1", e)}
                    checked={T.t41.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j2", e)}
                    checked={T.t41.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j3", e)}
                    checked={T.t41.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j4", e)}
                    checked={T.t41.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j5", e)}
                    checked={T.t41.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t41", "j6", e)}
                    checked={T.t41.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td>50</td>
                  <td>2500</td>
                  <td>140</td>
                  <td>25</td>
                  <td>40°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j1", e)}
                    checked={T.t40.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j2", e)}
                    checked={T.t40.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j3", e)}
                    checked={T.t40.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j4", e)}
                    checked={T.t40.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j5", e)}
                    checked={T.t40.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t40", "j6", e)}
                    checked={T.t40.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td>40</td>
                  <td>2000</td>
                  <td>120</td>
                  <td>20</td>
                  <td>39°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j1", e)}
                    checked={T.t39.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j2", e)}
                    checked={T.t39.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j3", e)}
                    checked={T.t39.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j4", e)}
                    checked={T.t39.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j5", e)}
                    checked={T.t39.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t39", "j6", e)}
                    checked={T.t39.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td>30</td>
                  <td>1500</td>
                  <td>100</td>
                  <td>15</td>
                  <td>38°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j1", e)}
                    checked={T.t38.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j2", e)}
                    checked={T.t38.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j3", e)}
                    checked={T.t38.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j4", e)}
                    checked={T.t38.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j5", e)}
                    checked={T.t38.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t38", "j6", e)}
                    checked={T.t38.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td>20</td>
                  <td>1000</td>
                  <td>80</td>
                  <td>10</td>
                  <td>37°</td>
                </td>
                {retX(T.t37).map((el, index) => (
                  <td key={index}>X</td>
                ))}
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j1", e)}
                    checked={T.t37.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j2", e)}
                    checked={T.t37.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j3", e)}
                    checked={T.t37.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j4", e)}
                    checked={T.t37.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j5", e)}
                    checked={T.t37.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t37", "j6", e)}
                    checked={T.t37.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td>10</td>
                  <td>500</td>
                  <td>60</td>
                  <td>5</td>
                  <td>36°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j1", e)}
                    checked={T.t36.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j2", e)}
                    checked={T.t36.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j3", e)}
                    checked={T.t36.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j4", e)}
                    checked={T.t36.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j5", e)}
                    checked={T.t36.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t36", "j6", e)}
                    checked={T.t36.j6}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <td></td>
                  <td>0</td>
                  <td>40</td>
                  <td></td>
                  <td>35°</td>
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j1", e)}
                    checked={T.t35.j1}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j2", e)}
                    checked={T.t35.j2}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j3", e)}
                    checked={T.t35.j3}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j4", e)}
                    checked={T.t35.j4}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j5", e)}
                    checked={T.t35.j5}
                  />
                </td>
                <td>
                  <input
                    type='checkbox'
                    onChange={(e) => modifyTemp("t35", "j6", e)}
                    checked={T.t35.j6}
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th rowSpan={6}>EXAMENS COMPLEMENTAIRES</th>
                <th colSpan={6}>
                  <tr className='border-0'>
                    <div className='inputAnimated'>
                      <input
                        type='text'
                        value={examen}
                        onChange={(e) => valueExamen(e)}
                        id='examen'
                      />
                      <button
                        type='button'
                        className='btn btn-success ml-2'
                        onClick={() => addValueExamen()}
                      >
                        +
                      </button>
                    </div>
                  </tr>
                  {examensComplementaires.map((el, index) => {
                    return (
                      <>
                        {" "}
                        <tr key={index}>
                          {el}{" "}
                          <td
                            className='btn btn-danger'
                            onClick={() => RemoveValueExamen(index)}
                          >
                            -
                          </td>{" "}
                        </tr>
                      </>
                    );
                  })}
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <button className='btnValid' type='button' onClick={submit}>
          VALIDER
        </button>
      </div>
    </form>
  );
};

export default FicheTemperature;
