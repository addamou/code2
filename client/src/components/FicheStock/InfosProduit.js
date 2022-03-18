import React from "react";
import { InfosTableau } from "./InfosTableau";

export const InfosProduit = ({ data }) => {
  return (
    <div>
      <div className=''>
        <h4 className='text-center text-decoration-underline mt-2'>
          FICHE DE STOCK
        </h4>
      </div>
      <div className='row my-2 fw-bold text-capitalize'>
        <div className='col-4'>
          Description: <span className='fw-normal'>{data.description}</span>
        </div>
        <div className='col-2'>
          Unité: <span className='fw-normal'>{data.unite}</span>
        </div>
        <div className='col-3'>
          Stock Max: <span className='fw-normal'>{data.stockMax}</span>
        </div>
        <div className='col-3'>
          Stock Min: <span className='fw-normal'>{data.stockMin}</span>
        </div>
      </div>
      <InfosTableau
        id={data._id}
        agent={data.agent}
        min={data.stockMin}
        max={data.stockMax}
        description={data.description}
        data={data.donnees}
      />
    </div>
  );
};
