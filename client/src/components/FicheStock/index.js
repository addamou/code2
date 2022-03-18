import React, { useRef } from "react";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { Entete2 } from "../layout/Entetes";
import Modale from "../layout/Modale";
import { InfosProduit } from "./InfosProduit";

export const Index = ({ close, data, open }) => {
  const stockRef = useRef();
  const Print = useReactToPrint({
    content: () => stockRef.current,
  });

  return (
    open && (
      <Modale close={close}>
        <button className='btn btn-info mb-2' onClick={Print}>
          {" "}
          <FaPrint className='mb-1' />
          IMPRIMER
        </button>
        <ComposantImprimer data={data} ref={stockRef} />
      </Modale>
    )
  );
};

export default Index;

export const ComposantImprimer = React.forwardRef((props, ref) => {
  const data = props.data;
  return (
    <div className='A4' ref={ref}>
      <Entete2 />
      <InfosProduit data={data} />
    </div>
  );
});
