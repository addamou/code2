import React, { useState, useEffect } from "react";
import "./style.css";
import api from "../../utils/api";
import { Pagination } from "../layout/Pagination";
import { Entete1 } from "../layout/Entetes";
import { formatAnnee } from "../layout/Formats";
import { toast } from "react-toastify";

export const FicheTemperatures = ({
  idPatient,
  namePatient,
  lastNamePatient,
  dateDeNaissance,
}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/fichetemperature")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Une s'est produit lors de la récuperation des données !", {
          position: "top-center",
        });
      });
  }, []);

  const result = data.filter((datas) => datas.patient === idPatient);
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(5);

  const last = currentPage * ParPage;
  const first = last - ParPage;
  const currentData = result.slice(first, last);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {currentData.length > 0 ? (
        currentData.map((item) => {
          return (
            <div className='A4 mb-2' key={item._id}>
              <Entete1 date={item.date} />

              <div className='text-capitalize my-4'>
                <div className='row'>
                  <div className='col-5'>
                    Nom et Prénom:{" "}
                    <span className='fw-bolder ms-2'>
                      {` ${namePatient} ${lastNamePatient}`}{" "}
                    </span>
                  </div>
                  <div className='col-3 text-center'>
                    Age:{" "}
                    <span className='fw-bolder ms-2'>
                      {formatAnnee(item.date) - parseInt(dateDeNaissance)}
                      {formatAnnee(item.date) - parseInt(dateDeNaissance) > 1
                        ? "ans"
                        : "an"}
                    </span>
                  </div>
                  <div className='col-4 text-end'>
                    Sexe: <span className='fw-bolder ms-2'>{item.sexe}</span>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-7'>
                    Poids:{" "}
                    <span className='fw-bolder ms-2'>{item.poids} Kg</span>
                  </div>
                  <div className='col-5 text-end'>
                    Chambre N° :{" "}
                    <span className='fw-bolder'>{item.chambre}</span>
                  </div>
                </div>
              </div>

              <table id='table' style={{ textAlign: "center" }}>
                <thead>
                  <tr className='text-center'>
                    <th style={{ width: 250 }}>TRAITEMENT</th>
                    <th className='text-center'>
                      J1
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                    <th className='text-center'>
                      J2
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                    <th className='text-center'>
                      J3
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                    <th className='text-center'>
                      J4
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                    <th className='text-center'>
                      J5
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                    <th className='text-center'>
                      J6
                      <tr>
                        <td>M</td>
                        <td>M</td>
                        <td>S</td>
                      </tr>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {item.traitement.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.labbel}</td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j1matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j1midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j1soir}
                              />
                            </td>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j2matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j2midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j2soir}
                              />
                            </td>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j3matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j3midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j3soir}
                              />
                            </td>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j4matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j4midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j4soir}
                              />
                            </td>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j5matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j5midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j5soir}
                              />
                            </td>
                          </tr>
                        </td>
                        <td>
                          <tr>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j6matin}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j6midi}
                              />
                            </td>
                            <td>
                              <input
                                type='checkbox'
                                readOnly
                                defaultChecked={item.j6soir}
                              />
                            </td>
                          </tr>
                        </td>
                      </tr>
                    );
                  })}

                  <tr>
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
                        readOnly
                        defaultChecked={item?.t42.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t42.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t42.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t42.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t42.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t42.j6}
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
                        readOnly
                        defaultChecked={item?.t41.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t41.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t41.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t41.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t41.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t41.j6}
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
                        readOnly
                        defaultChecked={item?.t40.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t40.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t40.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t40.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t40.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t40.j6}
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
                        readOnly
                        defaultChecked={item?.t39.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t39.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t39.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t39.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t39.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t39.j6}
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
                        readOnly
                        defaultChecked={item?.t38.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t38.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t38.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t38.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t38.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t38.j6}
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
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t37.j6}
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
                        readOnly
                        defaultChecked={item?.t36.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t36.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t36.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t36.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t36.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t36.j6}
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
                        readOnly
                        defaultChecked={item?.t35.j1}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t35.j2}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t35.j3}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t35.j4}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t35.j5}
                      />
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        readOnly
                        defaultChecked={item?.t35.j6}
                      />
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th rowSpan={6}>EXAMENS COMPLEMENTAIRES</th>
                    <th colSpan={6}>
                      {item.examensComplementaires.map((item, index) => (
                        <tr className='border-0' key={index}>
                          {item}
                        </tr>
                      ))}
                    </th>
                  </tr>
                </tfoot>
              </table>
              <div className='text-end mt-4'>
                <h6>Infirmière</h6>
                <p>{item.agent}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div
          className='d-flex flex-column 
                justify-content-center align-items-center
                text-center text-light display-3'
          style={{ height: "90vh", width: "100vw" }}
        >
          <div>Ce patient ne dispose d'aucune Fiche de Température !</div>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
        <Pagination
          ParPage={ParPage}
          total={result.length}
          paginate={paginate}
        />
      </div>
    </>
  );
};
