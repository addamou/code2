import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteStock } from "../../actions/stock";
import { formatDate } from "../layout/Formats";
import { Pagination } from "../layout/Pagination";
import "./style.css";

export const InfosTableau = ({ data, min, nom, agent, id }) => {
  const dispatch = useDispatch();
  const [totalEntree, setTotalEntree] = useState(0);
  const [totalSortie, setTotalSortie] = useState(0);
  const [stockActuel, setStockActuel] = useState(0);
  useEffect(() => {
    let x = 0;
    data.map((som) => {
      return (x += som.entree);
    });
    setTotalEntree(x);
    let y = 0;
    data.map((som) => {
      return (y += som.sortie);
    });
    setTotalSortie(y);
    let p = x - y;
    setStockActuel(p);

    if (p === min)
      toast.info(
        `Alert vous venez d'entrer dans le Stock de sécutité de ce produit: ${nom}. Veuillez prendre les disposition pour eviter la rupture`,
        { position: "top-center" }
      );

    if ((p < min) & (p === 1))
      toast.warning(
        `Alert, ${nom} est presque en rupture. Veuillez commander !`,
        { position: "top-center" }
      );

    if (p === 0) {
      dispatch(deleteStock(id));
    }
  }, [data, min, nom, id, dispatch]);

  /**Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [ParPage] = useState(13);
  const last = currentPage * ParPage;
  const first = last - ParPage;
  const datas = data.slice(first, last);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  /*** ================================================= */

  const style =
    stockActuel <= min
      ? { background: "red", color: "#fff", textAlign: "right" }
      : { background: "#0BE000F6", color: "#fff", textAlign: "right" };
  return data !== undefined ? (
    <Fragment>
      <div className='table-responsive text-capitalize'>
        <table className='table table-sm table-striped p-auto'>
          <thead className='text-center bg-secondary text-light'>
            <tr>
              <th>Date</th>
              <th>
                Destination <br /> Provenance{" "}
              </th>
              <th>Entrée</th>
              <th>Sortie</th>
              <th>N° Lot</th>
              <th>
                Date <br /> Peremption
              </th>
              <th>
                Perte ou <br /> Ajustement
              </th>
              <th>Observation</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {datas === null ? (
              <h1>Il n'exite aucun donnée pour ce produit actuellement</h1>
            ) : (
              datas.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.destination}</td>
                    <td className='text-end'>{item.entree}</td>
                    <td className='text-end'>{item.sortie}</td>
                    <td>{item.lot}</td>
                    <td>{formatDate(item.datePeremption)}</td>
                    <td>{item.perte}</td>
                    <td>{item.observation}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div>
        <table className='table table-sm table-hover '>
          <thead>
            <tr>
              <th scope='col'>Totales Entrées</th>
              <th scope='col'>Totales Sorties</th>
              <th scope='col'>Stock Actuel</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            <tr>
              <td className='text-end'>{totalEntree}</td>
              <td className='text-end'>{totalSortie}</td>
              <td style={style}>{stockActuel}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={`align-items-end d-flex flex-wrap`}>
        <Pagination ParPage={ParPage} total={data.length} paginate={paginate} />
      </div>
      <div className='text-end'>
        <h6 className='text-decoration-underline'>Le Gestionnaire</h6>
        <p>{agent}</p>
      </div>
    </Fragment>
  ) : (
    <h1 style={{ color: "#fff", margin: "20px 30px" }}>
      Aucun objet selectionner encore
    </h1>
  );
};
